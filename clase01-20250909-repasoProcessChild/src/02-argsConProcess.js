// let [dirNode, rutaArchivo, ...argumentos]= process.argv   // ... son aquí el operador REST
let [ , , ...argumentos]= process.argv   // ... son aquí el operador REST

// console.log(dirNode)
// console.log(rutaArchivo)
console.log(argumentos)

// let {name, email}= req.body

let indicePort=argumentos.findIndex(e=>e=="--port")
if(indicePort==-1){
    console.log(`Debe indicar el puerto: --port <PORT>`)
    process.exit()
}

const PORT=argumentos[indicePort+1]
console.log(`Server online in port ${PORT}`)