<template>
  <div class="bar bottom-bar inLine">
    <button class="button" @click="copy">Copy</button>
    <button class="button" @click="move">Move</button>
    <button class="button" @click="remove">Delete</button>
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
    move() {
      this.transferModalText = `Переносим файлы`;
      this.transferModalShow = true;
      this.$store.state
          .moveFiles()
          .catch(console.error)
          .finally(() => {
            this.transferModalShow = false;
          });
    },
    remove() {
      this.transferModalText = `Удаляем файлы`;
      this.transferModalShow = true;
      this.$store.state
          .deleteFiles()
          .catch(console.error)
          .finally(() => {
            this.transferModalShow = false;
          });
    }

  },
});
</script>

<style scoped>
.bottom-bar {
  margin: auto;
  height: 60px;
  border-radius: 0 0 10px 10px;
}
</style>
