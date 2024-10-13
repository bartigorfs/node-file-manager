import {baseHomeDir, getArch, getCpus, getEOL, getSystemUserName} from "./os.js";
import {log} from "./prettyLog.js";
import {parseCommand, trimParams} from "./common.js";
import {getFolderLs} from "../fs/baseFS.js";

export const processCmd = async (chunk) => {
    const {cmd, params} = parseCommand(chunk);

    switch (cmd) {
        case 'ls':
            const directory = process.cwd();
            return console.table(await getFolderLs(directory), ['Name', 'Type']);
        case 'os': {
            const os_params = params.join(' ').trim();
            if (trimParams(os_params).length <= 0) return log.warning('Invalid input\n');

            switch (trimParams(os_params)) {
                case 'EOL':
                    return console.log(getEOL());
                case 'cpus':
                    return console.log(await getCpus());
                case 'homedir':
                    return console.log(baseHomeDir);
                case 'username':
                    return console.log(getSystemUserName());
                case 'architecture':
                    return console.log(getArch());
            }
            break;
        }
        default:
            return log.warning('Invalid input\n');
    }
}
