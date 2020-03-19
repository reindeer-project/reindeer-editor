<i18n src="@/assets/i18n/en.json"></i18n>
<i18n src="@/assets/i18n/ja.json"></i18n>
<i18n src="@/assets/i18n/others.json"></i18n>

<template>
  <v-card flat class="pl-2 pr-2">
    <v-card-text class="text-xs-center">
        <p class="pt-3">Cloud Design Definition | Reindeer {{this.info_reindeer}}</p>
        <h1 class=".font-weight-regular .display-1">{{this.info_title}}</h1>
        <v-chip small>{{this.info_version}}</v-chip>

        <div class="pt-1 license"><span v-t="'license'" />:  {{this.info_license}}</div>
        <div class="pt-1 description"><span v-t="this.info_status" />&nbsp;/&nbsp;{{this.info_designedAt}}</div>

        <v-card class="pt-1 pb-3 description" flat>{{this.info_description}}</v-card>

        <v-tabs class="pt-2" centered extension-height="105" height="105">
        <v-tabs-slider color="#304FFE"></v-tabs-slider>

          <v-tab href="#tabActors">
            <v-layout row wrap class="tabParent">
              <v-flex xs12 class="tabIcon pb-2"><v-icon>fas fa-user</v-icon></v-flex>
              <v-flex xs12 class="reportHeadNumberFont">{{this.structure.actorItems}}</v-flex>
              <v-flex xs12 class="tabMenuFontMini pt-2"><span v-t="'cdd_actors_t'" /></v-flex>
            </v-layout>
          </v-tab>

          <v-tab href="#tabResources">
            <v-layout row wrap class="tabParent">
              <v-flex xs12 class="tabIcon pb-2"><v-icon>fas fa-server</v-icon></v-flex>
              <v-flex xs12 class="reportHeadNumberFont">{{this.structure.resourceItems}}</v-flex>
              <v-flex xs12 class="tabMenuFontMini pt-2"><span v-t="'cdd_resources_t'" /></v-flex>

            </v-layout>
          </v-tab>

          <v-tab href="#tabContexts">
            <v-layout row wrap class="tabParent">
              <v-flex xs12 class="tabIcon pb-2"><v-icon>fas fa-route</v-icon></v-flex>
              <v-flex xs12 class="reportHeadNumberFont">{{this.structure.contextItems}}</v-flex>
              <v-flex xs12 class="tabMenuFontMini pt-2"><span v-t="'cdd_contexts_t'" /></v-flex>
            </v-layout>
          </v-tab>

          <v-tab-item class="pt-2" value="tabActors">
              <reportMainActors ref="reportMainActors" v-bind:actors="this.structure.actors" v-bind:actorMembers="this.structure.actorMembers" />
          </v-tab-item>
          <v-tab-item class="pt-2" value="tabResources">
              <reportMainResources ref="reportMainResources" v-bind:resources="this.structure.resources" />
          </v-tab-item>
          <v-tab-item class="pt-2" value="tabContexts" :touchless="true">
              <reportMainContexts ref="reportMainContexts" v-bind:contexts="this.structure.contexts" />
          </v-tab-item>

        </v-tabs>

    </v-card-text>

    <template>
      <v-divider class="ml-3 mr-3"></v-divider>
      <v-footer height="auto" class="ml-3 mr-3">
        <v-card-text class="text-xs-center">
          <reportMainAuthors ref="reportMainAuthors" v-bind:authors="this.structure.authors" v-bind:authorMembers="this.structure.authorMembers" />
        </v-card-text>
      </v-footer>
    </template>
  </v-card>
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
import reportMainActors from '~/components/reportMainActors.vue'
import reportMainResources from '~/components/reportMainResources.vue'
import reportMainContexts from '~/components/reportMainContexts.vue'
import reportMainAuthors from '~/components/reportMainAuthors.vue'

export default {
  components: {
    reportMainActors,
    reportMainResources,
    reportMainContexts,
    reportMainAuthors
  },

  data() {
    return{
    }
  },

  mounted () {
  },

  computed: {
    ...mapGetters({
      rootDocumentID: 'editor/rootDocumentID',
      listRoots: 'codes/listRoots',
      listRefs: 'codes/listRefs',
      listItem: 'codes/listItem',
      listCDD: 'codes/listCDD',
      typeItem: 'codes/typeItem',
      structure: 'structure/dataObject'
    }),

    info_reindeer:{get(){try{
      return this.listRoots[0]["dataObject"]["reindeer"].slice(0,10);
    }catch(e){return "";}}},

    info_version:{get(){try{
      return this.listRoots[0]["dataObject"]["info"]["version"].slice(0,30);
    }catch(e){return "";}}},

    info_license:{get(){try{
      return this.listRoots[0]["dataObject"]["info"]["license"]["type"].slice(0,100);
    }catch(e){return "";}}},

    info_title:{get(){try{
      return this.listRoots[0]["dataObject"]["info"]["title"][this.$i18n.locale].slice(0,30);
    }catch(e){return this.$t.bind(this)("notDefinedByThisLanuguage");}}},
   
    info_description:{get(){try{
      return this.listRoots[0]["dataObject"]["info"]["description"][this.$i18n.locale].slice(0,300);
    }catch(e){return this.$t.bind(this)("notDefinedByThisLanuguage");}}},

    info_status:{get(){try{
      return ["idea","draft","production"].indexOf(this.listRoots[0]["dataObject"]["info"]["status"]) > 0 ? this.listRoots[0]["dataObject"]["info"]["status"] : "UnknownState"
    }catch(e){return "idea";}}},

    info_designedAt:{get(){try{
      var d = new Date(this.listRoots[0]["dataObject"]["info"]["designedAt"]*1000);
      return d.getFullYear() + "-" + String(Number(d.getMonth()) + 1) + "-" + d.getDate();
    }catch(e){return "";}}},

  },

  methods: {
    convertCodeTypeForDisplay(fmt, lang){
        if(this.typeItem({"fmt":fmt,"lang":lang})){
          return this.typeItem({"fmt":fmt,"lang":lang})[0];
        }else{
          return "Not supported type";
        }
    }
  }  
}
</script>

<style>
      .reportHeadNumberFont {
        font-size: 20px;
      }
      .tabMenuFontMini{
        font-size: 9pt !important;
      }
      .narrowMenu{
        height: 10px;
      }
      .license{
        font-weight: bold;
      }
      .description{
        font-style: italic;
        color:darkgrey !important;
      }
      .tabIcon{
        color:darkgrey !important;
      }
      .tabParent{
        width: 85px;
      }
      .reportAlert{
        color:red;
      }
      .reportSafe{
        color:green;
      }
      .reportSectionMenuContainer{
        background-color: #EEEEEE!important;
        max-width: initial;
      }
</style>