<template>
  <div class="bar bottom-bar inLine">
    <button class="button" @click="copy">Copy</button>
    <button class="button">Remove</button>
    <button class="button">Delete</button>
  </div>
  <modal :show="transferModalShow" :text="transferModalText"> </modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import modal from "@/components/UI/Modal.vue";

export default defineComponent({
  name: "BottomBar",
  components: {
    modal,
  },
  data() {
    return {
      transferModalShow: false,
      transferModalText: "",
    };
  },
  methods: {
    copy() {
      this.transferModalText = `Копируем  файлы`;
      this.transferModalShow = true;
      this.$store.state
        .copyFiles()
        .catch(console.error)
        .finally(() => {
          this.transferModalShow = false;
        });
    },
    // submitTransfer() {
    //   this.$store.state.transfer();
    // },
  },
});
</script>

<style scoped>
.bottom-bar {
  width: 70%;
  margin: auto;
  height: 60px;
}
</style>
