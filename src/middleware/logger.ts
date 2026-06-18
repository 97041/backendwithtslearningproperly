import type { NextFunction } from "express";
import fs from "fs";


const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(
        "Method - URL - Time:",
        req.method,
        req.url,
        Date.now()
    );

    const log = `\nMethod -> ${req.method} - URL -> ${req.url} - Time -> ${Date.now()}\n`;

    fs.appendFile("logger.txt", log, (err) => {
        if (err) {
            console.error(err);
        }
    });

    next();
};

export default logger;