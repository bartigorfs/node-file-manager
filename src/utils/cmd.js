import {baseHomeDir, getArch, getCpus, getEOL, getSystemUserName} from "./os.js";
import {log} from "./prettyLog.js";
import {changeDir, checkArgs, parseCommand, trimParams} from "./common.js";
import {createFile, deleteFile, getFolderLs, renameFile} from "../fs/baseFS.js";
import {copyFile} from "../fs/copy.js";
import {moveFile} from "../fs/move.js";

export const processCmd = async (chunk) => {
    const {cmd, params} = parseCommand(chunk);

    switch (cmd) {
        case 'ls':
            const directory = process.cwd();
            return console.table(await getFolderLs(directory), ['Name', 'Type']);
        case 'cd': {
            if (!checkArgs(params)) return log.warning('Invalid input\n');
            const newPath = params[0];
            changeDir(newPath);
            break;
        }
        case 'add': {
            if (!checkArgs(params)) return log.warning('Invalid input\n');
            const newFileName = params[0];
            await createFile(newFileName);
            break;
        }
        case 'rm': {
            if (!checkArgs(params)) return log.warning('Invalid input\n');
            const deleteFileName = params[0];
            await deleteFile(deleteFileName);
            break;
        }
        case 'rn': {
            if (!checkArgs(params, 2)) return log.warning('Invalid input\n');
            const oldFileName = params[0];
            const newFileName = params[1];
            await renameFile(oldFileName, newFileName);
            break;
        }
        case 'cp': {
            if (!checkArgs(params, 2)) return log.warning('Invalid input\n');
            const fileToCopy = params[0];
            const folderToCopy = params[1];
            await copyFile(fileToCopy, folderToCopy);
            break;
        }
        case 'mv': {
            if (!checkArgs(params, 2)) return log.warning('Invalid input\n');
            const fileToCopy = params[0];
            const folderToCopy = params[1];
            await moveFile(fileToCopy, folderToCopy);
            break;
        }
        case 'up': {
            process.chdir('..');
            break;
        }
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
