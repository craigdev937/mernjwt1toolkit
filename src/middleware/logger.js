import path from "path";
import fs from "fs";
const fsPromises = fs.promises;
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class LoggerClass {
    logEvents = async (message, logFileName) => {
        const dateTime = format(new Date(), "yyyMMdd\tHH:mm:ss");
        const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;
        try {
            if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
                await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
            };
            await fsPromises.appendFile(
                path.join(__dirname, 
                "..", "logs", logFileName), logItem);
        } catch (error) {
            console.log(error);
        };
    };

    logger = (req, res, next) => {
        logEvents(
            `${req.method}\t${req.url}\t${req.headers.origin}`, 
            "reqLog.log"
        );
        console.log(`${req.method} ${req.path}`);
        next();
    };
};

export const LOG = new LoggerClass();



