<template>
  <div class="bar">
    <div>
      <button class="button" @click="openModal"> Settings</button>
    </div>
    <SettingsModal v-model:show="settingsModalShow" text="Настройки:">
      <label>Настройки даты:</label>
      <select v-model="dateModel" >
        <option v-for="model in $store.state.dateModels" > {{model}}</option>
      </select>
      <button @click="changeDateModel()"> Применить</button>
    </SettingsModal>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import SettingsModal from "@/components/UI/SettingsModal.vue";



export default defineComponent({
  name: "TopBar",
  components: {SettingsModal},
  data() {
    return {
      settingsModalShow: false,
      dateModel: this.$store.state.activeDateModel,


    }
  },
  methods: {
    openModal() {
      this.settingsModalShow=true;
    },
    changeDateModel() {
      this.$store.state.setDateModel(this.dateModel)
    }
  }
})
</script>

<style scoped>
.bar {
  border-radius: 10px 10px 0 0;
}
</style>