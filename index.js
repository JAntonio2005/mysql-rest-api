require('dotenv').config();  // Cargar las variables de entorno
const express = require('express');
const mysql = require('mysql2');  // Usamos mysql2 para la conexión
const cors = require('cors');    // Importar cors

// Crear el servidor Express
const app = express();
const corsOptions = {
  origin: 'https://mysql-front-api.onrender.com', // Reemplaza con tu frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};
// Configurar CORS
app.use(cors());  // Esto permite todas las solicitudes CORS. Si deseas limitar los orígenes, puedes configurarlo más detalladamente

// Crear la conexión a MySQL usando la URL de conexión de .env
const connection = mysql.createConnection(process.env.DEV_DATABASE_URL);

// Verificar la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.message);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL!');
});

// Ruta para obtener los usuarios desde la base de datos
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error al ejecutar la consulta a la base de datos');
    }
    res.json(results);  // Enviar los resultados de la consulta como respuesta en formato JSON
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is live at localhost :' + PORT);
});
