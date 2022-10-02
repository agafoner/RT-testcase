import {Controller, Get, Query} from "@nestjs/common";
import {AppDiskService} from "./services/app.diskService";
import {AppNavigateService} from "./services/app.navigateService";


@Controller('/api')
export class AppController{
    constructor(private diskService: AppDiskService,private appService: AppNavigateService) {}

    @Get ('/diskList')
    getDiskList() {
        return this.diskService.getDiskList()
    };

    @Get('/DirList')
    getDirList(@Query() query) {
        return this.appService.getDirList(query)
    }


}