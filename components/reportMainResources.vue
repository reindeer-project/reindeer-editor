<i18n src="@/assets/i18n/en.json"></i18n>
<i18n src="@/assets/i18n/ja.json"></i18n>
<i18n src="@/assets/i18n/others.json"></i18n>


<template>
  <div>    
    <v-alert :value="true" color="#F5F5F5" class="infoBox alertCaption pt-0 pb-0 pr-0 pl-0 mt-3 mb-3">
      <v-container fill-height class="pl-3 pt-0 pb-0 pr-0 reportSectionMenuContainer">
        <span v-if="this.unknown>0" class="alertCaptionBold">
            {{this.unknown}}&nbsp;<span v-t="'undefinedResourcesUnit'" />
        </span>
        <v-spacer></v-spacer>
        <v-btn class="actionFontMini" flat small @click="all"><span class="alertCaption" v-t="'expandAll'" /></v-btn>
        <v-btn class="actionFontMini" flat small @click="none"><span class="alertCaption" v-t="'shrinkAll'" /></v-btn>
      </v-container>
    </v-alert>
 
    <v-expansion-panel v-model="panel" expand>
      <v-expansion-panel-content v-for="(item,key) in this.resources" :key="key">
        <template v-slot:header>
          <v-list-tile-avatar>
            <span v-bind:class="item.avatar"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>
          </v-list-tile-avatar>

          <v-list-tile-content class="panelHeadArea">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title class="panelCaption">{{ item.key }}</v-list-tile-sub-title>
              <v-list-tile-sub-title class="panelCaption">{{ item.type }}</v-list-tile-sub-title>
              <v-list-tile-title v-if="item.defined.length<1 && !item.networkWide" class="undefinedOnContext pr-2">
                <v-spacer></v-spacer>
                <span v-t="'undefinedResources'" />
              </v-list-tile-title>
              <v-list-tile-title v-if="item.defined.length<1 && item.networkWide" class="definedOnContext pr-2">
                <v-spacer></v-spacer>
                <span v-t="'networkwide'" />
              </v-list-tile-title>
              <v-list-tile-title v-if="item.defined.length>0" class="definedOnContext pr-2">
                <v-spacer></v-spacer>
                Throughput: {{numberFormat(item.reqRPSMin,2)}}~{{numberFormat(item.reqRPSMax,2)}}rps
              </v-list-tile-title>
              <v-list-tile-title v-if="item.defined.length>0" class="definedOnContext pr-2">
                <v-spacer></v-spacer>
                IN:  {{numberFormat(item.reqGBMin,1)}}~{{numberFormat(item.reqGBMax,1)}}GB/Month<br>
              </v-list-tile-title>
              <v-list-tile-title v-if="item.defined.length>0" class="definedOnContext pr-2">
                <v-spacer></v-spacer>
                OUT: {{numberFormat(item.resGBMin,1)}}~{{numberFormat(item.resGBMax,1)}}GB/Month
              </v-list-tile-title>
              <v-list-tile-title v-if="item.defined.length>0" class="definedOnContextSmall pr-2">
                <v-spacer></v-spacer>
                Requests:  {{numberFormat(item.reqMin,0)}}~{{numberFormat(item.reqMax,0)}}/Month<br>
              </v-list-tile-title>
          </v-list-tile-content>

        </template>
        <div class="pl-3 ml-5 mr-2 mb-2">
          <v-card flat color="#f5f5f5">
            <div>
              <v-card-text class="pt-3 pl-3 pr-2 pb-1 panelTitle">
                <span v-t="'usages'" />
              </v-card-text>
              <v-card-text class="pt-1 pl-3 pr-2 pb-3 panelInfo">
                <span v-t="'allocatedContext'" />:&nbsp;
                <span v-t="'notDefined'" v-if="item.defined.length==0"/>
                <span v-for="(subItem,i2) in item.defined" :key="i2"><v-chip small class="allocaionChip" color="white">{{subItem.key}}&nbsp;&nbsp;[Drawing ID: {{subItem.id}}]</v-chip>&nbsp;</span>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text class="pt-3 pl-3 pr-2 pb-1 panelTitle">
                <span v-t="'definition'" />
              </v-card-text>
              <v-card-text class="pt-1 pl-3 pr-2 pb-1 panelInfo" v-if="item.vpc.length>0">
                <span v-t="'allocatedVpn'" />:&nbsp;
                <span v-for="(subItem,i2) in item.vpc" :key="i2"><v-chip small class="allocaionChip" color="white">{{subItem}}</v-chip>&nbsp;</span>
              </v-card-text>
              <v-card-text class="pt-0 pl-3 pr-2 pb-1 panelInfo" v-if="item.zone.length>0">
                <span v-t="'allocatedZone'" />:&nbsp;
                <span v-for="(subItem,i2) in item.zone" :key="i2"><v-chip small class="allocaionChip" color="white">{{subItem}}</v-chip>&nbsp;</span>
              </v-card-text>
              <v-card-text class="pt-0 pl-3 pr-2 pb-1 panelInfo" v-if="item.subnet.length>0">
                <span v-t="'allocatedSubnet'" />:&nbsp;
                <span v-for="(subItem,i2) in item.subnet" :key="i2"><v-chip small class="allocaionChip" color="white">{{subItem}}</v-chip>&nbsp;</span>
              </v-card-text>
              <v-card-text class="pt-0 pl-3 pr-2 pb-1 panelInfo" v-if="item.security.length>0">
                <span v-t="'allocatedSecurity'" />:&nbsp;
                <span v-for="(subItem,i2) in item.security" :key="i2"><v-chip small class="allocaionChip" color="white">{{subItem}}</v-chip>&nbsp;</span>
              </v-card-text>
              <v-card-text class="pt-0 pl-3 pr-2 pb-3 panelInfo">
                <span v-t="'referenceResources'" />:&nbsp;
                <span v-t="'notDefined'" v-if="item.referencedResources.length==0"/>
                <span v-for="(subItem,i2) in item.referencedResources" :key="i2"><v-chip small class="allocaionChip" color="white">{{subItem}}</v-chip>&nbsp;</span>
              </v-card-text>
            </div>
          </v-card>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>

  </div>
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
import { mapGetters } from 'vuex'
export default {
  props:{
    resources: Object
  },
  data() {
    return{
        panel: [],
        unknown: 0
    }
  },

  mounted () {
  },

  computed: {
    ...mapGetters({
      typeItem: 'codes/typeItem',
      typeMasterLangs: 'codes/typeMasterLangs',
      typeMasterFmts: 'codes/typeMasterFmts'
    })
  },

  methods: {
    all () {
      this.panel = [...Object.keys(this.resources)].map(_ => true)
    },
      // Reset the panel
    none () {
      this.panel = []
    },
    numberFormat(val,len){
      try{
        var v=Math.floor( val * Math.pow( 10, len ) ) / Math.pow( 10, len ) ;
        var r=v.toLocaleString();
      }catch{
        var r=0;
      }
      return r;
    }
  }  
}
</script>

<style>
      .resourceIcon{
        font-size: 30px;
      }
      .infoBox{
        text-align: left;
      }
      .panelHeadArea{
        width:100% !important;
      }
      .panelTitle{
        font-weight: bold;
      }
      .panelInfo{
        color: #757575;
        font-size: 12px;        
      }
      .panelCaption{
        font-style: italic;
        color: darkgray;
        font-size: 12px;
      }
      .panelBody{
        font-size: 12px;
      }
      .definedOnContext{
        font-size: 14px;
        font-weight: bold;
        text-align: right;
      }
      .definedOnContextSmall{
        font-size: 11px;
        text-align: right;
      }
      .undefinedOnContext{
        font-size: 14px;
        font-weight: bold;
        text-align: right;
        color: red;
      }
      .amountItemOfListUnit{
        font-size: 9px;
      }
      .reportHeadNumberFont {
        font-size: 20px;
      }
      .actionFontMini{
        font-size: x-small;
      }
      .tabIcon{
        color:darkgrey;
      }
      .tabParent{
        width: 96px;
      }
      .reportAlert{
        color:red;
      }
      .reportSafe{
        color:green;
      }
      .referenceArea{
        color:darkgrey;
      }
</style>