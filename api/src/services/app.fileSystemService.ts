import { Injectable } from "@nestjs/common";

const fs = require("fs");
const path = require("path");

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

/**
 * TODO: неговорящее название для сервиса, вообще не понятно что он делает,
 * я бы вообще недробил на два,
 * а написал бы один с 2-я методами
 * сервис бы назвал
 * fileSystemService{
 *  getDisckPart()
 *  getDirList(path:string)
 * }
 * я тебе описал по интерфейсам что тебе надо сделать, как это обернуть решай уже сам
 */
@Injectable()
export class AppFileSystemService {
  /***
   * @param targetPath - путь по котрому надо получить информацию
   */
  getDirList(targetPath: string): Array<FileModel | FolderModel> {
    const dir = path.win32.normalize(targetPath);
    console.log(`Dir = ${dir}`);
    const files_ = [];
    let files = [];
    try {
      files = fs.readdirSync(dir);
    } catch (err) {
      return;
    }

    for (let i in files) {
      let file = dir + path.sep + files[i];
      let name = files[i];
      let date=0;
      //TODO: дата
      if (fs.statSync(file).isDirectory()) {
        name = name + dir.sep;
        //TODO: тип folder
        files_.push({name:name,date:date,T:"folder"});
      } else {
        let size=0;
        //TODO: size
        files_.push({name:name,date:date,size:size,T:"file"});
      }

    }

    return files_;
  }

  getDisckPart() {
    const childProcess = require('child_process');
    function getLocalDiskNames() {
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
    return getLocalDiskNames()
  }

  // var getFiles = function (dir, files_){
  //     files_ = files_ || [];
  //     var files = fs.readdirSync(dir);
  //     for (var i in files){
  //         var name = dir + '/' + files[i];
  //         if (fs.statSync(name).isDirectory()){
  //             getFiles(name, files_);
  //         } else {
  //             files_.push(name);
  //         }
  //     }
  //     return files_;
  // };
  //
  // console.log(getFiles('/home/Project/hello/www'));
}
