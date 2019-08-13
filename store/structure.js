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
export const state = () => ({
    dataObject: {"actors":{},"actorMembers":0,"actorItems":0, "resources":{},"resourceItems":0, "contexts":{}, "contextItems":0}
})
  
export const getters = {
    dataObject (state){
        if(!state.dataObject["actors"]){
            state.dataObject["actors"]={}
        }
        if(!state.dataObject["actorItems"]){
          state.dataObject["actorItems"]=0
        }
        if(!state.dataObject["actorMembers"]){
          state.dataObject["actorMembers"]=0
        }
        if(!state.dataObject["resources"]){
            state.dataObject["resources"]={}
        }
        if(!state.dataObject["resourceItems"]){
          state.dataObject["resourceItems"]=0
        }
        if(!state.dataObject["definedResources"]){
          state.dataObject["definedResources"]={}
        }
        if(!state.dataObject["contexts"]){
            state.dataObject["contexts"]={}
        }
        if(!state.dataObject["contextItems"]){
            state.dataObject["contextItems"]=0
        }
        if(!state.dataObject["authors"]){
          state.dataObject["authors"]={}
        }
        if(!state.dataObject["authorMembers"]){
          state.dataObject["authorMembers"]=0
        }
        return state.dataObject;
    }
}

export const mutations = {
    setDataObject(state, self){
        var prefixID="";
        var locale = self.$i18n.locale;
        var structureObj=[];
        structureObj["actors"]={};
        structureObj["actorItems"]=0;
        structureObj["actorMembers"]=0;
        structureObj["resources"]={};
        structureObj["resourceItems"]=0;
        structureObj["contexts"]={};
        structureObj["contextItems"]=0;
        structureObj["authors"]={};
        structureObj["authorMembers"]=0;
  
        //-------------------------
        //1. All resources are classified.
        //-------------------------
        self.listRefs.forEach(eachFile => {
          try{
            switch(eachFile["lang"]){
              case "acf":
                prefixID=eachFile["id"];
                var tmpStructure=self.$resourceModelACF(self,prefixID,eachFile["dataObject"]);
                structureObj["resources"] = Object.assign(structureObj["resources"], tmpStructure);
                break;
              case "gdm":
                prefixID=eachFile["id"];
                var tmpStructure=self.$resourceModelGDM(self,prefixID,eachFile["dataObject"]);
                structureObj["resources"] = Object.assign(structureObj["resources"], tmpStructure);
                break;
                /*
              case "arm":
                prefixID=eachFile["id"];
                var tmpStructure=self.$resourceModelARM(self,prefixID,eachFile["dataObject"]);
                structureObj["resources"] = Object.assign(structureObj["resources"], tmpStructure);
                break;
              case "aro":
                prefixID=eachFile["id"];
                var tmpStructure=self.$resourceModelARO(self,prefixID,eachFile["dataObject"]);
                structureObj["resources"] = Object.assign(structureObj["resources"], tmpStructure);
                break;
              case "tfm":
                prefixID=eachFile["id"];
                var tmpStructure=self.$resourceModelTFM(self,prefixID,eachFile["dataObject"]);
                structureObj["resources"] = Object.assign(structureObj["resources"], tmpStructure);
                break;
                */
              default:
                break;
            }  
          }catch(e){console.log(e)}
        });
        structureObj["resourceItems"]=Object.keys(structureObj["resources"]).length;

        //-------------------------
        //2. Contexts and actors.
        //-------------------------
        var actorKeys={}

        self.listCDD.forEach(eachFile => {
            //2-1. All root actors are included.
            try{
              Object.keys(eachFile["dataObject"]["actors"]).forEach(function(key){
                if(eachFile["isRoot"]){
                  var uri="#/actors/"+key;
                }else{
                  var uri=eachFile["id"]+"#/actors/"+key;    
                }
                try{
                  var tmpModelCDD=self.$actorModelCDD(self,uri,eachFile["dataObject"]["actors"][key],locale,true);
                  if(tmpModelCDD["avatar"]!="unknown"){
                    tmpModelCDD["referencedState"]="root";
                    structureObj["actors"][tmpModelCDD.key]=tmpModelCDD;
                    if(tmpModelCDD["uri"]){
                      actorKeys[tmpModelCDD["uri"]]=uri;  //Connected to root
                    }
                    actorKeys[uri]=uri; //Root
                    //Summarized
                    structureObj["actorItems"]=structureObj["actorItems"]+1;
                    structureObj["actorMembers"]=structureObj["actorMembers"]+tmpModelCDD["numbers"];
                  }
                }catch(e){
                }
              })
            }catch(e){
            }
            //2-2. All component actors are included.
            try{
              Object.keys(eachFile["dataObject"]["components"]["actors"]).forEach(function(key){
                if(eachFile["isRoot"]){
                  var uri="#/components/actors/"+key;
                }else{
                  var uri=eachFile["id"]+"#/components/actors/"+key;    
                }
                try{
                  var tmpModelCDD=self.$actorModelCDD(self,uri,eachFile["dataObject"]["components"]["actors"][key],locale,false);
                  if(tmpModelCDD["avatar"]!="unknown"){
                    tmpModelCDD["referencedState"]="unusedComponent";
                    structureObj["actors"][tmpModelCDD.key]=tmpModelCDD;
                    if(!actorKeys[uri]){
                      actorKeys[uri]=uri;
                    }
                  }
                }catch(e){
                }
              })
            }catch(e){
            }
        });
        self.listRoots.forEach(eachFile => {
            //2-1. All contexts are listed and constructed
            try{
              if(eachFile["isRoot"]){
                Object.keys(eachFile["dataObject"]["contexts"]).forEach(function(key){
                  var uri="#/contexts/"+key;
                  try{
                    var tmpModelCDD=self.$contextModelCDD(self,uri,eachFile["dataObject"]["contexts"][key],locale);
                    if(tmpModelCDD["avatar"]!="unknown"){
                      structureObj["contexts"][tmpModelCDD.key]=tmpModelCDD;
                      structureObj["contextItems"]=structureObj["contextItems"]+1;
                    }
                  }catch(e){}
                })
              }
            }catch(e){
            }
            //2-2. All authors are listed and constructed
            try{
              if(eachFile["isRoot"]){
                Object.keys(eachFile["dataObject"]["info"]["authors"]).forEach(function(key){
                  var uri="#/info/authors/"+key;
                  try{
                    eachFile["dataObject"]["info"]["authors"][key].name=key;
                    var tmpModelCDD=self.$authorModelCDD(self,uri,eachFile["dataObject"]["info"]["authors"][key],locale,false);
                    if(tmpModelCDD["avatar"]!="unknown"){
                      structureObj["authors"][tmpModelCDD.key]=tmpModelCDD;
                      structureObj["authorMembers"]=structureObj["authorMembers"]+1;
                    }
                  }catch(e){}
                })              
              }
            }catch(e){
            }
        });
      
        state.dataObject = structureObj;
    }
}
  
export const actions = {
    async setDataObject(context, self){
        context.commit('setDataObject', self)
    }  
}