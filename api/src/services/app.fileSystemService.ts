import {Injectable} from "@nestjs/common";
import {EtypeItem, FileModel, FolderModel} from "../model/FileSystemModel";

const fs = require("fs");
const path = require("path");
const childProcess = require('child_process');

class Folder implements FolderModel{
  name: string
  lastDateChange: Date
  type: EtypeItem.folder
  constructor (fName,lastDateChange) {
    this.name=fName;
    this.lastDateChange=lastDateChange;
    this.type=EtypeItem.folder;
  }
}
class File implements FileModel{
  name: string
  lastDateChange: Date
  size: number
  type: EtypeItem.file
  constructor (fName,lastDateChange,size) {
    this.name=fName
    this.lastDateChange=lastDateChange
    this.size=size
    this.type=EtypeItem.file;
  }
}


@Injectable()
export class AppFileSystemService {
  getDirList(targetPath: string): Array<FileModel | FolderModel> {
    const dir = path.win32.normalize(targetPath || 'C:/');
    let files = [];

    try {
      files = fs.readdirSync(dir);
    } catch {return}

    return files.map((file)=>{
      let filePath = dir + path.sep + file
      let name = file
      let stat
      try {
        stat = fs.statSync(filePath)
      } catch {return}
      let date = stat.ctime
      if (stat.isDirectory()) {
        name = name + path.sep
        return new Folder(name, date);
      } else {
        let size = stat.size | 0;
        return new File(name,date,size)
      }
    })
        .filter((file)=>(file!=null))
  }
  getDirListNew(targetPath: string[]): Array<FileModel | FolderModel> {

    const dir = path.win32.normalize(targetPath.join('/') || 'C:/');
    let files = [];

    try {
      files = fs.readdirSync(dir);
    } catch {return}

    return files.map((file)=>{
      let filePath = dir + path.sep + file
      let name = file
      let stat
      try {
        stat = fs.statSync(filePath)
      } catch {return}
      let date = stat.ctime
      if (stat.isDirectory()) {
        name = name + path.sep
        return new Folder(name, date);
      } else {
        let size = stat.size | 0;
        return new File(name,date,size)
      }
    })
        .filter((file)=>(file!=null))
  }

  getDiskPart() {
      const buffer = childProcess.execSync('wmic logicaldisk get Caption  /format:list').toString();
      return buffer.split('\r\r\n').filter((e)=>e!='').map((e)=>e.split('=')).map((e)=> e[1])
  }
}
