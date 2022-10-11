<template>
  <div class="bar bottom-bar inLine">
    <button class="button" @click="copy"> Copy</button>
    <button class="button"> Remove </button>
    <button class="button"> Delete</button>
  </div>
<modal :show="transferModalShow" :text="transferModalText" :submitButton="submitTransfer" :data="su">

</modal>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import modal from "@/components/UI/Modal.vue";
import {IFileTransfer} from "@/store";


export default defineComponent({
  name: "BottomBar",
  components: {
    modal
  },
  data () {
    return {
      transferModalShow: false,
      transferModalText: ''
    }
  },
  methods: {
    copy() {
      const copyData=this.$store.state.copyButtonCheck() as IFileTransfer
      console.log(copyData)
      this.transferModalText=`Копируем ${copyData.files.length.toString()} файл(ов) в папку ${copyData.destination} ?`
      this.transferModalShow=true
      copyData.method='copy'
      this.$store.state.setTransferData(copyData as IFileTransfer )
      console.log('TransferData:',this.$store.state.transferData)
    },
    submitTransfer() {
      this.$store.state.transfer()

    }
  }
})
</script>

<style scoped>
.bottom-bar{
  width:70%;
  margin:auto;
  height: 60px;
}
</style>