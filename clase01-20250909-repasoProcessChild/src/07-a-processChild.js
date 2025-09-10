import express from 'express';
import {fork} from "child_process"
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let visitas = 0
app.get('/', (req, res) => {

    visitas++

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(`Home | visitas: ${visitas}`);
})

let contador = 0
app.get('/saludo', (req, res) => {

    contador++

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(`Holis...??? contador=${contador}`);
})

app.get('/random', (req, res) => {

    let random = Math.random() * 100
    random = random.toFixed(0)

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(`Numero generado: ${random}`);
})


const calculo = () => {
    let result = 0

    console.log(`Comienza proceso`)
    console.time(`Demora del proceso: `)

    for (let i = 0; i < 500_000_000; i++) {
    // for (let i = 0; i < 100; i++) {
        result += Math.random() * 10
    }

    result = result.toFixed(0)
    console.timeEnd(`Demora del proceso: `)

    return result
}

app.get('/calculo', (req, res) => {

    let resultado = `El resultado es ${calculo()}`

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(resultado);
})

app.get('/calculo2', (req, res) => {
    let child=fork("./src/calculo.js")
    child.send(`Soy el proceso padre, pid ${process.pid}, y necesito que ejecutes...!!!`)
    child.on("message", datos=>{
        if(datos.type=="resultado"){
            let resultado = `El resultado es ${datos.result}`
        
            res.setHeader('Content-Type', 'text/plain');
            res.status(200).send(resultado);

        }
    })

})


const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT} - pid: ${process.pid}`);
});
