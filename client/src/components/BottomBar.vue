<template>
  <div class="bottomBar inLine">
    <button class="button"> Copy</button>
    <button class="button"> Remove </button>
    <button class="button"> Delete</button>
  </div>

</template>

<script>
export default {
  name: "BottomBar"
}
</script>

<style scoped>
.bottomBar{
  width:70%;
  margin:auto;
  height: 60px;
}
.button {
  height: 60px;
  width: 100px;
}
</style>