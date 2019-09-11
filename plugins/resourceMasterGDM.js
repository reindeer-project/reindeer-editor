/*!------------------------------------------------------------------
 * Copyright 2019 Reindeer Technology Pte. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*-------------------------------------------------------------------*/
import Vue from 'vue'
Vue.prototype.$resourceMasterGDM =() => {
  var master={
    "default":{
      "avatar":"GCP-Generic-GCP"
    },
    "types":{
      "appengine.v1.version":{"provider":"gcp","avatar":"GCP-App-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "bigquery.v2.dataset":{"provider":"gcp","avatar":"GCP-BigQuery","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "bigquery.v2.table":{"provider":"gcp","avatar":"GCP-BigQuery","visible":0,"passThrough":0,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "bigtableadmin.v2.instance":{"provider":"gcp","avatar":"GCP-Cloud-Bigtable","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "bigtableadmin.v2.instance.table":{"provider":"gcp","avatar":"GCP-Cloud-Bigtable","visible":0,"passThrough":0,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "cloudfunctions.v1beta2.function":{"provider":"gcp","avatar":"GCP-Cloud-Functions","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "cloudresourcemanager.v1.project":{"provider":"gcp","avatar":"GCP-Cloud-Resource-Manager","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "clouduseraccounts.beta.group":{"provider":"gcp","avatar":"GCP-Generic-GCP","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "clouduseraccounts.beta.user":{"provider":"gcp","avatar":"GCP-Generic-GCP","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.address":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.autoscaler":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.backendBucket":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.backendService":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.disk":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.firewall":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":1},
      "compute.beta.forwardingRule":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.globalAddress":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.globalForwardingRule":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.healthCheck":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.httpHealthCheck":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.httpsHealthCheck":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.image":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.instance":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.instanceGroup":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.instanceGroupManager":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.instanceTemplate":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.network":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":1,"zone":0,"subnet":0,"security":0},
      "compute.beta.regionAutoscaler":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.regionBackendService":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.regionInstanceGroup":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.regionInstanceGroupManager":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.route":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.router":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.sslCertificate":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.subnetwork":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":1,"security":0},
      "compute.beta.targetHttpProxy":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.targetHttpsProxy":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.targetInstance":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.targetPool":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.targetSslProxy":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.targetVpnGateway":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.urlMap":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.vpnTunnel":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.xpnHost":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.beta.xpnResource":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.address":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.autoscaler":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.backendService":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.disk":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.firewall":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":1},
      "compute.v1.forwardingRule":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.globalAddress":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.globalForwardingRule":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.healthCheck":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.httpHealthCheck":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.httpsHealthCheck":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.image":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.instance":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.instanceGroup":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.instanceGroupManager":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.instanceTemplate":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.network":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":1,"zone":0,"subnet":0,"security":0},
      "compute.v1.regionAutoscaler":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.regionBackendService":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.regionInstanceGroup":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.regionInstanceGroupManager":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.route":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.router":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.sslCertificate":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.subnetwork":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":1,"security":0},
      "compute.v1.targetHttpProxy":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.targetHttpsProxy":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.targetInstance":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.targetPool":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.targetSslProxy":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.targetVpnGateway":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.urlMap":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "compute.v1.vpnTunnel":{"provider":"gcp","avatar":"GCP-Compute-Engine","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "container.v1.cluster":{"provider":"gcp","avatar":"GCP-Container-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "container.v1.nodePool":{"provider":"gcp","avatar":"GCP-Container-Engine","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "dataproc.v1.cluster":{"provider":"gcp","avatar":"GCP-Cloud-Dataproc","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "dns.v1.managedZone":{"provider":"gcp","avatar":"GCP-Cloud-DNS","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "iam.v1.serviceAccount":{"provider":"gcp","avatar":"GCP-Cloud-IAM","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "iam.v1.serviceAccounts.key":{"provider":"gcp","avatar":"GCP-Cloud-IAM","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "logging.v2.metric":{"provider":"gcp","avatar":"GCP-Logging","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "logging.v2.sink":{"provider":"gcp","avatar":"GCP-Logging","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "pubsub.v1.subscription":{"provider":"gcp","avatar":"GCP-Cloud-PubSub","visible":1,"passThrough":1,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "pubsub.v1.topic":{"provider":"gcp","avatar":"GCP-Cloud-PubSub","visible":1,"passThrough":1,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "runtimeconfig.v1beta1.config":{"provider":"gcp","avatar":"GCP-Generic-GCP","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "runtimeconfig.v1beta1.variable":{"provider":"gcp","avatar":"GCP-Generic-GCP","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "runtimeconfig.v1beta1.waiter":{"provider":"gcp","avatar":"GCP-Generic-GCP","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "spanner.v1.instance":{"provider":"gcp","avatar":"GCP-Cloud-Spanner","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "sqladmin.v1beta4.database":{"provider":"gcp","avatar":"GCP-Cloud-SQL","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "sqladmin.v1beta4.instance":{"provider":"gcp","avatar":"GCP-Cloud-SQL","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "sqladmin.v1beta4.user":{"provider":"gcp","avatar":"GCP-Cloud-SQL","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "storage.v1.bucket":{"provider":"gcp","avatar":"GCP-Cloud-Storage","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "storage.v1.bucketAccessControl":{"provider":"gcp","avatar":"GCP-Cloud-Storage","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "storage.v1.defaultObjectAccessControl":{"provider":"gcp","avatar":"GCP-Cloud-Storage","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0},
      "storage.v1.object":{"provider":"gcp","avatar":"GCP-Cloud-Storage","visible":1,"passThrough":1,"networkWide":0,"vpc":0,"zone":0,"subnet":0,"security":0},
      "storage.v1.objectAccessControl":{"provider":"gcp","avatar":"GCP-Cloud-Storage","visible":0,"passThrough":0,"networkWide":1,"vpc":0,"zone":0,"subnet":0,"security":0}
    }      
    }
  return master;
}
