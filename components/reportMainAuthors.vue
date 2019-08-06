<i18n src="@/assets/i18n/en.json"></i18n>
<i18n src="@/assets/i18n/ja.json"></i18n>
<i18n src="@/assets/i18n/others.json"></i18n>


<template>
 <div>
    <v-icon class="categoryIcon">people</v-icon>
    <div class="reportHeadNumberFont">{{this.authorMembers}} </div>
    <div class="mb-3">{{this.$t.bind(this)("cdd.infoObj.authors.t")}} </div>
    <v-alert :value="true" color="#F5F5F5" class="infoBox alertCaption pt-0 pb-0 pr-0 pl-0 mt-3 mb-3">
      <v-container fill-height class="pl-0 pt-0 pb-0 pr-0 reportSectionMenuContainer">
        <v-spacer></v-spacer>
        <v-btn class="actionFontMini" flat small @click="all"><span class="alertCaption" v-t="'expandAll'" /></v-btn>
        <v-btn class="actionFontMini" flat small @click="none"><span class="alertCaption" v-t="'shrinkAll'" /></v-btn>
      </v-container>
    </v-alert>
    <v-expansion-panel v-model="panel" expand>
      <v-expansion-panel-content v-for="(item,key) in this.authors" :key="key">
        <template v-slot:header>
          <v-list-tile-avatar>
              <v-icon class="pr-2">{{item.avatar}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content class="panelHeadArea">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title class="panelCaption">{{ item.uri }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <div class="pl-3 ml-5 mr-2 mb-2">
          <v-card flat color="#f5f5f5">
            <v-card-text class="pt-3 pl-3 pr-2 pb-1 panelTitle">
                <span v-t="'definition'" />
            </v-card-text>
            <v-card-text class="pt-0 pl-3 pr-3 pb-2 panelInfo">
              <span v-t="'participationPeriod'" />: {{ item.joined }} ~ {{item.leaved}}
            </v-card-text>
            <v-card-text class="pt-0 pl-3 pr-3 pb-2 panelInfo">
              <div>
                <span v-for="(subItem,i2) in item.roles" :key="i2">
                    <v-chip small class="allocaionChip" color="gray"><span v-t="subItem" /></v-chip>&nbsp;
                </span>
              </div>
            </v-card-text>
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
    authors: Object,
    authorMembers: Number
  },
  data() {
    return{
      panel:[]
    }
  },

  mounted () {
  },

  computed: {
    ...mapGetters({
    })
  },

  methods: {
    all () {
      this.panel = [...Object.keys(this.authors)].map(_ => true)
    },
      // Reset the panel
    none () {
      this.panel = []
    }
  }  
}
</script>
<style>
      .categoryIcon{
        font-size: 32px !important;
      }
</style>