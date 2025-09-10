import fs from "fs"
console.log("Prueba")
console.log("pid", process.pid)
console.log("cwd", process.cwd())
console.log("memoryUsage", process.memoryUsage())

// console.log("variables de entorno", process.env)
console.log("variables de entorno", process.env.PRUEBA_PORT)
console.log("variables de entorno", process.env.PRUEBA_SECRET)

console.log("argumentos", process.argv)

