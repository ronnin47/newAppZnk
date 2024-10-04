import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { fileURLToPath } from 'url'; 
import { dirname, join } from 'path'; 


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
/*
const pool = new Pool({
  user: 'postgres',          // Reemplaza con tu usuario de PostgreSQL
  host: 'localhost',
  database: 'newAppZnk', // Reemplaza con el nombre de tu base de datos
  password: 'hikonometaiseno',   // Reemplaza con tu contraseña de PostgreSQL
  port: 5432,
});

*/





//***************** base septiembre ****************************

const pool = new Pool({
  user: 'gorda',          // Reemplaza con tu usuario de PostgreSQL
  host: 'dpg-crkt1688fa8c738l0hlg-a',
  database: 'baseseptiembre', // Reemplaza con el nombre de tu base de datos
  password: 'ZMygGfkVyzqJ5HDlshtiH96DItRPl0Ts',   // Reemplaza con tu contraseña de PostgreSQL
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



const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('Socket: un usuario se conectó');

  // Manejar el evento de conexión de usuario
  socket.on('user-connected', (userData) => {
    const { usuarioId, sesion } = userData;
    if(usuarioId && sesion){
      connectedUsers.set(socket.id, usuarioId);
      console.log(`Usuario ${usuarioId} conectado.`);
      
      // Emitir a todos los clientes la lista de usuarios conectados
      io.emit('connected-users', Array.from(connectedUsers.values()));

    }
   
  });

  // Manejar los mensajes enviados por los usuarios
  socket.on('message', (message) => {
    io.emit('message', message); // Emitir el mensaje a todos los clientes
  });

  socket.on('user-disconnect', (data) => {
    const { usuarioId } = data; // Obtener el usuarioId del evento
    const socketId = [...connectedUsers.entries()].find(([key, value]) => value === usuarioId)?.[0];
  
    if (socketId) {
      connectedUsers.delete(socketId); // Eliminar el usuario del mapa
      console.log(`Usuario ${usuarioId} se desconectó por cierre de sesión.`);
  
      // Emitir la lista actualizada de usuarios conectados
      io.emit('connected-users', Array.from(connectedUsers.values()));
    }
  });

  // Manejar la desconexión del usuario
  socket.on('disconnect', () => {
    const usuarioId = connectedUsers.get(socket.id);
    if (usuarioId) {
      connectedUsers.delete(socket.id);
      console.log(`Usuario ${usuarioId} se desconectó.`);
      
      // Emitir la lista actualizada de usuarios conectados
      io.emit('connected-users', Array.from(connectedUsers.values()));
    }
    console.log('Socket: un usuario se desconectó');
  });
});




// INSERTAR USUARIO ok!!
app.post('/insert-usuario', async (req, res) => {
  const { email, contrasenia } = req.body;
    //console.log("llego la peticion de insert de usuario")
    //console.log(req.body)

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

    //console.log("El Id que viene de la base de datos es: "+newId)
    //console.log("El Id que viene de la base de datos es: "+newEstatus)

    res.status(201).json({ message: `Bienvenido ${email}.`, idusuario: newId, estatus: newEstatus });
  } catch (err) {

    if (err.code === '23505') { // Código de error para violación de restricción de unicidad
      //console.error('El email ya existe.');
      res.json({ message: 'El mail ya se encuentra registrado.' });
    } else {
      console.error('Error al insertar el usuario:', err.message);
      res.status(500).json({ error: 'Error al insertar el usuario.' });
    }

    
  }
});

