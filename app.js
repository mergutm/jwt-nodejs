import 'dotenv/config';  // para cargar las variables de entorno  .env
import express from 'express';           // ESM JS version moderna
// const express =  require('express')   // commonJS - version antigua
const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hola ${name}!, ejemplo de JS!!!`);
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Escuchando en puerto  ${port}`);
});
