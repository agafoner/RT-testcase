<template>
<div class="el-List">

  <FileElement v-for="row in $props.dirList" v-if="$props.dirList!==null" :row="row"></FileElement>
</div>
</template>
<script lang="ts">
import FileElement from "@/components/panel/FileElement.vue";
import {defineComponent} from "vue";


export default defineComponent({
  name: "ElList",
  components: {FileElement},
  props: {
    dirList: {
      required: true
    }
    }
  ,
  data() {
    return {}
  },

})
</script>

<style scoped>
.el-List {
  padding: 10px;
  flex-grow: 1;
}

</style>