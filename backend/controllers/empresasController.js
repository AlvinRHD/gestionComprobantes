const pool = require('../models/db');
const { exportToExcel, exportToPDF } = require('../utils/reportUtils'); // Utilidades que veremos más adelante

module.exports = {

     // Método para generar el reporte
     getReport: async (req, res) => {
        const { empresaId, tipo, startDate, endDate, format } = req.query;

        if (!empresaId || !startDate || !endDate || !format) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }

        try {
            // Consulta para obtener comprobantes filtrados
            const query = `
                SELECT c.*, e.nombre AS empresa_nombre
                FROM comprobantes c
                JOIN empresas e ON c.empresa_id = e.id
                WHERE c.empresa_id = ? AND c.tipo = ? AND c.fecha BETWEEN ? AND ?
            `;
            const [rows] = await pool.query(query, [empresaId, tipo, startDate, endDate]);

            if (format === 'excel') {
                const excelBuffer = await exportToExcel(rows);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', `attachment; filename=reporte_${tipo}_${startDate}_${endDate}.xlsx`);
                return res.send(excelBuffer);
            } else if (format === 'pdf') {
                const pdfBuffer = await exportToPDF(rows);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=reporte_${tipo}_${startDate}_${endDate}.pdf`);
                return res.send(pdfBuffer);
            }

            res.status(400).json({ error: 'Formato no soportado' });
        } catch (error) {
            console.error('Error al generar el reporte:', error);
            res.status(500).json({ error: 'Error al generar el reporte' });
        }
    },



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
