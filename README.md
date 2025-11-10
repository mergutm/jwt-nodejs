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

