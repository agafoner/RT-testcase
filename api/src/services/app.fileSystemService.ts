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
  /***
   * @param targetPath - путь по которому надо получить информацию
   */
  getDirList(targetPath: string): Array<FileModel | FolderModel> {
    const dir = path.win32.normalize(targetPath);
    console.log(`Dir = ${dir}`);
    const files_ = [];
    let files = [];
    try {
      files = fs.readdirSync(dir);
    } catch (err) {return}

    for (let i in files) {
      let file = dir + path.sep + files[i];
      let name = files[i];
      let date=0;
      let stat=fs.statSync(file)

      date=stat.ctime;
      if (stat.isDirectory()) {
        name = name + dir.sep;
        files_.push({name:name,date:date,T:"folder"});
      } else {
        let size=stat.size | 0;
        files_.push({name:name,date:date,size:size,T:"file"});
      }

    }

    return files_;
  }

  getDiskPart() {
      const buffer = childProcess.execSync('wmic logicaldisk get Caption  /format:list').toString();
      const lines = buffer.split('\r\r\n');
      const disks = [];

      for (const line of lines) {
        if(!line) {
          continue;
        }
        const lineData = line.split('=');
        disks.push(lineData[1]);
      }

      return disks;
  }
}
