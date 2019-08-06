<i18n src="@/assets/i18n/en.json"></i18n>
<i18n src="@/assets/i18n/ja.json"></i18n>
<i18n src="@/assets/i18n/others.json"></i18n>

<template>
  <div> 
    <v-alert :value="true" color="#F5F5F5" class="infoBox alertCaption pt-0 pb-0 pr-0 pl-0 mt-3 mb-3">
      <v-container fill-height class="pl-3 pt-0 pb-0 pr-0 reportSectionMenuContainer">
        <v-spacer></v-spacer>
        <v-btn class="actionFontMini" flat small @click="all"><span class="alertCaption" v-t="'expandAll'" /></v-btn>
        <v-btn class="actionFontMini" flat small @click="none"><span class="alertCaption" v-t="'shrinkAll'" /></v-btn>
      </v-container>
    </v-alert>

    <v-expansion-panel v-model="panel" expand>
      <v-expansion-panel-content v-for="(item,key) in this.contexts" :key="key">
        <template v-slot:header>
          <v-list-tile-avatar>
              <v-icon class="pr-2">{{item["avatar"]}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content class="panelHeadArea">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title class="panelCaption">{{ item.key }}</v-list-tile-sub-title>
              <v-list-tile-sub-title class="panelCaption">{{ item.description }}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-if="isIE" class="loadingAttention"><span v-t="'ieDrawingSupport'" /></v-list-tile-sub-title>

              <v-list-tile-title class="definedOnContext pr-2">
                <v-spacer></v-spacer>
                Throughput from the trigger: {{item.externalTraffic.reqRPSMin}}~{{item.externalTraffic.reqRPSMax}}rps
              </v-list-tile-title>
              <v-list-tile-title class="definedOnContext pr-2">
                <v-spacer></v-spacer>
                IN (from actors):  {{item.externalTraffic.reqGBMin}}~{{item.externalTraffic.reqGBMax}}GB/Month
              </v-list-tile-title>
              <v-list-tile-title class="definedOnContext pr-2">
                <v-spacer></v-spacer>
                OUT (to actors): {{item.externalTraffic.resGBMin}}~{{item.externalTraffic.resGBMax}}GB/Month
              </v-list-tile-title>
              <v-list-tile-title class="definedOnContext pr-2">
                <v-spacer></v-spacer>
                Storage: {{item.storedDBMin}}~{{item.storedDBMax}}GB/Month
              </v-list-tile-title>
          </v-list-tile-content>
        </template>
        <div v-if="isIE" class="pl-3 ml-5 mr-4 mb-2" style="overflow:auto">
          <v-card flat>
            <div :ref="item.key"></div>
          </v-card>
        </div>
        <div v-if="!isIE" class="pl-3 ml-5 mr-4 mb-2">
          <v-card flat color="#f5f5f5">
            <div :ref="item.key"></div>
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
    contexts: Object
  },
  data() {
    return{
        isIE: false,
        panel: []
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
      this.panel = [...Object.keys(this.contexts)].map(_ => true)
    },
    // Reset the panel
    none () {
      this.panel = []
    }
  }  
}
</script>

<style>
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
      .amountItemOfList{
        font-size: 20px !important;
        font-weight: bold;
        text-align: right;
      }
      .amountItemOfListUnit{
        font-size: 9px;
      }
      .reportHeadNumberFont {
        font-size: 20px !important;
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




      a {
				color: #ffffff;
			}
			#info {
				position: absolute;
				width: 100%;
				color: #ffffff;
				padding: 5px;
				font-family: Monospace;
				font-size: 13px;
				font-weight: bold;
				text-align: center;
				z-index: 1;
			}
			#menu {
				position: absolute;
				bottom: 20px;
				width: 100%;
				text-align: center;
			}
</style>