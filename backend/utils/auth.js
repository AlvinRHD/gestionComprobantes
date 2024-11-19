// backend/utils/auth.js
const jwt = require('jsonwebtoken');

const verifyRole = (roles) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido' });
            }
            
            // Verifica si el rol del usuario está en los roles permitidos
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }
            
            // Pasa el control al siguiente middleware o ruta
            req.user = decoded;
            next();
        });
    };
};

module.exports = verifyRole;
