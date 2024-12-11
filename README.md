# Proyecto Gestión de Comprobantes

## Descripción

La empresa **Contadorcito SA de CV** es un emprendimiento local que, con el paso del tiempo, ha venido optimizando y generando nuevos clientes. Debido al crecimiento de la empresa, se hace necesario un sistema automatizado para la gestión de documentos y reportes, con el fin de cumplir en tiempo y forma con todos los documentos que deben presentarse cada fin de mes al Ministerio de Hacienda del gobierno.

Este proyecto tiene como objetivo automatizar el proceso de creación de reportes y la gestión de los comprobantes de ventas y compras, integrando funcionalidades que permiten una administración eficiente de los usuarios, empresas y comprobantes generados.

El sistema está desarrollado utilizando **Node.js**, **Express**, **MySQL** y **JWT** para la autenticación, permitiendo una experiencia segura y eficiente tanto en el frontend como en el backend.

## Tecnologías utilizadas

- **Node.js**: Plataforma de servidor.
- **Express**: Framework para gestionar rutas en el backend.
- **PDFKit**: Librería para generar reportes en formato PDF.
- **ExcelJS**: Librería para generar reportes en formato Excel.
- **MySQL2**: Para la interacción con la base de datos.
- **JWT (JSON Web Tokens)**: Para la autenticación de usuarios.
- **Multer**: Para la carga de archivos.
- **Cors**: Middleware para permitir el acceso a recursos del backend desde diferentes dominios.
- **Bcryptjs**: Para el hash de contraseñas.

## Estructura del proyecto

### Backend

- **`/backend/controllers`**: Controladores para manejar operaciones de negocio.

  - `comprobantesController.js`
  - `empresasController.js`
  - `usuariosController.js`

- **`/backend/models`**: Archivos de configuración de la base de datos y modelos.

  - `db.js` (Configuración de conexión con MySQL)

- **`/backend/routes`**: Rutas de la API REST.

  - `comprobantes.js`
  - `empresas.js`
  - `usuarios.js`

- **`/backend/uploads`**: Archivos subidos por los usuarios (reportes generados).

  - Archivos PDF y JSON.

- **`/backend/utils`**: Funciones auxiliares.

  - `auth.js` (Autenticación JWT)
  - `logo.png` (Logo para reportes PDF)
  - `reportUtils.js` (Funciones para generar reportes PDF y Excel)

- **`/backend/app.js`**: Archivo principal que inicia el servidor Express.
- **`/backend/testConnection.js`**: Para probar la conexión con la base de datos.

### Frontend

- **`/frontend/js`**: Lógica JavaScript para interactuar con el frontend.

  - `api.js` (Manejo de solicitudes API)
  - `app.js` (Lógica principal)
  - `comprobantes.js` (Manejo de los comprobantes en la interfaz)
  - `empresas.js` (Manejo de las empresas en la interfaz)
  - `usuarios.js` (Manejo de los usuarios en la interfaz)

- **`/frontend/pages`**: Vistas de la interfaz de usuario.

  - `comprobantes.html`
  - `empresas.html`
  - `usuarios.html`

- **`/frontend/index.html`**: Página principal.
- **`/frontend/login.html`**: Página de inicio de sesión.

### Base de datos

- **`/database/schema.sql`**: Esquema de la base de datos.
- **`/database/seed.sql`**: Archivos para poblar la base de datos con datos iniciales.

---

## Instalación

```bash
1. Clona el repositorio:
   git clone https://github.com/AlvinRHD/gestionComprobantes.git

2. Entra en el directorio del proyecto:
   cd contadorcito

3. Instalar dependencias:
   npm install
```

## Cómo ejecutar el proyecto

```bash
1. Inicia el servidor con nodemon:
    npm start

2. El servidor estará disponible en:
    http://localhost:4000
```

## Dependencias

```bash
Librerías utilizadas en el proyecto:
bcryptjs: Librería para el hash de contraseñas.
body-parser: Middleware para analizar el cuerpo de solicitudes HTTP.
cors: Middleware para permitir el acceso a recursos del backend desde diferentes dominios.
dotenv: Cargar variables de entorno desde un archivo .env.
exceljs: Para generar y modificar archivos Excel.
express: Framework para manejar rutas y solicitudes HTTP.
jsonwebtoken: Para la creación y validación de JWTs.
jwt-decode: Para decodificar tokens JWT en el frontend.
multer: Middleware para la carga de archivos en el backend.
mysql2: Cliente para la interacción con la base de datos MySQL.
nodemon: Herramienta para recargar automáticamente el servidor durante el desarrollo.
pdfkit: Librería para la creación de archivos PDF.
```

## Estructura del proyecto

```bash
└── 📁contadorcito
└── 📁backend
└── 📁controllers
└── comprobantesController.js
└── empresasController.js
└── usuariosController.js
└── 📁models
└── db.js
└── 📁routes
└── comprobantes.js
└── empresas.js
└── usuarios.js
└── 📁uploads
└── 1733858925524.json
└── 1733858947982.pdf
└── 1733858947983.json
└── 1733860044698.json
└── 1733860044698.pdf
└── 📁utils
└── auth.js
└── logo.png
└── reportUtils.js
└── app.js
└── testConnection.js
└── 📁database
└── script.sql
└── 📁documentos
└── Avance #4.pptx
└── Manual de usuario gestión de comprobanTES.pdf
└── Manual Técnico de GAC.pdf
└── 📁frontend
└── 📁js
└── api.js
└── app.js
└── comprobantes.js
└── empresas.js
└── usuarios.js
└── 📁pages
└── comprobantes.html
└── empresas.html
└── usuarios.html
└── faq.html
└── index.html
└── login.html
└── .env
└── .gitignore
└── LICENSE
└── package-lock.json
└── package.json
└── README.md

```
