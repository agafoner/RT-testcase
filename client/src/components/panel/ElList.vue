<template>
<div class="el-List" >
  <div v-if="!!upperDir" class="inline" @dblclick="changeDir(upperDir+'/')">
    {{ upperDir }}
  </div>
  <FileElement v-for="row in $props.dirList" v-if="!!$props.dirList" :row="row" @chDir="selectDir"></FileElement>
</div>
</template>
<script lang="ts">
import FileElement from "@/components/panel/FileElement.vue";
import {defineComponent} from "vue";


export default defineComponent({
  name: "ElList",
  components: {FileElement},
  props: {
    panelId: null,
    dirList: {
      required: true
      }
  },
  data() {
    return {}
  },

  methods: {
    selectDir: function (name: string, type: string) {
      if (type!='folder') return
      const path=this.$store.state.currentDir[this.$props.panelId]+name
      this.changeDir(path)
    },
    changeDir: function (dir: string) {
      this.$store.state.fetchDirList(dir,this.$props.panelId)
    }
  },
  computed: {
      upperDir () : string | boolean {
        console.log('upperDir')
        const str=this.$store.state.currentDir[this.$props.panelId]
        if (!str) return false
        let arr=str.replaceAll('\\','/').split('/')
        arr.pop()
        console.log(arr)
        if (str.length<=1) return false
        arr.pop()
        return arr.join('/');
      }
  }

})
</script>

<style scoped>
.el-List {
  padding: 10px;
  flex-grow: 1;
}

</style>