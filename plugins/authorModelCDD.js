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
Vue.prototype.$authorModelCDD = (self,uri,targetElement,locale,recursive) => {
  var element={}
  var target={"obj":targetElement,"uri":uri};
  var tmpElement=target;
  if(recursive){
    tmpElement=refSolver(self,target,1);
  }
  element=tmpElement["obj"];
  var tmpObj={}
  tmpObj["key"]=uri;
  tmpObj["uri"]=tmpElement["uri"];
  tmpObj["name"]=element.name;
  tmpObj["joined"]=uxtToDate(element.joinedAt);
  tmpObj["leaved"]="";
  try{
    tmpObj["leaved"]=uxtToDate(element.leavedAt);
  }catch(e){
  }
  tmpObj["roles"]=element.roles;
  tmpObj["avatar"]="account_circle";
  return tmpObj;

  function uxtToDate(uxt){
    var d = new Date(uxt*1000);
    return d.getFullYear() + "-" + String(Number(d.getMonth()) + 1) + "-" + d.getDate();
  }

  function refSolver(self,target,depth){
    for(var i=0;i<depth;i++){
      if(target["obj"]["$ref"]){
        target["uri"]= target["obj"]["$ref"];
        target["obj"]=subRefSolver(self,target["obj"]["$ref"]);
      }else{
        return target;
      }
    }
    return target;
  }
  function subRefSolver(self,target){
    //Component resources
    var tmpTarget=target.split('#/');
    var tmpTargetObj=self.listItem(tmpTarget[0] ? tmpTarget[0]: self.rootDocumentID)[0]["dataObject"];
    var tmpTargetKeys=tmpTarget[1].split('/');
    tmpTargetKeys.forEach(tmpTargetKey => {
      tmpTargetObj=tmpTargetObj[tmpTargetKey]
    });
    return tmpTargetObj;
  }
}
