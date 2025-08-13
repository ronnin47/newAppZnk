import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { fileURLToPath } from 'url'; 
import { dirname, join } from 'path'; 
import pkg from 'pg'; 
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';
//para la carpeta de imagene sy sus urls
//const cloudinary = require('cloudinary').v2;

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors()); 

app.use(express.static(join(__dirname, 'dist')));
dotenv.config();
const { Pool } = pkg; 


app.use(bodyParser.json({ limit: '50mb' }));  
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 

app.use(express.static(join(__dirname, 'dist')));

const server = http.createServer(app);

/*
//LOCAL HOST
const pool = new Pool({
  user: 'postgres',          // Reemplaza con tu usuario de PostgreSQL
  host: 'localhost',
  database: 'baseLocalZnk', // Reemplaza con el nombre de tu base de datos
  password: '041183',   // Reemplaza con tu contraseña de PostgreSQL
  port: 5432,
});
*/

/*
const pool = new Pool({
  user: 'gorda',          
  host: 'dpg-ctmluupopnds73fgeus0-a',
  database: 'baseenero', 
  password: 'euuj1xWFh0oyyiHdIib89guQPwBuFrap',  
  port: 5432,
});
*/





//base de datos en RENDER
const pool = new Pool({
  user: 'gorda',
  host: 'dpg-d1s01g7diees73akbt00-a.oregon-postgres.render.com',
  database: 'appbasenative',
  password: '7p1AkuNrAUkPQpM0i75VCA5Ljx71WLRC',
  port: 5432,
   ssl: {
    rejectUnauthorized: false, // Esto es clave en conexiones con Render
  },
});




//PARA GAURDADO DE IMAGENES Y OBTENER URLS
cloudinary.config({
  cloud_name: 'dzul1hatw',
  api_key: '687946621544217',
  api_secret: '09DUepXU-FApoUrHnc8h6sJb25I',
});


