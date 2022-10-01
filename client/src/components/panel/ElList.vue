<template>
<div class="forDraft elList">
  <FileElement v-for="file in files" :fileData="file"></FileElement>
</div>
</template>

<script>


import FileElement from "@/components/panel/FileElement";

export default {
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
}
</script>

<style scoped>
.elList {
  height: calc(100% - 35px);
}
</style>