import {Injectable} from "@nestjs/common";

@Injectable()
export class AppDiskService {
    getDiskList() {
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
}