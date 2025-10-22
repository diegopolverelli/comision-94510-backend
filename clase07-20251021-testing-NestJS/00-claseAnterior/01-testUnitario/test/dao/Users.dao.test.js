import Users from "../../src/dao/Users.dao.js";
import mongoose from "mongoose";
import Assert from "assert"

import {describe, it} from "mocha"

const assert=Assert.strict

const usersDAO=new Users()

try {
    await mongoose.connect('mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=comisPruebas')
} catch (error) {
    console.log(`Error al conectar a DB`)
}

describe("Test DAO Users", function(){
    this.timeout(8000)

    // before()
    // beforeEach()
    // afterEach()
    after(async()=>{
        await mongoose.connection.collection("users").deleteOne({email:"test03_20251021@test.com"})
        console.log(`ejecuta after...!!!`)
    })

    it("El metodo get retorna un array", async()=>{
        // estimulo
        let respuesta=await usersDAO.get()

        // afirmaciones
        assert.equal(Array.isArray(respuesta), true)
    })

    it("El metodo get retorna un array de usuarios", async()=>{
        // estimulo
        let respuesta=await usersDAO.get()

        // afirmaciones
        assert.equal(Array.isArray(respuesta), true)
        if(Array.isArray(respuesta) && respuesta.length>0){
            assert.ok(respuesta[0]._id)
            assert.ok(respuesta[0].first_name)
        }
    })

    it("El metodo save graba un usuario en DB", async()=>{
        const user = {
            first_name:"Juan",
            last_name:"Test",
            email:"test03_20251021@test.com",
            password: "123"
        }

        let respuesta=await usersDAO.save(user)
        assert.ok(respuesta._id)
        assert.ok(respuesta.first_name)
        assert.equal(respuesta.first_name, user.first_name)

    } )

})

