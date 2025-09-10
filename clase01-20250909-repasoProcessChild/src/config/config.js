import dotenv from "dotenv"
import {Command, Option} from "commander"

const program=new Command()

program.addOption(new Option("-m, --mode <MODE>", "Modo de ejecución del script").choices(["dev", "prod"]).default("dev"))

program.parse()

const {mode}=program.opts()
dotenv.config({
    path:mode=="prod"?"./.env.prod":"./.env.dev", override: true, quiet: true
})

export const config={
    PORT: process.env.PORT || 3020, 
    DATABASE: {
        MONGO_URL: process.env.MONGO_URL, 
        DB_NAME: process.env.DB_NAME, 
    },
    SECRET: process.env.SECRET
}

// config.DATABASE.MONGO_URL

