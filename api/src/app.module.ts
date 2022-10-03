import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppFileSystemService} from "./services/app.fileSystemService";

@Module({
    controllers:[AppController],
    providers: [AppFileSystemService]
})
export class AppModule {}