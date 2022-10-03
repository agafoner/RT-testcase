<template>
<div class="element inLine">
  {{fileData.name}}
  {{fileData.size}}
  {{fileData.date}}
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";


export default defineComponent({
  name: "Element",
  props: {
    fileData: {
      type: Array
    }

  }
})
</script>

<style scoped>
.element{
  height: 20px;
  margin:auto;
}
</style>