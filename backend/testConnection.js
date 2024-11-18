const pool = require('./models/db');


(async () => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Conexión exitosa:', rows);
    process.exit();
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1);
  }
})();
