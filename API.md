# API Reference

**Classes**

Name|Description
----|-----------
[Cluster](#cdk-eksdistro-cluster)|Represents the EKS-D cluster.
[UbumtuAmiProvider](#cdk-eksdistro-ubumtuamiprovider)|The AMI provider to get the latest Ubuntu Linux AMI.


**Structs**

Name|Description
----|-----------
[ClusterProps](#cdk-eksdistro-clusterprops)|Construct properties for the EKS-D cluster.



## class Cluster  <a id="cdk-eksdistro-cluster"></a>

Represents the EKS-D cluster.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Cluster(scope: Construct, id: string, props?: ClusterProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ClusterProps](#cdk-eksdistro-clusterprops)</code>)  *No description*
  * **capacitySize** (<code>number</code>)  number of instances. __*Default*__: 1
  * **defaultInstanceType** (<code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code>)  The default EC2 instance type. __*Default*__: t3.large
  * **machineImage** (<code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code>)  AMI for the EKS-D instance node. __*Default*__: The latest AMI from ubuntu-focal-20.04-amd64-server
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  VPC for the cluster. __*Default*__: get or create a VPC




## class UbumtuAmiProvider  <a id="cdk-eksdistro-ubumtuamiprovider"></a>

The AMI provider to get the latest Ubuntu Linux AMI.


### Initializer




```ts
new UbumtuAmiProvider(userData: UserData)
```

* **userData** (<code>[UserData](#aws-cdk-aws-ec2-userdata)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**amiId** | <code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code> | <span></span>
**userData** | <code>[UserData](#aws-cdk-aws-ec2-userdata)</code> | <span></span>



## struct ClusterProps  <a id="cdk-eksdistro-clusterprops"></a>


Construct properties for the EKS-D cluster.



Name | Type | Description 
-----|------|-------------
**capacitySize**? | <code>number</code> | number of instances.<br/>__*Default*__: 1
**defaultInstanceType**? | <code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code> | The default EC2 instance type.<br/>__*Default*__: t3.large
**machineImage**? | <code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code> | AMI for the EKS-D instance node.<br/>__*Default*__: The latest AMI from ubuntu-focal-20.04-amd64-server
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | VPC for the cluster.<br/>__*Default*__: get or create a VPC



