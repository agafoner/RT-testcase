<template>
  <div class="panel" :class="{'panel-active' : panel.state.isActive}" @click="panel.setActivePanel()">
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
  mounted() { },
  provide() {
    return {
      panel: this.panel
    }
  }
});
</script>

<style scoped>
.panel-active {
  background: #e7e7e7;
}
</style>
