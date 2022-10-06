import { reactive } from 'vue'
import axios from "axios";
import {FileModel,FolderModel} from './main'


interface Store {
    endPoint: {dirList: string, diskPart: string},
    currentDir:Array<String>,
    dirList: Array<FileModel | FolderModel>[],
    panels: number[],
    diskPart: string[],
    fetchDiskPart(): void,
    fetchDirList(dir: string, panel: number): void

}
const api=axios.create({
    baseURL: 'http://127.0.0.1:5000/api/',
    headers:  { 'Content-Type': 'application/json', "Access-Control-Allow-Methods": "GET","Access-Control-Allow-Origin":"*"  }
})


 export const state = reactive<Store>({
     currentDir: [],
     endPoint: {
         dirList: 'dirList',
         diskPart: 'diskPart'

     },
     dirList: [],
    panels: [0,1] ,
    diskPart: [],
     fetchDiskPart() {
         api
             .get(state.endPoint.diskPart)
             .then(response => (state.diskPart=response.data)).catch(e=>(console.log('Error fetchDiskPart'+e)))
     },
     fetchDirList(dir: string, panel: number) {
         api
             .get(state.endPoint.dirList+'?path='+dir)
             .then(response => {state.dirList[panel]=response.data; }).catch(e=>(console.log('Error fetchDirList'+e)))
         state.currentDir[panel]=dir;
     }

 })


export default {
    state: state,
};