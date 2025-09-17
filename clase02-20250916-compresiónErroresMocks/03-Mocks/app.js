import {fakerES_MX as fa} from "@faker-js/faker"

for(let i=0; i< fa.number.int({ min: 10, max: 15 }); i++){
    console.log(fa.animal.bird())
    console.log(fa.animal.dog())
    console.log(fa.color.rgb())
    let nombre=fa.person.firstName("female")
    let apellido=fa.person.lastName()
    console.log(nombre, apellido)
    console.log(fa.internet.email({firstName:nombre, lastName: apellido, provider:"coder.com"}))
}