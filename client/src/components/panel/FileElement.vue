<template>
<div class="element inLine">
  <div class="element-icon">
    --
  </div>
  <div class="element-name">
    {{row.name}}
  </div>
  <div class="element-date">
    {{row.lastDateChange}}
  </div>
  <div class="element-size">
    {{row.size}}
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";


export default defineComponent({
  name: "Element",
  props: ['row']
})
</script>

<style scoped>
div {
  border-style: none;
}
.element{
  border-style: solid;
  display: flex;
  height: 20px;
  margin:auto;
}
.element-icon {
  width: 10%;
}
.element-name {
  width: 35%;
}
.element-date {
  width: 40%;
}
.element-size {
  width: 15%;
}
</style>