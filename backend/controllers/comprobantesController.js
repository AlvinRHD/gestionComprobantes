const pool = require('../models/db');

const path = require('path');

// Configuración de Multer para manejar la subida de archivos
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads/');
        cb(null, uploadDir); // Carpeta donde se almacenarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo
    },
});


const upload = multer({ storage });


module.exports = {
    getComprobantesByType: async (req, res) => {
        const tipo = req.params.tipo || null; // Acepta null si no se pasa `tipo`
        try {
            console.log('Tipo recibido:', tipo); // Muestra el tipo recibido
            

            const query = tipo ? 'SELECT * FROM comprobantes WHERE tipo = ?' : 'SELECT * FROM comprobantes';
            const values = tipo ? [tipo] : [];
            console.log('Consulta ejecutada:', query, values); // Muestra la consulta generada
            const [rows] = await pool.query(query, values);
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener comprobantes:', error.message);
            res.status(500).json({ error: 'Error al obtener los comprobantes' });
        }
    }
    ,

    createComprobante: async (req, res) => {
        console.log('Body recibido:', req.body); // Verifica los datos recibidos
        console.log('Archivos recibidos:', req.files); // Verifica los archivos
    
        const { tipo, numero, fecha, monto, cliente_proveedor, empresa_id } = req.body;
        const archivo_pdf = req.files?.archivo_pdf ? req.files.archivo_pdf[0].filename : null;
        const archivo_json = req.files?.archivo_json ? req.files.archivo_json[0].filename : null;
    
        // Verificación de datos
        if (!tipo || !numero || !fecha || !monto || !cliente_proveedor || !empresa_id) {
            console.error('Datos incompletos:', { tipo, numero, fecha, monto, cliente_proveedor, empresa_id });
            return res.status(400).json({ error: 'Faltan datos necesarios para agregar el comprobante' });
        }
    
        try {
            const [result] = await pool.query(
                'INSERT INTO comprobantes (tipo, numero, fecha, monto, cliente_proveedor, archivo_pdf, archivo_json, empresa_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [tipo, numero, fecha, monto, cliente_proveedor, archivo_pdf, archivo_json, empresa_id]
            );
            console.log('Comprobante creado con ID:', result.insertId);
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            console.error('Error en la base de datos:', error.message);
            res.status(500).json({ error: 'Error al agregar el comprobante' });
        }
    },
    
    
    

    // Método para descargar archivos
    downloadFile: (req, res) => {
        const { filename } = req.params;
        const filepath = path.join(__dirname, '../uploads/', filename);
        res.download(filepath, (err) => {
            if (err) {
                console.error('Error al descargar el archivo:', err.message);
                res.status(500).json({ error: 'Error al descargar el archivo' });
            }
        });
    },

    updateComprobante: async (req, res) => {
        const { id } = req.params;
        const { tipo, numero, fecha, monto, cliente_proveedor, archivo_pdf, archivo_json, empresa_id } = req.body;
        try {
            await pool.query(
                'UPDATE comprobantes SET tipo = ?, numero = ?, fecha = ?, monto = ?, cliente_proveedor = ?, archivo_pdf = ?, archivo_json = ?, empresa_id = ? WHERE id = ?',
                [tipo, numero, fecha, monto, cliente_proveedor, archivo_pdf, archivo_json, empresa_id, id]
            );
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteComprobante: async (req, res) => {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM comprobantes WHERE id = ?', [id]);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

