import { Injectable } from "@nestjs/common";

const fs = require("fs");
const path = require("path");
const childProcess = require('child_process');
enum EtypeItem {
  file = "file",
  folder = "folder",
}

interface BaseModel<T extends EtypeItem> {
  type: T;
  name: string;
  lastDateChange: Date;
}
export interface FileModel extends BaseModel<EtypeItem.file> {
  size: number;
}
export interface FolderModel extends BaseModel<EtypeItem.folder> {}

@Injectable()
export class AppFileSystemService {
  getDirList(targetPath: string): Array<FileModel | FolderModel> {
    const dir = path.win32.normalize(targetPath);
    let files = [];
    let files_ = [];

    try {
      files = fs.readdirSync(dir);
    } catch {return}

    files_=files.map((file)=>{
      let filePath = dir + path.sep + file
      let name = file
      let stat
      try {
        stat = fs.statSync(filePath)
      } catch {return}
      let date = stat.ctime
      if (stat.isDirectory()) {
        name = name + path.sep
        return <FileModel | FolderModel> {name: name, lastDateChange: date, type: "folder"}
      } else {
        let size = stat.size | 0;
        return <FileModel | FolderModel> {name: name, lastDateChange:date, size: size, type: "file"}
      }
    })

    return files_;
  }

  getDiskPart() {
      const buffer = childProcess.execSync('wmic logicaldisk get Caption  /format:list').toString();
      return buffer.split('\r\r\n').filter((e)=>e!='').map((e)=>e.split('=')).map((e)=> e[1])
  }
}
