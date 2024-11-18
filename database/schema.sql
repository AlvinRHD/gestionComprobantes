-- Crear base de datos
CREATE DATABASE IF NOT EXISTS contadorcito;
USE contadorcito;

-- Tabla de empresas
CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('Natural', 'Jurídica') NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(15),
    correo VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('Administrador', 'Auxiliar') NOT NULL,
    empresa_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Tabla de comprobantes
CREATE TABLE comprobantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('Crédito Fiscal', 'Consumidor Final') NOT NULL,
    numero VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    cliente_proveedor VARCHAR(100) NOT NULL,
    archivo_pdf VARCHAR(255),
    archivo_json VARCHAR(255),
    empresa_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Índices para mejorar el rendimiento en búsquedas por fechas y empresas
CREATE INDEX idx_comprobantes_fecha_empresa ON comprobantes (fecha, empresa_id);

