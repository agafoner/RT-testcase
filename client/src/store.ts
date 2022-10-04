import { reactive } from 'vue'

interface Store {
    panels: number[],
    diskPart: string[],
    getDiskPart(): string[]

}

 export const state = reactive<Store>({
    panels: [0,1] ,
    diskPart: [],
    getDiskPart() { // TODO: Взятие списка дисков с api через axios
        return this.diskPart=['C:','D:','E:']
    }
})

export default {
    state: state,
};