app.get('/', (req, res) => {
  res.send('Servidor funcionando y conectado a PostgreSQL');
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

checkDatabaseConnection();

app.use(express.json());



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
  
transporter.verify().then(()=>{
console.log("Ready for send e-mail")
})



/*
const io = new Server(server, {
  cors: {
    origin: '*', // Cambia esto según sea necesario
  },
});


const connectedUsers = new Map();

function normalizarMensaje(mensaje) {
  return {
    usuarioId: mensaje.usuarioId?.toString() ?? '',
    idpersonaje: mensaje.idpersonaje?.toString() ?? '',
    nombre: mensaje.nombre?.toString() ?? '',
    mensaje: mensaje.mensaje?.toString() ?? '',
    estatus: mensaje.estatus?.toString() ?? '',
    imagenurl: mensaje.imagenurl?.toString() ?? '',
    imagenPjUrl: mensaje.imagenPjUrl?.toString() ?? '',
    nick: mensaje.nick?.toString() ?? '',
    kenActual: mensaje.kenActual?.toString() ?? '',
    ken: mensaje.ken?.toString() ?? '',
    kiActual: mensaje.kiActual?.toString() ?? '',
    ki: mensaje.ki?.toString() ?? '',
    vidaActual: mensaje.vidaActual?.toString() ?? '',
    vidaTotal: mensaje.vidaTotal?.toString() ?? '',
    timestamp: Date.now(),
    tipo: mensaje.tipo?.toString() ?? '',
  };
}

io.on('connection', (socket) => {
  console.log('Socket: un usuario se conectó');

  socket.on('user-connected', (userData) => {
    const { usuarioId, sesion } = userData;
    if (usuarioId && sesion) {
      connectedUsers.set(socket.id, usuarioId);
      console.log(`Usuario ${usuarioId} conectado.`);
      io.emit('connected-users', Array.from(connectedUsers.values()));
    }
  });

  socket.on('image', (imageData) => {
    io.emit('image', imageData);
  });

  socket.on('removeImage', (idpersonaje) => {
    console.log(`Eliminando personaje con id: ${idpersonaje}`);
    io.emit('removeImage', idpersonaje);
  });

  // Aquí adaptamos 'message' para guardar en DB y luego emitir
  socket.on('message', async (mensaje) => {
    const msgNormalizado = normalizarMensaje(mensaje);

    try {
      const insertQuery = `
        INSERT INTO mensajes (
          "usuarioId", idpersonaje, nombre, mensaje, estatus,
          imagenurl, "imagenPjUrl", nick,
          "kenActual", ken, "kiActual", ki,
          "vidaActual", "vidaTotal", timestamp, tipo
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
        RETURNING id
      `;

      const { rows } = await pool.query(insertQuery, [
        msgNormalizado.usuarioId,
        msgNormalizado.idpersonaje,
        msgNormalizado.nombre,
        msgNormalizado.mensaje,
        msgNormalizado.estatus,
        msgNormalizado.imagenurl,
        msgNormalizado.imagenPjUrl,
        msgNormalizado.nick,
        msgNormalizado.kenActual,
        msgNormalizado.ken,
        msgNormalizado.kiActual,
        msgNormalizado.ki,
        msgNormalizado.vidaActual,
        msgNormalizado.vidaTotal,
        msgNormalizado.timestamp,
        msgNormalizado.tipo,
      ]);

      msgNormalizado.id = rows[0].id;
    } catch (error) {
      console.error('Error al guardar mensaje en DB:', error);
      // Si falla, no bloqueamos el chat, asignamos un id temporal
      msgNormalizado.id = Date.now().toString() + Math.random().toString(36).substring(2);
    }

    io.emit('message', msgNormalizado);
  });

  socket.on('user-disconnect', (data) => {
    const { usuarioId } = data;
    const socketId = [...connectedUsers.entries()].find(([key, value]) => value === usuarioId)?.[0];
    if (socketId) {
      connectedUsers.delete(socketId);
      console.log(`Usuario ${usuarioId} se desconectó por cierre de sesión.`);
      io.emit('connected-users', Array.from(connectedUsers.values()));
    }
  });

  socket.on('disconnect', () => {
    const usuarioId = connectedUsers.get(socket.id);
    if (usuarioId) {
      connectedUsers.delete(socket.id);
      console.log(`Usuario ${usuarioId} se desconectó.`);
      io.emit('user-disconnect', { usuarioId });
      io.emit('connected-users', Array.from(connectedUsers.values()));
    }
  });
});

*/




//*************PETICIONES********************* 
app.post('/insert-usuario', async (req, res) => {
  const { email, contrasenia } = req.body;
    const estatus="jugador"
  
  try {
    const query = `
      INSERT INTO usuarios (email, contrasenia, estatus)
      VALUES ($1, $2, $3)
      RETURNING idusuario
    `;

    const values = [email, contrasenia, estatus];
    const result = await pool.query(query, values);

    const newId = result.rows[0].idusuario;
    const newEstatus = result.rows[0].estatus;

    res.status(201).json({ message: `Bienvenido ${email}.`, idusuario: newId, estatus: newEstatus });
  } catch (err) {

    if (err.code === '23505') { 
      res.json({ message: 'El mail ya se encuentra registrado.' });
    } else {
      console.error('Error al insertar el usuario:', err.message);
      res.status(500).json({ error: 'Error al insertar el usuario.' });
    }

    
  }
});

app.post('/loginUsuario', async (req, res) => {
  const { email, contrasenia } = req.body;
  try {
    const userQuery = 'SELECT * FROM usuarios WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      console.log("No se encontró el usuario con el email proporcionado.");
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
 
    const user = userResult.rows[0];
    const idusuario = userResult.rows[0].idusuario;
    const estatus = userResult.rows[0].estatus;

    if (user.contrasenia !== contrasenia) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
    res.json({
      message: 'Inicio de sesión exitoso',
      //personajes: personajesResult.rows, 
      idusuario: idusuario,
      estatus: estatus,
    });

  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});




//ya tiene cloudnary
app.get('/consumirPersonajesNarrador', async (req, res) => {
  try {
    const userQuery = `
      SELECT 
        idpersonaje, nombre, dominio, raza, naturaleza, edad, ken, ki, destino, "pDestino",
        fuerza, fortaleza, destreza, agilidad, sabiduria, presencia, principio,
        sentidos, academisismo, alerta, atletismo, "conBakemono", mentir, pilotear,
        "artesMarciales", medicina, "conObjMagicos", sigilo, "conEsferas", "conLeyendas",
        forja, "conDemonio", "conEspiritual", "manejoBlaster", "manejoSombras", "tratoBakemono",
        "conHechiceria", "medVital", "medEspiritual", rayo, fuego, frio, veneno, corte,
        energia, ventajas, "apCombate", "valCombate", "apCombate2", "valCombate2",
        add1, "valAdd1", add2, "valAdd2", add3, "valAdd3", add4, "valAdd4",
        inventario, dominios, "kenActual", "kiActual", positiva, negativa, "vidaActual",
        hechizos, consumision, iniciativa, historia, "tecEspecial", conviccion, cicatriz,
        notasaga, resistencia, "pjPnj", imagenurl,imagencloudid, "usuarioId"
      FROM personajes
    `;



    const userResult = await pool.query(userQuery);

    if (userResult.rows.length === 0) {
  return res.status(404).json({ message: 'No se encontraron personajes en la base de datos' });
}

    const coleccionPersonajes = userResult.rows;
    res.json({
      message: 'Se consumiron todos los personajes',
      coleccionPersonajes: coleccionPersonajes,   
    });

  } catch (error) {
    console.error('Error al obtener coleccion todos los persoanjes de la base de datos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

//ya tiene cloudnary
app.get('/consumirPersonajesUsuario', async (req, res) => {
  try {
    
    const { usuarioId } = req.query;
   // console.log("el id del usuario es: ",usuarioId)
    const userQuery = `
      SELECT 
        idpersonaje, nombre, dominio, raza, naturaleza, edad, ken, ki, destino, "pDestino",
        fuerza, fortaleza, destreza, agilidad, sabiduria, presencia, principio,
        sentidos, academisismo, alerta, atletismo, "conBakemono", mentir, pilotear,
        "artesMarciales", medicina, "conObjMagicos", sigilo, "conEsferas", "conLeyendas",
        forja, "conDemonio", "conEspiritual", "manejoBlaster", "manejoSombras", "tratoBakemono",
        "conHechiceria", "medVital", "medEspiritual", rayo, fuego, frio, veneno, corte,
        energia, ventajas, "apCombate", "valCombate", "apCombate2", "valCombate2",
        add1, "valAdd1", add2, "valAdd2", add3, "valAdd3", add4, "valAdd4",
        inventario, dominios, "kenActual", "kiActual", positiva, negativa, "vidaActual",
        hechizos, consumision, iniciativa, historia, "tecEspecial", conviccion, cicatriz,
        notasaga, resistencia, "pjPnj", imagenurl, imagencloudid, "usuarioId"
      FROM personajes
      WHERE "usuarioId" = $1
      ORDER BY "idpersonaje" ASC
    `;
    const userResult = await pool.query(userQuery,[usuarioId]);

   
   if (userResult.rows.length === 0) {
  return res.status(200).json({
    message: 'Usuario sin personajes aún',
    coleccionPersonajes: [],  // ← importante
  });
}

    const coleccionPersonajes = userResult.rows;

   

    
    res.json({
      message: 'Peticion de personajes consumidos exitoso',
      coleccionPersonajes: coleccionPersonajes,   
    });

  } catch (error) {
    console.error('Error al obtener coleccion personajes del Usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

//ya tiene cloudnary
app.post('/insert-personaje', async (req, res) => {
  const {
    nombre,
    dominio,
    raza,
    naturaleza,
    edad,
    ken,
    ki,
    destino,
    pDestino,
    fuerza,
    fortaleza,
    destreza,
    agilidad,
    sabiduria,
    presencia,
    principio,
    sentidos,
    academisismo,
    alerta,
    atletismo,
    conBakemono,
    mentir,
    pilotear,
    artesMarciales,
    medicina,
    conObjMagicos,
    sigilo,
    conEsferas,
    conLeyendas,
    forja,
    conDemonio,
    conEspiritual,
    manejoBlaster,
    manejoSombras,
    tratoBakemono,
    conHechiceria,
    medVital,
    medEspiritual,
    rayo,
    fuego,
    frio,
    veneno,
    corte,
    energia,
    ventajas,
    apCombate,
    valCombate,
    apCombate2,
    valCombate2,
    add1,
    valAdd1,
    add2,
    valAdd2,
    add3,
    valAdd3,
    add4,
    valAdd4,
    imagen, // base64
    inventario,
    dominios,
    kenActual,
    kiActual,
    positiva,
    negativa,
    vidaActual,
    hechizos,
    consumision,
    iniciativa,
    historia,
    usuarioId,
    tecEspecial,
    conviccion,
    cicatriz,
    notaSaga,
    resistencia,
    pjPnj,
  } = req.body;

  try {
    // 1. Insertar personaje SIN imagen ni imagenurl
    const query = `
      INSERT INTO personajes (
        nombre, dominio, raza, naturaleza, edad, ken, ki, destino, "pDestino",
        fuerza, fortaleza, destreza, agilidad, sabiduria, presencia, principio,
        sentidos, academisismo, alerta, atletismo, "conBakemono", mentir, pilotear,
        "artesMarciales", medicina, "conObjMagicos", sigilo, "conEsferas", "conLeyendas",
        forja, "conDemonio", "conEspiritual", "manejoBlaster", "manejoSombras", "tratoBakemono",
        "conHechiceria", "medVital", "medEspiritual", rayo, fuego, frio, veneno, corte,
        energia, ventajas, "apCombate", "valCombate", "apCombate2", "valCombate2",
        add1, "valAdd1", add2, "valAdd2", add3, "valAdd3", add4, "valAdd4",
        inventario, dominios, "kenActual", "kiActual", positiva, negativa, "vidaActual",
        hechizos, consumision, iniciativa, historia, "tecEspecial", conviccion, cicatriz,
        notasaga, resistencia, "pjPnj", "usuarioId"
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15, $16,
        $17, $18, $19, $20, $21, $22, $23,
        $24, $25, $26, $27, $28, $29,
        $30, $31, $32, $33, $34, $35,
        $36, $37, $38, $39, $40, $41, $42, $43,
        $44, $45, $46, $47, $48, $49,
        $50, $51, $52, $53, $54, $55,
        $56, $57, $58, $59, $60, $61,
        $62, $63, $64, $65, $66, $67,
        $68, $69, $70, $71, $72, $73,
        $74, $75
      )
      RETURNING idpersonaje
    `;

    const values = [
      nombre, dominio, raza, naturaleza, edad, ken, ki, destino, pDestino,
      fuerza, fortaleza, destreza, agilidad, sabiduria, presencia, principio,
      sentidos, academisismo, alerta, atletismo, conBakemono, mentir, pilotear,
      artesMarciales, medicina, conObjMagicos, sigilo, conEsferas, conLeyendas,
      forja, conDemonio, conEspiritual, manejoBlaster, manejoSombras, tratoBakemono,
      conHechiceria, medVital, medEspiritual, rayo, fuego, frio, veneno, corte,
      energia, ventajas, apCombate, valCombate, apCombate2, valCombate2,
      add1, valAdd1, add2, valAdd2, add3, valAdd3, add4, valAdd4,
      inventario, dominios, kenActual, kiActual, positiva, negativa, vidaActual,
      hechizos, consumision, iniciativa, historia, tecEspecial, conviccion, cicatriz,
      notaSaga, resistencia, pjPnj, usuarioId,
    ];

    const result = await pool.query(query, values);
    const newId = result.rows[0].idpersonaje;

    let imageUrl = null;

    // 2. Si envían imagen base64, subir a Cloudinary
    if (imagen) {
      const matches = imagen.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: 'Imagen base64 inválida.' });
      }
      const ext = matches[1];
      const data = matches[2];

      const uploadResult = await cloudinary.uploader.upload(`data:image/${ext};base64,${data}`, {
        folder: 'personajes',
        public_id: `personaje_${newId}`,
        overwrite: true,
      });

      imageUrl = uploadResult.secure_url;

      // 3. Actualizar la url en el registro
      await pool.query(
        'UPDATE personajes SET imagenurl = $1 WHERE idpersonaje = $2',
        [imageUrl, newId]
      );
    }

    // 4. Responder con éxito y url imagen
    res.status(201).json({
      message: 'Personaje insertado exitosamente.',
      idpersonaje: newId,
      imagenurl: imageUrl,
    });
  } catch (err) {
    console.error('Error al insertar el personaje:', err);
    res.status(500).json({ error: 'Error al insertar el personaje.' });
  }
});

app.post('/insert-personajeBake', async (req, res) => {
  const {
    nombre, dominio, raza, naturaleza, edad, ken, ki, destino, pDestino,
    fuerza, fortaleza, destreza, agilidad, sabiduria, presencia, principio,
    sentidos, academisismo, alerta, atletismo, conBakemono, mentir, pilotear,
    artesMarciales, medicina, conObjMagicos, sigilo, conEsferas, conLeyendas,
    forja, conDemonio, conEspiritual, manejoBlaster, manejoSombras, tratoBakemono,
    conHechiceria, medVital, medEspiritual, rayo, fuego, frio, veneno, corte,
    energia, ventajas, apCombate, valCombate, apCombate2, valCombate2,
    add1, valAdd1, add2, valAdd2, add3, valAdd3, add4, valAdd4,
    imagenurl, // <-- aquí llega la URL (string) desde el front
    inventario, dominios, kenActual, kiActual, positiva, negativa, vidaActual,
    hechizos, consumision, iniciativa, historia, tecEspecial, conviccion, cicatriz,
    notaSaga, resistencia, pjPnj, usuarioId
  } = req.body;

  try {
    // Columnas en el mismo orden que el array `values` más abajo
    const columns = [
      'nombre','dominio','raza','naturaleza','edad','ken','ki','destino','"pDestino"',
      'fuerza','fortaleza','destreza','agilidad','sabiduria','presencia','principio',
      'sentidos','academisismo','alerta','atletismo','"conBakemono"','mentir','pilotear',
      '"artesMarciales"','medicina','"conObjMagicos"','sigilo','"conEsferas"','"conLeyendas"',
      'forja','"conDemonio"','"conEspiritual"','"manejoBlaster"','"manejoSombras"','"tratoBakemono"',
      '"conHechiceria"','"medVital"','"medEspiritual"','rayo','fuego','frio','veneno','corte',
      'energia','ventajas','"apCombate"','"valCombate"','"apCombate2"','"valCombate2"',
      'add1','"valAdd1"','add2','"valAdd2"','add3','"valAdd3"','add4','"valAdd4"',
      'imagenurl','inventario','dominios','"kenActual"','"kiActual"','positiva','negativa','"vidaActual"',
      'hechizos','consumision','iniciativa','historia','"tecEspecial"','conviccion','cicatriz',
      'notasaga','resistencia','"pjPnj"','"usuarioId"'
    ];

    const values = [
      nombre, dominio, raza, naturaleza, edad, ken, ki, destino, pDestino,
      fuerza, fortaleza, destreza, agilidad, sabiduria, presencia, principio,
      sentidos, academisismo, alerta, atletismo, conBakemono, mentir, pilotear,
      artesMarciales, medicina, conObjMagicos, sigilo, conEsferas, conLeyendas,
      forja, conDemonio, conEspiritual, manejoBlaster, manejoSombras, tratoBakemono,
      conHechiceria, medVital, medEspiritual, rayo, fuego, frio, veneno, corte,
      energia, ventajas, apCombate, valCombate, apCombate2, valCombate2,
      add1, valAdd1, add2, valAdd2, add3, valAdd3, add4, valAdd4,
      imagenurl, inventario, dominios, kenActual, kiActual, positiva, negativa, vidaActual,
      hechizos, consumision, iniciativa, historia, tecEspecial, conviccion, cicatriz,
      notaSaga, resistencia, pjPnj, usuarioId
    ];

    // Por seguridad/debug: comprobar que columnas y valores coinciden
    if (columns.length !== values.length) {
      console.error('Mismatch columns/values length', columns.length, values.length);
      return res.status(500).json({ error: 'Error interno: mismatch columnas/valores' });
    }

    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO personajes (${columns.join(', ')}) VALUES (${placeholders}) RETURNING idpersonaje`;
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Personaje insertado exitosamente.',
      idpersonaje: result.rows[0].idpersonaje
    });
  } catch (err) {
    console.error('Error al insertar el personaje:', err);
    res.status(500).json({ error: 'Error al insertar el personaje.' });
  }
});

//ya tiene cloudnary
app.put('/update-personaje/:id', async (req, res) => {
  const idpersonaje = req.params.id;
  //console.log("se disparo")
  

  const {
    nombre, dominio, raza, naturaleza, edad, ken, ki, destino, pDestino,
    fuerza, fortaleza, destreza, agilidad, sabiduria, presencia, principio,
    sentidos, academisismo, alerta, atletismo, conBakemono, mentir, pilotear,
    artesMarciales, medicina, conObjMagicos, sigilo, conEsferas, conLeyendas,
    forja, conDemonio, conEspiritual, manejoBlaster, manejoSombras, tratoBakemono,
    conHechiceria, medVital, medEspiritual, rayo, fuego, frio, veneno, corte,
    energia, ventajas, apCombate, valCombate, apCombate2, valCombate2,
    add1, valAdd1, add2, valAdd2, add3, valAdd3, add4, valAdd4,
    imagen, inventario, dominios, kenActual, kiActual, positiva, negativa,
    vidaActual, hechizos, consumision, iniciativa, historia, usuarioId,
    tecEspecial, conviccion, cicatriz, resistencia, pjPnj
  } = req.body;


  
  try {
    let imagenurl = null;
    let imagencloudid = null;

    // Si hay imagen base64, la subimos a Cloudinary
    if (imagen && imagen.startsWith('data:image/')) {
      const matches = imagen.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: 'Imagen base64 inválida.' });
      }

      const ext = matches[1];
      const data = matches[2];

      const uploadResult = await cloudinary.uploader.upload(`data:image/${ext};base64,${data}`, {
        folder: 'personajes',
        public_id: `personaje_${idpersonaje}`,
        overwrite: true,
      });

      imagenurl = uploadResult.secure_url;
      imagencloudid = uploadResult.public_id;

      // Actualizar imagenurl e imagencloudid en la base
      await pool.query(
        'UPDATE personajes SET imagenurl = $1, imagencloudid = $2 WHERE idpersonaje = $3',
        [imagenurl, imagencloudid, idpersonaje]
      );
    }

    // Actualizar los demás campos
    const query = `
      UPDATE personajes SET
        nombre=$1, dominio=$2, raza=$3, naturaleza=$4, edad=$5,
        ken=$6, ki=$7, destino=$8, "pDestino"=$9, fuerza=$10,
        fortaleza=$11, destreza=$12, agilidad=$13, sabiduria=$14,
        presencia=$15, principio=$16, sentidos=$17, academisismo=$18,
        alerta=$19, atletismo=$20, "conBakemono"=$21, mentir=$22,
        pilotear=$23, "artesMarciales"=$24, medicina=$25, "conObjMagicos"=$26,
        sigilo=$27, "conEsferas"=$28, "conLeyendas"=$29, forja=$30,
        "conDemonio"=$31, "conEspiritual"=$32, "manejoBlaster"=$33,
        "manejoSombras"=$34, "tratoBakemono"=$35, "conHechiceria"=$36,
        "medVital"=$37, "medEspiritual"=$38, rayo=$39, fuego=$40,
        frio=$41, veneno=$42, corte=$43, energia=$44, ventajas=$45,
        "apCombate"=$46, "valCombate"=$47, "apCombate2"=$48,
        "valCombate2"=$49, add1=$50, "valAdd1"=$51, add2=$52,
        "valAdd2"=$53, add3=$54, "valAdd3"=$55, add4=$56, "valAdd4"=$57,
        inventario=$58, dominios=$59, "kenActual"=$60,
        "kiActual"=$61, positiva=$62, negativa=$63, "vidaActual"=$64,
        hechizos=$65, consumision=$66, iniciativa=$67, historia=$68,
        "usuarioId"=$69, "tecEspecial"=$70, conviccion=$71, cicatriz=$72,
        resistencia=$73, "pjPnj"=$74
      WHERE idpersonaje=$75
    `;

    const values = [
      nombre, dominio, raza, naturaleza, edad, ken, ki, destino, pDestino,
      fuerza, fortaleza, destreza, agilidad, sabiduria, presencia, principio,
      sentidos, academisismo, alerta, atletismo, conBakemono, mentir, pilotear,
      artesMarciales, medicina, conObjMagicos, sigilo, conEsferas, conLeyendas,
      forja, conDemonio, conEspiritual, manejoBlaster, manejoSombras, tratoBakemono,
      conHechiceria, medVital, medEspiritual, rayo, fuego, frio, veneno, corte,
      energia, ventajas, apCombate, valCombate, apCombate2, valCombate2,
      add1, valAdd1, add2, valAdd2, add3, valAdd3, add4, valAdd4,
      inventario, dominios, kenActual, kiActual, positiva, negativa,
      vidaActual, hechizos, consumision, iniciativa, historia, usuarioId,
      tecEspecial, conviccion, cicatriz, resistencia, pjPnj, idpersonaje
    ];

    await pool.query(query, values);

    res.status(201).json({ message: 'Personaje modificado exitosamente.', idpersonaje, imagenurl, imagencloudid });

  } catch (err) {
    console.error('Error al modificar el personaje:', err.message);
    res.status(500).json({ error: 'Error al modificar el personaje.' });
  }
});

//ya tiene cloudnary
app.delete('/deletePersonaje/:id', async (req, res) => {
  const idpersonaje = parseInt(req.params.id, 10);

  try {
    // 1) Obtener el imagencloudid (nombre público en Cloudinary)
    const { rows } = await pool.query(
      'SELECT imagencloudid FROM personajes WHERE idpersonaje = $1',
      [idpersonaje]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Personaje no encontrado.' });
    }

    const imagencloudid = rows[0].imagencloudid;

    // 2) Eliminar el personaje de la base de datos
    const result = await pool.query(
      'DELETE FROM personajes WHERE idpersonaje = $1 RETURNING *',
      [idpersonaje]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'No se pudo eliminar el personaje.' });
    }

    // 3) Si había imagencloudid, eliminar imagen de Cloudinary
    if (imagencloudid) {
      try {
        await cloudinary.uploader.destroy(imagencloudid);
        console.log(`🗑️ Imagen ${imagencloudid} eliminada de Cloudinary`);
      } catch (cloudErr) {
        console.error('❌ Error al eliminar imagen en Cloudinary:', cloudErr.message);
        // No cancelamos la respuesta por error en imagen, pero lo informamos
      }
    }

    res.status(200).json({
      message: 'Personaje y su imagen eliminados correctamente.',
      deletedPersonaje: result.rows[0]
    });

  } catch (error) {
    console.error('🚨 Error al eliminar personaje:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});














app.post('/insertGrupo', async (req, res) => {
  const { 
    nombre,
    idspersonajes,    
   } = req.body;
  try {
    const query = `
      INSERT INTO grupos (
      nombre, 
      idspersonajes 
      )
      VALUES ($1, $2)
      RETURNING idgrupo
    `;

    const values = [
      nombre,
      idspersonajes,
      ];
    const result = await pool.query(query, values);
    const newId = result.rows[0].idgrupo;
    res.status(201).json({ message: 'Grupo insertado exitosamente.', idgrupo: newId });
  } catch (err) {
    console.error('Error al insertar el nuevo Grupo:', err.message);
    res.status(500).json({ error: 'Error al insertar el nuevo Grupo.' });
  }
});

app.get('/consumirGrupos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM grupos');
    const coleccionGrupos = result.rows;
    if (!Array.isArray(coleccionGrupos)) {
      return res.status(500).json({ message: 'Error: no se encontró la colección de grupos.' });
    }

    res.status(200).json({ coleccionGrupos });
  } catch (err) {
    console.error('Error al consumir los grupos:', err.message);
    res.status(500).json({ error: 'Error al consumir los grupos.' });
  }
});

app.put('/update-grupos', async (req, res) => {
  const { idgrupo, idspersonajes } = req.body; 
  try {
    const result = await pool.query(
      'UPDATE grupos SET idspersonajes = $1 WHERE idgrupo = $2 RETURNING *',
      [idspersonajes, idgrupo]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Grupo no encontrado' });
    }
    res.json({ message: 'Grupo actualizado exitosamente', grupo: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar el grupo en la base de datos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.delete('/delete-grupo/:idgrupo', async (req, res) => {
  const { idgrupo } = req.params;

  try {
    const resultado = await pool.query('DELETE FROM grupos WHERE idgrupo = $1', [idgrupo]);
    if (resultado.rowCount > 0) {
      res.status(200).json({ message: 'Grupo eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Grupo no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el grupo:', error);
    res.status(500).json({ message: 'Error al eliminar el grupo' });
  }
});





app.get('/consumirTecEspeciales', async (req, res) => {
   try {
     const userQuery = 'SELECT nombre, idpersonaje, ken, "tecEspecial" FROM personajes WHERE "tecEspecial" IS NOT NULL AND array_length("tecEspecial", 1) > 0;';
     const userResult = await pool.query(userQuery);
 
     if (userResult.rows.length === 0) {
      return res.status(204).json({ message: 'No se recuperaron personajes con técnicas/objetos/poderes especiales.' });
   }
     const poderesEspeciales = userResult.rows;
     res.json({
       message: 'Consumir tec especiales',
       poderesEspeciales: poderesEspeciales, 
     
     });
 
   } catch (error) {
     console.error('Error al consumir tecnicas especiales:', error);
     res.status(500).json({ message: 'Error en el servidor' });
   }
 });




//insert saga ya tiene cloudnary
app.post('/insertSaga', async (req, res) => {

 // console.log("esto viene del cliente: ",req.body)
  const {
    titulo,
    presentacion,
    imagensaga, // si tenés otro campo aparte de imagen
    personajes=[],
  } = req.body;

  try {
    // 1. Insertar saga sin imagenurl ni imagencloudid
    const insertQuery = `
      INSERT INTO sagas (titulo, presentacion, imagensaga, personajes)
      VALUES ($1, $2, $3, $4)
      RETURNING idsaga
    `;

    const insertValues = [titulo, presentacion, imagensaga, personajes];
    const insertResult = await pool.query(insertQuery, insertValues);

    const newSagaId = insertResult.rows[0].idsaga;

    let imagenUrl = null;
    let imagenCloudId = null;

    // 2. Si recibís imagen base64, subir a Cloudinary
    if (imagensaga) {
      const matches = imagensaga.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!matches) return res.status(400).json({ error: 'Imagen base64 inválida.' });

      const ext = matches[1];
      const data = matches[2];

      const uploadResult = await cloudinary.uploader.upload(`data:image/${ext};base64,${data}`, {
        folder: 'sagas',
        public_id: `saga_${newSagaId}`,
        overwrite: true,
      });

      imagenUrl = uploadResult.secure_url;
      imagenCloudId = uploadResult.public_id;

      // 3. Actualizar saga con URL e id Cloudinary
      const updateQuery = `
        UPDATE sagas SET imagenurl = $1, imagencloudid = $2 WHERE idsaga = $3
      `;

      await pool.query(updateQuery, [imagenUrl, imagenCloudId, newSagaId]);
    }

    // 4. Retornar resultado con el idsaga y url de imagen
    res.status(201).json({
      message: 'Saga creada exitosamente.',
      idsaga: newSagaId,
      imagenurl: imagenUrl,
      imagencloudid: imagenCloudId,
    });

  } catch (error) {
    console.error('Error al insertar la saga:', error);
    res.status(500).json({ error: 'Error al insertar la saga.' });
  }
});

//consmumir cloudnary
app.get('/consumirSagas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT idsaga, titulo, presentacion, personajes, imagenurl, imagencloudid
     FROM sagas ORDER BY idsaga DESC
    `);

    res.status(200).json({ coleccionSagas: result.rows });
  } catch (error) {
    console.error('Error al obtener sagas:', error);
    res.status(500).json({ error: 'Error interno al obtener sagas' });
  }
});

//quedo como estaba
app.put('/updateSaga/:idsaga', async (req, res) => {
  const { idsaga } = req.params;
  const { presentacion} = req.body;

  try {
    await pool.query(
      'UPDATE sagas SET presentacion = $1 WHERE idsaga = $2',
      [presentacion,idsaga]
    );

    res.status(200).json({ message: 'Saga actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar presentacion de la saga:', error);
    res.status(500).json({ message: 'Error al actualizar presentacion de la saga' });
  }
});


app.delete('/deleteSaga/:idsaga', async (req, res) => {
  const { idsaga } = req.params;

  try {
    // 1. Obtener el imagencloudid de la saga
    const result = await pool.query(
      'SELECT imagencloudid FROM sagas WHERE idsaga = $1',
      [idsaga]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Saga no encontrada' });
    }

    const imagenCloudId = result.rows[0].imagencloudid;

    // 2. Si hay imagen en Cloudinary, eliminarla
    if (imagenCloudId) {
      try {
        await cloudinary.uploader.destroy(imagenCloudId);
      } catch (err) {
        console.warn(`No se pudo eliminar imagen en Cloudinary: ${err.message}`);
      }
    }

    // 3. Eliminar primero las secciones relacionadas
    await pool.query('DELETE FROM secciones WHERE idsaga = $1', [idsaga]);

    // 4. Eliminar la saga en sí
    await pool.query('DELETE FROM sagas WHERE idsaga = $1', [idsaga]);

    res.status(200).json({ message: 'Saga eliminada correctamente' });

  } catch (error) {
    console.error('Error al eliminar la saga:', error);
    res.status(500).json({ message: 'Error al eliminar la saga' });
  }
});


//SECCIONES DE SAGAS
app.get('/consumirSecciones', async (req, res) => {



 
    
  try {
    const result = await pool.query(`SELECT idseccion, titulo, presentacion,idsaga, imagenurl, imagencloudid
     FROM secciones ORDER BY idseccion DESC`);
    const coleccionSecciones = result.rows;
    if (!Array.isArray(coleccionSecciones)) {
      return res.status(500).json({ message: 'Error: no se encontró la coleccionesSecciones.' });
    }

    res.status(200).json({ coleccionSecciones });
  } catch (err) {
    console.error('Error al consumir los Secciones:', err.message);
    res.status(500).json({ error: 'Error al consumir Secciones.' });
  }
});

//cloudnary 
app.post('/insertSeccion', async (req, res) => {
  const { titulo, presentacion, imagen, idsaga } = req.body;

  // Validaciones básicas
  if (!titulo || !presentacion || !idsaga) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  if (!imagen) {
    return res.status(400).json({ error: 'No se ha proporcionado una imagen' });
  }

  try {
    // 1. Insertar sección sin imagenurl ni imagencloudid para obtener el id
    const insertQuery = `
      INSERT INTO secciones (titulo, presentacion, idsaga)
      VALUES ($1, $2, $3)
      RETURNING idseccion
    `;
    const insertResult = await pool.query(insertQuery, [titulo, presentacion, idsaga]);
    const newSeccionId = insertResult.rows[0].idseccion;

    let imagenUrl = null;
    let imagenCloudId = null;

    // 2. Validar y subir imagen a Cloudinary
    const matches = imagen.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: 'Imagen base64 inválida.' });
    }

    const ext = matches[1];
    const data = matches[2];

    const uploadResult = await cloudinary.uploader.upload(
      `data:image/${ext};base64,${data}`,
      {
        folder: 'secciones',
        public_id: `seccion_${newSeccionId}`,
        overwrite: true,
      }
    );

    imagenUrl = uploadResult.secure_url;
    imagenCloudId = uploadResult.public_id;

    // 3. Actualizar la sección con la URL y el cloudId
    const updateQuery = `
      UPDATE secciones
      SET imagenurl = $1, imagencloudid = $2
      WHERE idseccion = $3
      RETURNING *
    `;
    const updateResult = await pool.query(updateQuery, [imagenUrl, imagenCloudId, newSeccionId]);

    // 4. Enviar la sección final con imagen de Cloudinary
    res.status(201).json(updateResult.rows[0]);

  } catch (error) {
    console.error('Error al insertar la sección:', error);
    res.status(500).json({ error: 'Error al insertar la sección' });
  }
});




app.put('/updateSeccion/:idseccion', async (req, res) => {
  const { idseccion } = req.params;
  const { titulo, presentacion } = req.body;

  try {
    await pool.query(
      'UPDATE secciones SET titulo = $1, presentacion = $2 WHERE idseccion = $3',
      [titulo, presentacion, idseccion]
    );

    res.status(200).json({ message: 'Sección actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la sección:', error);
    res.status(500).json({ message: 'Error al actualizar la sección' });
  }
});

app.delete('/deleteSeccion/:idseccion', async (req, res) => {
  const { idseccion } = req.params;

  try {
    // 1. Obtener el imagencloudid de la sección
    const result = await pool.query(
      'SELECT imagencloudid FROM secciones WHERE idseccion = $1',
      [idseccion]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sección no encontrada' });
    }

    const imagenCloudId = result.rows[0].imagencloudid;

    // 2. Si hay imagen en Cloudinary, eliminarla
    if (imagenCloudId) {
      try {
        await cloudinary.uploader.destroy(imagenCloudId);
      } catch (err) {
        console.warn(`No se pudo eliminar imagen en Cloudinary: ${err.message}`);
      }
    }

    // 3. Eliminar la sección en la base de datos
    await pool.query('DELETE FROM secciones WHERE idseccion = $1', [idseccion]);

    res.status(200).json({ message: 'Sección eliminada correctamente' });

  } catch (error) {
    console.error('Error al eliminar la sección:', error);
    res.status(500).json({ message: 'Error al eliminar la sección' });
  }
});






app.post('/insertPjSaga', async (req, res) => {
  const { idpersonaje, idsaga } = req.body;

  //console.log("lo que viene del cliente",req.body)

  try {
    // Usamos array_append para agregar el idpersonaje al campo 'personajes' de la saga
    const query = `
      UPDATE sagas
      SET personajes = array_append(personajes, $1)
      WHERE idsaga = $2;
    `;
    await pool.query(query, [idpersonaje, idsaga]);

    res.status(200).json({ message: 'Personaje añadido correctamente.' });
  } catch (error) {
    console.error('Error al añadir personaje:', error);
    res.status(500).json({ message: 'Hubo un error al añadir el personaje a la saga.' });
  }
});







//NOTAS
app.put('/update-notas/:idpersonaje', async (req, res) => {
  const { idpersonaje } = req.params;
  const { nota, idsaga } = req.body;

  //console.log("notas del cliente:", req.body);
  //console.log("este es el id del cliente: ", idpersonaje);

  // Crear el objeto nuevaNota con los datos recibidos
  const nuevaNota = { nota, idsaga };

  try {
    // Primero, obtenemos las notas actuales de la base de datos
    const result = await pool.query(
      'SELECT notasaga FROM personajes WHERE idpersonaje = $1',
      [idpersonaje]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Personaje no encontrado.' });
    }

    // Obtener las notas actuales (si las hay)
    let notasaga = result.rows[0].notasaga;

    // Si ya hay notas previas, procesarlas
    if (notasaga) {
      // Verificar si notasaga ya es un array o un objeto JSON
      if (typeof notasaga === 'string') {
        // Si es una cadena JSON, parsearla
        notasaga = JSON.parse(notasaga);
      }

      // Asegurarnos de que sea un array
      if (!Array.isArray(notasaga)) {
        notasaga = [notasaga]; // Si no es un array, lo convertimos en uno
      }

      // Verificar si ya existe una nota con el mismo idsaga
      const index = notasaga.findIndex((nota) => nota.idsaga === idsaga);

      if (index !== -1) {
        // Si ya existe una nota con el mismo idsaga, sobrescribir la nota
        notasaga[index].nota = nota;
      } else {
        // Si no existe, agregar la nueva nota
        notasaga.push(nuevaNota);
      }
    } else {
      // Si no hay notas previas, crear un array con la nueva nota
      notasaga = [nuevaNota];
    }

    // Actualizar el campo notasaga con el nuevo conjunto de notas
    await pool.query(
      'UPDATE personajes SET notasaga = $1 WHERE idpersonaje = $2',
      [JSON.stringify(notasaga), idpersonaje]
    );

    // Devolver la respuesta exitosa
    res.status(200).json({
      message: 'Nota actualizada correctamente.',
      data: notasaga, // Devolver las notas actualizadas
    });
  } catch (error) {
    console.error('Error al actualizar nota:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

app.get('/consumirUsuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    const usuarios = result.rows;
    if (!Array.isArray(usuarios)) {
      return res.status(500).json({ message: 'Error: no se encontró la colección de usuarios.' });
    }
    
    //console.log("Estos son los usuarios de la base:", usuarios);
    res.status(200).json(usuarios); // Devuelve directamente el array
  } catch (err) {
    console.error('Error al consumir los usuarios:', err.message);
    res.status(500).json({ error: 'Error al consumir los usuarios.' });
  }
});

app.put('/cambiarEstatus', async (req, res) => {
  //const { idusuario } = req.params;
  const { idusuario,estatus} = req.body;
 // console.log(` idusuario: ${idusuario} estatus: ${estatus}`)



  try {
    await pool.query(
      'UPDATE usuarios SET estatus = $1 WHERE idusuario = $2',
      [estatus,idusuario]
    );

    res.status(200).json({ message: 'Estatus actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar Estatus del usuario:', error);
    res.status(500).json({ message: 'Error al actualizar Estatus del usuario' });
  }
});

// Recuperar la contraseña OK!
app.get('/recuperarPass', async (req, res) => {
  try {
    const email = req.query.email;
    //console.log('Email recibido del cliente:', email);

    // Verifica que el email sea válido
    if (!email) {
      return res.status(400).json({ message: 'Falta el parámetro email' });
    }

    // Consulta SQL utilizando parámetros preparados (para evitar inyecciones SQL)
    const query = {
      text: 'SELECT email, contrasenia FROM usuarios WHERE email = $1',
      values: [email],
    };

    // Ejecutamos la consulta usando el pool
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      const contrasenia = result.rows[0].contrasenia;
      //console.log('Contraseña recuperada:', contrasenia);

      try {
        // Aquí debería obtenerse el nombre del usuario, puedes ajustarlo según tu base de datos.
        const nombreusuario = email; // O el campo que contiene el nombre del usuario en la base de datos.

        // Enviar el correo electrónico con la contraseña recuperada
        const info = await transporter.sendMail({
          from: '"Admim-ZNK" <tempesttempest66@gmail.com>',
          to: email, // Asegúrate de enviar el correo al email recuperado
          subject: 'Recuperación de contraseña ZNK',
          text: `Su contraseña de la sesión en la página ZNK es: ${contrasenia}`,
        });

       // console.log('Mensaje enviado:', info.messageId);
        res.json({ message: 'Correo enviado exitosamente', result });

      } catch (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(400).json({ message: 'Error al enviar el correo' });
      }

    } else {
      console.error('Usuario no encontrado');
      res.status(404).send('Usuario no encontrado');
    }

  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});








//const PORT = process.env.PORT || 4000;
const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
  console.log(`Server levantado en el puerto http://localhost:${PORT}`);
});


app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});