<template>
<div class="panel forDraft">
  <PanelBar>

  </PanelBar>
  <ElList>

  </ElList>
</div>
</template>

<script>

import ElList from "@/components/panel/ElList";
import PanelBar from "@/components/panel/PanelBar";
export default {
  name: "Panel",
  components: {PanelBar,ElList}

}
</script>

<style scoped>
.panel{
  height: 600px;
  width: 35%;
  min-width: 400px;
  max-width: 800px;


}
</style>