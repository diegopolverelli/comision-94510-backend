import {describe, it} from "mocha"

import {expect} from "chai"
import mongoose from "mongoose"

import supertest from "supertest"

import fs from "fs"

await mongoose.connect('mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=comisPruebas')

const requester=supertest("http://localhost:8080")

describe("Test router de pets", function(){


    // before, beforeEach, etc... 
    beforeEach(async()=>{
        await mongoose.connection.collection("pets").deleteMany({specie:"test"})
    })

    it("El método get /api/pets retorna un objeto con la property status igual a success", async()=>{

        // let respuesta=await requester.get("/api/pets")
        // console.log(respuesta)
        let {body}=await requester.get("/api/pets")

        expect(body).to.has.property("status").and.to.be.eq("success")
    })

    it("El método get /api/pets retorna un objeto con la property payload de tipo array", async()=>{

        let {body}=await requester.get("/api/pets")

        expect(Array.isArray(body.payload)).to.be.true
    })

    it("El método get /api/pets retorna un status http 200", async()=>{

        let {statusCode}=await requester.get("/api/pets")

        expect(statusCode).to.be.eq(200)
    })

    it("El método post /api/pets crea una mascota, si envío los datos correctos; retorna un obj. con prop payload conteniendo la nueva mascota", async()=>{

        let petMock={
            name:"test", specie:"test", birthDate: new Date()
        }

        let {body}=await requester.post("/api/pets").send(petMock)

        // console.log(body)
        expect(body.payload._id).to.be.ok
        expect(body.payload.name).to.be.eq(petMock.name)

    })

    it("El método post /api/pets si envío datos faltantes; retorna un status code igual a 400", async()=>{

        let petMock={
            name:"test", birthDate: new Date()
        }

        let {body, statusCode}=await requester.post("/api/pets").send(petMock)

        // console.log(body, statusCode)
        expect(statusCode).to.be.eq(400)

    })

    it("El método post /api/pets/withimage crea una mascota, si envío los datos correctos y una imagen la crea en el server", async()=>{

        let petMock={
            name:"Roger", specie:"test", birthDate: new Date(2025,2,10).toUTCString()
        }

        let {body}=await requester.post("/api/pets/withimage")
                                  .field("name", petMock.name)
                                  .field("specie", petMock.specie)
                                  .field("birthDate", petMock.birthDate)
                                  .attach("image", "../img-roger.jpg")

        // console.log(body)
        expect(body.payload._id).to.be.ok
        expect(body.payload.image).to.be.ok
        expect(fs.existsSync(body.payload.image)).to.be.true
 
    })



})