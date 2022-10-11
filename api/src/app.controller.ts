import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {AppFileSystemService} from "./services/app.fileSystemService";


@Controller('/api')
export class AppController{
    constructor(private appFileSystemService: AppFileSystemService) {}

    @Get ('/diskPart')
    getDiskPart() {
        return this.appFileSystemService.getDiskPart()
    };

    @Get('/dirList')
    getDirList(@Query() query) {
        return this.appFileSystemService.getDirList(query['path'])
    }
    @Post('/copy')
    copy(@Body() body) {
        return this.appFileSystemService.copyFiles(body)
    }


}