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
Vue.prototype.$resourceModelSLF = (self,fileId,targetObject) => {
  var resources={};
  switch (targetObject["provider"]) {
    default:
      var typeKey="ServerlessFramework";
      var tmpObj={};
      tmpObj["key"]=fileId;
      tmpObj["avatar"]="";
      tmpObj["title"]=key;
      tmpObj["fileId"]=fileId;
      tmpObj["type"]=typeKey;
      tmpObj["defined"]=[];
      tmpObj["definedFlg"]={};
      tmpObj["reqGBMin"]=0;
      tmpObj["reqGBMax"]=0;
      tmpObj["reqRPSMin"]=0;
      tmpObj["reqRPSMax"]=0;
      tmpObj["resGBMin"]=0;
      tmpObj["resGBMax"]=0;
      tmpObj["reqMin"]=0;
      tmpObj["reqMax"]=0;
      tmpObj["reqMin"]=0;
      tmpObj["reqMax"]=0;
      tmpObj["provider"]="ServerlessFramework";
      tmpObj["visible"]=1;
      tmpObj["passThrough"]=1;
      tmpObj["networkWide"]=0;
      tmpObj["vpc"]="";
      tmpObj["zone"]="";
      tmpObj["subnet"]="";
      tmpObj["security"]="";
      tmpObj["referencedResources"]="";
      resources["ServerlessFramework"]=tmpObj;
      break;
  }
  return resources;
}
