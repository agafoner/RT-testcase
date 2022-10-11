import { reactive } from "vue";
import axios, { Axios } from "axios";
import { FileModel, FolderModel } from "./main";

interface IUi {
  isSelected?: boolean;
}

export interface IUiFileModel extends FileModel, IUi {}
export interface IUiFolderModel extends FolderModel, IUi {}
export type IFilesUI = IUiFileModel | IUiFolderModel;

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
  selectedStorage: string = "";
}

export class PanelModel {
  state = reactive(new PanelState());

  constructor(public api: Axios, storage: string) {
    this.setSelectedStorage(storage);
  }
  setSelectedStorage(store: string) {
    // debugger;
    this.state.selectedStorage = store;
    if (!store) {
      return;
    }
    this.api
      .get<Array<IFilesUI>>(
        apiUrls.dirList + "?path=" + this.state.selectedStorage
      )
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        this.state.files = data;
        this.state.history = [];
        this.setActivePanel();
      });
  }
  changeDirectory(path: string) {
    // Открывает новую папку
    if (!!path) {
      this.state.history.push(path);
    } else {
      this.state.history.pop();
    }
    console.log(this.state.history);
    this.api
      .get<Array<IFilesUI>>(
        apiUrls.dirList +
          "?path=" +
          this.state.selectedStorage +
          this.state.history.join("")
      )
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        this.state.files = data;
        this.setActivePanel();
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
    state.unsetActivePanel();
    this.state.isActive = true;
  }
  getSelectedFiles() {
    return this.state.files.filter((f) => f.isSelected);
  }
  getFullPathFromPanel() {
    return [this.state.selectedStorage, this.state.history.join("")].join();
  }
}

interface Store {
  endPoint: { dirList: string; diskPart: string };
  currentDir: Array<string[]>;
  dirList: Array<FileModel | FolderModel>[];
  panels: number[];
  diskPart: string[];
  panels_new: Array<PanelModel>;
  transferData?: IFileTransfer;
  fetchDiskPart(): Promise<Array<string>>;
  fetchDirList(dir: string, panel: number): void;
  changeDisk(disk: string, panel: number): void;
  init(): void;
  initPanel(index: number): void;
  unsetActivePanel(): void;
  getSelectedFiles(): string[];
  copyButtonCheck(): Object;
  getDestinationFolder(): string;
  setTransferData(transferData: IFileTransfer): void;
  transfer(): void;
  copyFiles(): Promise<void>;
}

export interface IFileTransfer {
  files: string[];
  destination: string;
  method?: string;
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
    if (!this.currentDir[panel]) {
      state.currentDir[panel] = [dir];
    } else {
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
  init() {
    this.fetchDiskPart().then(() => {
      this.panels.forEach(this.initPanel.bind(this));
    });
  },
  initPanel() {
    this.panels_new.push(reactive(new PanelModel(api, this.diskPart[0])));
  },
  unsetActivePanel() {
    this.panels_new.forEach((p) => (p.state.isActive = false));
  },
  getSelectedFiles() {
    const activePanel =
      this.panels_new[this.panels_new.findIndex((p) => p.state.isActive)];
    console.log(activePanel);
    //TODO: просортировать массив
    let filesToCopy = activePanel.state.files
      .map((e) => {
        if (e.isSelected == true) return e.name;
      })
      .filter((e) => !!e) as string[];
    filesToCopy = filesToCopy.map(
      (e) =>
        activePanel.state.selectedStorage +
        activePanel.state.history.join("") +
        e
    );
    console.log(filesToCopy);
    return filesToCopy;
  },
  getDestinationFolder() {
    const inactivePanel =
      this.panels_new[this.panels_new.findIndex((p) => !p.state.isActive)];
    return (
      inactivePanel.state.selectedStorage + inactivePanel.state.history.join("")
    );
  },
  copyButtonCheck() {
    const files = this.getSelectedFiles();
    console.log(this.getDestinationFolder());
    return {
      files: files,
      destination: this.getDestinationFolder(),
      method: "",
    } as IFileTransfer;
  },
  setTransferData(transferData: IFileTransfer) {
    this.transferData = transferData;
  },
  transfer() {
    if (this.transferData?.method == "copy")
      console.log("Start Copy", this.transferData); //TODO: обращение к api
    delete this.transferData;
    console.log(this.transferData);
  },
  copyFiles() {
    return Promise.resolve().then(() => {
      const activePanel = this.panels_new.find((p) => p.state.isActive);
      if (!activePanel) {
        throw "Нет активной панели";
      }
      const sourcePath = activePanel.getFullPathFromPanel();
      const copyFileUrls = activePanel
        .getSelectedFiles()
        .map((f) => [sourcePath, f.name].join());
      if (!copyFileUrls.length) {
        throw "Нет выбранных файлов";
      }
      const targetPanel = this.panels_new.find((p) => !p.state.isActive);
      return api.post("URL для копирования", {
        files: copyFileUrls,
        targetPath: targetPanel?.getFullPathFromPanel(),
      });
    });
  },
});

export default {
  state: state,
};
