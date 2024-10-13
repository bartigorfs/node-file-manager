import path from "node:path";
import fs from "node:fs/promises";
import {createReadStream, createWriteStream} from "node:fs";
import {isDirectoryExists, isFileExists} from "../utils/common.js";
import {log} from "../utils/prettyLog.js";

export const moveFile = async (pathToFile, pathToNewDir) => {
    try {
        const OLD_FILE_PATH = path.resolve(pathToFile);
        const NEW_FILE_PATH = path.resolve(pathToNewDir, path.basename(pathToFile));

        if (!await isFileExists(OLD_FILE_PATH) || await isFileExists(NEW_FILE_PATH)) return log.warning('Operation failed\n');

        if (!await isDirectoryExists(path.dirname(NEW_FILE_PATH))) {
            await fs.mkdir(path.dirname(NEW_FILE_PATH), {recursive: true});
        }

        const READ_STREAM = createReadStream(OLD_FILE_PATH, {encoding: 'utf-8'});
        const WRITE_STREAM = createWriteStream(NEW_FILE_PATH, {flags: 'a+', encoding: 'utf-8'});

        READ_STREAM.pipe(WRITE_STREAM).on('close', async () => {
            try {
                await fs.rm(OLD_FILE_PATH);
                log.success(`Successfully moved ${OLD_FILE_PATH} to ${NEW_FILE_PATH}\n`);
            } catch (e) {
                log.warning(`Operation failed\n`);
            }
        });
    } catch (e) {
        log.warning(`Operation failed\n`);
    }
};
