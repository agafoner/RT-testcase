import {Controller, Get, Query} from "@nestjs/common";
import {AppFileSystemService} from "./services/app.fileSystemService";


@Controller('/api')
export class AppController{
    constructor(private appFileSystemService: AppFileSystemService) {}

    @Get ('/diskPart')
    getDiskList() {
        return this.appFileSystemService.getDisckPart()
    };

    @Get('/DirList')
    getDirList(@Query() query) {
        if (!query['path']) return {err: 1, message: 'path is null'}
        return this.appFileSystemService.getDirList(query['path']);
    }


}