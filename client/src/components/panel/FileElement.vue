<template>
  <div class="element inLine" :class="{selected : isSelected}" @dblclick="$emit('chDir',normalizedName, row.type)"
    @click="toggleSelected">
    <div class="element-icon">
      <FileIcon :row="row"></FileIcon>
    </div>
    <div class="element-name">
      {{normalizedName}}
    </div>
    <div class="element-date">
      {{row.lastDateChange}}
    </div>
    <div class="element-size">
      {{row.type==='file'? normalizedSize : ''}}
    </div>
  </div>
</template>

<script lang="ts">
import { IFilesUI, PanelModel } from "@/store";
import { defineComponent } from "vue";
import FileIcon from "@/components/panel/FileElement/FileIcon.vue";


export default defineComponent({
  name: "Element",
  components: {FileIcon},
  inject: ['panel'],
  data() {
    return {
      injPanel: this.panel as unknown as PanelModel
    }
  },
  props: {
    row: {
      type: Object,
      required: true,
    }
  },
  methods: {
    toggleSelected(): void {
      this.injPanel.toggleSelected(this.row as IFilesUI);
    }

  },
  computed: {
    normalizedName(): string {
      return this.row.name.replaceAll('\\', '/')
    },
    isSelected(): boolean {
      return this.row.isSelected
    },
    normalizedSize(): string{
      let s1: number=this.row.size
      if (!s1) return '0 b'
      let s2=0
      let digit=0;
      while (s1>1024 && digit<5) {
        digit++
        s2=s1%1024
        s1=(s1-s2)/1024

      }
      // const addition=(s2/1024).toFixed(3)*1000
      const addition=Math.round(s2/1024*100)
      switch (digit) {
        case 0:
          return s1+' b';
        case 1:
          return s1+','+addition+' Kb';
        case 2:
          return s1+','+addition+' Mb';
        case 3:
          return s1+','+addition+' Gb';
        case 4:
          return s1+','+addition+' Tb';
        case 5:
          return s1+','+addition+' Pb';
        default:
          return '-'
      }

    }
  },
})
</script>

<style scoped>
div {
  border-style: none;
}

.element {
  border-style: solid;
  display: flex;
  height: 20px;
  margin: auto;
}

.selected {
  background-color: darkgrey;
}

.element-icon {
  width: 10%;
}

.element-name {
  overflow:hidden;
  width: 35%;
}

.element-date {
  overflow:hidden;
  width: 40%;
}

.element-size {
  width: 15%;
}
</style>