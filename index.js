require('dotenv').config();  // Cargar las variables de entorno
const mysql = require('mysql2');  // Usamos mysql2 para la conexión
const express = require('express');  // Usamos express para crear el servidor

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

// Crear el servidor Express
const app = express();

// Ruta para obtener los usuarios desde la base de datos
app.get('/api/users', (req, res) => {
  // Realizar una consulta para obtener los usuarios
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
