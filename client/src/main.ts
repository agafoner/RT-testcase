import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import {FileModel,FolderModel} from '../../api/src/model/FileSystemModel'
export {FileModel,FolderModel};

const app = createApp(App)
// app.provide("store", store)
app.config.globalProperties.$store=store
app.mount('#app')
