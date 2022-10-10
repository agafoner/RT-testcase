<template>
<div class="element inline"
     :class="{selected : isSelected}"
     @dblclick="$emit('chDir',normalizedName, row.type)"
     @click="this.$store.state.panels_new[panelId].toggleSelected(row,panelId)"
>
  <div class="element-icon">
    {{ '-' }}
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
    },
      panelId: {
        type: Number,
        required: true,
      },
  },
  mounted () {
  },
  // methods: {
  //   toggleSelected(row,panelId): void {
  //     this.row.toggleSelected(row,panelId)
  //     // this.row.isSelected=!this.row.isSelected
  //   },
  // },
  data() {
    return {
    }
  },
  computed:  {
    normalizedName(): string {
      return this.row.name.replaceAll('\\','/')
    },
    isSelected(): boolean{
      return this.row.isSelected
    }
  },
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
.selected{
  background-color: darkgrey;
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