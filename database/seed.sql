USE contadorcito;

-- Insertar empresas de prueba
INSERT INTO empresas (nombre, tipo, direccion, telefono, correo)
VALUES
('Empresa ABC', 'Jurídica', 'Calle Falsa 123', '555-1234', 'contacto@abc.com'),
('Empresa XYZ', 'Natural', 'Avenida Siempreviva 456', '555-5678', 'contacto@xyz.com');

-- Insertar usuarios de prueba
INSERT INTO usuarios (nombre, correo, password, rol, empresa_id)
VALUES
('Administrador General', 'admin@contadorcito.com', 'hashed_password_admin', 'Administrador', NULL),
('Auxiliar 1', 'auxiliar1@contadorcito.com', 'hashed_password_aux', 'Auxiliar', 1);

-- Insertar comprobantes de prueba
INSERT INTO comprobantes (tipo, numero, fecha, monto, cliente_proveedor, archivo_pdf, archivo_json, empresa_id)
VALUES
('Crédito Fiscal', 'CF-001', '2024-10-01', 150.50, 'Proveedor ABC', 'cf-001.pdf', 'cf-001.json', 1),
('Consumidor Final', 'CF-002', '2024-10-02', 250.75, 'Cliente XYZ', 'cf-002.pdf', 'cf-002.json', 2);

