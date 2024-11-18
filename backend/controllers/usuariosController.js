const pool = require('../models/db');

module.exports = {
    getUsuarios: async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM usuarios');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createUsuario: async (req, res) => {
        const { nombre, correo, password, rol, empresa_id } = req.body;
        try {
            const [result] = await pool.query(
                'INSERT INTO usuarios (nombre, correo, password, rol, empresa_id) VALUES (?, ?, ?, ?, ?)',
                [nombre, correo, password, rol, empresa_id]
            );
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateUsuario: async (req, res) => {
        const { id } = req.params;
        const { nombre, correo, password, rol, empresa_id } = req.body;
        try {
            await pool.query(
                'UPDATE usuarios SET nombre = ?, correo = ?, password = ?, rol = ?, empresa_id = ? WHERE id = ?',
                [nombre, correo, password, rol, empresa_id, id]
            );
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteUsuario: async (req, res) => {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
