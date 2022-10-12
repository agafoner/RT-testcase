<template>
<div>
  <img class="icon" v-if="row.type=='folder'" src="@/assets/icons/folder.png" />
  <img class="icon" v-else-if="icons.hasOwnProperty(fileType)" :src="iconFullPath" /> <!-- TODO: Проблема с путём -->
  <img class="icon" v-else src="@/assets/icons/file.png" />
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent ({
  name: "FileIcon",
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
    data() {
      return {
        icons:<{[index:string]:any}> {
          'exe':'icon-exe.png',
          'jpg': 'icon-exe.png'
        }
      }
    },
    computed: {
      fileType(): string {
          return this.row.name.split('.').slice(-1)
      },
      iconFullPath(): string{
        const icon: string =this.fileType
        return "@/assets/icons/"+this.icons[icon]
      }
    }

})
</script >

<style scoped>
.icon{
  height: 18px;
}
</style>