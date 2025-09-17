import {fakerES as fa} from "@faker-js/faker"
const generaCliente=()=>{
    // nombre: String,
    // apellido: String,
    // dni: String,
    // email: String
    let nombre=fa.person.firstName()
    let apellido=fa.person.lastName()
    let dni=fa.number.int({min:10_500_000, max: 45_000_000})
    let email=fa.internet.email({firstName:nombre, lastName: apellido})

    return {
        id: fa.database.mongodbObjectId(),
        nombre, 
        apellido, 
        dni, 
        email
    }
}

// console.log(generaCliente())

export const generaProducto=()=>{
    // producto: String, 
    // precio: Number, 
    // cantidad: Number, 
    // id: String

    let producto=fa.commerce.product()
    let precio=fa.commerce.price({ min: 100, max: 200, dec: 0, symbol: '$' })
    let cantidad=fa.number.int({min:1, max:100})
    let id=fa.database.mongodbObjectId()
    return {
        id, 
        producto, 
        precio, 
        cantidad
    }
}

console.log(generaProducto())