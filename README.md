# Proyecto Gestión de Comprobantes

## Descripción

La empresa **Contadorcito SA de CV** es un emprendimiento local que, con el paso del tiempo, ha venido optimizando y generando nuevos clientes. Debido al crecimiento de la empresa, se hace necesario un sistema automatizado para la gestión de documentos y reportes, con el fin de cumplir en tiempo y forma con todos los documentos que deben presentarse cada fin de mes al Ministerio de Hacienda del gobierno.

Este proyecto se ha desarrollado utilizando **Node.js**, **HTML**, **CSS** y **JavaScript** con el fin de optimizar el proceso de creación de reportes y la gestión de los comprobantes de ventas y compras.

## Tecnologías utilizadas

- **Node.js**: Plataforma de servidor.
- **Express**: Framework para gestionar rutas en el backend.
- **PDFKit**: Librería para generar reportes en formato PDF.
- **ExcelJS**: Librería para generar reportes en formato Excel.
- **MySQL2**: Para la interacción con la base de datos.
- **JWT** (JSON Web Tokens): Para la autenticación de usuarios.
- **Multer**: Para la carga de archivos.

## Estructura del proyecto

### Backend

- **`/backend/controllers`**: Contiene los controladores que manejan las operaciones de negocio, como la creación de comprobantes, empresas y usuarios.

  - `comprobantesController.js`
  - `empresasController.js`
  - `usuariosController.js`

- **`/backend/models`**: Contiene los archivos de configuración de la base de datos y los modelos que interactúan con ella.

  - `db.js` (Configuración de conexión a la base de datos MySQL)

- **`/backend/routes`**: Contiene las rutas de la API REST que interactúan con los controladores.

  - `comprobantes.js`
  - `empresas.js`
  - `usuarios.js`

- **`/backend/uploads`**: Carpeta para almacenar archivos subidos por los usuarios, como los reportes generados.

  - Archivos PDF y JSON.

- **`/backend/utils`**: Utilidades auxiliares, como autenticación y generación de reportes.

  - `auth.js` (Autenticación JWT)
  - `logo.png` (Logo de la empresa, para los reportes PDF)
  - `reportUtils.js` (Funciones para generar los reportes PDF y Excel)

- **`/backend/app.js`**: Archivo principal del servidor Express que inicia la aplicación.
- **`/backend/testConnection.js`**: Para probar la conexión con la base de datos.

### Frontend

- **`/frontend/css`**: Archivos de estilo CSS para las páginas del frontend.

  - `forms.css`
  - `main.css`

- **`/frontend/js`**: Archivos de lógica JavaScript para interactuar con la interfaz de usuario.

  - `api.js` (Manejo de las solicitudes API)
  - `app.js` (Lógica principal)
  - `comprobantes.js` (Manejo de los comprobantes en la interfaz)
  - `empresas.js` (Manejo de las empresas en la interfaz)
  - `usuarios.js` (Manejo de los usuarios en la interfaz)

- **`/frontend/pages`**: Contiene las vistas de la interfaz de usuario.

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
   git clone
   https://github.com/AlvinRHD/gestionComprobantes.git


2. Entra en el directorio del proyecto:
   cd contadorcito


3. Instalar dependencias:
   npm install

```

## Cómo ejecutar el proyecto

```bash
1. Inicia el servidor con nodemon:
    npm start

2. El servidor estará disponible en
    http://localhost:4000
```

## Dependencias

Librerías utilizadas en el proyecto:

- bcryptjs: Librería para el hash de contraseñas.
- body-parse: Middleware para analizar el cuerpo de solicitudes HTTP.
- cors: Middleware para permitir el acceso a recursos del backend desde diferentes dominios.
- dotenv: Cargar variables de entorno desde un archivo .env.
- exceljs: Para generar y modificar archivos Excel.
- express: Framework para manejar rutas y solicitudes HTTP.
- jsonwebtoken: Para la creación y validación de JWTs.
- jwt-decode: Para decodificar tokens JWT en el frontend.
- multer: Middleware para la carga de archivos en el backend.
- mysql2: Cliente para la interacción con la base de datos MySQL.
- nodemon: Herramienta para recargar automáticamente el servidor durante el desarrollo.
- pdfkit: Librería para la creación de archivos PDF.
