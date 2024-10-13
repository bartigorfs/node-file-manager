import {EOL, arch, userInfo} from "node:os";
import os from "node:os";

export const getEOL = () => {
    return EOL || 'EOL Missing';
}

export const getArch = () => {
    try {
        return arch();
    } catch (e) {
        return 'Operation failed\n';
    }
};

export const getSystemUserName = () => {
    try {
        return userInfo()?.username
    } catch (e) {
        return 'Operation failed\n';
    }
};

export const baseHomeDir = os.homedir();
