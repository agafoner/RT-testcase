import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {AppFileSystemService} from "./services/app.fileSystemService";
import {IFileTransfer} from "./model/FileSystemModel";


@Controller('/api')
export class AppController{
    constructor(private appFileSystemService: AppFileSystemService) {}

    @Get ('/diskPart')
    getDiskPart() {
        return this.appFileSystemService.getDiskPart()
    };

    @Get('/dirList')
    getDirList(@Query('path') path: string) {
        return this.appFileSystemService.getDirList(path)
    }
    @Post('/copy')
    copy(@Body() body: IFileTransfer) {
        return this.appFileSystemService.copyFiles(body)
    }
    @Post('/move')
    moveFiles(@Body() body: IFileTransfer) {
        return this.appFileSystemService.moveFiles(body)
    }
    @Post('/remove')
    deleteFiles(@Body() body: IFileTransfer) {
        return this.appFileSystemService.deleteFiles(body)
    }

}