import 'dotenv/config';  // para cargar las variables de entorno  .env
import express from 'express';         
import bodyParser from 'body-parser';

const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Middleware integrado para parsear cuerpos JSON
app.use(express.json());
// Middleware integrado para parsear cuerpos codificados en URL
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hola ${name}!, ejemplo de JS!!!`);
});

app.get('/search', (req, res) => {
  const term = req.query.term || 'empty';
  const category =req.query.category || 'all';

  res.send(`
      <h4> Respuesta </h4>
      <p> Término:  ${term}</p>
      <p> Categoria: ${category} </p>
    `);
})


app.get('/users/:id', (req,res) => {
  const id =  req.params.id;
  res.send(`Enviando información del usuario con id =  ${id}`);
})

app.post('/data', (req, res) => {
  const jsonData = req.body;
  res.send(`Datos JSON recibidos: ${JSON.stringify(jsonData)}`);
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Escuchando en http://localhost:${port}`);
});
