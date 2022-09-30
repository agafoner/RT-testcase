import {Injectable} from "@nestjs/common";

const fs = require('fs');
const path = require('path');


@Injectable()
export class AppNavigateService {
    getDirList(query) {
        if (!query['path']) return [{err:1}]
        let dir=path.win32.normalize(query['path'])
        console.log(`Dir = ${dir}`)
        let files_ =  [0];
        let files=[]
        try {
            files = fs.readdirSync(dir);
        } catch (err) {
            return [{err:1}]
        }


        for (let i in files) {
            let file = dir + path.sep + files[i];
            let name=files[i]
            if (fs.statSync(file).isDirectory()) {
                name = name + path.sep

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