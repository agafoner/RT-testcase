<template>
  <div class="bottomBar inLine">
    <button class="button"> Copy</button>
    <button class="button"> Remove </button>
    <button class="button"> Delete</button>
  </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";


export default defineComponent({
  name: "BottomBar"
})
</script>

<style scoped>
.bottomBar{
  width:70%;
  margin:auto;
  height: 60px;
}
</style>