<template>
  <div class="element inLine" :class="{selected : isSelected}" @dblclick="$emit('chDir',normalizedName, row.type)"
    @click="toggleSelected">
    <div class="element-icon">
      <FileIcon :row="row"></FileIcon>
    </div>
    <div class="element-name">
      {{normalizedName}}
    </div>
    <div class="element-date">
      {{normalizedDate}}
    </div>
    <div class="element-size">
      {{row.type==='file'? normalizedSize : ''}}
    </div>
  </div>
</template>

<script lang="ts">
import { IFilesUI, PanelModel } from "@/store";
import { defineComponent } from "vue";
import FileIcon from "@/components/panel/FileElement/FileIcon.vue";


export default defineComponent({
  name: "Element",
  components: {FileIcon},
  inject: ['panel'],
  data() {
    return {
      injPanel: this.panel as unknown as PanelModel
    }
  },
  props: {
    row: {
      type: Object,
      required: true,
    }
  },
  methods: {
    toggleSelected(): void {
      this.injPanel.toggleSelected(this.row as IFilesUI);
    }

  },
  computed: {
    isSelected(): boolean {
      return this.row.isSelected
    },

    normalizedName(): string {
      return this.row.name.replaceAll('\\', '/')
    },
    normalizedSize(): string{
      let s1: number=this.row.size
      if (!s1) return '0 b'
      let s2=0
      let digit=0;
      while (s1>1024 && digit<5) {
        digit++
        s2=s1%1024
        s1=(s1-s2)/1024
      }
      const addition=Math.round(s2/1024*100)
      switch (digit) {
        case 0:
          return s1+' b';
        case 1:
          return s1+','+addition+' Kb';
        case 2:
          return s1+','+addition+' Mb';
        case 3:
          return s1+','+addition+' Gb';
        case 4:
          return s1+','+addition+' Tb';
        case 5:
          return s1+','+addition+' Pb';
        default:
          return '-'
      }
    },
    normalizedDate():string {
      let date: Date=new Date(this.row.lastDateChange);
      let dd: number | string =date.getDate();
      if (dd < 10) dd = '0' + dd.toString();
      let mm: number | string  = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
      let yy: number | string  = date.getFullYear();
      let hh: number | string  = date.getHours()
      if (hh < 10) hh = '0' +hh;
      let min: number | string  = date.getMinutes()
      if (min < 10) min = '0' +min;
      let ss: number | string  = date.getSeconds()
      if (ss < 10) ss = '0' +ss;

      switch (this.$store.state.activeDateModel) {
        case 'DD.MM.YYYY hh:mm:ss':
          return dd+'.'+mm+'.'+yy+' '+hh+':'+min+':'+ss
        case 'DD.MM.YYYY hh:mm':
          return dd+'.'+mm+'.'+yy+' '+hh+':'+min
        case 'DD.MM.YYYY':
          return dd+'.'+mm+'.'+yy
        default:
          return dd+'.'+mm+'.'+yy
      }


    }
  },
})
</script>

<style scoped>
div {
  border-style: none;
}

.element {
  border-style: solid;
  display: flex;
  height: 20px;
  margin: auto;
}

.selected {
  background-color: darkgrey;
}

.element-icon {
  width: 5%;
  text-align: left;
  padding-left: 5px
}

.element-name {
  overflow:hidden;
  width: 40%;
  text-align: left;
}

.element-date {
  overflow:hidden;
  width: 35%;
  text-align: left;
}

.element-size {
  width: 15%;
  text-align: right;
}
</style>