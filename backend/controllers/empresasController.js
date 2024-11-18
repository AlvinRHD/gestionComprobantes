const pool = require('../models/db');

module.exports = {
    getEmpresas: async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM empresas');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createEmpresa: async (req, res) => {
        const { nombre, tipo, direccion, telefono, correo } = req.body;
        try {
            const [result] = await pool.query(
                'INSERT INTO empresas (nombre, tipo, direccion, telefono, correo) VALUES (?, ?, ?, ?, ?)', 
                [nombre, tipo, direccion, telefono, correo]
            );
            res.status(201).json({id: result.insertId});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateEmpresa: async (req, res) => {
        const { id } = req.params;
        const { nombre, tipo, direccion, telefono, correo } = req.body;
        try{
            await pool.query(
                'UPDATE empresas SET nombre = ?, tipo = ?, direccion = ?, telefono = ?, correo = ? WHERE id = ?',
                [nombre, tipo, direccion, telefono, correo, id]
            );
            res.sendStatus(204);
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteEmpresa: async (req, res) => {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM empresas WHERE id = ?', [id]);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
