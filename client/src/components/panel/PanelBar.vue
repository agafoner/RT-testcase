<template>
<div class="panelBar">
  <select>
    <option>c:</option>
  </select>
  <label>C://Windows</label>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";


export default defineComponent({
  name: "PanelBar"
})
</script>

<style scoped>
.panelBar{
  height: 30px;
}
</style>