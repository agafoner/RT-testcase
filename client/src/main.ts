import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import {FileModel,FolderModel,IFileTransfer} from '../../api/src/model/FileSystemModel'
export {FileModel,FolderModel,IFileTransfer};

const app = createApp(App)
app.config.globalProperties.$store=store
app.mount('#app')
