<template>
  <v-app>
    <v-toolbar dense :clipped-left="clipped" :fixed="fixed" app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-dialog v-model="dialog" scrollable max-width="300px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" small outline v-on="on">{{localeStr}}</v-btn>
        </template>
        <v-card>
          <v-card-title class="dialogColor">Select language</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="dialogContent" style="height: 300px;">
            <v-list dense>
              <div v-for="item in this.$i18n.locales" :key="item.code">
                <v-list-tile :key="item.code" @click="changeLanguage(item.code)">
                  <v-list-tile-content class="dialogListItem">
                    <v-list-tile-title v-html="item.name"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </div>
            </v-list>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-content>
      <v-container fluid ma-0 pa-0 fill-height>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <v-spacer /><span class="pr-3">&nbsp; &copy; 2019 REINDEER TECHNOLOGY PTE. LTD.</span>
    </v-footer>
  </v-app>
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
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'bubble_chart',
          title: 'Cloud Design Root',
          to: '/editor'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Reindeer Editor 0.1.0',
      locale: this.$i18n.locale,
      dialog: false
    }
  },
  computed: {
    editorlayout:{
      get() {
        return this.$store.getters['editor/editorlayout']
      },
      set(val){
        this.$store.dispatch('editor/setEditorlayout',val)
      }
    },
    localeStr:{
      get(){
        var res="Unknown language"
        this.$i18n.locales.forEach(element => {
          if(element.code==this.locale){
            if(element.name){
              res=element.name;
            }
          }
        });
        return res;
      }
    }
  },
  methods: {
    setEditorLayout(val){
      this.editorlayout=val;
    },
    changeLanguage(code){
        if(code=="en"){
          window.location.href = "/";
        }else{
          window.location.href = "/"+code+"/";
        }
    }
  }
}
</script>
<style>
      .dialogColor{
        color:white;
        background-color:#9FA8DA!important;
        padding-top:10px!important;
        padding-bottom:10px!important;
      }
      .dialogContent{
        padding-top:5px!important;
        padding-bottom:5px!important;       
        padding-left:5px!important;       
        padding-right:5px!important;
      }
      .dialogListItem{
        height: 20px;
        font-size:12px;
      }
</style>