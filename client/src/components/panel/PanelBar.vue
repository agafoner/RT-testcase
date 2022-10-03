<template>
<div class="panelBar">
  <select>
    <option v-for="partition in store.state.getDiskPart()">{{partition}}</option>
  </select>
  <label>C://Windows</label>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "PanelBar",
  inject: ["store"],

})
</script>

<style scoped>
.panelBar{
  height: 30px;
}
</style>