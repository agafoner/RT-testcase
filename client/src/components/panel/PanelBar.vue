<template>
  <div class="panel-bar inline">
    <select
      v-model="panel.state.selectedStore"
      @change="changePart($event.target.value)"
    >
      <!-- TODO: Не могу сообразить, как сделать, чтобы при монтировании в select'e нужный диск. Пробовал вотчером и через computed - получается лабуда. -->
      <option v-for="partition in $store.state.diskPart">
        {{ partition }}
      </option>
    </select>
    <label v-if="!!pathNormalized">{{
      $store.state.currentDir[panelId]
    }}</label>
    <!-- TODO: вот этот компонент не подтягивает данные при запуске. -->
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";

export default defineComponent({
  name: "PanelBar",
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
    pathNormalized(): string[] | undefined {
      if (!!this.$store.state.currentDir[this.panelId])
        // console.log('pathNormalize d',this.$store.state.currentDir[0],this.$props.panelId)
        return this.$store.state.currentDir[this.$props.panelId];
    },
  },
  mounted() {
    // this.$store.state.fetchDiskPart(this.panelId)
    // console.log('Mounted,',this.$store.state.currentDir[this.panelId][0],this.panelId)
    // this.selectedDisk=this.$store.state.currentDir[this.panelId][0]
  },
  methods: {
    changePart(value: string) {
      this.panel.setSelectedStore(value);
    },
  },
});
</script>

<style scoped>
.panel-bar {
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
