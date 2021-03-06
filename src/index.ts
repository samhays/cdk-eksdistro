import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

/**
 * Construct properties for the EKS-D cluster
 */
export interface ClusterProps {
  /**
   * VPC for the cluster
   *
   * @default - get or create a VPC
   */
  readonly vpc?: ec2.IVpc;
  /**
   * The default EC2 instance type
   *
   * @default t3.large
   */
  readonly defaultInstanceType?: ec2.InstanceType;
  /**
   * number of instances
   *
   * @default 1
   */
  readonly capacitySize?: number;
  /**
   * AMI for the EKS-D instance node
   *
   * @default - The latest AMI from ubuntu-focal-20.04-amd64-server
   */
  readonly machineImage?: ec2.IMachineImage;
}

/**
 * Represents the EKS-D cluster
 */
export class Cluster extends cdk.Construct {
  private readonly defaultInstanceType: ec2.InstanceType = new ec2.InstanceType('t3.large');
  private readonly defaultCapacitySize: number = 1;
  constructor(scope: cdk.Construct, id: string, props: ClusterProps = {}) {
    super(scope, id);

    const vpc = props.vpc ?? getOrCreateVpc(this);
    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      'set -o xtrace',
      'snap install eks --classic --edge',
    );
    const asg = new autoscaling.AutoScalingGroup(this, 'ASG', {
      instanceType: props.defaultInstanceType ?? this.defaultInstanceType,
      machineImage: props.machineImage ?? new UbumtuAmiProvider(userData).amiId,
      minCapacity: props.capacitySize ?? this.defaultCapacitySize,
      vpc,
    });
    asg.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
  }
}

function getOrCreateVpc(scope: cdk.Construct): ec2.IVpc {
  // use an existing vpc or create a new one
  return scope.node.tryGetContext('use_default_vpc') === '1' ?
    ec2.Vpc.fromLookup(scope, 'Vpc', { isDefault: true }) :
    scope.node.tryGetContext('use_vpc_id') ?
      ec2.Vpc.fromLookup(scope, 'Vpc', { vpcId: scope.node.tryGetContext('use_vpc_id') }) :
      new ec2.Vpc(scope, 'Vpc', { maxAzs: 3, natGateways: 1 });
}

/**
 * The AMI provider to get the latest Ubuntu Linux AMI
 */
export class UbumtuAmiProvider {
  constructor(readonly userData: ec2.UserData) {}
  public get amiId() {
    return ec2.MachineImage.lookup({
      name: 'Ubuntu',
      filters: {
        name: ['ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-????????'],
        state: ['available'],
      },
      owners: ['099720109477'],
      userData: this.userData,
    });
  }
}
