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
    rootDocumentID: "cloudDesignRoot",
    rootDocumentFileName: "cloudDesign.json",
    currentCodeID: "cloudDesignRoot",
    editorlayout: 6,
    editorTab: 0
})
  
export const getters = {
    rootDocumentID (state){
        return state.rootDocumentID;
    },
    rootDocumentFileName(state){
        return state.rootDocumentFileName;
    },
    currentCodeID (state) {
        return state.currentCodeID;
    },
    editorTab(state){
        return state.editorTab;
    }
}

export const mutations = {
    setCurrentCodeID(state, value){
        state.currentCodeID = value
    },
    setRootDocumentFileName(state, value){
        state.rootDocumentFileName = value
    },
    setEditorTab(state, value){
        state.editorTab = value
    }
}
  
export const actions = {
    async setCurrentCodeID(context, value){
        context.commit('setCurrentCodeID', value)
    },
    async setRootDocumentFileName(context, value){
        context.commit('setRootDocumentFileName', value)
    },
    async setEditorTab(context, value){
        context.commit('setEditorTab', value)
    }  
}