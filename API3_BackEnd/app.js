import 'dotenv/config'

import express from 'express';
import routesLoans from './routes/loans.js';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/loans', routesLoans);

try{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT,()=> console.log('Servidor activo en el puerto '+PORT))

}catch(e){
    console.log(e);
}
