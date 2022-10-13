<template>
  <div class="panel-bar inline">
    <select
      v-model="panel.state.selectedStorage"
      @change="changePartition($event.target.value)"
    >
      <option v-for="partition in $store.state.diskPart">
        {{ partition }}
      </option>
    </select>
    <label>
      {{pathNormalized}}
    </label>
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
      return this.panel.state.selectedStorage+this.panel.state.history.join('')
    },
  },
  mounted() {
  },
  methods: {
    changePartition(value: string) {
      this.panel.setSelectedStorage(value);
    },
  },
});
</script>

<style scoped>
.panel-bar {
  display: flex;
  align-items: center;
  align-content: center;
  height: 30px;
  justify-content: left;
  padding-right: 20px;
  padding-left: 20px;
}
select {
  max-width: 50px;
}
label {
  padding-left: 10px;
}
</style>
