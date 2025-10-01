import express from 'express';
import cluster from "cluster"
import os from "os"
import { router as pruebasRouter } from './routes/pruebaRouter.js';

if(cluster.isPrimary){

    // console.log(os.cpus())
    console.log(`Máximo cpus disponibles: `, os.cpus().length)

    console.log(`Primary process, generando workers:`)
    for(let i=0; i<os.cpus().length; i++){
        cluster.fork()

    }
    // cluster.fork()
    // cluster.fork()
    // cluster.fork()

    cluster.on("disconnect", worker=>{
        console.log(`El worker ${worker.id} finalizo de manera inesperada; generando otro nodo`)
        cluster.fork()    
    })

}else{
    const PORT=3000;

    const app=express();
    
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    
    app.use("/", pruebasRouter)
    
    let visitas=0
    app.get('/',(req,res)=>{
        visitas++
        res.setHeader('Content-Type','text/plain');
        res.status(200).send(`Visitas: ${visitas}`);
    })
    
    const server=app.listen(PORT,()=>{
        console.log(`Server escuchando en puerto ${PORT} - pid: ${process.pid} - worker N°: ${cluster.worker.id}`);
    });
}

