# API Catálogo de Producto

API REST para productos con autenticación. Catálogo de productos con base de datos en Firebase Firestore.

---

> Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **Firebase Firestore** - Base de datos NoSQL en la nube
- **JWT (jsonwebtoken)** - Autenticación por tokens
- **dotenv** - Variables de entorno
- **cors** - Permisos de origen cruzado
- **body-parser** - Parseo de bodies en JSON

> Instalación:

git clone [https://github.com/Andre-1705/]api_catalogo_productos.git
cd api_catalogo_productos
npm install

cp .env-example .env

> Ejecución

npm start (producción)
npm run dev (desarrollo con --watch)

El servidor corre en `http://localhost:3000`

---

## Workflow de Git

Este proyecto se construye por etapas, cada una en un branch separado. El flujo es:

1. Crear un branch nuevo: `git checkout -b 0X-nombre`
2. Programar y probar los cambios
3. Commitear: `git add .` + `git commit -m "Etapa X: descripción"`
4. Subir el branch: `git push -u origin 0X-nombre`
5. Volver a main: `git checkout main`
6. Mergear: `git merge 0X-nombre`
7. Subir main: `git push origin main`

> Conceptos clave:

- **branch (rama)**: copia independiente del código para trabajar sin afectar main
- **merge**: juntar los cambios de un branch en otro (generalmente en main)
- **Fast-forward**: tipo de merge que ocurre cuando no hay cambios en main, simplemente mueve el puntero
- **diff**: diferencia entre versiones (rojo = eliminado, verde = agregado, negro = sin cambios)

---

## Etapas del Proyecto

> Etapa 1 - Configuración inicial (branch: main)

- package.json con dependencias y ESModules
- Servidor Express básico (GET /)
- .gitignore, .env-example
- Repositorio en GitHub

> Etapa 2 - Rutas CRUD inline (branch: 02-server-con-rutas-inline)

- Agregados cors y body-parser.json() como middlewares
- Rutas de productos CRUD (GET, POST, PUT, DELETE) en index.js
- Array de productos en memoria como base de datos temporal
- Middleware 404 para rutas inexistentes
- Validación básica (nombre y precio obligatorios)

> Etapa 3 - Rutas separadas (branch: 03-rutas-separadas)* COMPLETADA

- Extracción de rutas a archivo independiente
- index.js se convierte en archivo de configuración del servidor

> Etapa 4 - Controllers (branch: 04-controllers) COMPLETADA

- Separación de la lógica de negocio de las rutas
- Creación de capa de controladores
- Organización del código dentro de src/

> Etapa 5 - Services (branch: 05-services) COMPLETADA

- Separación de la lógica de datos de los controladores
- Creación de capa de servicios
- Los controladores solo validan y devuelven respuestas
- Los servicios manejan los datos (array en memoria temporal)

> Etapas pendientes

- Modelo de datos (models/)
- Conexión con Firebase Firestore
- Configuración de dotenv
- Autenticación JWT
- Seeder de datos
  