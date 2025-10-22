import {describe, it} from "mocha"
import {expect} from "chai"
import { createHash, passwordValidation } from "../../src/utils/index.js"


describe("Prueba funciones de hash", ()=>{


    // before, after... etc...

    it("Si envío un texto plano a createHash, retorna algo diferente", async()=>{

        let password="123"
        let hash=await createHash(password)

        expect(hash).not.to.be.eq(password)
        expect(hash).not.to.be.equal(password)
        expect(hash.length).to.be.greaterThan(password.length)

    })

    
    it("Si envío un texto plano a createHash, retorna un hash con algoritmo bcrypt", async()=>{

        let password="123"
        let hash=await createHash(password)

        expect(hash.slice(0,4)).to.be.eq("$2b$")
    })

    it("La función passwordValidation recibe un usuario, con la property password, y un texto plano, y los compara", async()=>{
        let password="123"
        let hash=await createHash(password)

        let user={
            password: hash
        }

        expect(await passwordValidation(user, password)).to.be.eq(true)
        expect(await passwordValidation(user, password)).to.be.true

    })
})