import { reactive } from 'vue'
import axios from "axios";

interface Store {
    api: {dirList: string, diskPart: string},
    panels: number[],
    diskPart: string[],
    fetchDiskPart(): void

}
const api=axios.create({
    baseURL: 'http://127.0.0.1:5000/api/',
    headers:  { 'Content-Type': 'application/json', "Access-Control-Allow-Methods": "GET","Access-Control-Allow-Origin":"*"  }
})


 export const state = reactive<Store>({
     api: {
         dirList: 'dirList',
         diskPart: 'diskPart'

     },
    panels: [0,1] ,
    diskPart: [],
     fetchDiskPart() {
         console.log('axios started')
         api
             .get(state.api.diskPart)
             .then(response => (state.diskPart=response.data)).catch(e=>(console.log('Error apiGetDiskPart'+e)))
     }
 })


export default {
    state: state,
};