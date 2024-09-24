import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { getDirname } from "../utils/utils.js";
import path from 'path';
import fs from 'fs';

const fsPromises = fs.promises;


const __dirname = getDirname(import.meta.url);

export const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName),logItem);
    } catch(err) {
        console.log(err);
    }
}

export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
}