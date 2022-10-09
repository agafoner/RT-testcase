<template>
  <div class="panel-bar inline">
    <select
      v-model="panel.state.selectedStore"
      @change="changePartition($event.target.value)"
    >
      <option v-for="partition in $store.state.diskPart">
        {{ partition }}
      </option>
    </select>
    <label >{{
        pathNormalized
    }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
    pathNormalized(): string  {
      return this.panel.state.selectedStore+this.panel.state.history.join('')
    },
  },
  mounted() {
  },
  methods: {
    changePartition(value: string) {
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