//LOGIN USUARIO OK!!
app.post('/loginUsuario', async (req, res) => {
  const { email, contrasenia } = req.body;

  //console.log("Info del cliente que se loguea: ", req.body);

  try {
    // Verificar si el usuario existe
    const userQuery = 'SELECT * FROM usuarios WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      console.log("No se encontró el usuario con el email proporcionado.");
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const user = userResult.rows[0];
    const idusuario = userResult.rows[0].idusuario;
    const estatus = userResult.rows[0].estatus;

    //console.log("IDUSUARIO ES: ",idusuario)
    //console.log("SU ESTATUS ES: ",estatus)
    // Verificar la contraseña directamente
    if (user.contrasenia !== contrasenia) {
      //console.log("Contraseña proporcionada no coincide con la almacenada.");
      //console.log("Contraseña de la base de datos: ", user.contrasenia);
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    // Si se necesita obtener los personajes del usuario, descomenta el siguiente código
    
   /* const personajesQuery = 'SELECT * FROM personajes WHERE "usuarioId" = $1';
    const personajesResult = await pool.query(personajesQuery, [user.idusuario]);
    */

   // console.log("Inicio de sesión exitoso para el usuario:", user.idusuario);

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


//CONSUMIR PERSONAJES NARRADOR
app.get('/consumirPersonajesNarrador', async (req, res) => {
 // const { email, contrasenia } = req.body;

  //console.log("Info del cliente que se loguea: ", req.body);

  try {
    // Verificar si el usuario existe
    const userQuery = 'SELECT * FROM personajes';
    const userResult = await pool.query(userQuery);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'No se recupero personajes para Narrador' });
    }

    const coleccionPersonajes = userResult.rows;

    //console.log("Coleccion personajes para el Narrador: ",coleccionPersonajes)
    

    res.json({
      message: 'Inicio de sesión exitoso',
      coleccionPersonajes: coleccionPersonajes, 
    
    });

  } catch (error) {
    console.error('Error al obtener coleccion personajes Narrador:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


//INSERT ok!!
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
    console.log("llego la peticion de insert!!")
    console.log(req.body)
  

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
      "usuarioId"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73)
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
      usuarioId,
     
      
      ];
    const result = await pool.query(query, values);

    const newId = result.rows[0].idpersonaje;
    //console.log("El Id que viene de la base de datos es: "+newId)
    res.status(201).json({ message: 'Personaje insertado exitosamente.', idpersonaje: newId });
  } catch (err) {
    console.error('Error al insertar el personaje:', err.message);
    res.status(500).json({ error: 'Error al insertar el personaje.' });
  }
});



//INSERT Grupo
app.post('/insertGrupo', async (req, res) => {
  const { 
    nombre,
    idspersonajes,
      
   } = req.body;
    console.log("llego la peticion de insert nuevo grupo!!")
    console.log(req.body)
  

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
    console.log("El Id GRUPO que viene de la base de datos es: "+newId)
    res.status(201).json({ message: 'Grupo insertado exitosamente.', idgrupo: newId });
  } catch (err) {
    console.error('Error al insertar el nuevo Grupo:', err.message);
    res.status(500).json({ error: 'Error al insertar el nuevo Grupo.' });
  }
});

// CONSUMIR GRUPOS
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



