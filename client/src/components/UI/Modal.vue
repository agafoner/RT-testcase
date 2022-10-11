<template>
  <div class="modal" v-if="show">
    <div @click.stop class="modal-content">
      <slot>
        {{ text }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
  },
};
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
  min-height: 50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  min-height: 30px;
  max-width: 100px;
  margin: 20px;
}
</style>
