const pool = require('../models/db');

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
        // Extraemos los datos del cuerpo de la solicitud
        const { tipo, numero, fecha, monto, cliente_proveedor, archivo_pdf, archivo_json, empresa_id } = req.body;

        // Validamos si todos los campos necesarios están presentes
        if (!tipo || !numero || !fecha || !monto || !cliente_proveedor || !empresa_id) {
            return res.status(400).json({ error: 'Faltan datos necesarios para agregar el comprobante' });
        }

        // Convertimos el monto a número si es una cadena
        if (typeof monto === 'string') {
            monto = parseFloat(monto);
        }

        // Verificamos que el monto es un número válido
        if (isNaN(monto)) {
            return res.status(400).json({ error: 'El monto debe ser un número válido' });
        }

        try {
            // Realizamos la consulta para insertar el comprobante
            const [result] = await pool.query(
                'INSERT INTO comprobantes (tipo, numero, fecha, monto, cliente_proveedor, archivo_pdf, archivo_json, empresa_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [tipo, numero, fecha, monto, cliente_proveedor, archivo_pdf, archivo_json, empresa_id]
            );

            // Respondemos con el ID del nuevo comprobante creado
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            console.error('Error al agregar comprobante:', error);  // Log detallado
            res.status(500).json({ error: 'Error al agregar el comprobante', message: error.message });
        }
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

