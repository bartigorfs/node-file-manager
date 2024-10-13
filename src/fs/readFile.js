import fs from "node:fs/promises";
import {createReadStream} from "node:fs";
import path from "node:path";
import {log} from "../utils/prettyLog.js";

export const readFile = async (filename) => {
    try {
        const FILE_PATH = path.join(process.cwd(), filename);
        await fs.access(FILE_PATH, fs.constants.R_OK)
        const READ_STREAM = createReadStream(FILE_PATH).setEncoding('utf-8');

        READ_STREAM.on("data", (data) => process.stdout.write(data + '\n'));
        READ_STREAM.on("error", (err) => log.warning('Operation failed\n'));
    } catch (e) {
        return log.warning('Operation failed\n');
    }
}
