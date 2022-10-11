import { Injectable } from "@nestjs/common";
import {
    EtypeItem,
    FileModel,
    FolderModel,
    BaseModel, IFileTransfer,
} from "../model/FileSystemModel";
import {normalizePath} from "@nestjs/common/utils/shared.utils";

const fs = require("fs-extra");
const path = require("path");
const childProcess = require("child_process");

abstract class ABase<T extends EtypeItem> implements BaseModel<T> {
  constructor(
    public type: T,
    public name: string,
    public lastDateChange: Date
  ) {}
}

class Folder extends ABase<EtypeItem.folder> implements FolderModel {
  constructor(fName, lastDateChange) {
    super(EtypeItem.folder, fName, lastDateChange);
  }
}
class File extends ABase<EtypeItem.file> implements FileModel {
  size: number;
  constructor(fName, lastDateChange, size) {
    super(EtypeItem.file, fName, lastDateChange);
    this.size = size;
  }
}

@Injectable()
export class AppFileSystemService {
  getDirList(targetPath: string): Array<FileModel | FolderModel> {
    const dir = path.win32.normalize(targetPath || "C:/");
    let files = [];

    try {
      files = fs.readdirSync(dir);
    } catch {
      return;
    }

    return files
      .map((file) => {
        let filePath = dir + path.sep + file;
        let name = file;
        let stat;
        try {
          stat = fs.statSync(filePath);
        } catch {
          return;
        }
        let date = stat.ctime;
        if (stat.isDirectory()) {
          name = name + path.sep;
          return new Folder(name, date);
        } else {
          let size = stat.size | 0;
          return new File(name, date, size);
        }
      })
      .filter((file) => file != null);
  }
  getDirListNew(targetPath: string[]): Array<FileModel | FolderModel> {
    const dir = path.win32.normalize(targetPath.join("/") || "C:/");
    let files = [];

    try {
      files = fs.readdirSync(dir);
    } catch {
      return;
    }

    return files
      .map((file) => {
        let filePath = dir + path.sep + file;
        let name = file;
        let stat;
        try {
          stat = fs.statSync(filePath);
        } catch {
          return;
        }
        let date = stat.ctime;
        if (stat.isDirectory()) {
          name = name + path.sep;
          return new Folder(name, date);
        } else {
          let size = stat.size | 0;
          return new File(name, date, size);
        }
      })
      .filter((file) => file != null);
  }

  getDiskPart() {
    const buffer = childProcess
      .execSync("wmic logicaldisk get Caption  /format:list")
      .toString();
    return buffer
      .split("\r\r\n")
      .filter((e) => e != "")
      .map((e) => e.split("="))
      .map((e) => e[1]);
  }
  copyFiles(body: IFileTransfer) {
      let errors=[]
      body.files
          .forEach(e=>{
              const target=e.path.normalize()+e.file.normalize()
              console.log(target)
              const destination=body.destination.normalize()+e.file.normalize()
              try {
                  fs.copySync(target,destination)
                  console.log('Success copy', target)
              } catch (err) {
                  console.log(err)
                  errors.push(err)
              }
      })
      if (!errors.length) {
          return {status: 'Ok'}}
      else {
          return {status: 'Error', errors: errors}
      }}

}
