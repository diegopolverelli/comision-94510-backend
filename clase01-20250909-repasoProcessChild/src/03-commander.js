import {Command, Option} from "commander"

const program=new Command()

program.option("-p, --port <PORT>", "Puerto donde escuchara el server", 8080)
program.option("-d, --debug", "Activa modo debug")
program.option("-n, --numeros [NUMEROS...]", "Listado numeros")
program.requiredOption("-u, --user <USER>", "Usuario que ejecuta el script", )
program.addOption(new Option("-m, --mode <MODE>", "Modo de ejecución del script").choices(["dev", "prod"]).default("dev"))

program.parse()

// let options=program.opts()

// console.log(options)
const {
    port:PORT, 
    mode
}= program.opts()


console.log(`Server running on port ${PORT}`)