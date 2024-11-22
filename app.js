import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { fileURLToPath } from 'url'; 
import { dirname, join } from 'path'; 
import pkg from 'pg'; 
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

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


//LOCAL HOST

/*
const pool = new Pool({
  user: 'postgres',          // Reemplaza con tu usuario de PostgreSQL
  host: 'localhost',
  database: 'newAppZnk', // Reemplaza con el nombre de tu base de datos
  password: 'hikonometaiseno',   // Reemplaza con tu contraseña de PostgreSQL
  port: 5432,
});
*/


//**************BASE NOVIEMBRE******************

const pool = new Pool({
  user: 'gorda',          
  host: 'dpg-csl2rle8ii6s738418e0-a',
  database: 'basenoviembre', 
  password: 'jdLmXp4y4PnNljzYcLpZbW8oCtZGfNIT',  
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

checkDatabaseConnection();

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: '*', // Cambia esto según sea necesario
  },
});

const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('Socket: un usuario se conectó');


  socket.on('user-connected', (userData) => {
    const { usuarioId, sesion } = userData;
    if(usuarioId && sesion){
      connectedUsers.set(socket.id, usuarioId);
      console.log(`Usuario ${usuarioId} conectado.`);  
      io.emit('connected-users', Array.from(connectedUsers.values()));
    }
   
  });


  socket.on('image', (imageData) => {
    io.emit('image', imageData); 
  });


   // Escuchar evento 'removeImage' cuando un cliente quiere eliminar una imagen
  socket.on('removeImage', (idpersonaje) => {
    console.log(`Eliminando personaje con id: ${idpersonaje}`);
    
    // Emitir el evento 'removeImage' a todos los clientes (incluido el que lo emitió)
    io.emit('removeImage', idpersonaje);
    
    // Si deseas que solo se emita a los demás clientes y no al que hizo la solicitud:
    // socket.broadcast.emit('removeImage', idpersonaje);
  });
 
  socket.on('message', (message) => {
    io.emit('message', message); 
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
      
      // Emitir evento de desconexión para eliminar las imágenes del usuario
      io.emit('user-disconnect', { usuarioId }); // Aquí se envía el usuarioId al cliente
      
      // Emitir la lista actualizada de usuarios conectados
      io.emit('connected-users', Array.from(connectedUsers.values()));
    }
  });


  
});



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

