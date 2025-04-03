const { Router } = require('express');
 const controllers = require('../controllers');  // Comentada la importación de los controladores

const router = Router();

router.get('/', (req, res) => res.send('Welcome to the PostgreSQL API'));

// Comentadas las rutas que usan los controladores
router.post('/users', controllers.createUser);
router.get('/users', controllers.getAllUsers);

module.exports = router;

