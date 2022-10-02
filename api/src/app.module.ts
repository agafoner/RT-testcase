import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppDiskService} from "./services/app.diskService";
import {AppNavigateService} from "./services/app.navigateService";

@Module({
    controllers:[AppController],
    providers: [AppDiskService,AppNavigateService]
})
export class AppModule {}