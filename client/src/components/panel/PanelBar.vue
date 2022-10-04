<template>
<div class="panelBar">
  <select>
    <option v-for="partition in $store.state.diskPart">{{partition}}</option>
  </select>
  <label>C://Windows</label>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import app from "@/App.vue";

export default defineComponent({
  name: "PanelBar",
  mounted() {
    this.$store.state.getDiskPart();  //TODO: вот здесь ошибка

  }

})
</script>

<style scoped>
.panelBar{
  height: 30px;
}
</style>