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
      {{row.size}}
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