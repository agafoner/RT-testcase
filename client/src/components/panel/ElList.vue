<template>
  <div class="el-List">
    <div v-if="panel.state.history.length!==0"
         class="inline"
         @dblclick="selectDir(undefined,'folder')"
    >
      {{" <= Назад  " + upperPath}}
    </div>
    <FileElement
      v-for="row in dirList"
      :row="row"
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
      this.panel.changeHistory(folderName);
    },
    // toggleSelect: function (row: Object) {
    //   row.isSelected=!row.isSelected;
    // }
  },
  computed: {
    upperPath(): string{
      let history = this.panel.state.history.slice(0)
      history.pop()
      return this.panel.state.selectedStore+history.join('')
    },
  },
});
</script>

<style scoped>
.el-List {
  padding: 10px;
  flex-grow: 1;
}
</style>
