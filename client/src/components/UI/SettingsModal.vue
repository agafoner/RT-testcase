<template>
  <div class="modal" v-if="show" @click="hideModal">
    <div @click.stop class="modal-content">
      <button class="close-button" @click="hideModal">X</button>
      <h2>
        {{ text }}
      </h2>
      <slot>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent ({
  name: "SettingsModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
  },
  methods: {
    hideModal() {
      this.$emit('update:show',false)
    }
  }
});
</script>

<style scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  flex-direction: column;
}
.modal-content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-width: 300px;
  min-height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}
button {
  min-height: 30px;
  max-width: 100px;
  margin: 20px;
}
.close-button{
  position: absolute;
  top: 0;
  right: 0;
}
</style>
