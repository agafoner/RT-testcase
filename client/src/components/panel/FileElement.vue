<template>
<div class="element inLine" @dblclick="$emit('chDir',normalizedName, row.type)">
  <div class="element-icon">
    --
  </div>
  <div class="element-name">
    {{normalizedName}}
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
  // emits: {
  //   chDir: null
  // },
  props: {
    row: {
      type: Object,
      required: true,
    }
  },
  methods: {

  },
  data() {
    return {
    }
  },
  computed:  {
    normalizedName(): string {
      return this.row.name.replaceAll('\\','/')
    },
  }
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