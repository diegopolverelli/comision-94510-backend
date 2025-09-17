import express from 'express';
import { generaProducto } from './mocks/mocks.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/productos',(req,res)=>{
    let productos=[]
    let {cantidad}=req.query
    if(!cantidad){
        cantidad=1
    }

    for(let i=0; i<cantidad; i++){
        productos.push(generaProducto())
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({productos});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
