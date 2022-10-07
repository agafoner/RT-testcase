<template>
<div class="el-List" >
  <div v-if="!!upperDir" class="inline" @dblclick="changeDir(upperDir)">
    {{ upperDir.join('/') }}
  </div>
  <FileElement v-if="!!$props.dirList" v-for="row in $props.dirList"  :row="row" @chDir="selectDir"></FileElement>
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
    selectDir: function (name: string, clickedObjType: string) {
      if (clickedObjType!=='folder') return
      this.$store.state.fetchDirList(name,this.$props.panelId)
    },
    changeDir: function (dir: string[]) {
      console.log('ChangeDir',dir)
      this.$store.state.fetchDirList(dir[dir.length-1],this.$props.panelId)
    }
  },
  computed: {
      upperDir () : string[] | boolean {
        let str =this.$store.state.currentDir[this.$props.panelId]
        if (!str) return false
        str.pop();
        return str
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