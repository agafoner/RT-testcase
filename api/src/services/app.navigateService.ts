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
export class AppNavigateService {
  /***
   * @param targetPath - путь по котрому надо получить информацию
   */
  getDirList(targetPath: string): Array<FileModel | FolderModel> {
    if (!query["path"]) return [{ err: 1 }];
    const dir = path.win32.normalize(query["path"]);
    console.log(`Dir = ${dir}`);
    const files_ = [0];
    let files = [];
    try {
      files = fs.readdirSync(dir);
    } catch (err) {
      return [{ err: 1 }];
    }

    for (let i in files) {
      let file = dir + path.sep + files[i];
      let name = files[i];
      if (fs.statSync(file).isDirectory()) {
        name = name + targetPath.sep;
      }
      files_.push(name);
    }

    return JSON.stringify(files_);
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
