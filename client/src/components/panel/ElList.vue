<template>
<div class="el-List" >

  <FileElement v-for="row in $props.dirList" v-if="$props.dirList!==null" :row="row" @chDir="chDir"></FileElement>
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
    chDir: function (name: string, type: string) {
      console.log('chDir type: ', type)
      if (type!='folder') return
      const path=this.$store.state.currentDir[this.$props.panelId]+name
      console.log('chDir path:  ', path)
      this.$store.state.fetchDirList(path,this.$props.panelId)
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