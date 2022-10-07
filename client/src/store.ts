import { reactive } from 'vue'
import axios from "axios";
import {FileModel,FolderModel} from './main'


interface Store {
    endPoint: {dirList: string, diskPart: string},
    // currentDir:Array<String>,
    currentDir:Array<string[]>,
    dirList: Array<FileModel | FolderModel>[],
    panels: number[],
    diskPart: string[],
    fetchDiskPart(panel: number): void,
    fetchDirList(dir: string, panel: number): void
    callCurrentDir(): void
    changeDisk(disk: string,panel: number) : void

}
const api=axios.create({
    baseURL: 'http://127.0.0.1:5000/api/',
    headers:  { 'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*"  }
})


 export const state = reactive<Store>({
     currentDir: [], //TODO: Вот  с этими данными проблема. При запуске приложения туда записывается путь, начиная с диска
     endPoint: {
         dirList: 'dirList',
         diskPart: 'diskPart'

     },
     dirList: [],
     panels: [0,1] ,
     diskPart: [],
     fetchDiskPart: function (panel) {
         api
             .get(this.endPoint.diskPart)
             .then(response => {
                 let diskPart: string[] = response.data
                 this.diskPart = diskPart.map(el => el + '/')
                     this.fetchDirList(this.diskPart[0],panel)

             })
             .catch(e => (console.log('Error fetchDiskPart' + e)))
         return true
     },
     changeDisk: function (disk,panel) {
         state.currentDir[panel]=[]
         this.fetchDirList(disk,panel)
     },
     fetchDirList:  function (dir: string, panel: number) {
         console.log('state.currentDir[panel]',state.currentDir[panel])
         if (!this.currentDir[panel]) {
             state.currentDir[panel] = [dir];
             console.log('TROUBLE')
         }
         else {
             console.log(state.currentDir[panel])
             state.currentDir[panel].push(dir);

         }
         api
             .get(state.endPoint.dirList + '?path=' + this.currentDir[panel].join('/'))
             .then(response => {
                 this.dirList[panel] = response.data;
             }).catch(e => (console.log('Error fetchDirList' + e)))

         console.log('state.currentDir[panel] = dir;',dir)
     },
     callCurrentDir: function () {

     }

 })


export default {
    state: state,
};