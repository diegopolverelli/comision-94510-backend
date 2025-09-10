// node --env-file ./.env ./src/04-dotenv.js
import dotenv from "dotenv"

dotenv.config({
    path:"./.env", 
    override: true, 
    quiet: true
})
// process.loadEnvFile("./.env")
const PORT=process.env.PORT
console.log(`Server running on port ${PORT}`)
console.log(process.env.PRUEBA_SECRET)