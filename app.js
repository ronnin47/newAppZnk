import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { fileURLToPath } from 'url'; // Importa la función fileURLToPath para convertir __filename a ruta de archivo
import { dirname, join } from 'path'; // Importa dirname y join para trabajar con rutas de archivos


import pkg from 'pg'; 
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Obtiene la ruta del directorio actual
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors()); // Permitir CORS para todas las rutas

// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(join(__dirname, 'dist')));





dotenv.config();

const { Pool } = pkg; 


// Configura el límite del tamaño del cuerpo de la solicitud
app.use(bodyParser.json({ limit: '50mb' }));  // Aumenta el límite a 50 MB para JSON
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Aumenta el límite a 50 MB para URL-encoded

// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(join(__dirname, 'dist')));

const server = http.createServer(app);


//LOCAL HOST

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',          // Reemplaza con tu usuario de PostgreSQL
  host: 'localhost',
  database: 'newAppZnk', // Reemplaza con el nombre de tu base de datos
  password: 'hikonometaiseno',   // Reemplaza con tu contraseña de PostgreSQL
  port: 5432,
});





async function checkDatabaseConnection() {
  try {
    // Verifica la conexión a la base de datos
    await pool.query('SELECT NOW()');
    console.log('Conexión a la base de datos PostgreSQL exitosa.');

    // Realiza una consulta adicional para verificar que puedes obtener datos
    const result = await pool.query('SELECT * FROM usuarios LIMIT 1');
    if (result.rows.length > 0) {
      console.log('Consulta a la tabla personajes exitosa. Datos obtenidos:');
      console.log(result.rows); // Imprime una muestra de los datos obtenidos
    } else {
      console.log('La tabla usuarios está vacía.');
    }
  } catch (err) {
    console.error('Error al conectar a la base de datos PostgreSQL o al realizar la consulta:', err.message);
    process.exit(1); // Salir del proceso con un código de error
  }
}
// Llama a la función de verificación de conexión al iniciar el servidor
checkDatabaseConnection();

app.use(express.json());




const io = new Server(server, {
  cors: {
    origin: '*', // Cambia esto según sea necesario
  },
});

io.on('connection', (socket) => {
  console.log('Socket: un usuario se conecto');

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Socket: un usuario se desconecto');
  });
});





// INSERTAR USUARIO ok!!
app.post('/insert-usuario', async (req, res) => {
  const { email, contrasenia } = req.body;
    console.log("llego la peticion de insert de usuario")
    console.log(req.body)
  

  try {
    const query = `
      INSERT INTO usuarios (email, contrasenia)
      VALUES ($1, $2)
      RETURNING idusuario
    `;

    const values = [email, contrasenia];
    const result = await pool.query(query, values);

    const newId = result.rows[0].idusuario;
    console.log("El Id que viene de la base de datos es: "+newId)
    res.status(201).json({ message: `Bienvenido ${email}.`, idusuario: newId });
  } catch (err) {

    if (err.code === '23505') { // Código de error para violación de restricción de unicidad
      console.error('El email ya existe.');
      res.json({ message: 'El mail ya se encuentra registrado.' });
    } else {
      console.error('Error al insertar el usuario:', err.message);
      res.status(500).json({ error: 'Error al insertar el usuario.' });
    }

    
  }
});



app.post('/loginUsuario', async (req, res) => {
  const { email, contrasenia } = req.body;

  console.log("Info del cliente que se loguea: ", req.body);

  try {
    // Verificar si el usuario existe
    const userQuery = 'SELECT * FROM usuarios WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      console.log("No se encontró el usuario con el email proporcionado.");
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const user = userResult.rows[0];

    // Verificar la contraseña directamente
    if (user.contrasenia !== contrasenia) {
      console.log("Contraseña proporcionada no coincide con la almacenada.");
      console.log("Contraseña de la base de datos: ", user.contrasenia);
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    // Si se necesita obtener los personajes del usuario, descomenta el siguiente código
    /*
    const personajesQuery = 'SELECT * FROM personajes WHERE usuario_id = $1';
    const personajesResult = await pool.query(personajesQuery, [user.idusuario]);
    */

    console.log("Inicio de sesión exitoso para el usuario:", user.idusuario);

    res.json({
      message: 'Inicio de sesión exitoso',
      // personajes: personajesResult.rows, // Descomenta esto si obtienes personajes
    });

  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

//UPDATE
/*
//UPDATE ok!!
app.put('/update-personaje', async (req, res) => {
  const { idpersonaje, nombre, dominio, ken, conviccion, imagen } = req.body;

  //console.log("esto viene del req",req.body)
   // Convierte la imagen de base64 a un buffer
   const imagenBuffer = Buffer.from(imagen, 'base64');
  try {
    // Consulta para actualizar el personaje en la base de datos
    const result = await pool.query(
      `UPDATE personajes
       SET nombre = $1, dominio = $2, ken = $3, conviccion = $4, imagen = $5
       WHERE idpersonaje = $6`,
      [nombre, dominio, ken, conviccion, imagenBuffer, idpersonaje]
    );

    // Verifica si se actualizó algún registro
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Personaje actualizado correctamente' });
    } else {
      res.status(404).json({ message: 'Personaje no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el personaje:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

*/




const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server levantado en el puerto http://localhost:${PORT}`);
});

// Ruta para manejar todas las solicitudes y devolver el archivo HTML principal

app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});