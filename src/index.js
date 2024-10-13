import { createInterface } from 'node:readline/promises';
import { processCmd } from "./utils/cmd.js";
import { log } from "./utils/prettyLog.js";
import { baseHomeDir } from "./utils/os.js";
import { getCurrentDir, writeGreetings } from "./utils/common.js";
import { getUsername } from "./args/argv.js";

global.username = getUsername() || "Unknown";

const bootstrap = async () => {
    try {
        writeGreetings();
        process.chdir(baseHomeDir);
        getCurrentDir();

        const readLine = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        for await (const data of readLine) {
            if (data.trim() === '.exit') {
                readLine.close();
                break;
            }

            await processCmd(data);
            getCurrentDir();
        }
    } catch (error) {
        log.error(`An error occurred: ${error.message}\n`);
    } finally {
        log.success(`Thank you for using File Manager, ${username}, goodbye!\n`);
        process.exit();
    }
}

bootstrap();
