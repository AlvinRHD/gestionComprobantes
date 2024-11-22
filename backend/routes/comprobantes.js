const express = require('express');
const router = express.Router();
const comprobantesController = require('../controllers/comprobantesController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Validar existencia de carpeta de uploads
const uploadDir = path.join(__dirname, '../uploads/');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });



// Rutas
router.get('/:tipo?', comprobantesController.getComprobantesByType);
router.post(
    '/',
    upload.fields([
        { name: 'archivo_pdf', maxCount: 1 },
        { name: 'archivo_json', maxCount: 1 }
    ]),
    (req, res, next) => {
        if (!req.files || !req.body) {
            console.error('Archivos o datos faltantes:', { files: req.files, body: req.body });
            return res.status(400).json({ error: 'Datos o archivos faltantes en la solicitud' });
        }
        next();
    },
    comprobantesController.createComprobante
);

router.get('/download/:filename', comprobantesController.downloadFile);
router.put(
    '/:id',
    upload.fields([
        { name: 'archivo_pdf', maxCount: 1 },
        { name: 'archivo_json', maxCount: 1 }
    ]),
    (req, res, next) => {
        console.log('Archivos recibidos:', req.files);
        console.log('Datos recibidos:', req.body);

        // Si no hay archivos ni datos en el cuerpo, envía un error
        if (!req.body.tipo || !req.body.numero || !req.body.fecha || !req.body.monto || !req.body.cliente_proveedor || !req.body.empresa_id) {
            return res.status(400).json({ error: 'Datos o archivos faltantes en la solicitud' });
        }

        next();
    },
    comprobantesController.updateComprobante
);




router.delete('/:id', comprobantesController.deleteComprobante);

module.exports = router;
