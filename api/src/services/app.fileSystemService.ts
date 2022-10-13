import { Injectable } from "@nestjs/common";
import {
    EtypeItem,
    FileModel,
    FolderModel,
    BaseModel, IFileTransfer,
} from "../model/FileSystemModel";

const fs = require("fs-extra");
const path = require("path");
const childProcess = require("child_process");

abstract class ABase<T extends EtypeItem> implements BaseModel<T> {
  constructor(
    public type: T,
    public name: string,
    public lastDateChange: number
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
        let date = Date.parse(stat.ctime);
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
  actionWithFiles(body: IFileTransfer, func: Function) {
      let errors=[]
      body.files
          .forEach(f=>{
              const target=path.win32.normalize(body.sourcePath as string)+path.win32.normalize(f as string)
              let destination
              if (func!==fs.removeSync) {
                  destination = path.win32.normalize(body.targetPath as string) + path.win32.normalize(f as string)
                  try {
                      func(target, destination)
                  } catch (err) {
                      errors.push(err)
                  }
              } else {
                  try {
                      func(target)
                  } catch (err) {
                      errors.push(err)
                  }
              }


      })
      if (!errors.length) {
          return {status: 'Ok'}}
      else {
          return {status: 'Error', errors: errors}
      }}
    copyFiles(body) {
        this.actionWithFiles(body,fs.copySync)
    }
    moveFiles(body) {
        this.actionWithFiles(body,fs.moveSync)
    }
    deleteFiles(body) {
        this.actionWithFiles(body,fs.removeSync)
    }
}