// Update grupos OK!!
app.put('/update-grupos', async (req, res) => {
  const { idgrupo, idspersonajes } = req.body; // Desestructuramos los datos recibidos del cuerpo de la solicitud
 // console.log("Datos recibidos para actualizar grupo:", { idgrupo, idspersonajes });

  try {
    // Actualizar el array `idspersonajes` en la tabla `grupos`
    const result = await pool.query(
      'UPDATE grupos SET idspersonajes = $1 WHERE idgrupo = $2 RETURNING *',
      [idspersonajes, idgrupo]
    );

    // Verificar si el grupo existe
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Grupo no encontrado' });
    }

    // Respuesta con el grupo actualizado
    res.json({ message: 'Grupo actualizado exitosamente', grupo: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar el grupo en la base de datos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


// bORRAR GRUPO OK!!!
app.delete('/delete-grupo/:idgrupo', async (req, res) => {
  const { idgrupo } = req.params;

  try {
    // Eliminar el grupo de la base de datos por su ID
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



//UPDATE ok!!
app.put('/update-personaje/:id', async (req, res) => {
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
    //console.log("llego la peticion del update personaje!")
    //console.log(req.body)
  
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

//DELETE ok!!
app.delete('/deletePersonaje/:id', async (req, res) => {
  const idpersonaje = parseInt(req.params.id, 10);
  console.log("IDPERSOANJE QUE VIENEDEL CLIENTE: ",idpersonaje)

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

//CONSUMIR PODERES ESPECIALES
app.get('/consumirTecEspeciales', async (req, res) => {
  // const { email, contrasenia } = req.body;
 
   //console.log("Info del cliente que se loguea: ", req.body);
 
   try {
     // Verificar si el usuario existe
     const userQuery = 'SELECT nombre, idpersonaje, ken, "tecEspecial" FROM personajes WHERE "tecEspecial" IS NOT NULL AND array_length("tecEspecial", 1) > 0;';
     const userResult = await pool.query(userQuery);
 
     if (userResult.rows.length === 0) {
       return res.status(401).json({ message: 'No se recupero personajes con tecnicas/Ojetos/poderes epseciales' });
     }
 
     const poderesEspeciales = userResult.rows;
 
    // console.log("Coleccion de Poderes especiales: ",poderesEspeciales)
     
 
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
    // Realiza la consulta a la base de datos para obtener los saberes
    const userQuery = 'SELECT * FROM saberes';
    const userResult = await pool.query(userQuery);

    if (userResult.rows.length === 0) {
      // Cambiar a 404 si no se encontraron saberes
      return res.status(404).json({ message: 'No se recuperaron saberes' });
    }

    const saberes = userResult.rows;

    // Registro de los saberes recuperados
    console.log("Colección saberes: ", saberes);

    // Envía los saberes como respuesta
    res.json(saberes); // Devuelve solo el array de saberes, sin mensaje adicional

  } catch (error) {
    console.error('Error al obtener saberes:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/insertSaber', async (req, res) => {
  const { frase, imagen } = req.body; // Obtiene frase e imagen de la solicitud

  //console.log(" esto viene desde el saber del cliente ",req.body)

  // Verifica que se haya proporcionado una imagen
  if (!imagen) {
    return res.status(400).json({ error: 'No se ha proporcionado una imagen' });
  }

  try {
    // Inserta en la base de datos
    const result = await pool.query(
      'INSERT INTO saberes (frase, imagensaber) VALUES ($1, $2) RETURNING *',
      [frase, imagen] // Guarda la imagen en formato Base64
    );
    const nuevoSaber = result.rows[0]; // Obtener el saber insertado

    res.status(201).json(nuevoSaber); // Devuelve el nuevo saber
  } catch (error) {
    console.error('Error al insertar el saber:', error);
    res.status(500).json({ error: 'Error al insertar el saber' });
  }
});


// Ruta para actualizar un saber existente
app.put('/updateSaber', async (req, res) => {
  const { id, frase, imagen } = req.body; // Obtiene el ID, frase e imagen de la solicitud

  //console.log("Datos recibidos para actualizar el saber:", req.body);

  // Verifica que se haya proporcionado un ID
  if (!id) {
    return res.status(400).json({ error: 'No se ha proporcionado un ID de saber' });
  }

  try {
    // Actualiza en la base de datos
    const result = await pool.query(
      'UPDATE saberes SET frase = $1, imagensaber = $2 WHERE idsaber = $3 RETURNING *',
      [frase, imagen, id] // Actualiza los campos en la base de datos
    );

    // Verifica si se actualizó algún saber
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Saber no encontrado' });
    }

    const saberActualizado = result.rows[0]; // Obtener el saber actualizado
    res.status(200).json(saberActualizado); // Devuelve el saber actualizado
  } catch (error) {
    console.error('Error al actualizar el saber:', error);
    res.status(500).json({ error: 'Error al actualizar el saber' });
  }
});



// Ruta para eliminar un saber
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







//const PORT = process.env.PORT || 4000;
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server levantado en el puerto http://localhost:${PORT}`);
});

// Ruta para manejar todas las solicitudes y devolver el archivo HTML principal
app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});