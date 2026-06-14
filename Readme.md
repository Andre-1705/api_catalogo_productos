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

> Iniciar el servidor:

bash
npm start

El servidor arranca en `http://localhost:3000`.

> Scripts disponibles:

**`npm start` — ejecuta `node index.js`
**`npm run dev` — ejecuta `node --watch index.js` (reinicio automático)

## Etapa 1

api-catalogo-productos/
├── .env-example ← Nombres de variables (sin valor real)
├── .gitignore   ← Ignora node_modules, .env, etc.
├── index.js     ← Servidor Express básico (solo GET /)
└── package.json ← type: "module", 6 depend, script start

Qué hace index.js en esta etapa?

Crea un servidor Express
Tiene UNA sola ruta: GET / que devuelve un JSON
Escucha en el puerto 3000 (o el que diga la variable PORT)
Es lo más básico solo para confirmar que Express funciona.

### Etapa 2