app.get('/consumirPersonajesNarrador', async (req, res) => {
  try {
    const userQuery = 'SELECT * FROM personajes';
    const userResult = await pool.query(userQuery);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'No se recupero personajes para Narrador' });
    }

    const coleccionPersonajes = userResult.rows;
    res.json({
      message: 'Inicio de sesión exitoso',
      coleccionPersonajes: coleccionPersonajes,   
    });

  } catch (error) {
    console.error('Error al obtener coleccion personajes Narrador:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/insert-personaje', async (req, res) => {

  console.log("*******NOta saga: ",req.body)
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
      imagen,
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
   } = req.body;
   
  try {
    const query = `
      INSERT INTO personajes (
      nombre, 
      dominio, 
      raza, 
      naturaleza, 
      edad, 
      ken, 
      ki, 
      destino, 
      "pDestino", 
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
      "conBakemono", 
      mentir,
      pilotear,
      "artesMarciales",
      medicina,
      "conObjMagicos",
      sigilo,
      "conEsferas",
      "conLeyendas",
      forja,
      "conDemonio",
      "conEspiritual",
      "manejoBlaster",
      "manejoSombras",
      "tratoBakemono",
      "conHechiceria",
      "medVital",
      "medEspiritual",
      rayo,
      fuego,
      frio,
      veneno,
      corte,
      energia,
      ventajas,
      "apCombate",
      "valCombate",
      "apCombate2",
      "valCombate2",
      add1,
      "valAdd1",
      add2,
      "valAdd2",
      add3,
      "valAdd3",
      add4,
      "valAdd4",
      imagen,
      inventario,
      dominios,
      "kenActual",
      "kiActual",
      positiva,
      negativa,
      "vidaActual",
      hechizos,
      consumision,
      iniciativa,
      historia,
      "tecEspecial",
      conviccion,
      cicatriz,
      notasaga,
      "usuarioId"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74)
      RETURNING idpersonaje
    `;

    const values = [
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
      imagen,
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
      tecEspecial,
      conviccion,
      cicatriz,
      notaSaga,
      usuarioId,   
      ];
    const result = await pool.query(query, values);
    const newId = result.rows[0].idpersonaje;
    res.status(201).json({ message: 'Personaje insertado exitosamente.', idpersonaje: newId });
  } catch (err) {
    console.error('Error al insertar el personaje:', err.message);
    res.status(500).json({ error: 'Error al insertar el personaje.' });
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


app.put('/update-personaje/:id', async (req, res) => {

//  console.log("esto es lo que trae el req",req)
  const idpersonaje = req.params.id;
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
      imagen,
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
      
   } = req.body;
 
  try {
    const query = `
    UPDATE personajes
    SET 
      nombre = $1,
      dominio = $2,
      raza = $3,
      naturaleza = $4,
      edad = $5,
      ken = $6,
      ki = $7,
      destino = $8,
      "pDestino" = $9,
      fuerza = $10,
      fortaleza = $11,
      destreza = $12,
      agilidad = $13,
      sabiduria = $14,
      presencia = $15,
      principio = $16,
      sentidos = $17,
      academisismo = $18,
      alerta = $19,
      atletismo = $20,
      "conBakemono" = $21,
      mentir = $22,
      pilotear = $23,
      "artesMarciales" = $24,
      medicina = $25,
      "conObjMagicos" = $26,
      sigilo = $27,
      "conEsferas" = $28,
      "conLeyendas" = $29,
      forja = $30,
      "conDemonio" = $31,
      "conEspiritual" = $32,
      "manejoBlaster" = $33,
      "manejoSombras" = $34,
      "tratoBakemono" = $35,
      "conHechiceria" = $36,
      "medVital" = $37,
      "medEspiritual" = $38,
      rayo = $39,
      fuego = $40,
      frio = $41,
      veneno = $42,
      corte = $43,
      energia = $44,
      ventajas = $45,
      "apCombate" = $46,
      "valCombate" = $47,
      "apCombate2" = $48,
      "valCombate2" = $49,
      add1 = $50,
      "valAdd1" = $51,
      add2 = $52,
      "valAdd2" = $53,
      add3 = $54,
      "valAdd3" = $55,
      add4 = $56,
      "valAdd4" = $57,
      imagen = $58,
      inventario = $59,
      dominios = $60,
      "kenActual" = $61,
      "kiActual" = $62,
      positiva = $63,
      negativa = $64,
      "vidaActual" = $65,
      hechizos = $66,
      consumision = $67,
      iniciativa = $68,
      historia = $69,
      "usuarioId" = $70,
      "tecEspecial" = $71,
      conviccion= $72,
      cicatriz= $73
    WHERE idpersonaje = $74
  `;
    const values = [
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
      imagen,
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
      idpersonaje
      ];
    const result = await pool.query(query, values);
 
    res.status(201).json({ message: 'Personaje modificado exitosamente.', idpersonaje});
  } catch (err) {
    console.error('Error al modificar el personaje:', err.message);
    res.status(500).json({ error: 'Error al modificar el personaje.' });
  }
  
});


app.delete('/deletePersonaje/:id', async (req, res) => {
  const idpersonaje = parseInt(req.params.id, 10);
  try {
    const result = await pool.query('DELETE FROM personajes WHERE idpersonaje = $1 RETURNING *', [idpersonaje]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Personaje eliminado exitosamente.', deletedPersonaje: result.rows[0] });
    } else {
      res.status(404).json({ message: 'Personaje no encontrado.' });
    }
  } catch (error) {
    console.error('Error al eliminar el personaje:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

app.get('/consumirTecEspeciales', async (req, res) => {
   try {
     const userQuery = 'SELECT nombre, idpersonaje, ken, "tecEspecial" FROM personajes WHERE "tecEspecial" IS NOT NULL AND array_length("tecEspecial", 1) > 0;';
     const userResult = await pool.query(userQuery);
 
     if (userResult.rows.length === 0) {
       return res.status(401).json({ message: 'No se recupero personajes con tecnicas/Ojetos/poderes epseciales' });
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

 app.get('/saberes', async (req, res) => {
  try {
    const userQuery = 'SELECT * FROM saberes';
    const userResult = await pool.query(userQuery);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'No se recuperaron saberes' });
    }
    const saberes = userResult.rows;
    res.json(saberes); 

  } catch (error) {
    console.error('Error al obtener saberes:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/insertSaber', async (req, res) => {
  const { titulo, frase, imagen } = req.body; 
  console.log(" Lo que viene del req: ",req.body)

  if (!imagen) {
    return res.status(400).json({ error: 'No se ha proporcionado una imagen' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO saberes (titulo, frase, imagensaber) VALUES ($1, $2, $3) RETURNING *',
      [titulo, frase, imagen] 
    );
    const nuevoSaber = result.rows[0]; 

    res.status(201).json(nuevoSaber); 
  } catch (error) {
    console.error('Error al insertar el saber:', error);
    res.status(500).json({ error: 'Error al insertar el saber' });
  }
});

app.put('/updateSaber', async (req, res) => {
  const { id, titulo, frase, imagen } = req.body; 

  if (!id) {
    return res.status(400).json({ error: 'No se ha proporcionado un ID de saber' });
  }

  try {
    const result = await pool.query(
      'UPDATE saberes SET titulo = $1, frase = $2, imagensaber = $3 WHERE idsaber = $4 RETURNING *',
      [titulo, frase, imagen, id] 
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Saber no encontrado' });
    }

    const saberActualizado = result.rows[0]; 
    res.status(200).json(saberActualizado); 
  } catch (error) {
    console.error('Error al actualizar el saber:', error);
    res.status(500).json({ error: 'Error al actualizar el saber' });
  }
});

app.delete('/deleteSaber/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM saberes WHERE idsaber = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Saber no encontrado' });
    }

    res.status(200).json({ message: 'Saber eliminado con éxito', deletedSaber: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar el saber:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});






// SAGAS
app.post('/insertSaga', async (req, res) => {
  const { titulo, presentacion, imagen } = req.body; 
  //console.log(" Lo que viene del req: ",req.body)

  if (!imagen) {
    return res.status(400).json({ error: 'No se ha proporcionado una imagen' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO sagas (titulo, presentacion, imagensaga) VALUES ($1, $2, $3) RETURNING *',
      [titulo, presentacion, imagen] 
    );
    const nuevoSaber = result.rows[0]; 

    res.status(201).json(nuevoSaber); 
  } catch (error) {
    console.error('Error al insertar el saber:', error);
    res.status(500).json({ error: 'Error al insertar el saber' });
  }
});

app.get('/consumirSagas', async (req, res) => {

  try {
    const result = await pool.query('SELECT * FROM sagas');
    const coleccionSagas = result.rows;
    if (!Array.isArray(coleccionSagas)) {
      return res.status(500).json({ message: 'Error: no se encontró la colección de Sagas ZNK.' });
    }

    res.status(200).json({ coleccionSagas });
  } catch (err) {
    console.error('Error al consumir los SAGAS znk:', err.message);
    res.status(500).json({ error: 'Error al consumir SAGAS ZNK.' });
  }
});

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
     await pool.query('DELETE FROM secciones WHERE idsaga = $1', [idsaga]);
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
    const result = await pool.query('SELECT * FROM secciones');
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

app.post('/insertSeccion', async (req, res) => {
  // Extraer las propiedades del body de la solicitud
  const { titulo, presentacion, imagen, idsaga } = req.body;
  console.log("Lo que viene del req: ", req.body);

  // Validar si la imagen está presente
  if (!imagen) {
    return res.status(400).json({ error: 'No se ha proporcionado una imagen' });
  }

  // Validar que el título y la presentación no estén vacíos
  if (!titulo || !presentacion || !idsaga) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    // Insertar la nueva sección en la base de datos
    const result = await pool.query(
      'INSERT INTO secciones (titulo, presentacion, imagen, idsaga) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, presentacion, imagen, idsaga]
    );
    
    // Obtener la nueva sección insertada
    const nuevaSeccion = result.rows[0];

    // Enviar la respuesta con la nueva sección
    res.status(201).json(nuevaSeccion); 
  } catch (error) {
    // Manejar errores en la inserción
    console.error('Error al insertar la sección:', error);
    res.status(500).json({ error: 'Error al insertar la sección' });
  }
});

app.put('/updateSeccion/:idseccion', async (req, res) => {
  const { idseccion } = req.params;
  const { titulo, presentacion, imagen } = req.body;

  try {
    await pool.query(
      'UPDATE secciones SET titulo = $1, presentacion = $2, imagen = $3 WHERE idseccion = $4',
      [titulo, presentacion, imagen, idseccion]
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





//ACA ESTAMOS TRABAJANDO LAS NOTAS

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





//const PORT = process.env.PORT || 4000;
const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
  console.log(`Server levantado en el puerto http://localhost:${PORT}`);
});


app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});