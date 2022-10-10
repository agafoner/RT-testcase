<template>
  <div class="panel" :class="{'panel-active' : panel.state.isActive}">
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
    isPanelActive() {
      return this.panel.state.isActive
    }
  },
  mounted() { },
  provide() {
    return {
      panel: this.panel
    }
  }
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
.panel-active {
  background: lightgray;
}
</style>
