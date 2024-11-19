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
        const { tipo, numero, fecha, monto, cliente_proveedor, archivo_pdf, archivo_json, empresa_id } = req.body;
        try {
            const [result] = await pool.query(
                'INSERT INTO comprobantes (tipo, numero, fecha, monto, cliente_proveedor, archivo_pdf, archivo_json, empresa_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [tipo, numero, fecha, monto, cliente_proveedor, archivo_pdf, archivo_json, empresa_id]
            );
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            
            res.status(500).json({ error: error.message });
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

