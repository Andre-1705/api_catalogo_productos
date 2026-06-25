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

> Etapa 2 - Rutas CRUD inline (branch: 02-server-con-rutas-inline) COMPLETADA

- Agregados cors y body-parser.json() como middlewares
- Rutas de productos CRUD (GET, POST, PUT, DELETE) en index.js
- Array de productos en memoria como base de datos temporal
- Middleware 404 para rutas inexistentes
- Validación básica (nombre y precio obligatorios)

> Etapa 3 - Rutas separadas (branch: 03-rutas-separadas) COMPLETADA

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

> Etapa 6 - Models (branch: 06-models) COMPLETADA

- Creación de capa de modelos con clase Product
- Define la estructura de la entidad Producto con valores por defecto
- El servicio usa el modelo para crear objetos en vez de armarlos a mano

> Etapa 7 - Firebase + dotenv (branch: 07-firebase) COMPLETADA

- Configuración de Firebase con credenciales en .env
- Creación de src/config/firebase.js para conexión
- Servicio reemplaza array en memoria por Firestore
- Controladores pasan a async/await con try/catch
- IDs pasan de números (parseInt) a strings (Firestore document IDs)

> Manejo de undefined y validaciones: facilita disminuir la cantidad de validaciones.

| Escenario  |  nombre |  precio |!nombre |precio === undefined|  Pasa? |
|------------|---------|---------|--------|--------------------|--------|
|Todo ok     | 'Spray' |   5000  | false  |        false       |   SI   |
|Sin nombre  |undefined|   5000  |  true  |        false       |NO (400)|
|Sin precio  | 'Spray' |undefined| false  |        true        |NO (400)|
|Sin ambos   |undefined|undefined|  true  |        true        |NO (400)|
|Precio cero | 'Spray' |   0     | false  |        false       |   SI   |
|Nombre vacío|   ''    |   5000  |  true  |        false       |NO (400)|

!nombre atrapa undefined, null, '' (vacío) y false
precio === undefined solo atrapa cuando NO se envió el campo
Se usa !nombre porque no aceptamos nombre vacío
Se usa === undefined en precio porque 0 podría ser válido
Evita doble validación.

> Etapa 8 - Seeder (branch: 08-seeder) COMPLETADA

- Script de carga inicial de productos en Firestore
Verifica si ya existen datos antes de cargar (evita duplicados)
- Usa el modelo Product para crear cada documento
Script ejecutable con npm run seed

> Etapa 9 - Auth JWT + corrección de rutas (branch: 09-auth-jwt) COMPLETADA

- Creación de capa de autenticación con JWT
- Usuarios hardcodeados (admin/123456, user/123456)
- Middleware validateToken para proteger rutas (401/403)
- Rutas protegidas: POST /api/products/create, PUT, DELETE
- Rutas públicas: GET /api/products, GET /api/products/:id
- Corrección de rutas a /api/products según consignas
- dotenv.config() centralizado en index.js
- dotenv.config() en index.js y en firebase.js (necesario por ES Modules: los imports se ejecutan antes que el código del archivo que los llama)

> Estructura final

api_catalogo_productos/
├── seeders/
│   └── products.seeder.js
├── src/
│   ├── config/
│   │   └── firebase.js
│   ├── controllers/
│   │   ├── products.controller.js
│   │   └── auth.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   └── products.model.js
│   ├── routes/
│   │   ├── products.routes.js
│   │   └── auth.routes.js
│   └── services/
│       ├── products.service.js
│       └── auth.service.js
├── index.js
├── package.json
├── .env
├── .env-example
├── .gitignore
└── Readme.md

> Delimitación de responsabilidades.

Router: recibe la petición HTTP y la pasa al controller
Controller: extrae los datos del request, valida, y llama al service
Service: es el que habla con la base de datos. Le pide/ordena guardar/buscar
Model: le da forma a los datos. Es el molde.

A modo de ejemplo:

Llega un POST con { nombre: 'Spray', precio: 5000 }
El `controller` extrae esos datos del body y los manda al `service` como **data**
El service crea un `objeto` usando el modelo: new Product(**data**) -> el modelo arma { nombre: 'Spray', precio: 5000, categoria: 'general', stock: 0 }
El `service` guarda ese `objeto` en la base de datos (hoy en el array, después en Firestore)

> Endpoints

| Método |         Ruta         |  Auth  |            Descripción             |
|--------|----------------------|--------|------------------------------------|
| GET    |           /          |   No   | Estado del servidor                |
| GET    | /api/products        |   No   | Obtener todos los productos        |
| GET    | /api/products/:id    |   No   | Obtener producto por ID            |
| POST   | /api/products/create | Si(JWT)| Crear un producto                  |
| PUT    | /api/products/:id    | Si(JWT)| Actualizar producto                |
| DELETE | /api/products/:id    | Si(JWT)| Eliminar producto                  |
| POST   | /auth/login          |   No   | Iniciar sesión, devuelve token JWT |

> Autenticación:

Las rutas protegidas requieren enviar el token en el header Authorization:

> Authorization: Bearer

Hacer POST a /auth/login con { "username": "admin", "password": "123456" }
Copiar el token devuelto
Enviarlo en las peticiones protegidas
Ejemplo con curl:

> Login

curl -X POST [http://localhost:3000/auth/login] -H "Content-Type: application/json" -d "{"username":"admin","password":"123456"}"

> Crear producto (con token)

curl -X POST [http://localhost:3000/api/products/create] -H "Content-Type: application/json" -H "Authorization: Bearer TU_TOKEN" -d "{"nombre":"Spray","precio":5000}"

> Usuarios disponibles:

- admin/123456 (administrador)
- user/123456 (usuario)
- Los tokens expiran a las 2 horas.

### Deploy

> El proyecto está deployado en Vercel:

URL: [https://api-catalogo-productos.vercel.app]
Repositorio: [https://github.com/Andre-1705/api_catalogo_productos]

Para probar el deploy:

GET [https://api-catalogo-productos.vercel.app/api/products] (json con productos)

POST [https://api-catalogo-productos.vercel.app/auth/login] (login con body JSON)

Nota: las rutas POST no se pueden probar directamente en el navegador, usar Postman o curl.
