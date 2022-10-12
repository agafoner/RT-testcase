<template>
  <div class="el-List">
    <div v-if="!!panel.state.history.length"
         class="inline"
         @dblclick="selectDir(undefined,'folder')"
    >
      {{" <= Назад  " + panel.getPrevPath()}}
    </div>
    <FileElement
      v-for="row in dirList"
      :row="row"
      :panelId="panelId"
      @chDir="selectDir"
    ></FileElement>
  </div>
</template>
<script lang="ts">
import FileElement from "@/components/panel/FileElement.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ElList",
  components: { FileElement },
  props: {
    panelId: {
      type: Number,
      required: true,
    },
    dirList: {
      required: true,
    },
  },
      data() {
        return {
          panel: this.$store.state.panels_new[this.panelId],
        };
      },

  methods: {
    selectDir: function (folderName: string, clickedObjType: string) {
      if (clickedObjType !== "folder") return;
      this.panel.changeDirectory(folderName);
    },
  },
});
</script>

<style scoped>
.el-List {
  padding: 10px;
  flex-grow: 1;
  overflow: auto;
}
</style>
