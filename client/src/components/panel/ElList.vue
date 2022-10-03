<template>
<div class="el-List">
  <FileElement v-for="file in files" :fileData="file"></FileElement>
</div>
</template>

<script lang="ts">
import FileElement from "@/components/panel/FileElement";
import {defineComponent} from "vue";


export default defineComponent({
  name: "ElList",
  components: {FileElement},
  data() {
    return {
      files: [
        {name:'file.jpg', size:111, date:1111},
        {name:'file2.jpg', size:1113, date:1112},
        {name:'file3.jpg', size:1211, date:11121}]
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