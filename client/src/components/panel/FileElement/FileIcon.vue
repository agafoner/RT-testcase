<template>
  <div>
    <img class="icon" :src="iconFullPath" />
  </div>
</template>

<script lang="ts">
import { IFilesUI } from "@/store";
import { defineComponent } from "vue";
import { EtypeItem } from "../../../../../api/src/model/FileSystemModel";

const assetPath = "/icons/";

export default defineComponent({
  name: "FileIcon",
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      icons: <Record<string, string>>{
        exe: assetPath + "icon-exe.png",
        jpg: assetPath + "img.png",
        png: assetPath + "img.png",
        gif: assetPath + "img.png",
        bmp: assetPath + "img.png",
      },
      defaultIcon: assetPath + "file.png",
      folderIcon: assetPath + "folder.png",
    };
  },
  computed: {
    fileType(): string {
      return this.row.name.split(".").slice(-1);
    },
    iconFullPath(): string {
      if ((this.row as IFilesUI).type === EtypeItem.folder) {
        return this.folderIcon;
      }
      const icon = this.fileType;
      return this.icons[icon] || this.defaultIcon;
    },
  },
});
</script>

<style scoped>
.icon {
  height: 18px;
}
</style>
