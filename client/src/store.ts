import { reactive } from "vue";
import axios, { Axios } from "axios";
import { FileModel, FolderModel } from "./main";

interface IUi {
  isSelected?: boolean;
}

export interface IUiFileModel extends FileModel, IUi {}
export interface IUiFolderModel extends FolderModel, IUi {}
interface IFilesUI extends Array<IUiFileModel | IUiFolderModel> {}

const apiUrls = { dirList: "dirList", diskPart: "diskPart" };

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
  selectedStore: string = "";
}

export class PanelModel {
  state = reactive(new PanelState());

  constructor(public api: Axios, store: string) {
    this.setSelectedStore(store);
  }

  setSelectedStore(store: string) {
    // debugger;
    this.state.selectedStore = store;
    if (!store) {
      return;
    }
    this.api
      .get<Array<IFilesUI>>(
        apiUrls.dirList + "?path=" + this.state.selectedStore
      )
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        this.state.files = data;
        this.state.history=[];
      });
  }
  changeHistory(path: string) {  // Открывает новую папку
    if (!!path) {
      this.state.history.push(path);
    } else {
      this.state.history.pop();
    }
    console.log(this.state.history)
    this.api
    .get<Array<IFilesUI>>(
        apiUrls.dirList + "?path=" + this.state.selectedStore + this.state.history.join('')
    )
        .then((resp)=> {
      return resp.data;
    }).then((data)=>{
      this.state.files=data;
    })
  }
}

interface Store {
  endPoint: { dirList: string; diskPart: string };
  currentDir: Array<string[]>;
  dirList: Array<FileModel | FolderModel>[];
  panels: number[];
  diskPart: string[];
  panels_new: Array<PanelModel>;
  /**
   * получить список дисков
   */
  fetchDiskPart(): Promise<Array<string>>;
  fetchDirList(dir: string, panel: number): void;
  callCurrentDir(): void;
  changeDisk(disk: string, panel: number): void;
  init(): void;
  initPanel(index: number): void;
}

export const state = reactive<Store>({
  currentDir: [], //TODO: Вот  с этими данными проблема. При запуске приложения туда записывается путь, начиная с диска
  endPoint: {
    dirList: "dirList",
    diskPart: "diskPart",
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
  changeDisk: function (disk, panel) {
    state.currentDir[panel] = [];
    this.fetchDirList(disk, panel);
  },
  fetchDirList: function (dir: string, panel: number) {
    console.log("state.currentDir[panel]", state.currentDir[panel]);
    if (!this.currentDir[panel]) {
      state.currentDir[panel] = [dir];
    } else {
      console.log(state.currentDir[panel]);
      state.currentDir[panel].push(dir);
    }
    api
      .get(state.endPoint.dirList + "?path=" + this.currentDir[panel].join("/"))
      .then((response) => {
        this.dirList[panel] = response.data;
      })
      .catch((e) => console.log("Error fetchDirList" + e));

    console.log("state.currentDir[panel] = dir;", dir);
  },
  callCurrentDir: function () {},
  init() {
    this.fetchDiskPart().then(() => {
      this.panels.forEach(this.initPanel.bind(this));
    });
  },
  initPanel() {
    this.panels_new.push(reactive(new PanelModel(api, this.diskPart[0])));
  },
});

export default {
  state: state,
};
