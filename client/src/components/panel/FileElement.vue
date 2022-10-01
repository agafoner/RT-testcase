<template>
<div class="forDraft element inLine">
  {{fileData.name}}
  {{fileData.size}}
  {{fileData.date}}
</div>
</template>

<script>
export default {
  name: "Element",
  props: {
    fileData: {
      type: Array
    }

  }
}
</script>

<style scoped>
.element{
  width: calc(100% - 10px);
  height: 20px;
  margin:auto;
}
</style>