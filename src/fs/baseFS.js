import fs from "node:fs/promises";
import path from "node:path";
import {log} from "../utils/prettyLog.js";
import {entityTypeCheck, isFileExists} from "../utils/common.js";

export const getFolderLs = async (folder) => {
    try {
        const entities = await fs.readdir(folder);

        const entityPromises = entities.map(async entity => {
            const entity_type = await entityTypeCheck(entity);
            return {
                Name: entity,
                Type: entity_type
            };
        });

        return Promise.all(entityPromises);
    } catch (e) {
        log.error('Operation failed\n')
    }
};

export const createFile = async (filename) => {
    try {
        const FILE_PATH = path.resolve(filename);

        if (!await isFileExists(FILE_PATH)) {
            await fs.open(FILE_PATH, 'a').then(fh => fh.close());
        } else log.warning('Operation failed\n');
    } catch (e) {
        return log.warning('Operation failed\n');
    }
}
