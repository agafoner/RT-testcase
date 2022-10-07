<template >
<div class="panel-bar inline">
  <select  v-model="selectedDisk" @change="selectDisk($event.target.value)" > <!-- TODO: Не могу сообразить, как сделать, чтобы при монтировании в select'e нужный диск. Пробовал вотчером и через computed - получается лабуда. -->
    <option v-for="partition in $store.state.diskPart" >{{partition}}</option>
  </select>
  <label v-if="!!pathNormalized" >{{$store.state.currentDir[this.panelId]}}</label> <!-- TODO: вот этот компонент не подтягивает данные при запуске. -->
</div>
</template>

<script lang="ts">
import {defineComponent, nextTick} from "vue";

export default defineComponent({
  name: "PanelBar",
  props:[ 'panelId' ],
  data() {
    return {
    }
  },
  computed: {
    pathNormalized (): string[] | undefined{
      if (!!this.$store.state.currentDir[this.panelId])
        // console.log('pathNormalize d',this.$store.state.currentDir[0],this.$props.panelId)
        return this.$store.state.currentDir[this.$props.panelId]
    },
    selectedDisk (): string | void {
      if (!!this.$store.state.currentDir[this.$props.panelId])
      return this.$store.state.currentDir[this.$props.panelId][0]+'/';
     }
  },
  mounted() {
    this.$store.state.fetchDiskPart(this.panelId)
    // console.log('Mounted,',this.$store.state.currentDir[this.panelId][0],this.panelId)
    // this.selectedDisk=this.$store.state.currentDir[this.panelId][0]
  },
  methods: {
    selectDisk: function (partition: string) {
      if (!!partition || !!this.$props.panelId)
      this.$store.state.changeDisk(partition,this.$props.panelId);
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