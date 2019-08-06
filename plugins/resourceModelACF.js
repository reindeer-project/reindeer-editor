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
Vue.prototype.$resourceModelACF = (self,fileId,targetObject) => {
  var resources={};
  var master=self.$resourceMasterACF();
  Object.keys(targetObject["Resources"]).forEach(function(key){
    try{
      var typeKey=targetObject["Resources"][key]["Type"];
      var masterItem= master["types"][typeKey];
      var tmpObj={};
      tmpObj["key"]=fileId+"#/resources/"+key;
      tmpObj["avatar"]="pr-1 resourceIcon icon icon-" + (masterItem["avatar"] ? masterItem["avatar"] : master["default"]["avatar"]);
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
      tmpObj["provider"]=masterItem["provider"];
      tmpObj["visible"]=masterItem["visible"];
      tmpObj["passThrough"]=masterItem["passThrough"];
      tmpObj["networkWide"]=masterItem["networkWide"];
      //References
      var referencedResources=refSolver(fileId,master,targetObject,key);
      tmpObj["vpc"]=referencedResources["vpc"];
      tmpObj["zone"]=referencedResources["zone"];
      tmpObj["subnet"]=referencedResources["subnet"];
      tmpObj["security"]=referencedResources["security"];
      tmpObj["referencedResources"]=referencedResources["others"];
      resources[tmpObj['key']]=tmpObj;

    }catch(e){console.log(e)}
  });
  return resources;

  function refSolver(fileId,master,targetObject,key){
    var referencedResources={"vpc":[],"zone":[],"subnet":[],"security":[],"others":[]};
    //Flatten all parameters
    JSON.parse(JSON.stringify(targetObject["Resources"][key]),function(key,value){
      if(key=="Ref"){
        var refTgt={}
        Object.keys(targetObject).forEach(function(refPntKey){
          if(targetObject[refPntKey][value]){
            refTgt=targetObject[refPntKey][value];
          }
        });
        if(refTgt["Type"]){
          var groupHitflg=false;
          var masterItem=master["types"][refTgt["Type"]];
          if(!masterItem){
            var tmpType= refTgt["Type"].split('::');
            tmpType= tmpType.slice(0,tmpType.length-1).join('::');
            var masterItem=master["types"][tmpType];
          }
          if(masterItem){
            var dispValue=fileId +"/"+value;
            if(masterItem["vpc"]){
              groupHitflg=true;
              referencedResources["vpc"].push(dispValue);
            }
            if(masterItem["zone"]){
              groupHitflg=true;
              referencedResources["zone"].push(dispValue);
            }
            if(masterItem["subnet"]){
              groupHitflg=true;
              referencedResources["subnet"].push(dispValue);
            }
            if(masterItem["security"]){
              groupHitflg=true;
              referencedResources["security"].push(dispValue);
            }
            if(!groupHitflg){
              referencedResources["others"].push(dispValue);
            }
          }
        }
      }
    });
    return referencedResources;
  }
}
