<i18n src="@/assets/i18n/en.json"></i18n>
<i18n src="@/assets/i18n/ja.json"></i18n>
<i18n src="@/assets/i18n/others.json"></i18n>

<template>
  <v-layout row wrap>
    <v-flex :class="reportContainerClass" id="reportContainer">

    <v-tabs v-model="editorTab" centered color="#9FA8DA" dark icons-and-text style="height:100%">
      <v-tabs-slider color="#304FFE"></v-tabs-slider>

      <v-tab href="#tabFiles" @click="prepareEditorLayout()">
        <div class="tabMenuFont" v-t="'files'"></div>
        <v-icon>folder</v-icon>
      </v-tab>

      <v-tab href="#tabReport" @click="prepareEditorLayout()">
        <div class="tabMenuFont" v-t="'report'"></div>
        <v-icon>layers</v-icon>
      </v-tab>

      <v-tab-item value="tabFiles">
        <v-card flat :height="this.reportContainerHeight" style="overflow: auto">
        <v-subheader><span class="currentPjTitle">{{currentPjTitle}}:</span><span class="pl-1" v-t="'root'" /><v-spacer></v-spacer>
        </v-subheader>
         <v-list two-line subheader dense>
          <div v-for="item in this.listRoots" :key="item.id" 
            :class="item.id === currentCodeID ? 'activeCodeItem' : ''">
                <v-list-tile avatar ripple @click="selectCodeItem(item.id)"
                 :class="item.id === currentCodeID ? 'activeCodeItem' : ''">
                  <v-list-tile-avatar>
                    <v-icon>{{ convertCodeTypeForDisplay(item.fmt,item.lang)["avatar"] }}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ rootDocumentFileName }}</v-list-tile-title>
                    <v-list-tile-sub-title>Root document | {{ convertCodeTypeForDisplay(item.fmt,item.lang)["title"] }} | {{ item.fmt }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
          </div>

            <v-divider></v-divider>
            <v-subheader v-t="'referenced'"><v-spacer></v-spacer>
              <span class="pr-2">{{ this.listRefs.length }} {{$t("files")}}</span>
            </v-subheader>
            <v-list-tile avatar v-if="this.listRefs.length < 1">
            <v-list-tile-avatar>
              <v-icon>error_outline</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-t="'captionNoReference'"></v-list-tile-title>
              <v-list-tile-sub-title><span class="tinymemo" v-t="'captionReferenceList'"></span></v-list-tile-sub-title>
            </v-list-tile-content>
            </v-list-tile>

          <div v-for="item in this.listRefs" :key="item.id" 
            :class="item.id === currentCodeID ? 'activeCodeItem' : ''">
                <v-list-tile avatar ripple @click="selectCodeItem(item.id)"
                 :class="item.id === currentCodeID ? 'activeCodeItem' : ''">
                  <v-list-tile-avatar>
                    <v-icon>{{ convertCodeTypeForDisplay(item.fmt,item.lang)["avatar"] }}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.id }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ convertCodeTypeForDisplay(item.fmt,item.lang)["title"] }} | {{ item.fmt }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
          </div>

          <v-divider></v-divider>
          <v-subheader v-t="'unused'"><v-spacer></v-spacer>
            <span class="pr-2">{{ this.listUnused.length }} <span v-t="'files'" /></span>
          </v-subheader>
          <v-list-tile avatar v-if="this.listUnused.length < 1">
          <v-list-tile-avatar>
            <v-icon>error_outline</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-t="'captionNoUnused'"></v-list-tile-title>
            <v-list-tile-sub-title><span class="tinymemo" v-t="'captionNoUnusedList'"></span></v-list-tile-sub-title>
          </v-list-tile-content>
          </v-list-tile>

          <div v-for="item in this.listUnused" :key="item.id" 
            :class="item.id === currentCodeID ? 'activeCodeItem' : ''">
                <v-list-tile avatar ripple @click="selectCodeItem(item.id)"
                 :class="item.id === currentCodeID ? 'activeCodeItem' : ''">
                  <v-list-tile-avatar>
                    <v-icon>{{ convertCodeTypeForDisplay(item.fmt,item.lang)["avatar"] }}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.id }}</v-list-tile-title>
                    <v-list-tile-sub-title>Root document | {{ convertCodeTypeForDisplay(item.fmt,item.lang)["title"] }} | {{ item.fmt }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-tooltip v-if="currentCodeID!=item.id" left>
                        <template v-slot:activator="{ on }">
                          <v-btn icon ripple @click="removeUnusedItem(item.id)">
                              <v-icon v-on="on" color="primary">clear</v-icon>
                          </v-btn>
                        </template>
                        <span v-t="'captionDeleteUnused'"></span>
                    </v-tooltip>
                    <v-icon v-if="currentCodeID==item.id" color="grey lighten-1">remove</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                </div>
            <v-divider></v-divider>
          </v-list>
        </v-card>
      </v-tab-item>

      <v-tab-item value="tabReport" style="overflow-y: scroll; height:100%" ref="reportContainer">
        <v-card flat :height="this.reportContainerHeight">
          <reportMain ref="report"/>     
        </v-card>
      </v-tab-item>

    </v-tabs>
    </v-flex>

    <v-flex :class="editorContainerClass" id="editorContainer">
        <v-toolbar flat height="72px" class="pr-0">

          <span class="grey--text text-no-wrap text-xs-left text-truncate">
            <v-container fill-height class="pl-0">
              <v-layout align-left class="text-truncate">
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                      <v-icon v-on="on" color="grey">{{codeTypeItem["icon"]}}</v-icon>
                  </template>
                  <span v-t="codeTypeItem['tips']"></span>
                </v-tooltip>
                <span class="pl-2 grey--text text-truncate body-2">
                  {{ this.currentCodeIDForDisplay }}<br>
                  <span class="editorHeaderCaption caption">{{this.codeTypeItem["title"]}}&nbsp;&nbsp;|&nbsp;&nbsp;{{this.currentCodeFmt}}&nbsp;&nbsp;</span>
                </span>
              </v-layout>
            </v-container>
          </span>
          <v-spacer></v-spacer>
          <div v-if="this.isIE">
              <span class="ieAttention" v-t="'ieSupport'" />
          </div>

          <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn class="pr-2" dark v-on="on" color="#C51162" @click="share()">
                  <span class="pl-1 pr-3 shareBtn"><span v-t="'shareit'" /></span>
                </v-btn>
              </template>
              <span v-t="'captionShare'"></span>
          </v-tooltip>

        </v-toolbar>

        <v-flex app id="editorContainerSub" v-resize="onResize">
            <MonacoEditor ref="editor" class="editor mt-3 mb-3" theme="vs-dark" :language="currentCodeFmt" v-model="tmpCode" v-on:change="updateCode(false)">
            </MonacoEditor>
        </v-flex>

    </v-flex>

    <v-snackbar v-model="snackbar" top color="#C51162" :timeout="snakbartimeout">
        <span class="text-xs-center">{{ this.snackbarState }} </span>
    </v-snackbar>

    <template>
      <div class="text-xs-center">
        <v-dialog v-model="dialogShare" persistent max-width="500">
          <v-card>
            <v-card-title class="lighten-2 dialogHeader" primary-title>
              <span v-t="'shareDesign'" />
            </v-card-title>
            <span v-if="!this.shared" >
              <div class="dialogBodyLoading">
                <v-card-text class="pl-3 pr-3">
                  <span v-t="'preparing'" />
                  <v-progress-linear indeterminate color="white" class="mb-3"></v-progress-linear>
                </v-card-text>
              </div>
            </span>
            <span v-if="this.shared" >
              <div>
                <v-card-text class="pl-3 pr-3 dialogBodyShare">
                  <div v-t="'sharingExplanation'" /><br>
                    <div ref="copyTarget" class="shareURL">{{this.sharedID}}</div>
                    <v-btn class="shareURL" color="#9FA8DA" small outline @click="copyURLToClipboard()"><v-icon class="shareURL">filter_none</v-icon><span class="pl-2" v-t="'copyURLToClipboard'" /></v-btn>
                    <div v-if="this.urlCopied"><span v-t="'urlCopied'" class="copied" /></div>
                </v-card-text>
              </div>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer> 
                <v-btn color="#9FA8DA" dark small @click="closeShareDialog()"><span v-t="'close'" /></v-btn>
              </v-card-actions>
            </span>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <template>
      <div class="text-xs-center">
        <v-dialog v-model="dialogLoad" persistent max-width="500">
          <v-card>
            <v-card-title class="lighten-2 dialogHeader" primary-title>
              <span v-t="'loadDesign'" />
            </v-card-title>
            <span v-if="!this.loaded" >
              <div class="dialogBodyLoading">
                <v-card-text class="pl-3 pr-3">
                  <span v-t="'preparing'" />
                  <v-progress-linear indeterminate color="white" class="mb-3"></v-progress-linear>
                </v-card-text>
              </div>
            </span>
            <span v-if="this.loaded" >
              <div>
                <v-card-text class="pl-3 pr-3 dialogBodyShare">
                  <div v-t="'loadingExplanation'" />
                  <div v-t="'loadingAttention'" class="loadingAttention" />
                  <br>
                  <span class="shareURL">{{this.sharedURL}}</span>
                </v-card-text>
              </div>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#9FA8DA" small flat @click="cancelLoading()"><span v-t="'cancelLoading'" /></v-btn>
                <v-btn color="#C51162" dark small @click="load()"><span v-t="'actionLoading'" /></v-btn>
              </v-card-actions>
            </span>
          </v-card>
        </v-dialog>
      </div>
    </template>

  </v-layout>
</template>


<script>
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
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import MonacoEditor from 'vue-monaco'
import { mapGetters } from 'vuex'
import reportMain from '~/components/reportMain.vue'
import Vue from 'vue'
import _ from 'lodash';
import axios from 'axios';
const yaml = require('js-yaml')
const yamlValidator = require('is-my-json-valid')
const THREE = require('three')
const THREE3DCSS = require('three-css3drenderer')
const THREEORBIT = require('three-orbitcontrols')
const TWEEN = require('tween')

export default {
  components: {
    MonacoEditor,
    reportMain
  },
  asyncData(context) {
    return {
      loadingID: context.query['id']
    }
  },
  data() {
    return{
        shared: false,
        loaded: false,
        urlCopied: false,
        sharedID: "",
        loadingID: "",
        loadedResponse: {},
        dialogShare: false,
        dialogLoad: false,
        reportContainerHeight: 0,
        editorContainerSize: { width: 0, height: 0 },
        currentCodeTypeTitle: "",
        snackbar: false,
        snackbarState: "",
        snakbartimeout: 3000,
        currentTmpCode: "",
        initialState: true,
        contextRenderers:[],
        isIE:false
    }
  },

  mounted () {
    var self=this;
    var userAgent = window.navigator.userAgent.toLowerCase();
    if ( userAgent.indexOf( 'msie' ) !== -1 || userAgent.indexOf( 'trident' ) !== -1 ) {
        self.$refs["report"].$refs["reportMainContexts"].isIE=true;
        this.isIE=true;
    }else{
        self.$refs["report"].$refs["reportMainContexts"].isIE=false;
        this.isIE=false;
    }
    if(this.loadingID){
      if(this.loadingID!=""){
        this.loaded=false;
        this.dialogLoad=true;
        axios.post('https://cdr.reindeer.tech/v1/editor/load', '{"id":"'+this.loadingID+'"}').then(response => {
          try{
            this.loadedResponse=response["data"];
            this.loaded=true;
            this.sharedURL=window.location.href
          }catch(e){
            self.snackbarState=self.$t.bind(self)("errorLoading");
            self.snackbar = true;
            this.cancelLoading();       
          }
        }).catch(error => {
            self.snackbarState=self.$t.bind(self)("errorLoading");
            self.snackbar = true;
            this.cancelLoading();       
        });
      }
    }
    this.prepareEditorLayout();
    this.onResize();
    this.addMonacoAction();
    this.updateReferenceFileList(false);
    this.setEditorSchemaInitially();
  },

  computed: {
    ...mapGetters({
      listRoots: 'codes/listRoots',
      listRefs: 'codes/listRefs',
      listAll: 'codes/listAll',
      listCDD: 'codes/listCDD',
      listUnused: 'codes/listUnused',
      listItem: 'codes/listItem',
      typeItem: 'codes/typeItem',
      typeMasterLangs: 'codes/typeMasterLangs',
      typeMasterFmts: 'codes/typeMasterFmts',
      rootDocumentID: 'editor/rootDocumentID'
    }),
    currentPjTitle:{
      get(){
        try{
          return this.listRoots[0]["dataObject"]["info"]["title"][this.$i18n.locale].slice(0,30);
        }catch{
          return "Unknown";
        }
      }
    },
    reportContainerClass: {
      get(){
        switch(this.editorTab){
            case "tabFiles":
              return "xs12 sm12 md5 lg4 xl3";
              break;
            case "tabReport":
              return "xs12 sm12 md6 lg6 xl6";
              break;
            default:
              return "xs12 sm12 md6 lg6 xl6";
              break;
        }
      }
    },
    editorContainerClass: {
      get(){
        switch(this.editorTab){
            case "tabFiles":
              return "xs12 sm12 md7 lg8 xl9";
              break;
            case "tabReport":
              return "xs12 sm12 md6 lg6 xl6";
              break;
            default:
              return "xs12 sm12 md6 lg6 xl6";
              break;
        }
      }
    },

    errorFiles: {
      get(){
        var errnum=0;
        this.listAll.forEach(eachItem => {
          if(eachItem["isValid"]==false){
            errnum++
          }
        })
        return errnum
      }      
    },

    errorLines: {
      get(){
        try{
          return this.listItem(this.currentCodeID)[0]["codeErrors"].length;
        }catch(e){
          return 0;
        }
      }
    },

    codeTypeItem: {
      get(){
        return this.typeItem({"fmt":this.currentCodeFmt,"lang":this.currentCodeLang})[0]
      }
    },
    editorTab:{
      get() {
        return this.$store.getters['editor/editorTab']
      },
      set(val){
        this.$store.dispatch('editor/setEditorTab',val)
      }
    },
    currentCodeID:{
      get() {
        return this.$store.getters['editor/currentCodeID']
      },
      set(val){
        this.$store.dispatch('editor/setCurrentCodeID',val)
        this.setEditorSchema();
      }
    },
    currentCodeIDForDisplay:{
      get() {
        if(this.$store.getters['editor/currentCodeID']==this.$store.getters['editor/rootDocumentID']){
          return this.$store.getters['editor/rootDocumentFileName']
        }else{
          return this.$store.getters['editor/currentCodeID']        
        }
      }
    },
    rootDocumentFileName:{
      get() {
        return this.$store.getters['editor/rootDocumentFileName']
      },
      set(val){
        this.$store.dispatch('editor/setRootDocumentFileName',val)
      }
    },
    currentCodeModel:{
      get() {
        return this.$store.getters['editor/currentCodeModel']
      },
      set(val){
        this.$store.dispatch('editor/setCurrentCodeModel',val)
      }
    },
    currentCodevalid:{
      get() {
        return this.listItem(this.currentCodeID)[0]["isValid"]
      },
      set(val){
        var setObj=this.listItem(this.currentCodeID)[0];
        this.$store.dispatch('codes/update', 
          {
              "id": this.currentCodeID,
              "isRoot": setObj["isRoot"],
              "fmt": setObj["fmt"], 
              "lang": setObj["lang"],
              "data": setObj["data"],
              "isUsed": setObj["isUsed"],
              "isValid": val,
              "dataObject": setObj["dataObject"],
              "codeErrors": setObj["codeErrors"]
          }
        );
      }
    },

    currentCodeFmt:{
      get() {
        return this.listItem(this.currentCodeID)[0]["fmt"]
      },
      set(val){
        var setObj=this.listItem(this.currentCodeID)[0];
        this.$store.dispatch('codes/update', 
          {
              "id": this.currentCodeID,
              "isRoot": setObj["isRoot"],
              "fmt": val, 
              "lang": setObj["lang"],
              "data": setObj["data"],
              "isUsed": setObj["isUsed"],
              "isValid": setObj["isValid"],
              "dataObject": setObj["dataObject"],
              "codeErrors": setObj["codeErrors"]
          }
        );
        this.setEditorSchema();
      }
    },

    currentCodeLang:{
      get() {
        return this.listItem(this.currentCodeID)[0]["lang"]
      },
      set(val){
        var setObj=this.listItem(this.currentCodeID)[0];
        this.$store.dispatch('codes/update', 
          {
              "id": this.currentCodeID,
              "isRoot": setObj["isRoot"],
              "fmt": setObj["fmt"], 
              "lang": val,
              "data": setObj["data"],
              "isUsed": setObj["isUsed"],
              "isValid": setObj["isValid"],
              "dataObject": setObj["dataObject"],
              "codeErrors": setObj["codeErrors"]
          }
        );
        this.setEditorSchema();
      }
    },
    tmpCode: {
      get(){
        if(this.initialState){
          return this.listItem(this.currentCodeID)[0]["data"];
        }else{
          return this.currentTmpCode;  
        }
      },
      set(val){
        this.currentTmpCode=val;
        var self=this;
        this.debouncedCodeSetter(self,val);
      }
    },
    code: {
      get() {
        return this.listItem(this.currentCodeID)[0]["data"];
      },
      set(val){
        this.initialState=false;
        var setObj=this.listItem(this.currentCodeID)[0];
        this.$store.dispatch('codes/update', 
          {
              "id": this.currentCodeID,
              "isRoot": setObj["isRoot"],
              "fmt": setObj["fmt"], 
              "lang": setObj["lang"],
              "data": val,
              "isUsed": setObj["isUsed"],
              "isValid": setObj["isValid"],
              "dataObject": setObj["dataObject"],
              "codeErrors": setObj["codeErrors"]
          }
        );
      }
    },
    structure: {
      get(){
        return this.$store.getters['structure/dataObject'];
      },
      set(self){
        this.debouncedStructureSetter(self);
        this.debouncedDiagramGenerator(self);
      }
    },
  },

  methods: {
    drawNode(self,drawObj,child){
        var itemX=150;
        var itemHeight=20;
        var itemY=150;
        var itemMarginX=100; //Including margin
        var itemMarginY=itemMarginX;
        var itemLocX=child.x*(itemX+itemMarginX);
        var itemLocY=child.y*(itemY+itemMarginY);
        var opacity=1;
        var eachZ=0;
        var option={};
        var locale = self.$i18n.locale;
        var tgtPorts=["PORTS"];
        var tgtDescription="";
        var tgtInfoLevel="";
        var tgtSecurityType="normalPublic";
        var tgtDBMax=0;
        var tgtDBMin=0;
        var tgtStorageDescription="";
        var tgtStorageInfoLevel="";
        var tgtStorageInfoLevelFlg=false;
        try{
          var tgtKey=child.uri.split( '/' ).slice(-1)[0];
          var infoTypeKey="";
          if(child.obj.obj.infoTypeObj.obj){
            tgtInfoLevel=child.obj.obj.infoTypeObj.obj.title[locale]?child.obj.obj.infoTypeObj.obj.title[locale]:self.$t.bind(self)("notDefinedByThisLanuguage");
            infoTypeKey=child.obj.obj.infoTypeObj.uri;
          }else{
            tgtInfoLevel="";
            infoTypeKey="";
          }
          if(infoTypeKey!="" && !self.structure.contexts[child.context]["infoTypeKeys"][infoTypeKey]){
            self.structure.contexts[child.context]["infoTypeKeys"][infoTypeKey]=true;
            var privacyStr="privacy:NO";
            var confidentialStr="confidential:NO";
            if(child.obj.obj.infoTypeObj.obj){
              if(child.obj.obj.infoTypeObj.obj["privacy"]){
                privacyStr="privacy:YES";
              }
              if(child.obj.obj.infoTypeObj.obj["confidential"]){
                confidentialStr="confidential:YES";
              }
              var tmpTitle=child.obj.obj.infoTypeObj.obj["title"][locale]?child.obj.obj.infoTypeObj.obj["title"][locale]:self.$t.bind(self)("notDefinedByThisLanuguage");
              var tmpDesc=child.obj.obj.infoTypeObj.obj["description"][locale]?child.obj.obj.infoTypeObj.obj["description"][locale]:self.$t.bind(self)("notDefinedByThisLanuguage");
              var infoTypeStr="- "+tmpTitle+"("+privacyStr+","+confidentialStr+"): "+tmpDesc
              self.structure.contexts[child.context]["infoTypes"].push(infoTypeStr);         
            }
          }
          //SecurityType
          if(child.obj.obj.infoTypeObj.obj){
            if(child.obj.obj.restriction){
              if(child.obj.obj.infoTypeObj.obj.privacy || child.obj.obj.infoTypeObj.obj.confidential ){
                tgtSecurityType="importantSafe";
              }else{
                tgtSecurityType="normalSafe";
              }
            }else{
              if(child.obj.obj.infoTypeObj.obj.privacy || child.obj.obj.infoTypeObj.obj.confidential ){
                tgtSecurityType="importantPublic";
              }else{
                tgtSecurityType="normalPublic";
              }
            }
          }
          tgtDescription=child.obj.obj.description[locale]?child.obj.obj.description[locale]:self.$t.bind(self)("notDefinedByThisLanuguage");
          tgtPorts=tgtPorts.concat(child.obj.obj.ports);
          var tmptgtDBMin=child.obj.obj.storedRatio.min*child.reqGBMin;
          var tmptgtDBMax=child.obj.obj.storedRatio.max*child.reqGBMax;
          tgtDBMin=Math.round(tmptgtDBMin*10)/10;
          tgtDBMax=Math.round(tmptgtDBMax*10)/10;
          if(tmptgtDBMin>0 && tgtDBMin==0){
            tgtDBMin=0.1;
          }
          if(tmptgtDBMax>0 && tgtDBMax==0){
            tgtDBMax=0.1;
          }
          if(child.obj.obj.storageDescription){
            var storageInfoTypeKey="";
            tgtStorageDescription=child.obj.obj.storageDescription[locale]?child.obj.obj.storageDescription[locale]:self.$t.bind(self)("notDefinedByThisLanuguage");
            tgtStorageInfoLevel=child.obj.obj.storageInfoTypeObj.obj.title[locale]?child.obj.obj.storageInfoTypeObj.obj.title[locale]:self.$t.bind(self)("notDefinedByThisLanuguage");
            if(child.obj.obj.storageInfoTypeObj.obj.privacy){
              tgtStorageInfoLevelFlg=true;
              storageInfoTypeKey=child.obj.obj.storageInfoTypeObj.uri;
            }
            if(storageInfoTypeKey!="" && !self.structure.contexts[child.context]["infoTypeKeys"][storageInfoTypeKey]){
              self.structure.contexts[child.context]["infoTypeKeys"][storageInfoTypeKey]=true;
              if(child.obj.obj.storageInfoTypeObj.obj){
                var privacyStr="privacy:NO";
                var confidentialStr="confidential:NO";
                if(child.obj.obj.storageInfoTypeObj.obj["privacy"]){
                  privacyStr="privacy:YES";
                }
                if(child.obj.obj.storageInfoTypeObj.obj["confidential"]){
                  confidentialStr="confidential:YES";
                }
                var infoTypeStr="- "+child.obj.obj.storageInfoTypeObj.obj["title"][locale]?child.obj.obj.storageInfoTypeObj.obj["title"][locale]:self.$t.bind(self)("notDefinedByThisLanuguage")
                +"("+privacyStr+","+confidentialStr+"): "
                +child.obj.obj.storageInfoTypeObj.obj["description"][locale]?child.obj.obj.storageInfoTypeObj.obj["description"][locale]:self.$t.bind(self)("notDefinedByThisLanuguage");
                self.structure.contexts[child.context]["infoTypes"].push(infoTypeStr);  
              }
            }
          }
        }catch(e){
          //Do nothing
        }
        if(child.obj.obj.end){
          //Traffic
          var tgtAvatars=[];
          var distinctEnds = child.obj.obj.end.filter(function(v1,i1,a1){ 
            return (a1.findIndex(function(v2){ 
              return (v1["$ref"]===v2["$ref"]) 
            }) === i1);
          });
          var maxnumObj=distinctEnds.length;
          var boxColorLeft="#78909C";
          var boxColorRight="#90A4AE";
          var boxColorTop="#B0BEC5";
          var boxColorSurface="#CFD8DC";
          distinctEnds.forEach(eachEnd => {
            //Left>Right>Top
            var endpointTitle="";
            try{
              endpointTitle=child.obj.obj.endpointTitle[locale]?child.obj.obj.endpointTitle[locale]:self.$t.bind(self)("notDefinedByThisLanuguage");
            }catch(e){}
            opacity=0.75;
            if(self.structure.actors[eachEnd["$ref"]]){
              var tgtTitle=self.structure.actors[eachEnd["$ref"]]["title"];
              var tgtType=self.structure.actors[eachEnd["$ref"]]["type"];
              tgtAvatars.push({"type":"actor","class":self.structure.actors[eachEnd["$ref"]]["avatar"]});
            }else if(self.structure.resources[eachEnd["$ref"]]){
              var tgtTitle=self.structure.resources[eachEnd["$ref"]]["title"];
              var tgtType=self.structure.resources[eachEnd["$ref"]]["type"];
              tgtAvatars.push({"type":"resource","class":self.structure.resources[eachEnd["$ref"]]["avatar"]});
            }
            option={"avatar":"", "title":tgtTitle,"titleColor":"white"}
            createPlane(itemY, itemHeight,boxColorLeft,opacity, new THREE.Vector3( itemLocX - itemX/2, (itemHeight+5)*eachZ, itemLocY+(itemX-itemY)/2 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ), option);
            option={"avatar":"", "title":tgtType,"titleColor":"white"}
            createPlane(itemX, itemHeight,boxColorRight,opacity,new THREE.Vector3( itemLocX, (itemHeight+5)*eachZ, itemLocY+itemX/2 ),new THREE.Euler( 0, 0, 0 ), option);
            if(eachZ+1==maxnumObj){
              //TopPanel
              option={"id":child.id,"avatars":tgtAvatars,"avatarColor":boxColorLeft,"title":endpointTitle,"titleColor":"black"}
              createSignB(itemX, itemY,boxColorSurface,opacity,new THREE.Vector3( itemLocX, (itemHeight+5)*eachZ+itemHeight/2, itemLocY+(itemX-itemY)/2 ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);
              //DB info
              var dbPanelColor=boxColorLeft;
              var dbTextColor="white";
              if(tgtStorageInfoLevelFlg){
                dbPanelColor="#E57373";
                dbTextColor="white";
              }
              if(tgtStorageDescription!=""){
                option={"avatar":"", "titles":["DB: " + tgtDBMin +"~"+tgtDBMax +"GB/M",tgtStorageInfoLevel,tgtStorageDescription],"titleColor":dbTextColor}
                createDBPanel(200, itemHeight*4,dbPanelColor,opacity, new THREE.Vector3( itemLocX + itemX/2, (itemHeight+5)*(eachZ+3), itemLocY+(itemX-itemY)/2), new THREE.Vector3( itemLocX + itemX/2, (itemHeight+5)*(eachZ+1), itemLocY+(itemX-itemY)/2), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ), option);
              }
            }else{
              //TopPanel
              option={"id":"", "avatars":[],"title":"","titleColor":"black"}
              createSignB(itemX, itemY,boxColorTop,opacity,new THREE.Vector3( itemLocX, (itemHeight+5)*eachZ+itemHeight/2, itemLocY+(itemX-itemY)/2 ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);           
            }
            eachZ=eachZ+1;
            //Trigger definition
            if(child.obj.obj.start){
              if(child.obj.obj.start["$ref"]){
                if(self.structure.actors[child.obj.obj.start["$ref"]]){
                  if(!self.structure.actors[child.obj.obj.start["$ref"]]["definedFlg"][child.uri]){
                    self.structure.actors[child.obj.obj.start["$ref"]]["defined"].push({"key":child.uri,"context":child.context,"id":"1"});
                    self.structure.actors[child.obj.obj.start["$ref"]]["definedFlg"][child.uri]=true;
                  }
                }else{
                  /*
                  if(self.structure.resources[child.obj.obj.start["$ref"]]){
                    if(!self.structure.resources[child.obj.obj.start["$ref"]]["definedFlg"][child.uri]){
                      self.structure.resources[child.obj.obj.start["$ref"]]["defined"].push({"key":child.uri,"context":child.context,"id":"1"});
                      self.structure.resources[child.obj.obj.start["$ref"]]["definedFlg"][child.uri]=true;
                    }
                  }
                  */
                }
              }
            }
            //Traffic summary per resources (To end resources)
            if(self.structure.resources[eachEnd["$ref"]]){
              if(!self.structure.resources[eachEnd["$ref"]]["definedFlg"][child.uri]){
                self.structure.resources[eachEnd["$ref"]]["reqGBMin"]=Math.round((self.structure.resources[eachEnd["$ref"]]["reqGBMin"]+child.reqGBMin)*10)/10;
                self.structure.resources[eachEnd["$ref"]]["reqGBMax"]=Math.round((self.structure.resources[eachEnd["$ref"]]["reqGBMax"]+child.reqGBMax)*10)/10;
                self.structure.resources[eachEnd["$ref"]]["reqRPSMin"]=Math.round((self.structure.resources[eachEnd["$ref"]]["reqRPSMin"]+child.reqRPSMin)*10)/10;
                self.structure.resources[eachEnd["$ref"]]["reqRPSMax"]=Math.round((self.structure.resources[eachEnd["$ref"]]["reqRPSMax"]+child.reqRPSMax)*10)/10;
                self.structure.resources[eachEnd["$ref"]]["resGBMin"]=Math.round((self.structure.resources[eachEnd["$ref"]]["resGBMin"]+child.resGBMin)*10)/10;
                self.structure.resources[eachEnd["$ref"]]["resGBMax"]=Math.round((self.structure.resources[eachEnd["$ref"]]["resGBMax"]+child.resGBMax)*10)/10;
                self.structure.resources[eachEnd["$ref"]]["defined"].push({"key":child.uri,"context":child.context,"id":child.id});
                self.structure.resources[eachEnd["$ref"]]["definedFlg"][child.uri]=true;
                self.structure.definedResources[eachEnd["$ref"]]=true;
              }
            }
            //Traffic summary per resources (To end actors)
            if(self.structure.actors[eachEnd["$ref"]] && !self.structure.actors[eachEnd["$ref"]]["definedFlg"][child.uri]){
              self.structure.actors[eachEnd["$ref"]]["defined"].push({"key":child.uri,"context":child.context,"id":child.id});
              self.structure.actors[eachEnd["$ref"]]["definedFlg"][child.uri]=true;
            }
            //Traffic summary per resources (From trigger 'actor' endpoints)
            if(child.obj.obj.start){
                if(self.structure.actors[eachEnd["$ref"]] && self.structure.resources[child.obj.obj.start["$ref"]]){
                  if(!self.structure.resources[child.obj.obj.start["$ref"]]["definedFlg"][child.uri+"(External)"]){
                  //CAUTION: I/O is reversed for traffic to actor (req + res is not the mistake)
                  self.structure.resources[child.obj.obj.start["$ref"]]["reqGBMin"]=Math.round((self.structure.resources[child.obj.obj.start["$ref"]]["reqGBMin"]+child.resGBMin)*10)/10; //OUT is source's IN
                  self.structure.resources[child.obj.obj.start["$ref"]]["reqGBMax"]=Math.round((self.structure.resources[child.obj.obj.start["$ref"]]["reqGBMax"]+child.resGBMax)*10)/10; //OUT is source's IN
                  self.structure.resources[child.obj.obj.start["$ref"]]["resGBMin"]=Math.round((self.structure.resources[child.obj.obj.start["$ref"]]["resGBMin"]+child.reqGBMin)*10)/10; //IN is source's OUT
                  self.structure.resources[child.obj.obj.start["$ref"]]["resGBMax"]=Math.round((self.structure.resources[child.obj.obj.start["$ref"]]["resGBMax"]+child.reqGBMax)*10)/10; //IN is source's OUT
                  self.structure.resources[child.obj.obj.start["$ref"]]["defined"].push({"key":child.uri+"(External)","context":child.context,"id":"Source of "+child.id});
                  self.structure.resources[child.obj.obj.start["$ref"]]["definedFlg"][child.uri+"(External)"]=true;
                  self.structure.definedResources[child.obj.obj.start["$ref"]]=true;
                  }
                }
            }else{
                //Traffic summary per resources (From any traffic endpoints)
                if(child.parent){
                  if(child.parent.obj.obj["end"]){
                    child.parent.obj.obj["end"].forEach(eachParentsEnd => {
                      if(self.structure.resources[eachParentsEnd["$ref"]]){
                        if(!self.structure.resources[eachParentsEnd["$ref"]]["definedFlg"][child.uri+"(External)"]){
                          //CAUTION: I/O is reversed for traffic to response (req + res is not the mistake)
                          self.structure.resources[eachParentsEnd["$ref"]]["reqGBMin"]=Math.round((self.structure.resources[eachParentsEnd["$ref"]]["reqGBMin"]+child.resGBMin)*10)/10; //OUT is source's IN
                          self.structure.resources[eachParentsEnd["$ref"]]["reqGBMax"]=Math.round((self.structure.resources[eachParentsEnd["$ref"]]["reqGBMax"]+child.resGBMax)*10)/10; //OUT is source's IN
                          self.structure.resources[eachParentsEnd["$ref"]]["resGBMin"]=Math.round((self.structure.resources[eachParentsEnd["$ref"]]["resGBMin"]+child.reqGBMin)*10)/10; //IN is source's OUT
                          self.structure.resources[eachParentsEnd["$ref"]]["resGBMax"]=Math.round((self.structure.resources[eachParentsEnd["$ref"]]["resGBMax"]+child.reqGBMax)*10)/10; //IN is source's OUT
                          //self.structure.resources[eachParentsEnd["$ref"]]["defined"].push({"key":child.uri+"(External)","context":child.context,"id":"Source of "+child.id});
                          self.structure.resources[eachParentsEnd["$ref"]]["definedFlg"][child.uri+"(External)"]=true;
                          self.structure.definedResources[eachParentsEnd["$ref"]]=true;
                        }
                      }
                    });
                  }
                }
            }
            //Append external traffic summary (From actor to resource traffic only)
            //CAUTION: I/O is reversed for traffic to response (req + res is not the mistake)
            if(self.structure.actors[eachEnd["$ref"]] && self.structure.contexts[drawObj.id]){
              self.structure.contexts[drawObj.id]["externalTraffic"]["reqGBMin"]=Math.round((self.structure.contexts[drawObj.id]["externalTraffic"]["reqGBMin"]+child.resGBMin)*10)/10; //OUT is source's IN
              self.structure.contexts[drawObj.id]["externalTraffic"]["reqGBMax"]=Math.round((self.structure.contexts[drawObj.id]["externalTraffic"]["reqGBMax"]+child.resGBMax)*10)/10; //OUT is source's IN
              self.structure.contexts[drawObj.id]["externalTraffic"]["resGBMin"]=Math.round((self.structure.contexts[drawObj.id]["externalTraffic"]["resGBMin"]+child.reqGBMin)*10)/10; //IN is source's OUT
              self.structure.contexts[drawObj.id]["externalTraffic"]["resGBMax"]=Math.round((self.structure.contexts[drawObj.id]["externalTraffic"]["resGBMax"]+child.reqGBMax)*10)/10; //IN is source's OUT
            }


            //Append external traffic summary
            if(!self.structure.contexts[drawObj.id]["DSD_"+child.uri]){
              self.structure.contexts[drawObj.id]["DSD_"+child.uri]=true;
              self.structure.contexts[drawObj.id]["storedDBMin"]=Math.round((self.structure.contexts[drawObj.id]["storedDBMin"]+tgtDBMin)*10)/10;
              self.structure.contexts[drawObj.id]["storedDBMax"]=Math.round((self.structure.contexts[drawObj.id]["storedDBMax"]+tgtDBMax)*10)/10;
            }
            if(child.obj.obj.start){
              if(self.structure.actors[child.obj.obj.start["$ref"]]){
                if(child.parent.uri=="ROOT" && self.structure.contexts[drawObj.id] && !self.structure.contexts[drawObj.id]["externalDefined"]){
                  self.structure.contexts[drawObj.id]["externalDefined"]=true;
                  self.structure.contexts[drawObj.id]["externalTraffic"]["reqGBMin"]=Math.round((self.structure.contexts[drawObj.id]["externalTraffic"]["reqGBMin"]+child.reqGBMin)*10)/10;
                  self.structure.contexts[drawObj.id]["externalTraffic"]["reqGBMax"]=Math.round((self.structure.contexts[drawObj.id]["externalTraffic"]["reqGBMax"]+child.reqGBMax)*10)/10;
                  self.structure.contexts[drawObj.id]["externalTraffic"]["reqRPSMin"]=Math.round((self.structure.contexts[drawObj.id]["externalTraffic"]["reqRPSMin"]+child.reqRPSMin)*10)/10;
                  self.structure.contexts[drawObj.id]["externalTraffic"]["reqRPSMax"]=Math.round((self.structure.contexts[drawObj.id]["externalTraffic"]["reqRPSMax"]+child.reqRPSMax)*10)/10;
                  self.structure.contexts[drawObj.id]["externalTraffic"]["resGBMin"]=Math.round((self.structure.contexts[drawObj.id]["externalTraffic"]["resGBMin"]+child.resGBMin)*10)/10;
                  self.structure.contexts[drawObj.id]["externalTraffic"]["resGBMax"]=Math.round((self.structure.contexts[drawObj.id]["externalTraffic"]["resGBMax"]+child.resGBMax)*10)/10;
                }
              }
            }
            var tr=0;
            Object.keys(self.structure.resources).forEach(er => {
              if(!self.structure.resources[er].networkWide){
                tr=tr+1;
              }
            });
            self.$refs["report"].$refs["reportMainResources"].unknown=tr-Object.keys(self.structure.definedResources).length;

          })
          //Reload
          var panel=[]
          panel=self.$refs["report"].$refs["reportMainContexts"].panel;
          self.$refs["report"].$refs["reportMainContexts"].panel=[]
          self.$refs["report"].$refs["reportMainContexts"].panel=panel;

          panel=self.$refs["report"].$refs["reportMainResources"].panel;
          self.$refs["report"].$refs["reportMainResources"].panel=[]
          self.$refs["report"].$refs["reportMainResources"].panel=panel;

          panel=self.$refs["report"].$refs["reportMainActors"].panel;
          self.$refs["report"].$refs["reportMainActors"].panel=[]
          self.$refs["report"].$refs["reportMainActors"].panel=panel;

          panel=self.$refs["report"].$refs["reportMainAuthors"].panel;
          self.$refs["report"].$refs["reportMainAuthors"].panel=[]
          self.$refs["report"].$refs["reportMainAuthors"].panel=panel;


        }
        var transparent="rgb(250,0,0,0)";
        if(child.parent.uri=="ROOT"){
          var tgrAvatars=[];
          if(child.obj.obj.start){
            if(self.structure.actors[child.obj.obj.start["$ref"]]){
              var triggerTitle=self.structure.actors[child.obj.obj.start["$ref"]]["title"];
              var triggerType=self.structure.actors[child.obj.obj.start["$ref"]]["type"];
              var triggerID=self.structure.actors[child.obj.obj.start["$ref"]]["key"];
              tgrAvatars.push({"type":"actor","class":self.structure.actors[child.obj.obj.start["$ref"]]["avatar"]});
            }else if(self.structure.resources[child.obj.obj.start["$ref"]]){
              var triggerTitle=self.structure.resources[child.obj.obj.start["$ref"]]["title"];
              var triggerType=self.structure.resources[child.obj.obj.start["$ref"]]["type"];
              var triggerID=self.structure.resources[child.obj.obj.start["$ref"]]["key"];
              tgrAvatars.push({"type":"resource","class":self.structure.resources[child.obj.obj.start["$ref"]]["avatar"]});
            }
          }
          //TriggerParent
          var triggerHeight=20;
          var triggerX=150;
          var triggerY=150;
          opacity=0.75;
          option={"avatar":"", "title":triggerID,"titleColor":"white"}
          createPlane(triggerY, triggerHeight,boxColorLeft,opacity, new THREE.Vector3( 0 - triggerX/2, triggerHeight/2-itemHeight/2, (triggerX-triggerY)/2 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ), option);
          option={"avatar":"", "title":triggerType,"titleColor":"white"}
          createPlane(triggerX, triggerHeight,boxColorRight,opacity,new THREE.Vector3( 0, triggerHeight/2-itemHeight/2, triggerX/2 ),new THREE.Euler( 0, 0, 0 ), option);
          //option={"avatar":"public", "avatarColor":boxColorLeft, "title":triggerTitle,"titleColor":"black"}
          option={"id":1,"avatars":tgrAvatars,"avatarColor":boxColorLeft,"title":triggerTitle,"titleColor":"black"}
          createSignB(triggerX, triggerY,boxColorSurface,opacity,new THREE.Vector3( 0, triggerHeight/2-itemHeight/2+triggerHeight/2, (triggerX-triggerY)/2 ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);
          option={"avatar":"","titles":child.triggerTitles,"titleColor":"black"}
          if(option.titles){
            var tdHeight=20*option.titles.length;
            var tdX=250;
            var tdY=140;
            createMultiLine(tdX, tdHeight,transparent,opacity,new THREE.Vector3( 60, tdHeight/2+20, -tdX/2+50 ),new THREE.Euler( 0, 0, 0 ), option);
          }          
          //Connection
          var originX=0;
          var originY=0+itemY/2;
          var childX=1*(itemX+itemMarginX)-itemX/2;
          var childY=1*(itemY+itemMarginY);
          var childParentDiffX=1;
          var childParentDiffY=1;
          var arrowSize=itemX/2;
          var arrowColor="#E0E0E0";
          var internetFlg=false;
          if(child.obj.obj.internet){
            internetFlg=true;
          }
          opacity=1;
          //Down>Right
          option={"avatar":"", "title":"","titleColor":"black"}
          createTriangle(arrowSize, 0,arrowColor,opacity,new THREE.Vector3( childX-arrowSize/2, -itemHeight/2, childY),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ),option);
          option={"avatar":"", "title":"","titleColor":"black"}
          createPlane(itemX/2, childParentDiffY*(itemY+itemMarginY)-itemY/4,arrowColor,opacity,new THREE.Vector3( originX, -itemHeight/2, (childParentDiffY*(itemY+itemMarginY))/2+originY+(itemX-itemY)/2-itemY/8 ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);
          option={"avatar":"", "title":"","titleColor":"black","internetFlg":internetFlg}
          createPlane(itemX/4+itemMarginX-arrowSize, itemY/2,arrowColor,opacity,new THREE.Vector3( originX+itemX/2-itemX/8+itemMarginX/2-arrowSize/2, -itemHeight/2, childY),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);

          //TrafficDescription
          var panelX=90;
          var panelY=150;
          option={"avatar":"", 
          "title1":"[ "+tgtKey+" ]",
          "title1Color":"#616161",
          "title2":tgtDescription,
          "title2Color":"#616161",
          "titleClass":"pt-2"}
          createTrafficDescription(panelX, childParentDiffY*(itemY+itemMarginY)-itemY/4,transparent,opacity,new THREE.Vector3( originX, -itemHeight/2+0.1, (childParentDiffY*(itemY+itemMarginY))/2+originY+(itemX-itemY)/2-itemY/8+((childParentDiffY-1)*(itemY+itemMarginY)) ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);
          //TrafficVolume
          var panelX2=300;
          var panelY2=100;
          var panelHight=20;
          var transparent="rgb(250,0,0,0)";
          option={"avatar":"", 
            "title1":"IN: "+child.reqGBMin+"~"+child.reqGBMax+"GB/M,  "+child.reqRPSMin+"~"+child.reqRPSMax+"rps",
            "title2":"OUT: "+child.resGBMin+"~"+child.resGBMax+"GB/M",
            "title3":"",
            "titleColor":'black',"titleClass":""
          }
          createTrafficVolume(panelX2, panelY2,transparent,opacity,new THREE.Vector3( childX-panelY2/1.5, -panelHight/2, childY-(itemX-itemY)/2),new THREE.Euler(0, - 90 * THREE.Math.DEG2RAD, 0),option);
          //ConnectionPorts
          option={"avatar":"", 
          "titles":tgtPorts,
          "titleColor":"#616161"}
          var tdX=50;
          var tdY=20*option.titles.length;
          createMultiLine(tdX, tdY,transparent,opacity,new THREE.Vector3( originX+arrowSize, -itemHeight/2+0.1, childY+arrowSize-30+tdY/2 ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);
//          createMultiLine(tdX, tdY,transparent,opacity,new THREE.Vector3( originX+arrowSize, -itemHeight/2+0.1, childY+arrowSize-30+tdY/2 ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);
          //ConnectionSecurity
          switch(tgtSecurityType){
            case "importantSafe":
              option={"avatar":"lock", "avatarColor":"#009688","infoLevel":tgtInfoLevel}
              break;
            case "normalSafe":
              option={"avatar":"lock", "avatarColor":"#009688","infoLevel":tgtInfoLevel}
              break;
            case "importantPublic":
              option={"avatar":"lock_open", "avatarColor":"#FF5722","infoLevel":tgtInfoLevel}
              break;
            case "normalPublic":
              option={"avatar":"lock_open", "avatarColor":"gray","infoLevel":tgtInfoLevel}
              break;
          }
          var tdX=90;
          var tdY=80;
          createConnectionSecurity(tdX, tdY,transparent,opacity,new THREE.Vector3( originX+arrowSize-5, -itemHeight/2+5, childY+5 ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);
          
        }else{
          //Connection
          var originX=child.parent.x*(itemX+itemMarginX);
          var originY=child.parent.y*(itemY+itemMarginY)+itemY/2;
          var childX=child.x*(itemX+itemMarginX)-itemX/2;
          var childY=child.y*(itemY+itemMarginY);
          var childParentDiffX=child.x-child.parent.x;
          var childParentDiffY=child.y-child.parent.y;
          var arrowSize=itemX/2;
          var arrowColor="#E0E0E0";
          var internetFlg=false;
          if(child.obj.obj.internet){
            internetFlg=true;
          }
          opacity=1;
          //Down>Right
          option={"avatar":"", "title":"","titleColor":"black"}
          createTriangle(arrowSize, 0,arrowColor,opacity,new THREE.Vector3( childX-arrowSize/2, -itemHeight/2, childY),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ),option);
          option={"avatar":"", "title":"","titleColor":"black"}
          createPlane(itemX/2, childParentDiffY*(itemY+itemMarginY)-itemY/4,arrowColor,opacity,new THREE.Vector3( originX, -itemHeight/2, (childParentDiffY*(itemY+itemMarginY))/2+originY+(itemX-itemY)/2-itemY/8 ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);
          option={"avatar":"", "title":"","titleColor":"black","internetFlg":internetFlg}
          createPlane(itemX/4+itemMarginX-arrowSize, itemY/2,arrowColor,opacity,new THREE.Vector3( originX+itemX/2-itemX/8+itemMarginX/2-arrowSize/2, -itemHeight/2, childY),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);
          //TrafficDescription
          var panelX=90;
          var panelY=150;
          var transparent="rgb(250,0,0,0)";
          option={"avatar":"", 
          "title1":"["+tgtKey+"]",
          "title1Color":"#616161",
          "title2":tgtDescription,
          "title2Color":"#616161",
          "titleClass":"pt-2"}
          createTrafficDescription(panelX, childParentDiffY*(itemY+itemMarginY)-itemY/4,transparent,opacity,new THREE.Vector3( originX, -itemHeight/2+0.1, (childParentDiffY*(itemY+itemMarginY))/2+originY+(itemX-itemY)/2-itemY/8+((childParentDiffY-1)*(itemY+itemMarginY)) ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);
          //TrafficVolume
          var panelX2=300;
          var panelY2=100;
          var panelHight=20;
          var transparent="rgb(250,0,0,0)";
          option={"avatar":"", 
            "title1":"IN: "+child.reqGBMin+"~"+child.reqGBMax+"GB/M,  "+child.reqRPSMin+"~"+child.reqRPSMax+"rps",
            "title2":"OUT: "+child.resGBMin+"~"+child.resGBMax+"GB/M",
            "title3":"",
            "titleColor":'black',"titleClass":""
          }
          createTrafficVolume(panelX2, panelY2,transparent,opacity,new THREE.Vector3( childX-panelY2/1.5, -panelHight/2, childY-(itemX-itemY)/2),new THREE.Euler(0, - 90 * THREE.Math.DEG2RAD, 0),option); 
          //ConnectionPorts
          option={"avatar":"", 
          "titles":tgtPorts,
          "titleColor":"#616161"}
          var tdX=50;
          var tdY=20*option.titles.length;
          createMultiLine(tdX, tdY,transparent,opacity,new THREE.Vector3( originX+arrowSize, -itemHeight/2+0.1, childY+arrowSize-10-20+tdY/2 ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);
          //ConnectionSecurity
          switch(tgtSecurityType){
            case "importantSafe":
              option={"avatar":"lock", "avatarColor":"#009688","infoLevel":tgtInfoLevel}
              break;
            case "normalSafe":
              option={"avatar":"lock", "avatarColor":"#009688","infoLevel":tgtInfoLevel}
              break;
            case "importantPublic":
              option={"avatar":"lock_open", "avatarColor":"#FF5722","infoLevel":tgtInfoLevel}
              break;
            case "normalPublic":
              option={"avatar":"lock_open", "avatarColor":"gray","infoLevel":tgtInfoLevel}
              break;
          }
          var tdX=90;
          var tdY=80;
          createConnectionSecurity(tdX, tdY,transparent,opacity,new THREE.Vector3( originX+arrowSize-5, -itemHeight/2+5, childY+5 ),new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ), option);

        }
        function createTriangle( width, height, cssColor, opacity, pos, rot, option ) {
            var element = document.createElement( 'div' );
            element.style.width = 0;
            element.style.height = 0;
            element.style.borderTop= "solid "+width+"px transparent";
            element.style.borderBottom= "solid "+width+"px transparent";
            element.style.borderLeft= "solid "+width+"px "+cssColor;
            element.style.opacity = opacity;
            element.style.color=option.avatarColor;
            var txtObj = document.createTextNode(option.title); 
            element.appendChild(txtObj);
            var object = new THREE3DCSS.CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            drawObj.scene.add( object );
        }
        function createMultiLine( width, height, cssColor, opacity, pos, rot, option ) {
            var element = document.createElement( 'div' );
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.opacity = opacity;
            element.style.background = cssColor;
            element.style.color=option.titleColor;
            element.style.textAlign="left";
            if(option.titleClass){
              element.className=option.titleClass;
            }
            element.style.overflow="hidden";
            option.titles.forEach(title => {
              var titleObj = document.createElement( 'div' ); 
              titleObj.style.fontSize="12px";
              var titleTxt = document.createTextNode(title); 
              titleObj.appendChild(titleTxt);
              element.appendChild(titleObj);
            });
            var object = new THREE3DCSS.CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            drawObj.scene.add( object );
        }
        function createPlane( width, height, cssColor, opacity, pos, rot, option ) {
            var element = document.createElement( 'div' );
            element.style.fontSize="10px";
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.opacity = opacity;
            element.style.background = cssColor;
            element.style.paddingLeft="5px";
            element.style.paddingRight="5px";
            element.style.paddingTop="3px";
            element.style.overflow="hidden";
            element.style.textAlign="center";
            if(option.internetFlg){
              element.style.backgroundImage= "url('/images/internet.png')";
            }
            if(option.titleClass){
              element.className=option.titleClass;
            }
            if(option.avatar!=""){
              var iconObj = document.createElement( 'span' ); 
              iconObj.className="v-icon material-icons pr-2"
              iconObj.style.fontSize="18px";
              //iconObj.style.color=option.avatarColor;
              var iconTxt = document.createTextNode(option.avatar); 
              iconObj.appendChild(iconTxt);
              element.appendChild(iconObj);
            }
            if(option.tilte!=""){
              var titleObj = document.createElement( 'span' ); 
              var txtObj = document.createTextNode(option.title);
              titleObj.style.color=option.titleColor;
              titleObj.style.verticalAlign="text-top";
              titleObj.appendChild(txtObj);
              element.appendChild(titleObj);
            }
            var object = new THREE3DCSS.CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            drawObj.scene.add( object );
        }
        function createDBPanel( width, height, cssColor, opacity, pos,pos2, rot, option ) {
            var element = document.createElement( 'div' );
            element.style.fontSize="12px";
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.opacity = opacity;
            element.style.background = cssColor;
            element.style.paddingLeft="5px";
            element.style.paddingRight="5px";
            element.style.paddingTop="3px";
            element.style.overflow="hidden";
            element.style.textAlign="center";
            element.style.borderRadius="10px 10px 10px 10px";
            if(option.titleClass){
              element.className=option.titleClass;
            }
            if(option.avatar!=""){
              var iconObj = document.createElement( 'span' ); 
              iconObj.className="v-icon material-icons pr-2"
              iconObj.style.fontSize="18px";
              //iconObj.style.color=option.avatarColor;
              var iconTxt = document.createTextNode(option.avatar); 
              iconObj.appendChild(iconTxt);
              element.appendChild(iconObj);
            }
            option.titles.forEach(eachTitle => {
              var titleObj = document.createElement( 'div' ); 
              var txtObj = document.createTextNode(eachTitle);
              titleObj.style.color=option.titleColor;
              titleObj.style.wordWrap="break-word";
              titleObj.style.verticalAlign="text-top";
              titleObj.appendChild(txtObj);
              element.appendChild(titleObj);              
            });
            var object = new THREE3DCSS.CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            drawObj.scene.add( object );

            var arrowObj = document.createElement( 'div' );
            arrowObj.style.opacity = opacity;
            arrowObj.style.borderTop="10px solid "+cssColor;
            arrowObj.style.borderRight="10px solid transparent";
            arrowObj.style.borderLeft="10px solid transparent";
            var object2 = new THREE3DCSS.CSS3DObject( arrowObj );
            pos=
            object2.position.copy( pos2 );
            object2.rotation.copy( rot );
            drawObj.scene.add( object2 );
        }
        function createTrafficDescription( width, height, cssColor, opacity, pos, rot, option ) {
            var element = document.createElement( 'div' );
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.opacity = opacity;
            element.style.background = cssColor;
            element.style.paddingLeft="10px";
            element.style.paddingRight="10px";
            element.style.overflow="hidden";
            element.style.fontSize="9pt"
            if(option.titleClass){
              element.className=option.titleClass;
            }
            if(option.avatar!=""){
              var iconObj = document.createElement( 'div' ); 
              iconObj.className="v-icon material-icons pr-2"
              iconObj.style.fontSize="18px";
              var iconTxt = document.createTextNode(option.avatar); 
              iconObj.appendChild(iconTxt);
              element.appendChild(iconObj);
              element.style.textAlign="left";
            }else{
              element.style.textAlign="center";
            }
            if(option.tilte1!=""){
              var title1Obj = document.createElement( 'div' ); 
              var txt1Obj = document.createTextNode(option.title1);
              title1Obj.style.color=option.title1Color;
              title1Obj.style.wordBreak="break-all";
              title1Obj.style.paddingBottom="5px";
              title1Obj.appendChild(txt1Obj);
              element.appendChild(title1Obj);
            }
            if(option.tilte2!=""){
              var title2Obj = document.createElement( 'div' ); 
              var txt2Obj = document.createTextNode(option.title2);
              title2Obj.style.color=option.title2Color;
              title2Obj.appendChild(txt2Obj);
              element.appendChild(title2Obj);
            }
            var object = new THREE3DCSS.CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            drawObj.scene.add( object );
            
        }
        function createConnectionSecurity( width, height, cssColor, opacity, pos, rot, option ) {
            var element = document.createElement( 'div' );
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.textAlign="center";
            element.style.opacity = opacity;
            element.style.background = cssColor;
            element.style.overflow="hidden";
            element.style.color=option.avatarColor;
            var iconObj = document.createElement( 'i' ); 
            iconObj.className="v-icon pt-3 material-icons"
            iconObj.style.fontSize="30px";
            var iconTxt = document.createTextNode(option.avatar); 
            iconObj.appendChild(iconTxt);
            element.appendChild(iconObj);
            var infoLevel = document.createElement( 'div' ); 
            var infoLevelObj = document.createTextNode(option.infoLevel);
            infoLevel.style.fontSize="12px";
            infoLevel.appendChild(infoLevelObj);
            element.appendChild(infoLevel);
            var object = new THREE3DCSS.CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            drawObj.scene.add( object );
        }
        function createTrafficVolume( width, height, cssColor, opacity, pos, rot, option ) {
            var element = document.createElement( 'div' );
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.opacity = opacity;
            element.style.background = cssColor;
            element.style.paddingLeft="10px";
            element.style.textAlign="center";
            element.style.paddingRight="10px";
            if(option.titleClass){
              element.className=option.titleClass;
            }
            element.style.overflow="hidden";
            var titleObj1 = document.createElement( 'div' ); 
            titleObj1.style.color=option.titleColor;
            titleObj1.style.fontSize="14px";
            var titleTxt1 = document.createTextNode(option.title1); 
            titleObj1.appendChild(titleTxt1);
            element.appendChild(titleObj1);
            var titleObj2 = document.createElement( 'div' ); 
            titleObj2.style.color=option.titleColor;
            titleObj2.style.fontSize="14px";
            var titleTxt2 = document.createTextNode(option.title2); 
            titleObj2.appendChild(titleTxt2);
            element.appendChild(titleObj2);
            var object = new THREE3DCSS.CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            drawObj.scene.add( object );
        }
        function createSignA( width, height, cssColor, opacity, pos, rot, option ) {
            var element = document.createElement( 'div' );
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.textAlign="center";
            element.style.opacity = opacity;
            element.style.background = cssColor;
            element.style.color=option.avatarColor;
            element.style.paddingLeft="10px";
            element.style.paddingRight="10px";
            element.style.overflow="hidden";
            var iconObj = document.createElement( 'i' ); 
            iconObj.className="v-icon pt-3 pb-2 material-icons"
            iconObj.style.fontSize="50px";
            var iconTxt = document.createTextNode(option.avatar); 
            iconObj.appendChild(iconTxt);
            element.appendChild(iconObj);

            var titleObj = document.createElement( 'div' ); 
            titleObj.style.fontSize="14px";
            titleObj.style.color=option.titleColor;
            var titleTxt = document.createTextNode(option.title); 
            titleObj.appendChild(titleTxt);
            element.appendChild(titleObj);

            var object = new THREE3DCSS.CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            drawObj.scene.add( object );
        }
        function createSignB( width, height, cssColor, opacity, pos, rot, option ) {
            var element = document.createElement( 'div' );
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.textAlign="center";
            element.style.opacity = opacity;
            element.style.background = cssColor;
            element.style.color=option.titleColor;
            element.style.paddingLeft="10px";
            element.style.paddingRight="10px";
            element.style.overflow="hidden";
            var numObj = document.createElement( 'div' ); 
            numObj.className="pt-2"
            numObj.style.fontSize="25px";
            var numTxt = document.createTextNode(option.id); 
            numObj.appendChild(numTxt);
            element.appendChild(numObj);
            var numObj = document.createElement( 'div' ); 
            numObj.className="pt-1 pb-2"
            numObj.style.fontSize="14px";
            var numTxt = document.createTextNode(option.title); 
            numObj.appendChild(numTxt);
            element.appendChild(numObj);
            option.avatars.forEach(eachavatar => {
              if(eachavatar.type=="resource"){
                var avatar = document.createElement( 'span' );
                var avatar1 = document.createElement( 'span' );
                var avatar2 = document.createElement( 'span' );
                var avatar3 = document.createElement( 'span' );
                var avatar4 = document.createElement( 'span' );
                var avatar5 = document.createElement( 'span' );
                avatar.className=eachavatar.class;
                avatar1.className="path1";
                avatar2.className="path2";
                avatar3.className="path3";
                avatar4.className="path4";
                avatar5.className="path5";
                avatar.style.color=option.avatarColor;
                avatar.appendChild(avatar1);
                avatar.appendChild(avatar2);
                avatar.appendChild(avatar3);
                avatar.appendChild(avatar4);
                avatar.appendChild(avatar5);
                element.appendChild(avatar);
              }else{
                var iconObj = document.createElement( 'span' ); 
                iconObj.className="v-icon material-icons pr-2"
                iconObj.style.color=option.avatarColor;
                iconObj.style.fontSize="30px";
                //iconObj.style.color=option.avatarColor;
                var iconTxt = document.createTextNode(eachavatar.class); 
                iconObj.appendChild(iconTxt);
                element.appendChild(iconObj);
              }
            });
            var object = new THREE3DCSS.CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            drawObj.scene.add( object );
        }
    },
    drawContextDiagram(self,drawObj,currentObj,drawY){
      //Draw from 0-0 to n-0, and back to n-0 by drawign all top-right edges. 
      var children=[];
      var parent="";
      children=currentObj.children;
      parent=currentObj.parent;
      if(children.length>0){
        children.forEach(child => {
          if(child.draw==false){
            if(child.parent.uri=="ROOT"){
              //Calc initial traffic volume.
              //TriggerDescription
              //"User: 100,000~2,000,000"
              //"Page view: 1,000,000~1,000,000PV/Month [User*b*30*d]"
              //"Throughput: 2.5~4.2rps [User*b/24/60/60/(c/24)*d*e]"
              //"Response size: 1.3~2.5GB/Month [User*b*30*d*g/1024/1024]"
              //"Post size: 1.5~2.2GB/Month [User*b*30*f*h/1024/1024]"
              switch(child.obj.obj.type){
                case "webAccess":
                  if(self.structure.actors[child.obj.obj.start["$ref"]]){
                    var users=self.structure.actors[child.obj.obj.start["$ref"]]["numbers"];
                    var b={"min":child.obj.obj.dau.min,"max":child.obj.obj.dau.max};
                    var c={"min":child.obj.obj.busyHours.min,"max":child.obj.obj.busyHours.max};
                    var d={"min":child.obj.obj.pagesVisit.min,"max":child.obj.obj.pagesVisit.max};
                    var e={"min":child.obj.obj.reqPage.min,"max":child.obj.obj.reqPage.max};
                    var f={"min":child.obj.obj.postsVisit.min,"max":child.obj.obj.postsVisit.max};
                    var g={"min":child.obj.obj.kbPage.min,"max":child.obj.obj.kbPage.max};
                    var h={"min":child.obj.obj.kbPost.min,"max":child.obj.obj.kbPost.max};
                    child.triggerTitles=[
                      "a PV(Page view): "+users*b.min*30*d.min+"~"+users*b.max*30*d.max,
                      "b DAU(Daily active user): "+b.min*100+"~"+b.max*100+"%",
                      "c Busy hours per day: "+c.min+"~"+c.max,
                      "d Pages per visit: "+d.min+"~"+d.max,
                      "e Requests per page: "+e.min+"~"+e.max,
                      "f Posts per visit: "+f.min*100+"~"+f.max*100+"%",
                      "g Size per page: "+g.min+"~"+g.max+"KB",
                      "h Size per POST: "+h.min+"~"+h.max+"KB"
                    ];
                    child.reqGBMin=Math.round(users*b.min*30*f.min*h.min/1024/1024*10)/10;
                    child.reqGBMax=Math.round(users*b.max*30*f.max*h.max/1024/1024*10)/10;
                    child.reqRPSMin=Math.round(users*b.min/24/60/60/(c.max/24)*d.min*e.min*10)/10;
                    child.reqRPSMax=Math.round(users*b.max/24/60/60/(c.min/24)*d.max*e.max*10)/10;
                    child.resGBMin=Math.round(users*b.min*30*d.min*g.min/1024/1024*10)/10;
                    child.resGBMax=Math.round(users*b.max*30*d.max*g.max/1024/1024*10)/10;
                  }
                  break;
                case "timedAction":
                  child.triggerTitles=[
                    "a Requests: "+child.obj.obj.reqMonth.min+"~"+child.obj.obj.reqMonth.max+"/Month",
                    "b Throughput: "+child.obj.obj.onlineRps.min+"~"+child.obj.obj.onlineRps.max+"rps",
                    "c Size per request: "+child.obj.obj.kbRequest.min+"~"+child.obj.obj.kbRequest.max,
                    "d Size per response: "+child.obj.obj.kbResponse.min+"~"+child.obj.obj.kbResponse.max
                  ];
                  child.reqGBMin=Math.round(child.obj.obj.reqMonth.min*child.obj.obj.kbRequest.min/1024/1024*10)/10;
                  child.reqGBMax=Math.round(child.obj.obj.reqMonth.max*child.obj.obj.kbRequest.max/1024/1024*10)/10;
                  child.reqRPSMin=Math.round(child.obj.obj.onlineRps.min*10)/10;
                  child.reqRPSMax=Math.round(child.obj.obj.onlineRps.max*10)/10;
                  child.resGBMin=Math.round(child.obj.obj.reqMonth.min*child.obj.obj.kbResponse.min/1024/1024*10)/10;
                  child.resGBMax=Math.round(child.obj.obj.reqMonth.max*child.obj.obj.kbResponse.max/1024/1024*10)/10;
                  break;
                default:
                  child.triggerTitles=[];
                  child.reqGBMin=0;
                  child.reqGBMax=0;
                  child.reqRPSMin=0;
                  child.reqRPSMax=0;
                  child.resGBMin=0;
                  child.resGBMax=0;
                  break;
              }
            }else{
              switch(child.obj.obj.type){
                case "passThroughRatio":
                  child.reqGBMin=Math.round(child.obj.obj.passThroughReqRatio.min*child.parent.reqGBMin*10)/10;
                  child.reqGBMax=Math.round(child.obj.obj.passThroughReqRatio.max*child.parent.reqGBMax*10)/10;
                  child.reqRPSMin=Math.round(child.obj.obj.passThroughReqRatio.min*child.parent.reqRPSMin*10)/10;
                  child.reqRPSMax=Math.round(child.obj.obj.passThroughReqRatio.max*child.parent.reqRPSMax*10)/10;
                  child.resGBMin=Math.round(child.obj.obj.compositResRatio.min*child.parent.resGBMin*10)/10;
                  child.resGBMax=Math.round(child.obj.obj.compositResRatio.max*child.parent.resGBMax*10)/10;
                  break;
                default:
                  child.reqGBMin=0;
                  child.reqGBMax=0;
                  child.reqRPSMin=0;
                  child.reqRPSMax=0;
                  child.resGBMin=0;
                  child.resGBMax=0;
                  break;
              }
            }
            currentObj=child
            child.draw=true;
            child.x=drawObj.currentX+1;
            child.y=drawObj.maxY2+1;
            drawObj.counter=drawObj.counter+1;
            child.context=drawObj.id;
            child.id=drawObj.counter;
            self.drawNode(self,drawObj,child);
            if((drawObj.currentX) > drawObj.maxX){
              drawObj.maxX=drawObj.currentX;
            }
            drawObj.maxY2=drawObj.maxY2+1;
            drawObj.currentX=drawObj.currentX+1;
            self.drawContextDiagram(self,drawObj,currentObj,true);
          }
        });
      }
      if(parent){
        currentObj=parent;
        drawObj.currentX=drawObj.currentX-1;
        if(drawY){drawObj.maxY=drawObj.maxY+1;}
        self.drawContextDiagram(self,drawObj,currentObj,false)
      }
    },
    debouncedDiagramGenerator: _.throttle((self) =>{
      Vue.nextTick(function(){
        var fluctuationPerContext=0;
        var itemHeight=20;
        Object.keys(self.structure.contexts).forEach(eachKey => {
          var drawObj={
            "scene":null,
            "renderer":null,
            "areaWidth":reportContainer.clientWidth - 145,
            "areaHeight":500,
            "frustumSize":5000,
            "aspect":1,
            "camera":null,
            "controls":null,
            "counter":1,
            "maxX":0,
            "maxY":0,
            "maxY2":0,
            "currentX":0,
            "id":eachKey
          }
          fluctuationPerContext=fluctuationPerContext+0.01;
          drawObj.aspect=drawObj.areaWidth/drawObj.areaHeight;
          drawObj.camera=new THREE.OrthographicCamera( drawObj.frustumSize * drawObj.aspect / - 2, drawObj.frustumSize * drawObj.aspect / 2, drawObj.frustumSize / 2, drawObj.frustumSize / - 2, 1, 100000 );
          drawObj.camera.position.set( - 200, 200, 200 );
          drawObj.controls=new THREEORBIT( drawObj.camera );
          drawObj.controls.enabled=false;
          drawObj.scene=new THREE.Scene();
          drawObj.scene.background = new THREE.Color( 0xf0f0f0 );
          self.drawContextDiagram(self,drawObj,self.structure.contexts[eachKey].objectMap,0,0,false,0);
          var itemSize=250; //(itemX+itemMargin)
          var areaX=itemSize*(drawObj.maxX+3);
          var areaY=itemSize*(drawObj.maxY+2);
          var transparent="rgb(250,0,0,0)";
          var objects = [];
          var targets1 = [];
          var targets2 = [];
          // Field Edge
          var a=createGround(areaX, areaY,"rgba(229, 228, 228, 0.5)", new THREE.Vector3( areaX/2-itemSize+50, fluctuationPerContext-itemHeight-2, areaY/2-itemSize+10 ), new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ));
          var b=createGround(areaX, areaY,"rgba(255,255,255,0.5)", new THREE.Vector3( areaX/2-itemSize+50, fluctuationPerContext-itemHeight, areaY/2-itemSize+10 ), new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ));
          createPlane(areaX*3, areaY*3, transparent, new THREE.Vector3( areaX/2-itemSize+50, fluctuationPerContext, areaY/2-itemSize+50 ), new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ));

          createPlane(400, areaY,"#B0BEC5", new THREE.Vector3( -400, 0, 0), new THREE.Euler( 0, 0, 0 ));
          var option={"titleColor":"white","titles":[{"txt":drawObj.counter,"size":"100px"},{"txt":"Trigger ","size":"20px"},{"txt":"and ","size":"20px"},{"txt":"Traffics ","size":"20px"}]}
          createMultiLine(300, 300,transparent,1,new THREE.Vector3( -400,1,0 ),new THREE.Euler( 0, 0, 0 ), option);

          drawObj.renderer = new THREE3DCSS.CSS3DRenderer();
          drawObj.renderer.setSize( drawObj.areaWidth, drawObj.areaHeight );
          if(self.$refs["report"].$refs["reportMainContexts"].$refs[eachKey][0].firstChild){
            self.$refs["report"].$refs["reportMainContexts"].$refs[eachKey][0].removeChild(self.$refs["report"].$refs["reportMainContexts"].$refs[eachKey][0].firstChild)
          }
          self.$refs["report"].$refs["reportMainContexts"].$refs[eachKey][0].appendChild( drawObj.renderer.domElement );
          drawObj.renderer.domElement.style.overflow="auto";
          option={"avatar":"", 
          "titles":self.structure.contexts[eachKey]["infoTypes"],
          "titleColor":"black"}
          var tdX=800;
          var tdY=500;
          createInfoLevels(self,tdX, tdY,transparent,1.0,new THREE.Vector3( -tdX/8+50, -tdY/2-50-150, tdY/2+50 ),new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ), option);
          self.animate(drawObj);
          self.contextRenderers.push(drawObj);

          function createPlane( width, height, cssColor, pos, rot ) {
              var element = document.createElement( 'div' );
              element.style.width = width + 'px';
              element.style.height = height + 'px';
              element.style.background = cssColor;
              var object = new THREE3DCSS.CSS3DObject( element );
              object.position.copy( pos );
              object.rotation.copy( rot );
              drawObj.scene.add( object );
          }
          function createGround( width, height, cssColor, pos, rot ) {
              var element = document.createElement( 'div' );
              element.style.width = width + 'px';
              element.style.height = height + 'px';
              element.style.backgroundImage= "url('/images/ground.png')";
              element.style.backgroundRepeat="repeat";
              element.style.backgroundColor=cssColor;
              var object = new THREE3DCSS.CSS3DObject( element );
              object.position.copy( pos );
              object.rotation.copy( rot );
              drawObj.scene.add( object );
              return object;
          }

          function createMultiLine( width, height, cssColor, opacity, pos, rot, option ) {
            var element = document.createElement( 'div' );
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.opacity = opacity;
            element.style.background = cssColor;
            element.style.color=option.titleColor;
            element.style.textAlign="right";
            if(option.titleClass){
              element.className=option.titleClass;
            }
            element.style.overflow="hidden";
            option.titles.forEach(title => {
              var titleObj = document.createElement( 'div' ); 
              titleObj.style.fontSize=title.size;
              var titleTxt = document.createTextNode(title.txt); 
              titleObj.appendChild(titleTxt);
              element.appendChild(titleObj);
            });
            var object = new THREE3DCSS.CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            drawObj.scene.add( object );
          }
          function createInfoLevels(self, width, height, cssColor, opacity, pos, rot, option ) {
            var element = document.createElement( 'div' );
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.opacity = opacity;
            element.style.background = cssColor;
            element.style.color=option.titleColor;
            element.style.textAlign="left";
            if(option.titleClass){
              element.className=option.titleClass;
            }
            element.style.overflow="hidden";
            var titleObj = document.createElement( 'div' ); 
            titleObj.style.fontSize="18px";
            titleTxt = document.createTextNode(self.$t("LEGEND")); 
            titleObj.appendChild(titleTxt);
            element.appendChild(titleObj);
            titleObj = document.createElement( 'div' ); 
            titleObj.style.fontSize="18px";
            titleTxt = document.createTextNode(self.$t("informationLevel")); 
            titleObj.appendChild(titleTxt);
            element.appendChild(titleObj);
            option["titles"].forEach(eachTitle => {
              titleObj = document.createElement( 'div' ); 
              titleObj.style.fontSize="14px";
              titleTxt = document.createTextNode(eachTitle); 
              titleObj.appendChild(titleTxt);
              element.appendChild(titleObj);
            });
            titleObj = document.createElement( 'br' ); 
            element.appendChild(titleObj);
            titleObj = document.createElement( 'div' ); 
            titleObj.style.fontSize="18px";
            titleTxt = document.createTextNode(self.$t("OTHERS")); 
            titleObj.appendChild(titleTxt);
            element.appendChild(titleObj);
            titleObj = document.createElement( 'div' ); 
            titleObj.style.fontSize="14px";
            var iconObj = document.createElement( 'span' ); 

            iconObj.style.width="20px";
            iconObj.style.height="15px";
            iconObj.style.marginLeft="3px";
            iconObj.style.marginRight="7px";
            iconObj.style.backgroundImage="url(/images/internet.png)";
            iconObj.style.backgroundColor="rgb(224, 224, 224)";
            iconObj.className="v-icon material-icons pr-2";
            titleTxt = document.createTextNode("box");
            iconObj.appendChild(titleTxt);
            titleObj.appendChild(iconObj);
            var titleTxt = document.createTextNode(": "+self.$t("internetTraffic")); 
            titleObj.appendChild(titleTxt);
            element.appendChild(titleObj);

            var titleObj = document.createElement( 'div' ); 
            titleObj.style.fontSize="14px";
            var iconObj = document.createElement( 'span' ); 
            iconObj.className="v-icon material-icons pr-2";
            iconObj.style.color="#009688"
            titleTxt = document.createTextNode("lock");
            iconObj.appendChild(titleTxt);
            titleObj.appendChild(iconObj);
            var titleTxt = document.createTextNode(": "+self.$t("restrictedTraffic")); 
            titleObj.appendChild(titleTxt);
            element.appendChild(titleObj);

            var titleObj = document.createElement( 'div' ); 
            titleObj.style.fontSize="14px";
            var iconObj = document.createElement( 'span' ); 
            iconObj.className="v-icon material-icons pr-2";
            iconObj.style.color="#FF5722"
            titleTxt = document.createTextNode("lock_open");
            iconObj.appendChild(titleTxt);
            titleObj.appendChild(iconObj);
            var titleTxt = document.createTextNode(": "+self.$t("unRestrictedTrafficSecure")); 
            titleObj.appendChild(titleTxt);
            element.appendChild(titleObj);

            var titleObj = document.createElement( 'div' ); 
            titleObj.style.fontSize="14px";
            var iconObj = document.createElement( 'span' ); 
            iconObj.className="v-icon material-icons pr-2";
            iconObj.style.color="gray"
            titleTxt = document.createTextNode("lock_open");
            iconObj.appendChild(titleTxt);
            titleObj.appendChild(iconObj);
            var titleTxt = document.createTextNode(": "+self.$t("unRestrictedTrafficNormal")); 
            titleObj.appendChild(titleTxt);
            element.appendChild(titleObj);

            var titleObj = document.createElement( 'div' ); 
            titleObj.style.fontSize="14px";
            var iconObj = document.createElement( 'span' ); 
            iconObj.className="v-icon material-icons pr-2";
            iconObj.style.color="#78909C"
            titleTxt = document.createTextNode("mode_comment");
            iconObj.appendChild(titleTxt);
            titleObj.appendChild(iconObj);
            var titleTxt = document.createTextNode(": "+self.$t("normalDB")); 
            titleObj.appendChild(titleTxt);
            element.appendChild(titleObj);

            var titleObj = document.createElement( 'div' ); 
            titleObj.style.fontSize="14px";
            var iconObj = document.createElement( 'span' ); 
            iconObj.className="v-icon material-icons pr-2";
            iconObj.style.color="#E57373"
            titleTxt = document.createTextNode("mode_comment");
            iconObj.appendChild(titleTxt);
            titleObj.appendChild(iconObj);
            var titleTxt = document.createTextNode(": "+self.$t("secureDB")); 
            titleObj.appendChild(titleTxt);
            element.appendChild(titleObj);

            var object = new THREE3DCSS.CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            drawObj.scene.add( object );
          }
        })
      })


    },800,{
      'trailing': true,
      'trailing': true,
      'maxWait': 700
    }),
    debouncedStructureSetter: _.throttle((self) =>{
      self.$store.dispatch('structure/setDataObject', self);
    },600,{
      'trailing': true,
      'trailing': true,
      'maxWait': 500
    }),
    debouncedCodeSetter: _.throttle((self,val) =>{
      self.code=val;
    },200,{
      'leading': true,
      'trailing': true,
      'maxWait': 300
    }),
    debouncedCodeUpdater: _.throttle((self,snackbarDisplay) =>{
      var tmpErrors=[];
      var tmpObject="";
      var eachErrObj="";
      switch(self.currentCodeFmt){
        case "json":
          try{
              tmpObject= JSON.parse(self.code);
              self.setDataObject(tmpObject);
               //Find references
              self.updateReferenceFileList(false);
          }catch(e){
              if(e==""){
                eachErrObj={"message":"Parse error", "startColumn": 0, "startLineNumber": 0, "endColumn": 0, "endLineNumber": 0};
              }else{
                eachErrObj={"message":e, "startColumn": 0, "startLineNumber": 0, "endColumn": 0, "endLineNumber": 0};
              }
          }
          /*
          try{
            tmpErrors = monaco.editor.getModelMarkers({});
            if(eachErrObj!=""){
              tmpErrors.push(eachErrObj);
            }
          }catch(e){
            //do nothing
          }
          */
          break;
        case "yaml":
          try{
              tmpObject= yaml.load(self.code);
              self.setDataObject(tmpObject);
              //Find references
              self.updateReferenceFileList(false);
          }catch(e){
              if(e==""){
                eachErrObj={"message":"Parse error", "startColumn": 0, "startLineNumber": 0, "endColumn": 0, "endLineNumber": 0};
              }else{
                eachErrObj={"message":e, "startColumn": 0, "startLineNumber": 0, "endColumn": 0, "endLineNumber": 0};
              }
          }
          /*
          try{
            tmpErrors = monaco.editor.getModelMarkers({});
            if(eachErrObj!=""){
              tmpErrors.push(eachErrObj);
            }
          }catch(e){
            //do nothing
          }
          */
          break;
        default:
          //tmpErrors.push({"message":"HOME", "startColumn": 0, "startLineNumber": 0, "endColumn": 0, "endLineNumber": 0});
      }
      //Set varidity
      /*
      if(tmpErrors.length > 0){
        self.currentCodevalid=false;
      }else{
        self.currentCodevalid=true;
        tmpErrors.push({"message":"HOME", "startColumn": 0, "startLineNumber": 0, "endColumn": 0, "endLineNumber": 0});
      }
      //Set Errors
      self.setCodeErrors(tmpErrors);
      if(snackbarDisplay){
        self.snackbarState=self.$t.bind(self)("snackSuccess");
        self.snackbar = true;
      }
      */
    },200,{
      'leading': true,
      'trailing': true,
      'maxWait': 300
    }),
    addMonacoAction(){
      this.$refs.editor.getMonaco().addAction({
        id: 'changeFormatToJSON',
        label: this.$t.bind(this)("editorCmdChangeToJSON"),
        keybindings: [
          monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_J)
        ], precondition: null, keybindingContext: null, contextMenuGroupId: '1_modification', contextMenuOrder: 1.5,
        run: function(ed) {
          var tmpObj="";
          try{
            tmpObj=JSON.parse(ed.getValue());
          }catch(e){
            try{
              tmpObj=yaml.load(ed.getValue());
            }catch(e){
              //do nothing
            }
          }
          ed.setValue(JSON.stringify(tmpObj));
          return null;
        }
      });
      this.$refs.editor.getMonaco().addAction({
        id: 'changeFormatToYAML',
        label: this.$t.bind(this)("editorCmdChangeToYAML"),
        keybindings: [
          monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_Y)
        ], precondition: null, keybindingContext: null, contextMenuGroupId: '1_modification', contextMenuOrder: 1.5,
        run: function(ed) {
          var tmpObj="";
          try{
            tmpObj=JSON.parse(ed.getValue());
          }catch(e){
            try{
              tmpObj=yaml.load(ed.getValue());
            }catch(e){
              //do nothing
            }
          }
          ed.setValue(yaml.dump(tmpObj));
          return null;
        }
      });
    },
    prepareEditorLayout: async function () {
      await this.$nextTick()
      this.onResize();
    },
    closeShareDialog(){
      this.dialogShare=false;
      this.urlCopied=false;
    },
    copyURLToClipboard(){
        navigator.clipboard.writeText(this.sharedID).then(() => {
          this.urlCopied=true;
        }).catch(e => {
          this.urlCopied=false;
        })
    },
    share(){
      var self=this;
      this.shared=false;
      this.dialogShare=true;
      this.debouncedCodeUpdater(self,false);
      var data="";
      var storageData = localStorage.getItem('reindeerEditor0-1-0');
      axios.post('https://cdr.reindeer.tech/v1/editor/share', storageData).then(response => {
        this.shared=true;
        var localestr="";
        if(response["data"]["id"]){
          if(self.$i18n.locale!="en"){
            localestr=self.$i18n.locale+"/";
          }
          this.sharedID="https://editor.reindeer.tech/"+localestr+"?id="+response["data"]["id"];
        }else{
          self.snackbarState=self.$t.bind(self)("errorSharing");
          self.snackbar = true;
          this.shared=false;
          this.dialogShare=false;          
        }
      }).catch(error => {
        self.snackbarState=self.$t.bind(self)("errorSharing");
        self.snackbar = true;
        this.shared=false;
        this.dialogShare=false;
      });
    },
    load(){
      if(this.loadedResponse!={}){
        localStorage.setItem('reindeerEditor0-1-0',JSON.stringify(this.loadedResponse));
        var pathname = window.location.pathname;
        window.location.href = pathname;
      }else{
        this.cancelLoading();       
      }
    },
    cancelLoading(){
      var self=this;
      this.loadingID="";
      this.loadedResponse={};
      this.loaded=false;
      this.dialogLoad=false;
      var pathname = window.location.pathname;
      history.replaceState('','',pathname);
      self.snackbarState=self.$t.bind(self)("canceledLoading");
      self.snackbar = true;
    },
    updateCode(snackbarDisplay){
      var self=this;
      this.debouncedCodeUpdater(self,snackbarDisplay);
    },
    setEditorSchemaInitially: async function () {
      await this.$nextTick()  
      this.setEditorSchema();
    },
    setEditorSchema(){
      switch(this.currentCodeFmt){
        case "json":
          switch(this.currentCodeLang){
            case "cdd":
              var modelUri = monaco.Uri.parse("https://reindeer.tech/cdd-schema/default.json");
              var model=monaco.editor.getModel(modelUri);
              try{
                if(!model){
                  model=monaco.editor.createModel(this.code,this.currentCodeFmt,modelUri.toString())
                }
                var modelObj= {"uri":modelUri,"i18n":this.$t.bind(this)}
                var schema= this.$reindeerSchemaCDD(modelObj);
                monaco.languages.json.jsonDefaults.setDiagnosticsOptions(schema);
                this.$refs.editor.getMonaco().setModel(model);
              }catch(e){
              }
              break;
            case "cddSnippet":
              var modelUri = monaco.Uri.parse("https://reindeer.tech/cdd-schema/default.json");
              var model=monaco.editor.getModel(modelUri);
              try{
                if(!model){
                  model=monaco.editor.createModel(this.code,this.currentCodeFmt,modelUri.toString())
                }
                var modelObj= {"uri":modelUri,"i18n":this.$t.bind(this)}
                var schema= this.$reindeerSchemaCDDSnippet(modelObj);
                monaco.languages.json.jsonDefaults.setDiagnosticsOptions(schema);
                this.$refs.editor.getMonaco().setModel(model);
              }catch(e){
              }
              break;
            default:
              var modelUri = monaco.Uri.parse("https://reindeer.tech/other-schema/default.json");
              var model=monaco.editor.getModel(modelUri);
              try{
                if(!model){
                  model=monaco.editor.createModel(this.code,this.currentCodeFmt,modelUri.toString())
                }
                var modelObj= {"uri":modelUri,"i18n":this.$t.bind(this)}
                this.$refs.editor.getMonaco().setModel(model);
              }catch(e){
              }
              break;              
          }
          break;
        case "yaml":
          switch(this.currentCodeLang){
            case "cdd":
              var modelUri = monaco.Uri.parse("https://reindeer.tech/cdd-schema/default.yaml");
              var model=monaco.editor.getModel(modelUri);
              try{
                if(!model){
                  model=monaco.editor.createModel(this.code,this.currentCodeFmt,modelUri.toString())
                }
                var modelObj= {"uri":modelUri,"i18n":this.$t.bind(this)}
                var schema= this.$reindeerSchemaCDD(modelObj);
                monaco.languages.yaml.jsonDefaults.setDiagnosticsOptions(schema);
                this.$refs.editor.getMonaco().setModel(null);
                this.$refs.editor.getMonaco().setModel(model);
              }catch(e){
              }
              break;
            case "cddSnippet":
              var modelUri = monaco.Uri.parse("https://reindeer.tech/cdd-schema/default.yaml");
              var model=monaco.editor.getModel(modelUri);
              try{
                if(!model){
                  model=monaco.editor.createModel(this.code,this.currentCodeFmt,modelUri.toString())
                }
                var modelObj= {"uri":modelUri,"i18n":this.$t.bind(this)}
                var schema= this.$reindeerSchemaCDDSnippet(modelObj);
                monaco.languages.yaml.jsonDefaults.setDiagnosticsOptions(schema);
                this.$refs.editor.getMonaco().setModel(null);
                this.$refs.editor.getMonaco().setModel(model);
              }catch(e){
              }
              break;
          }
          break;
      }
    },
    removeUnusedItem(id){
        if(this.currentCodeID!=id){
          this.$store.dispatch('codes/remove', id);
        }
    },
    setDataObject(obj){
      var setObj=this.listItem(this.currentCodeID)[0];
      this.$store.dispatch('codes/update', 
        {
            "id": setObj["id"],
            "isRoot": setObj["isRoot"],
            "fmt": setObj["fmt"], 
            "lang": setObj["lang"],
            "data": setObj["data"],
            "isUsed": setObj["isUsed"],
            "isValid": setObj["isValid"],
            "dataObject": obj,
            "codeErrors": setObj["codeErrors"]
        }
      );
    },
    setCodeErrors(obj){
      var setObj=this.listItem(this.currentCodeID)[0];
      this.$store.dispatch('codes/update', 
        {
            "id": setObj["id"],
            "isRoot": setObj["isRoot"],
            "fmt": setObj["fmt"], 
            "lang": setObj["lang"],
            "data": setObj["data"],
            "isUsed": setObj["isUsed"],
            "isValid": setObj["isValid"],
            "dataObject": setObj["dataObject"],
            "codeErrors": obj
        }
      );
    },
    updateReferenceFileList: async function(snackbarDisplay){
      //Reference detection 
      //1: Unuse all
      var removeTargets=[];
      this.listAll.forEach(eachItem => {
        if(eachItem["isRoot"]){
          if(this.currentCodeID==eachItem["id"]){
            //Parent file
            if(eachItem["dataObject"]["self"]){
                var indexID=eachItem["dataObject"]["self"].split('#')[0];
                var indexFmt=indexID.split('.').slice(-1)[0];
                var indexKey=indexID.split('.')[0];
                if(indexFmt=="yml"){
                  indexFmt="yaml";
                }
                if(indexFmt!="" && indexKey!="" && this.convertCodeTypeForDisplay(indexFmt,eachItem["lang"])){
                  this.$store.dispatch('codes/update', 
                    {
                      "id": eachItem["id"],
                      "isRoot": true,
                      "fmt": indexFmt, 
                      "lang": eachItem["lang"],
                      "data": eachItem["data"],
                      "isUsed": true,
                      "isValid": eachItem["isValid"],
                      "dataObject": eachItem["dataObject"],
                      "codeErrors": eachItem["codeErrors"]
                    }
                  );
                  this.rootDocumentFileName= indexID;
                }
            }
          }
        }else if(eachItem["data"]!=""){
          this.$store.dispatch('codes/update', 
            {
              "id": eachItem["id"],
              "isRoot": false,
              "fmt": eachItem["fmt"], 
              "lang": eachItem["lang"],
              "data": eachItem["data"],
              "isUsed": false,
              "isValid": eachItem["isValid"],
              "dataObject": eachItem["dataObject"],
              "codeErrors": eachItem["codeErrors"]
            }
          );
        }else{
            removeTargets.push(eachItem["id"]);
        }
      })
      //2: Delete
      await this.$nextTick();
      removeTargets.forEach(eachID => {
        this.$store.dispatch('codes/remove', eachID)
      })
      //3: Register new links
      this.listCDD.forEach(eachItemSub => {
        var rawRefs=this.findReferencedItems(eachItemSub["dataObject"],"$ref","");
        rawRefs.forEach(eachOrgObj => {
          var eachRefObj= this.listItem(eachOrgObj["id"]);
          if(eachRefObj.length > 0){
              this.$store.dispatch('codes/update', 
                {
                    "id": eachOrgObj["id"],
                    "isRoot": false,
                    "fmt": eachOrgObj["format"], 
                    "lang": eachOrgObj["type"],
                    "data": eachRefObj[0]["data"],
                    "isUsed": true,
                    "isValid": eachRefObj[0]["isValid"],
                    "dataObject": eachRefObj[0]["dataObject"], 
                    "codeErrors": eachRefObj[0]["codeErrors"]

                }
              );
          }else{
              this.$store.dispatch('codes/add', 
                {
                    "id": eachOrgObj["id"],
                    "isRoot": false,
                    "fmt": eachOrgObj["format"], 
                    "lang": eachOrgObj["type"],
                    "data": "",
                    "isUsed": true,
                    "isValid": false,
                    "dataObject": {},
                    "codeErrors": [{"message":"HOME", "startColumn": 0, "startLineNumber": 0, "endColumn": 0, "endLineNumber": 0}]
                }
              );
          }
        })

        if(snackbarDisplay){
          this.snackbarState=this.$t.bind(this)("snackSuccess");
          this.snackbar = true;
        }
      });
      var self=this;
      this.debouncedStructureSetter(self);
      this.debouncedDiagramGenerator(self);
    },
    convertCodeTypeForDisplay(fmt, lang){
        if(this.typeItem({"fmt":fmt,"lang":lang})){
          return this.typeItem({"fmt":fmt,"lang":lang})[0];
        }else{
          return this.typeItem({"fmt":"oth","lang":"yaml"})[0];
        }
    },
    selectCodeItem: async function(id){
      this.currentTmpCode= this.listItem(id)[0]["data"];
      this.currentCodeID = id;
    },
    jumbToError(id,subItem){
      this.currentCodeID = id;
      this.$refs.editor.getMonaco().setPosition({column: subItem["startColumn"], lineNumber: subItem["startLineNumber"]});
    },
    onResize () {
      this.reportContainerHeight=window.innerHeight - 155
      this.editorContainerSize={ width: editorContainer.clientWidth, height: window.innerHeight - 140 -50}
      this.$refs.editor.getMonaco().layout(this.editorContainerSize)
      this.contextRenderers.forEach(drawObj => {
        this.animate(drawObj);
      });
    },
    animate(drawObj){
      drawObj.camera.zoom=2;
      drawObj.camera.updateProjectionMatrix();
      var currentAreaWidth=reportContainer.clientWidth - 145;
      drawObj.renderer.setSize( currentAreaWidth, drawObj.areaHeight );
      drawObj.renderer.render( drawObj.scene, drawObj.camera );
    },
    findReferencedItems(code, key, val){
      var results = [];
	    for (var i in code) {
	        if (!code.hasOwnProperty(i)) continue;
	        if (typeof code[i] == 'object') {
	            results = results.concat(this.findReferencedItems(code[i], key, val));  
	        } else 
	        if (i == key && code[i] === val || i === key && val === '') {
              var indexID=code[key].split('#')[0];
              var indexFmt=indexID.split('.').slice(-1)[0];
              var indexType="";
              if(indexFmt=="yml"){
                indexFmt="yaml";
              }
              if(this.typeMasterFmts.indexOf(indexFmt) >=0){
                if(code["type"]){
                    indexType=code["type"];
                }else{
                    indexType="cddSnippet";
                }
                if(this.convertCodeTypeForDisplay(indexFmt,indexType)){
                    //All condition is matched.
                    results.push({"id":indexID, "type": indexType, "format": indexFmt})
                }
              }
	        }
      }
      var uniqResults = results.filter(function(v1,i1,a1){ 
        return (a1.findIndex(function(v2){ 
          return (v1.id===v2.id) 
        }) === i1);
      });
      return uniqResults;
    }
	}
}
</script>

<style>
      .dialogHeader{
        color:white;
        background-color:#9FA8DA!important;
        padding-top:10px!important;
        padding-bottom:10px!important;
      }
      .dialogBodyLoading{
        text-align: center;
        color:white;
        background-color:#C5CAE9!important;
      }
      .dialogBodyShare{
        text-align: center;    
      }
      .shareURL{
        font-weight: bold;
        font-size: 10px;
      }
      .copied{
        font-size: 10px;
        color: green;
      }
      .v-window__container--is-active{
        height:100%!important;
      }
      .textLeft{
        text-align: left !important;
      }
      .textRight{
        text-align: right !important;
      }
      .shareBtn{
        font-weight: normal;
      }
      .tabTop{
        background-color: #9FA8DA;
        font-size: x-small;
        text-align: center;
      }
      .editorHeaderCaption{
        font-style: italic;
      }
      .editorFooterTxt{
        color: grey;
        font-style: italic;
      }
      .warningIcon{
        color: #B71C1C;
      }
      .tabMenuFont {
        font-size: small;
      }
      .errorListFont {
        font-size: small;
      }
      .loadingAttention{
        font-size: 10px;
        color:red;
      }
      .ieAttention{
        font-size: 16px;
        color: red;
      }
      #editorContainer { 
	      background-color: rgba(0,0,0,0.87);
      }
      .editor { 
        width: 100%; 
        height: 100% 
      }
      .minichip{
        height: 18px;
        font-size: 9px;
      }
      .activeCodeItem{
	      background-color: #EEEEEE;
      }
      .activeCodeItemSub{
        background-color: #F5F5F5;
        color: #757575;
        font-style: italic;
      }
      .tinymemo{
        font-style: italic;
        font-size: smaller;
      }
      .snackTxt{
        color: white!important;
      }
      .allocaionChip{
        font-size: 10px;
        word-wrap: break-all;
      }
      .v-chip .v-chip__content{
        white-space: pre-wrap!important;
        word-break: break-all!important;
        line-height: 95%;
      }
      .currentPjTitle{
        color: black;
        font-weight: bold;
      }
      .iconACF{
        font-family: "iconACF"!important;
      }
      .iconGDM{
        font-family: "iconGDM"!important;
      }
</style>

