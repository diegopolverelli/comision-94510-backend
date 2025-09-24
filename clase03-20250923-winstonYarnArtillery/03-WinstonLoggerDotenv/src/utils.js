import {fileURLToPath} from 'url';
import { dirname } from 'path';

process.loadEnvFile("./.env")

import winston from "winston"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

const MODE=process.env.MODE

export const logger=winston.createLogger(
    {
        transports: [
            new winston.transports.Console(
                {
                    level: MODE=="prod"?"error":"verbose", 
                    // format: winston.format.json(),
                    format: winston.format.combine(
                        winston.format.colorize(), 
                        winston.format.timestamp(), 
                        winston.format.simple()
                    )
                }
            ), 
            new winston.transports.File({
                level: "warn", 
                filename: "./src/logs/error.log",
                format: winston.format.combine(
                    winston.format.timestamp(), 
                    winston.format.json()
                )
            })
        ]
    }
)
 
logger.verbose("mensaje")
logger.log("verbose", "prueba verbose")
logger.log("http", "prueba http")
logger.log("silly", "prueba silly")
logger.log("info", "prueba info")
logger.log("warn", "prueba warn")
logger.error("prueba error")

export const middLog=(req, res, next)=>{
    req.logger=logger

    next()
}

export const loggerCustom=winston.createLogger({
    levels: {grave: 0, medio: 1, leve: 2, info: 3}, 
    transports: [
        new winston.transports.Console({
            level: "leve", 
            format: winston.format.combine(
                winston.format.timestamp(), 
                winston.format.colorize(
                    {
                        colors: {grave:"red", medio: "yellow", leve: "green", info: "blue"}
                    }
                ),
                winston.format.simple()
            )
        })
    ]
})

loggerCustom.leve("prueba error leve")
loggerCustom.medio("prueba error medio")
loggerCustom.grave("prueba error grave")