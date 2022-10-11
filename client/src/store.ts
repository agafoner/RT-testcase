import { reactive } from "vue";
import axios, { Axios } from "axios";
import { FileModel, FolderModel, IFileTransfer} from "./main";

interface IUi {
  isSelected?: boolean;
}

export interface IUiFileModel extends FileModel, IUi {}
export interface IUiFolderModel extends FolderModel, IUi {}
export type IFilesUI = IUiFileModel | IUiFolderModel;

const apiUrls = { dirList: "dirList", diskPart: "diskPart",copy: "copy" };

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

class PanelState {
  isActive: boolean = false;
  history: Array<string> = [];
  files: Array<IFilesUI> = [];
  selectedStorage: string = "";
}

export class PanelModel {
  state = reactive(new PanelState());

  constructor(public api: Axios, storage: string) {
    this.setSelectedStorage(storage);
  }
  setSelectedStorage(storage: string) {
    this.state.selectedStorage = storage;
    if (!storage) {
      return;
    }
    this.api
      .get<Array<IFilesUI>>(
        apiUrls.dirList ,{params: {path: this.state.selectedStorage}}
      )
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        this.state.files = data;
        this.state.history = [];
      });
  }
  changeDirectory(path: string,) {
      if (!!path) {
        this.state.history.push(path);
      } else {
        this.state.history.pop();
      }
    this.refreshDirectory()

  }
  refreshDirectory() {
    this.api
        .get<Array<IFilesUI>>(
            apiUrls.dirList,{params: {path: [this.state.selectedStorage,this.state.history.join("")].join('')}}

        )
        .then((resp) => {
          return resp.data;
        })
        .then((data) => {
          this.state.files = data;
        });
  }
  getPrevPath() {
    if (!this.state.history.length) return;
    return this.state.history.slice(0, -1).join("");
  }
  toggleSelected(row: IFilesUI): void {
    row.isSelected = !row.isSelected;
    this.setActivePanel();
  }
  setActivePanel() {
    state.panels_new.forEach((p) => (p.state.isActive = false));
    this.state.isActive = true;
  }
  getSelectedFiles() {
    return this.state.files.filter((f) => f.isSelected);
  }
  getFullPathFromPanel() {
    return [this.state.selectedStorage, this.state.history.join("")].join("");
  }
}

interface Store {
  endPoint: { dirList: string, diskPart:string, copy: string};
  currentDir: Array<string[]>;
  dirList: Array<FileModel | FolderModel>[];
  panels: number[];
  diskPart: string[];
  panels_new: Array<PanelModel>;
  transferData?: IFileTransfer;
  fetchDiskPart(): Promise<Array<string>>;
  init(): void;
  initPanel(index: number): void;
  getDestinationFolder(): string;
  copyFiles(): Promise<void | string>;
}

export const state = reactive<Store>({
  currentDir: [],
  endPoint: {
    dirList: "dirList",
    diskPart: "diskPart",
    copy: "copy"
  },
  dirList: [],
  panels: [0, 1],
  diskPart: [],
  panels_new: [],

  fetchDiskPart() {
    return api
      .get(this.endPoint.diskPart)
      .then((response) => {
        let diskPart: string[] = response.data;
        this.diskPart = diskPart.map((el) => el + "/");
        return response.data;
      })
      .catch((e) => console.log("Error fetchDiskPart" + e));
  },
  init() {
    this.fetchDiskPart().then(() => {
      this.panels.forEach(this.initPanel.bind(this));
    });
  },
  initPanel() {
    this.panels_new.push(reactive(new PanelModel(api, this.diskPart[0])));
  },
  getDestinationFolder() {
    const inactivePanel =
      this.panels_new[this.panels_new.findIndex((p) => !p.state.isActive)];
    return (
      inactivePanel.state.selectedStorage + inactivePanel.state.history.join("")
    );
  },
  copyFiles() {
    return Promise.resolve().then(() => {
      const activePanel = this.panels_new.find((p) => p.state.isActive);
      if (!activePanel) {
        throw "Нет активной панели";
      }
      const sourcePath = activePanel.getFullPathFromPanel();
      const copyFileNames = activePanel
        .getSelectedFiles()
          .map((f) => f.name);
      if (!copyFileNames.length) {
        throw "Нет выбранных файлов";
      }
      const targetPanel = this.panels_new.find((p) => !p.state.isActive);
      // ты должен примерно так написать
      return api
      .post(this.endPoint.copy, <IFileTransfer>{
          files: copyFileNames,
          sourcePath: sourcePath,
          targetPath: targetPanel?.getFullPathFromPanel(),
        } )
        .then(() => {
          targetPanel?.refreshDirectory();
          return;
        });
    });
  },
});

export default {
  state: state,
};
