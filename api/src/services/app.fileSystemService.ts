import { Injectable } from "@nestjs/common";
import {FileModel,FolderModel} from "../model/FileSystemModel";

const fs = require("fs");
const path = require("path");
const childProcess = require('child_process');

@Injectable()
export class AppFileSystemService {
  getDirList(targetPath: string): Array<FileModel | FolderModel> {
    const dir = path.win32.normalize(targetPath || 'C:/');
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
        .filter((file)=>(file!=null))

    return files_;
  }

  getDiskPart() {
      const buffer = childProcess.execSync('wmic logicaldisk get Caption  /format:list').toString();
      return buffer.split('\r\r\n').filter((e)=>e!='').map((e)=>e.split('=')).map((e)=> e[1])
  }
}
