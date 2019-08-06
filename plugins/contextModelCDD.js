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
Vue.prototype.$contextModelCDD = (self,uri,targetElement,locale) => {
  class Group {
    constructor(obj) {
        this.uri = obj.uri;
        this.parent = null;
        this.children = [];
        this.draw=false;
        this.x=0;
        this.y=0;
        this.id="";
        this.obj=obj;
    }
    addChild(child) {
        this.children.push(child);
        child.parent = this;
    }
    addChildren(childrenArray) {
        for (let i = 0; i < childrenArray.length; i++) {
            this.addChild(childrenArray[i]);
        }
    }
    searchChildren(searchResult, uri) {
      if (this.uri === uri) searchResult.push(this);
      for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          child.searchChildren(searchResult, uri);
      }
    }
  }
  var element={}
  var tmpElement=refSolver(self,{"obj":targetElement,"uri":uri},1);
  element=tmpElement["obj"];
  var tmpObj={}

  
  var trigger=refSolver(self,{"obj":element["trigger"],"uri":uri+"/trigger"},1);
  tmpObj["key"]=uri;
  tmpObj["uri"]=tmpElement["uri"];
  tmpObj["title"]=element["title"][locale]?element["title"][locale].slice(0,30):self.$t.bind(self)("notDefinedByThisLanuguage");;
  tmpObj["description"]=element["description"][locale]?element["description"][locale].slice(0,300):self.$t.bind(self)("notDefinedByThisLanuguage");;
  tmpObj["type"]=trigger["obj"]["type"];
  tmpObj["externalTraffic"]={};
  tmpObj["externalTraffic"]["reqGBMin"]=0;
  tmpObj["externalTraffic"]["reqGBMax"]=0;
  tmpObj["externalTraffic"]["reqRPSMin"]=0;
  tmpObj["externalTraffic"]["reqRPSMax"]=0;
  tmpObj["externalTraffic"]["resGBMin"]=0;
  tmpObj["externalTraffic"]["resGBMax"]=0;
  tmpObj["storedDBMin"]=0;
  tmpObj["storedDBMax"]=0;
  tmpObj["infoTypes"]=[];
  tmpObj["infoTypeKeys"]={};
  switch(trigger["obj"]["type"]){
    case "webAccess":
      tmpObj["avatar"]="language";
      break;
    case "timedAction":
      tmpObj["avatar"]="timer";
      break;
    default:
      throw "unknown trigger type"; 
  }
  try{
    trigger["obj"]["infoTypeObj"]=refSolver(self,{"obj":element["trigger"]["infoType"],"uri":element["trigger"]["infoType"]["$ref"]},1);
    trigger["obj"]["storageInfoTypeObj"]=refSolver(self,{"obj":element["trigger"]["storedInfoType"],"uri":element["trigger"]["storedInfoType"]["$ref"]},1);
  }catch(e){
    //do nothing
  }
  //TrafficTreeMapping
  var arrayTmp=[];
  arrayTmp.push({"groupInstance":new Group(trigger),"parentURI":"rootTrigger"})
  Object.keys(element["traffics"]).forEach(eachTraffic => {
    var traffic=refSolver(self,{"obj":element["traffics"][eachTraffic],"uri":uri+"/traffics/"+eachTraffic},1);
    try{
      traffic["obj"]["infoTypeObj"]=refSolver(self,{"obj":element["traffics"][eachTraffic]["infoType"],"uri":element["traffics"][eachTraffic]["infoType"]["$ref"]},1);
      traffic["obj"]["storageInfoTypeObj"]=refSolver(self,{"obj":element["traffics"][eachTraffic]["storedInfoType"],"uri":element["traffics"][eachTraffic]["storedInfoType"]["$ref"]},1);
    }catch(e){
      //do nothing
    }
    arrayTmp.push({"groupInstance":new Group(traffic),"parentURI":traffic["obj"]["source"]["$ref"]})
  });
  const ROOT = new Group({'uri':'ROOT'});
  const searchInstanceByParentUri = function(uri) {
    const returnArray = [];
    for (let i = 0; i < arrayTmp.length; i++) {
      const instance = arrayTmp[i].groupInstance;
      const parentURI = arrayTmp[i].parentURI;
      if (parentURI === uri) {
          returnArray.push(instance);
      }
    }
    return returnArray;
  }
  for (let i = 0; i < arrayTmp.length; i++) {
    const eachGroup = arrayTmp[i].groupInstance;
    const childrenGroups = searchInstanceByParentUri(eachGroup.uri);
    eachGroup.addChildren(childrenGroups);
    if (arrayTmp[i].parentURI === "rootTrigger") {
        ROOT.addChild(eachGroup);
    }
  }
  tmpObj["objectMap"]=ROOT;
  return tmpObj;

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
