<template>
<div class="panel">
  <PanelBar :panelId="panelId">
  </PanelBar >
<!--  <ElList v-if="$store.state.dirList[this.panelId]!=={}" :dirList="$store.state.dirList[this.panelId]">-->
  <ElList  :dirList="$store.state.dirList[this.panelId]" :panelId="this.panelId">
  </ElList>
</div>
</template>

<script lang="ts">
import ElList from "@/components/panel/ElList.vue";
import PanelBar from "@/components/panel/PanelBar.vue";
import {defineComponent} from "vue";


export default defineComponent({
  name: "Panel",
  components: {PanelBar,ElList},
  props:[ 'panelId' ],
  mounted() {
       // this.$store.state.fetchDirList('C:/',this.panelId)
  }

})
</script>

<style scoped>
.panel{
  height: 100%;
  width: 35%;
  min-width: 400px;
  max-width: 800px;
  display:flex;
  flex-direction: column ;


}
</style>