<template>
<div class="panel">
  <PanelBar>
  </PanelBar>
  <ElList>
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
  props:[ 'panelId' ]

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