<template>
  <TopBar class="bar"></TopBar>
  <div class="panel-div">
    <Panel v-for="panel in panels" :panelId=panel> </Panel>
  </div>
  <BottomBar class="bar"></BottomBar>
</template>

<script lang="ts">
import TopBar from './components/TopBar.vue';
import Panel from './components/Panel.vue';
import BottomBar from './components/BottomBar.vue';
import {defineComponent} from "vue";


export default defineComponent ({
  name: "App",
  components: {
    TopBar,Panel,BottomBar
  },
  data() {
    return {
      panels: [0,1]
    }
  }
})
// export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 2.5vh;
  height: 95vh;
  display: flex;
  flex-direction: column;

  //justify-content: space-around;
}
.panel-div {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
}
div {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  border-radius: 1px;
}
.inline {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
}
.bar{
  width:70%;
  margin:auto;
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
}
.button {
  width: 80px;
  height: 40px;
  margin-left: 60px;
}
</style>
