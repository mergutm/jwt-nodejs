# Crear proyecto con Node.js y Express

Este es un proyecto básico que utiliza Node.js y Express para crear una aplicación web sencilla.
## Requisitos previos
- Tener instalado Node.js y npm en tu máquina.
- Conocimientos básicos de JavaScript y Node.js.

## Instalación
```bash
npm init -y
npm install --save express
```
* `npm init -y`: Inicializa un nuevo proyecto Node.js con un archivo `package.json` predeterminado.
* `npm install --save express`: Instala el framework Express y lo agrega a las dependencias del proyecto.

# Crear el archivo principal
Crea un archivo llamado `app.js` en la raíz del proyecto y agrega el siguiente código:

```javascript
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
```
* `import express from 'express';`: Importa el módulo Express.
* `const app = express();`: Crea una instancia de la aplicación Express.
* `app.get('/', (req, res) => { ... });`: Define una ruta para la raíz (`/`) que responde con un mensaje "Hello World!" o "Hello [NAME]!" si se proporciona una variable de entorno `NAME`.
* `const port = parseInt(process.env.PORT) || 3000;`: Define el puerto en el que la aplicación escuchará, utilizando la variable de entorno `PORT` o el puerto 3000 por defecto.
* `app.listen(port, () => { ... });`: Inicia el servidor y escucha en el puerto especificado.
* `console.log(`listening on port ${port}`);`: Imprime un mensaje en la consola indicando en qué puerto está escuchando el servidor.

## Ejecutar la aplicación
Para ejecutar la aplicación, usa el siguiente comando en la terminal:

```bash
node app.js
```
Luego, abre tu navegador web y visita `http://localhost:3000`. Deberías ver el mensaje "Hello World!" o "Hello [NAME]!" si has configurado la variable de entorno `NAME`.


# CommonJS vs ES Modules
Este proyecto utiliza ES Modules (ESM) para importar y exportar módulos. Si prefieres usar CommonJS, puedes cambiar la sintaxis de importación y exportación de la siguiente manera:

```javascript
import express from 'express';           // ESM version moderna
```
```javascript
const express =  require('express')   // commonJS - version antigua
``` 

# Segunda version de app.js con dotenv
Para manejar variables de entorno de manera más eficiente, puedes usar el paquete `dotenv`. Primero, instala el paquete:

```bash 
npm install dotenv
```
Luego, crea un archivo `.env` en la raíz del proyecto y agrega las siguientes líneas:

``` 
NAME=proyecto
PORT=3000
```
Finalmente, actualiza el archivo `app.js` para cargar las variables de entorno desde el archivo `.env`:

```javascript
import 'dotenv/config';  // para cargar las variables de entorno  .env
import express from 'express';           // ESM JS version moderna
// const express =  require('express')   // commonJS - version antigua
const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hola ${name}!, ejemplo de JS`);
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Escuchando en puerto  ${port}`);
});
```
* `import 'dotenv/config';`: Carga las variables de entorno definidas en el archivo `.env`.
* `res.send(`Hola ${name}!, ejemplo de JS`);`: Cambia el mensaje de respuesta para incluir un saludo usando la variable de entorno `NAME`.
* `console.log(`Escuchando en puerto  ${port}`);`: Cambia el mensaje de la consola para indicar que el servidor está escuchando en el puerto especificado, también usando ahora la variable de entorno `PORT`.
  
## Archivo package.json
Asegúrate de que tu archivo `package.json` tenga el siguiente contenido mínimo para ejecutar la aplicación:

```json
{
  "name": "express",
  "version": "1.0.0",
  "description": "Un servidor básico con Express y ES Modules.",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "watch": "node --watch app.js",
    "test": "echo \"Info: No hay tests configurados.\" && exit 0"
  },
  "keywords": [
    "express",
    "node",
    "api"
  ],
  "author": "Proyecto Node",
  "license": "MIT",
  "dependencies": {
    "dotenv": "^17.2.3",
    "express": "^5.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
``` 


# Soporte para parseo de entradas en POST

```javascript

// Middleware integrado para parsear cuerpos JSON
app.use(express.json());
// Middleware integrado para parsear cuerpos codificados en URL
app.use(express.urlencoded({ extended: true }));
```
* `app.use(express.json());`: Middleware para parsear cuerpos de solicitudes en formato JSON.
* `app.use(express.urlencoded({ extended: true }));`: Middleware para parsear cuerpos de solicitudes codificados en URL (formulario).


## Ejemplo de uso de parámetros en rutas usando una petición GET

```javascript
app.get('/users/:id', (req,res) => {
  const id =  req.params.id;
  res.send(`Enviando información del usuario con id =  ${id}`);
})
```

* `app.get('/users/:id', (req,res) => { ... });`: Define una ruta que acepta un parámetro `id` en la URL.
* `const id =  req.params.id;`: Accede al valor del parámetro `id` desde la solicitud.
* `res.send(`Enviando información del usuario con id =  ${id}`);`: Responde con un mensaje que incluye el valor del parámetro `id`.
* Visitar `http://localhost:3000/users/123` responderá con "Enviando información del usuario con id =  123".
* Esto es útil para crear rutas dinámicas que pueden manejar diferentes recursos basados en los parámetros proporcionados en la URL.


##  Ejemplo de una petición POST
```javascript
app.post('/data', (req, res) => {
  const jsonData = req.body;
  res.send(`Datos JSON recibidos: ${JSON.stringify(jsonData)}`);
});
```
* `app.post('/data', (req, res) => { ... });`: Define una ruta POST que recibe datos JSON.
* `const jsonData = req.body;`: Accede a los datos JSON enviados en el cuerpo de la solicitud.
* `res.send(`Datos JSON recibidos: ${JSON.stringify(jsonData)}`);`: Responde con los datos JSON recibidos.
* Visitar `http://localhost:3000/data` con una solicitud POST y un cuerpo JSON responderá con los datos enviados.
* Puedes usar el comando curl o la aplicación postman para probar. En el caso de curl:
```bash 
curl -X POST http://localhost:3000/data -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}'
```

## Busqueda usando query parameters
```javascript

app.get('/search', (req, res) => {
  const term = req.query.term || 'empty';
  const category =req.query.category || 'all';

  res.send(`
      <h4> Respuesta </h4>
      <p> Término:  ${term}</p>
      <p> Categoria: ${category} </p>
    `);
})
```
* `app.get('/search', (req, res) => { ... });`: Define una ruta GET para búsquedas.
* `const term = req.query.term || 'empty';`: Obtiene el parámetro de consulta `term` o usa 'empty' si no está presente.
* `const category =req.query.category || 'all';`: Obtiene el parámetro de consulta `category` o usa 'all' si no está presente.
* `res.send(...);`: Responde con un mensaje HTML que muestra los parámetros de búsqueda.
* Visitar `http://localhost:3000/search?term=nodejs&category=programming` responderá con los valores proporcionados en los parámetros de consulta.
* Esto es útil para manejar búsquedas y filtros en una aplicación web.
* Prueba diferentes combinaciones de parámetros en la URL para ver cómo responde el servidor.