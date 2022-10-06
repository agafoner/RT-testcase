<template v-if="!!this.$store.state.currentDir[panelId]">
<div class="panel-bar inline">
  <select v-model="selectedDisk" @change="selectDisk(selectedDisk)" > <!-- Не могу сообразить, как сделать, чтобы при монтировании в select'e нужный диск. Пробовал вотчером и через computed - получается лабуда. -->
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
    },
    // selectedDisk: function () {
    //   return this.$store.state.diskPart[0];
    // }
  },
  data() {
    return {
      selectedDisk: '',
    }
  },
  mounted() {
    this.$store.state.fetchDiskPart()
  },
  methods: {
    selectDisk: function (partition: string) {
      this.selectedDisk=partition;
      this.$store.state.fetchDirList(partition+'/',this.$props.panelId);

    }
  },



})
</script>

<style scoped>
.panel-bar{
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