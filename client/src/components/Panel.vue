<template>
  <div class="panel">
    <PanelBar :panelId="panelId"> </PanelBar>
    <ElList :dirList="files" :panelId="panelId"> </ElList>
  </div>
</template>

<script lang="ts">
import ElList from "@/components/panel/ElList.vue";
import PanelBar from "@/components/panel/PanelBar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Panel",
  components: { PanelBar, ElList },
  props: {
    panelId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      panel: this.$store.state.panels_new[this.panelId],
    };
  },
  computed: {
    files() {
      return this.$store.state.panels_new[this.panelId].state.files;
    },
  },
  mounted() {},
});
</script>

<style scoped>
.panel {
  height: 100%;
  width: 35%;
  min-width: 400px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
}
</style>
