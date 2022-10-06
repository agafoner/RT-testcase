<template>
<div class="panelBar inline">
  <select v-model="selectedDisk" @change="selectDisk(selectedDisk)" >
    <option v-for="partition in $store.state.diskPart" >{{partition}}</option>
  </select>
  <label>{{ pathNormalized }}</label>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "PanelBar",
  props:[ 'panelId' ],
  computed: {
    pathNormalized (): String {
      if (!this.$store.state.currentDir[this.$props.panelId]) return '-'
      return this.$store.state.currentDir[this.$props.panelId].replaceAll('\\','/')
    }
  },
  data() {
    return {
      selectedDisk: 'C:'
    }
  },
  mounted() {
    this.$store.state.fetchDiskPart()
  },
  methods: {
    selectDisk: function (partition: string) {
      console.log("selectDisk")
      this.$store.state.fetchDirList(partition+'/',this.$props.panelId);

    }
  },



})
</script>

<style scoped>
.panelBar{
  display: flex;
  height: 30px;
}
select {
  max-width: 50px;
}
label {
  width: 90%;
}
</style>