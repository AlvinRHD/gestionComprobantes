const jwt = require('jsonwebtoken');
const db = require('../models/db'); // Conexión a la BD
const bcrypt = require('bcryptjs'); // Para validar contraseñas

module.exports = {
    // Obtener un usuario por ID
    getUsuarioById: async (req, res) => {
        const { id } = req.params;
        console.log('ID recibido:', id); // <-- Para verificar qué ID se está recibiendo
        try {
            const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    

    // Obtener todos los usuarios
    getUsuarios: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM usuarios');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un usuario nuevo
    createUsuario: async (req, res) => {
        const { nombre, correo, password, rol, empresa_id } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
            const [result] = await db.query(
                'INSERT INTO usuarios (nombre, correo, password, rol, empresa_id) VALUES (?, ?, ?, ?, ?)',
                [nombre, correo, hashedPassword, rol, empresa_id]
            );
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un usuario existente
    updateUsuario: async (req, res) => {
        const { id } = req.params;
        const { nombre, correo, password, rol, empresa_id } = req.body;
        try {
            const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
            const query = hashedPassword
                ? 'UPDATE usuarios SET nombre = ?, correo = ?, password = ?, rol = ?, empresa_id = ? WHERE id = ?'
                : 'UPDATE usuarios SET nombre = ?, correo = ?, rol = ?, empresa_id = ? WHERE id = ?';

            const values = hashedPassword
                ? [nombre, correo, hashedPassword, rol, empresa_id, id]
                : [nombre, correo, rol, empresa_id, id];

            await db.query(query, values);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un usuario
    deleteUsuario: async (req, res) => {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Iniciar sesión
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const [rows] = await db.query(
                'SELECT * FROM usuarios WHERE correo = ?',
                [email]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const user = rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                { id: user.id, role: user.rol },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
};
