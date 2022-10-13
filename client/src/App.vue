<template>
  <TopBar class="bar" ></TopBar>
  <div class="panel-div">
    <Panel v-for="(item, index) in $store.state.panels_new" :panelId="index">
    </Panel>
  </div>
  <BottomBar class="bar"></BottomBar>
</template>
<script lang="ts">
import TopBar from "./components/TopBar.vue";
import Panel from "./components/Panel.vue";
import BottomBar from "./components/BottomBar.vue";
import Modal from "./components/UI/Modal.vue"
import { defineComponent } from "vue";
import FileIcon from "@/components/panel/FileElement/FileIcon.vue";
import SettingsModal from "@/components/UI/SettingsModal.vue";

export default defineComponent({
  name: "App",
  components: {
    TopBar,
    Panel,
    BottomBar,
    Modal,
    FileIcon,
    SettingsModal
  },
  mounted() {
    this.$store.state.init();
  },
});
</script>

<style lang="scss">
#app {
  user-select: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 2.5vh;
  height: 95vh;
  display: flex;
  flex-direction: column;

}
.panel-div {
  height: 80%;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
}

.inline {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
}
.bar {
  width: 70%;
  margin: auto;
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
  border-color: black;
  border-style: solid;
  min-width: 800px;
  max-width: 1600px;
}
.panel-div{
  margin: auto;
  width: 70%;
  min-width: 800px;
  max-width: 1600px;
  display: flex;
  border-color: black;
  border-style: solid;
  flex-direction: column;
}
.panel {
  border-style: solid;
  border-width: 1px;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
}
.element {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  display: flex;
  height: 20px;
  margin: auto;
  padding-left: 10px;
  padding-right: 10px;

}
.button {
  width: 80px;
  height: 40px;
  margin-left: 60px;
}
.upper-dir {
  background: lightgray;
}
</style>
