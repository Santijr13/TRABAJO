const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');  

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());  
app.use(express.json());  
app.use(express.static(path.join(__dirname, 'public')));  

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',          
    user: 'root',         
    password: '0209',   
    database: 'usuarios'        
});

// Manejo de la conexión
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;  
    }
    console.log('Conectado a la base de datos MySQL.');
});

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

     const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Error encriptando la contraseña' });
        }

         const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hash], (error, results) => {
            if (error) {
                console.error('Error al registrar el usuario:', error);
                return res.status(500).json({ message: 'Error en el servidor al registrar el usuario' });
            }
            return res.status(201).json({ message: 'Usuario registrado correctamente' });
        });
    });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparando las contraseñas:', err);
                return res.status(500).json({ message: 'Error en el servidor' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            return res.status(200).json({ message: 'Inicio de sesión exitoso' });  
        });
    });
});

   
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
