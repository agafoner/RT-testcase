<template>
<div>
  <TopBar></TopBar>
  <div class="panelDiv">
    <Panel v-for="panel in panels" > </Panel>
  </div>
  <BottomBar></BottomBar>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TopBar from './components/TopBar.vue';
import Panel from './components/Panel.vue';
import BottomBar from './components/BottomBar.vue';


@Options({
  components: {
    TopBar,Panel,BottomBar
  },
  data() {
    return {
      panels: [0,1]
    }
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.panelDiv {
  display: flex;
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
</style>
