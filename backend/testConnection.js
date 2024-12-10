const pool = require('./models/db');

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('Conexión exitosa a la base de datos:', rows);
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

testConnection();
