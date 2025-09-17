import express from 'express';
import { router as heroesRouter } from './routes/heroesRouter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { CustomError } from './utils/CustomError.js';
import { TIPOS_ERROR } from './utils/EErrors.js';
import passport from "passport"

process.loadEnvFile("./.env")
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/heroes', heroesRouter)


app.get('/', (req, res) => {

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})


app.get('/prueba2', async(req, res, next) => {

    try {
        if (req.query.nombre == "Juan") {
            throw new Error(`Juan no tiene permitido el acceso`)
        }
        
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send('prueba2');
    } catch (error) {
        next(error)
    }

})

// app.get('/protected', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info, status) {
//         if (err) { return next(err) }
//         if (!user) { return res.redirect('/signin') }
//         res.redirect('/account');
//     })(req, res, next);
// });



app.get('/prueba', (req, res) => {
    if (req.query.nombre == "Juan") {
        throw new Error(`Juan no tiene permitido el acceso`)
    }
    if (req.query.nombre == "Marcela") {
        CustomError.generateError("Error de argumentos", "Marcela no tiene el acceso permitido", "Marcela no tiene el acceso permitido", TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
    }

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('Prueba');
})

app.use(errorHandler)

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
