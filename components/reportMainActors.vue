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
      <v-expansion-panel-content v-for="(item,key) in this.actors" :key="key">
        <template v-if="item.referencedState!='unusedComponent'" v-slot:header>
          <v-list-tile-avatar>
              <v-icon class="pr-2">{{item.avatar}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content class="panelHeadArea">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title class="panelCaption">{{ item.key }}</v-list-tile-sub-title>
              <v-list-tile-title class="amountItemOfList pr-2">
                <v-spacer></v-spacer>{{ item.numbers.toLocaleString() }}
                <span class="amountItemOfListUnit pl-1" v-t="'members'" />
              </v-list-tile-title>
          </v-list-tile-content>

        </template>
        <div class="pl-3 ml-5 mr-2 mb-2" v-if="item.referencedState!='unusedComponent'">
          <v-card flat color="#f5f5f5">
            <v-card-text class="pt-3 pl-3 pr-2 pb-1 panelTitle">
              <span v-t="'usages'" />
            </v-card-text>
            <v-card-text class="pt-1 pl-3 pr-2 pb-3 panelInfo">
              <span v-t="'allocatedContext'" />:&nbsp;
              <span v-t="'notDefined'" v-if="item.defined.length==0"/>
              <span v-for="(subItem,i2) in item.defined" :key="i2"><v-chip small class="allocaionChip" color="white">{{subItem.key}}&nbsp;&nbsp;[Drawing ID: {{subItem.id}}]</v-chip>&nbsp;</span>
            </v-card-text>
            <v-divider></v-divider>

            <div v-if="item.type=='market'">
              <v-card-text class="pt-3 pl-3 pr-2 pb-1 panelTitle">
                <span v-t="'definition'" />
              </v-card-text>
              <v-card-text class="pt-1 pl-3 pr-3 pb-1 panelBody">{{ item.description }}</v-card-text>
              <v-card-text class="pt-0 pl-3 pr-3 pb-2 panelInfo">
                <span class="fieldName" v-t="'calcBasis'" />:&nbsp;
                &nbsp;<span v-t="'marketSize'"/>&nbsp;{{item.market.num.toLocaleString()}}
                &nbsp;x&nbsp;<span v-t="'share'"/>&nbsp;{{parseFloat(item.marketShare)*100}}%
              </v-card-text>
              <v-card-text v-if="!item.sourceIdentification" class="pt-0 pl-3 pr-3 pb-1 panelCaption"><span v-t="'nosourceIdentification'" /></v-card-text>
              <v-card-text v-if="item.sourceIdentification" class="pt-0 pl-3 pr-3 pb-1 panelCaption"><span v-t="'identificationGroup'" />:&nbsp;&nbsp;{{item.identificationGroup}}</v-card-text>
              <div class="mr-3 ml-3 pb-2">
                <v-alert :value="true" class="pt-2 pb-3 pl-3 pr-1" color="#7986CB" icon="insert_chart_outlined" outline>
                  <div class="marketBox">
                    <v-card-text class="pt-0 pl-0 pr-3 pb-0 panelInfo">
                      <span class="fieldName" v-t="'marketTitle'" />:&nbsp;&nbsp;{{item.market.title}}
                    </v-card-text>
                    <v-card-text class="pt-0 pl-0 pr-3 pb-0 panelInfo">
                      <span class="fieldName" v-t="'marketSize'" />:&nbsp;&nbsp;{{item.market.num.toLocaleString()}}
                    </v-card-text>
                    <v-card-text class="pt-0 pl-0 pr-3 pb-0 panelInfo">
                      <span class="fieldName" v-t="'marketDescription'" />:&nbsp;&nbsp;{{item.market.description}}
                    </v-card-text>
                    <v-card-text class="pt-0 pl-0 pr-3 pb-0 panelInfo">
                      <span class="fieldName" v-t="'estimatedBy'" />:&nbsp;&nbsp;{{item.market.estimatedBy}}
                    </v-card-text>
                    <v-card-text class="pt-0 pl-0 pr-3 pb-0 panelInfo">
                      <span class="fieldName" v-t="'estimatedAt'" />:&nbsp;&nbsp;{{item.market.estimatedAt}}
                    </v-card-text>
                    <v-card-text v-if="item.market.key!=''" class="pt-0 pl-0 pr-3 pb-0 panelInfo panelCaption">
                      {{item.market.key}}
                    </v-card-text>
                  </div>
                </v-alert>
              </div>
            </div>
            <div v-if="item.type=='persons'">
              <v-card-text class="pt-3 pl-3 pr-2 pb-1 panelTitle">
                <span v-t="'definition'" />
              </v-card-text>
              <v-card-text class="pt-0 pl-3 pr-3 pb-1 panelBody">{{ item.description }}</v-card-text>
              <v-card-text v-if="!item.sourceIdentification" class="pt-0 pl-3 pr-3 pb-3 panelCaption"><span v-t="'nosourceIdentification'" /></v-card-text>
              <v-card-text v-if="item.sourceIdentification" class="pt-0 pl-3 pr-3 pb-3 panelCaption"><span v-t="'identificationGroup'" />:&nbsp;&nbsp;{{item.identificationGroup}}</v-card-text>
            </div>
            <div v-if="item.type=='externalSystem'">
              <v-card-text class="pt-3 pl-3 pr-2 pb-1 panelTitle">
                <span v-t="'definition'" />
              </v-card-text>
              <v-card-text class="pt-0 pl-3 pr-3 pb-1 panelBody">{{ item.description }}</v-card-text>
              <v-card-text v-if="!item.sourceIdentification" class="pt-0 pl-3 pr-3 pb-3 panelCaption"><span v-t="'nosourceIdentification'" /></v-card-text>
              <v-card-text v-if="item.sourceIdentification" class="pt-0 pl-3 pr-3 pb-3 panelCaption"><span v-t="'identificationGroup'" />:&nbsp;&nbsp;{{item.identificationGroup}}</v-card-text>
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
    actors: Object
  },
  data() {
    return{
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
      this.panel = [...Object.keys(this.actors)].map(_ => true)
    },
      // Reset the panel
    none () {
      this.panel = []
    }
  }  
}
</script>

<style>
      .fieldName{
        color: black;
        font-weight:500;
      }
      .marketBox{
        width: 90%;
        word-break: break-all;
      }
      .infoBox{
        text-align: left;
      }
      .alertCaption{
        color: #424242;
      }
      .normalCaptionBold{
        font-size: 14px !important;
        font-weight: bold;
        color: green;
      }
      .alertCaptionBold{
        font-size: 14px !important;
        font-weight: bold;
        color: red;
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
</style>