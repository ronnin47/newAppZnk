import { MiniCard } from "./miniCard.jsx"
import { CargarPersonaje } from "./cargarPersonaje.jsx"
import { useState, useRef } from "react"
import { useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { FichaPersonaje } from "./fichaPersonaje.jsx"
import { Tiradas } from "./tiradas.jsx";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, arrayMove,verticalListSortingStrategy} from "@dnd-kit/sortable";
import { Panel } from "./panel.jsx";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Narrador } from "./narrador.jsx";
import Swal from 'sweetalert2';
import Badge from 'react-bootstrap/Badge';
import { Nava } from "./nava.jsx";
import axios from 'axios';
import { Reglas } from "./reglas.jsx";
import { Unicos } from"./unicos.jsx";
import { Ranking } from "./ranking.jsx";
import { MiGrupo } from "./migrupo.jsx";
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BACKEND_URL);
import { Flotante } from "./flotante.jsx";
import { DNA } from 'react-loader-spinner'; // Importar el spinner DNA


import { Enemigos } from "./enemigos.jsx";

import { GeneradorBake } from "./generadorBake.jsx";

export const Principal= ()=> {

  const [personajes, setPersonajes] = useState([]); 
  const [usuariosConectados, setUsuariosConectados] = useState([]);

    const [pjSeleccionado,setPjSeleccionado]=useState("")
    

const [loading, setLoading] = useState(true); 

   /* useEffect(() => {
      console.log("PERSONAJES SELECCIONADO ",pjSeleccionado)
    }, [pjSeleccionado]);
*/

    const [nombre,setNombre]=useState("");
    const [imagen,setImagen]=useState("/imagenBase.jpeg");
    const [dominio,setDominio]=useState("");
    const [raza,setRaza]=useState("");
    const [edad,setEdad]=useState("");
    const [ken,setKen]=useState("");
    const [ki,setKi]=useState("");
    const [destino,setDestino]=useState("");
    const [pDestino,setPdestino]=useState("");
    const [fuerza,setFuerza]=useState("");
    const [fortaleza,setFortaleza]=useState("");
    const [destreza,setDestreza]=useState("");
    const [agilidad,setAgilidad]=useState("");
    const [sabiduria,setSabiduria]=useState("");
    const [presencia,setPresencia]=useState("");
    const [principio,setPrincipio]=useState("");
    const [sentidos,setSentidos]=useState("");
    const [academisismo,setAcademisismo]=useState("");
    const [alerta,setAlerta]=useState("");
    const [atletismo,setAtletismo]=useState("");
    const [conBakemono,setConBakemono]=useState("");
    const [mentir,setMentir]=useState("");
    const [pilotear,setPilotear]=useState("");
    const [artesMarciales,setArtesMarciales]=useState("");
    const [medicina,setMedicina]=useState("");
    const [conObjMagicos,setConObjMagicos]=useState("");
    const [sigilo,setSigilo]=useState("");
    const [conEsferas,setConEsferas]=useState("");
    const [conLeyendas,setConLeyendas]=useState("");
    const [forja,setForja]=useState("");
    const [conDemonio,setConDemonio]=useState("");
    const [conEspiritual,setConEspiritual]=useState("");
    const [manejoBlaster,setManejoBlaster]=useState("");
    const [manejoSombras,setManejoSombras]=useState("");
    const [tratoBakemono,setTratoBakemono]=useState("");
    const [conHechiceria,setConHechiceria]=useState("");
    const [medVital,setMedVital]=useState("");
    const [medEspiritual,setMedEspiritual]=useState(""); 
    const [rayo,setRayo]=useState("");
    const [fuego,setFuego]=useState("");
    const [frio,setFrio]=useState("");
    const [veneno,setVeneno]=useState("");
    const [corte,setCorte]=useState("");
    const [energia,setEnergia]=useState("");
    const [apCombate,setApCombate]=useState("");
    const [valCombate,setValCombate]=useState("");
    const [apCombate2,setApCombate2]=useState("");
    const [valCombate2,setValCombate2]=useState("");
    const [add1,setAdd1]=useState("");
    const [valAdd1,setValAdd1]=useState("");
    const [add2,setAdd2]=useState("");
    const [valAdd2,setValAdd2]=useState("")
    const [add3,setAdd3]=useState("");
    const [valAdd3,setValAdd3]=useState("");
    const [add4,setAdd4]=useState("");
    const [valAdd4,setValAdd4]=useState("");
    const [activeKey, setActiveKey] = useState(""); 
    const [ventajas, setVentajas] = useState([]);
    const [inventario, setInventario] = useState([]);
    const [dominios, setDominios] = useState([]);
    const [hechizos, setHechizos] = useState([]);
    const [kenActual, setKenActual] = useState("");
    const [kiActual, setKiActual] = useState("");
    const [positiva, setPositivaActual] = useState("");
    const [negativa, setNegativaActual] = useState("");
    const [vidaActual,setVidaActual]=useState("");
    const [naturaleza,setNaturaleza]=useState("");
    const [consumision,setConsumision]=useState("");
    const [cicatriz,setCicatriz]=useState("");
    const [conviccion,setConviccion]=useState("");
    const pj = personajes.find(pj => pj.idpersonaje === pjSeleccionado);
    const [vivoMuerto,setVivoMuerto]=useState(true)
    const [message, setMessage] = useState('');
    const [sock, setSock] = useState([]);
    const [tecEspecial, setTecEspecial] = useState([]);
    
   const handleDragEnd=(event)=>{
    //console.log("orden original: ",personajes)
      const {active, over}=event
      const oldIndex= personajes.findIndex( pj=>pj.idpersonaje===active.id)
      const newIndex= personajes.findIndex( pj=>pj.idpersonaje===over.id)
      //console.log("oldIndex ",oldIndex);
      //console.log("newIndex ",newIndex);
      const newOrder= arrayMove(personajes,oldIndex,newIndex) 
      //console.log("nuevo orden: ",newOrder)
      setPersonajes(newOrder)
      const orderedIds = newOrder.map(pj => pj.idpersonaje);
      localStorage.setItem('personajesOrder', JSON.stringify(orderedIds));
    };

  

    const eliminarPj = (idpersonaje) => {
      // Retornamos la promesa de Swal.fire para manejarla después
      return Swal.fire({
        title: '¿quieres eliminar el personaje?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo'
      }).then((result) => {
        if (result.isConfirmed) {
          const listaNueva = personajes.filter((pj) => pj.idpersonaje !== idpersonaje);
          setPjSeleccionado("");
          setPersonajes(listaNueva);
          
          Swal.fire(
            '¡Eliminado!',
            'Tu personaje ha sido eliminado.',
            'success'
          );
        }
    
        // Aquí retornamos el resultado de la confirmación (true o false)
        return result.isConfirmed;
      });
    };


  const [sesion, setSesion] = useState(() => {
    const savedSesion = localStorage.getItem('sesion');
    return savedSesion === 'true'; 
  });

  const [usuarioId, setUsuarioId] = useState(() => {
    const savedUsuarioId = localStorage.getItem('idusuario');
    return savedUsuarioId ? savedUsuarioId : null;
  });


  useEffect(() => {
    if (usuarioId) {
      socket.emit('user-connected', { usuarioId });
    }
  }, [usuarioId,sesion]);


  useEffect(() => {
    if (usuarioId && sesion) {
      socket.emit('user-connected', { usuarioId, sesion });
    }
    const handleConnectedUsers = (users) => {
      const idsConectados = users.map(user => Number(user));
      setUsuariosConectados(idsConectados); // Actualiza la lista de usuarios conectados
    };
    socket.on('connected-users', handleConnectedUsers);
    return () => {
      socket.off('connected-users', handleConnectedUsers);
    };
  }, [usuarioId,sesion]);


  useEffect(() => {
    localStorage.setItem('sesion', sesion);
  }, [sesion]);

  
const cerrarSesion = async() => {
  localStorage.setItem('loginEmail', "");
  localStorage.setItem('loginPassword', "");
  localStorage.setItem('idusuario', "");
  localStorage.setItem('estatus', "");
  localStorage.setItem('personajesOrder','');
  setColeccionPersonajes([]);
  setEstatus("");
  setPjSeleccionado("");
  setPersonajes([]);
  setSesion(false);

  socket.emit('user-disconnect', { usuarioId }); 

 
};


const textareaRef = useRef(null);
const messagesEndRef = useRef(null);

const [estatus,setEstatus]=useState(()=>{
  const savedEstatus = localStorage.getItem('estatus');
  return savedEstatus || '';
})

const [coleccionPersonajes, setColeccionPersonajes] = useState([]);

useEffect(() => {
  const loadPersonajes = async () => {
    const storedOrder = localStorage.getItem('personajesOrder');
    const orderedIds = storedOrder ? JSON.parse(storedOrder) : [];

    try {
      const personajesDbUsuario = personajes;
      if (personajesDbUsuario.length > 0) {
        const personajesMap = new Map(personajesDbUsuario.map(pj => [pj.idpersonaje, pj]));

        if (orderedIds.length === 0) {
          const defaultOrder = personajesDbUsuario.map(pj => pj.idpersonaje);
          localStorage.setItem('personajesOrder', JSON.stringify(defaultOrder));
          setPersonajes(personajesDbUsuario); // Se establece el estado con el orden por defecto
        } else {
          const orderedPersonajes = orderedIds.map(id => personajesMap.get(id)).filter(pj => pj);
          if (JSON.stringify(orderedPersonajes) !== JSON.stringify(personajes)) {
            setPersonajes(orderedPersonajes);
          }
        }
      } 
    } catch (error) {
      console.error("Error al recuperar personajes de IndexedDB:", error.message);
    }
  };

  loadPersonajes();
}, []); 



useEffect(() => {
  const loadPersonajes = async () => {
    try {
      if (sesion) {       
        //const response = await axios.get('http://localhost:4000/consumirPersonajesNarrador', {
        const response = await axios.get('https://zepironokioku.onrender.com/consumirPersonajesNarrador', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { coleccionPersonajes } = response.data;

        if (!Array.isArray(coleccionPersonajes)) {
          console.error('El formato de datos no es un array.');
          return;
        }

      
        setColeccionPersonajes(coleccionPersonajes);
       
    
        const personajesFiltrados = coleccionPersonajes.filter(pj => pj.usuarioId == usuarioId);
    
        const storedOrder = localStorage.getItem('personajesOrder');
        const orderedIds = storedOrder ? JSON.parse(storedOrder) : [];

 
        const personajesMap = new Map(personajesFiltrados.map(pj => [pj.idpersonaje, pj]));


        personajesFiltrados.forEach((pj, index) => {
          if (!orderedIds.includes(pj.idpersonaje)) {
            orderedIds.push(pj.idpersonaje);
          }
        });

     
        localStorage.setItem('personajesOrder', JSON.stringify(orderedIds));
        const orderedPersonajes = orderedIds.map(id => personajesMap.get(id)).filter(pj => pj);
        if (JSON.stringify(orderedPersonajes) !== JSON.stringify(personajes)) {
          setPersonajes(orderedPersonajes);
        } else {
          setPersonajes(personajesFiltrados); // Si no hay cambios, establece el estado con los filtrados
        }
      }
/*
      setTimeout(() => {
        setLoading(false);  // Oculta el spinner después del retraso
      }, 10000);*/
    } catch (error) {
      console.error("Cliente: Fallo al consumir personajes narrador", error.message);
    } finally{
      setLoading(false);
    }
  };

  loadPersonajes();
}, [sesion]);




const [coleccionGrupos,setColeccionGrupos]=useState([]);


useEffect(() => {
  const loadPersonajes = async () => {
    try {
      if (sesion) {
     
        //const response = await axios.get('http://localhost:4000/consumirGrupos', {
        const response = await axios.get('https://zepironokioku.onrender.com/consumirGrupos', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { coleccionGrupos } = response.data;

        if (!Array.isArray(coleccionGrupos)) {
          console.error('El formato de datos no es un array.');
          return;
        }
    
        setColeccionGrupos(coleccionGrupos);
      }
    } catch (error) {
      console.error("Cliente: Fallo al consumir grupos", error.message);
    }
  };
  loadPersonajes();
}, [sesion]);





const [values, setValues] = useState({});


const calcularVidaTotal = (personaje) => {
  return (personaje.ki + personaje.fortaleza) * (personaje.positiva + personaje.negativa);
};

useEffect(() => {
  // Función para manejar los mensajes recibidos del socket
  const handleMessage = (data) => {
    setValues((prevValues) => ({
      ...prevValues,
      [data.idpersonaje]: {
        kenActual: data.kenActual !== undefined ? data.kenActual : (prevValues[data.idpersonaje]?.kenActual || 0),
        ken: data.ken !== undefined ? data.ken : (prevValues[data.idpersonaje]?.ken || 0),
        kiActual: data.kiActual !== undefined ? data.kiActual : (prevValues[data.idpersonaje]?.kiActual || 0),
        ki: data.ki !== undefined ? data.ki : (prevValues[data.idpersonaje]?.ki || 0),
        vidaActual: data.vidaActual !== undefined ? data.vidaActual : (prevValues[data.idpersonaje]?.vidaActual || 0),
        vidaTotal: data.vidaTotal !== undefined ? data.vidaTotal : (prevValues[data.idpersonaje]?.vidaTotal || 0),
      },
    }));
  };

  // Escuchar los eventos del socket
  socket.on('message', handleMessage);

  // Limpiar la suscripción al socket cuando el componente se desmonte
  return () => {
    socket.off('message', handleMessage);
  };
}, []);
/*
//este es el inicio

useEffect(() => {
  // Función para manejar los mensajes recibidos
  const handleMessage = (data) => {
    setValues((prevValues) => {
      // Buscar el personaje correspondiente en coleccionPersonajes
      const personajeEnColeccion = coleccionPersonajes.find((p) => p.idpersonaje === data.idpersonaje);
      
      // Si no se encuentra el personaje, no hacemos nada
      if (!personajeEnColeccion) return prevValues;

      // Calcular vidaTotal si no viene en los datos del mensaje
      const vidaTotalCalculada = calcularVidaTotal(personajeEnColeccion);
      

      return {
        ...prevValues,
        [data.idpersonaje]: {
          kenActual: data.kenActual !== undefined ? data.kenActual : 
            (prevValues[data.idpersonaje]?.kenActual || personajeEnColeccion.kenActual || 0),
          ken: data.ken !== undefined ? data.ken : 
            (prevValues[data.idpersonaje]?.ken || personajeEnColeccion.ken || 0),
          kiActual: data.kiActual !== undefined ? data.kiActual : 
            (prevValues[data.idpersonaje]?.kiActual || personajeEnColeccion.kiActual || 0),
          ki: data.ki !== undefined ? data.ki : 
            (prevValues[data.idpersonaje]?.ki || personajeEnColeccion.ki || 0),
          vidaActual: data.vidaActual !== undefined ? data.vidaActual : 
            (prevValues[data.idpersonaje]?.vidaActual || personajeEnColeccion.vidaActual || 0),
          // Usamos el valor de vidaTotal del mensaje si está presente, sino lo calculamos
          vidaTotal: data.vidaTotal !== undefined ? data.vidaTotal : 
            (prevValues[data.idpersonaje]?.vidaTotal || vidaTotalCalculada),
        },
      };
    });
  };


    // Escuchar los eventos del socket
    socket.on('message', handleMessage);

    // Limpiar la suscripción al socket cuando el componente se desmonte
    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket, coleccionPersonajes]);
*/


  const [saberes, setSaberes] = useState([]); // Estado inicial vacío
 
  useEffect(() => {
    const fetchSaberes = async () => {
      try {
        const response = await axios.get('https://zepironokioku.onrender.com/saberes');
        //const response = await axios.get('http://localhost:4000/saberes'); // Cambia la URL según tu API

        
        if (response.data && response.data.length > 0) {
          setSaberes(response.data);
        } else {
          setSaberes([]); 
        }
      } catch (error) {
        console.error('Error al cargar los saberes:', error);
        setSaberes([]); 
      }
    };

    fetchSaberes();
  }, []);    


  const [isVisible, setIsVisible] = useState(false);
  const toggleFlotante = () => {
    setIsVisible(!isVisible); // Cambia el estado de visibilidad
  };



  const [isChecked, setIsChecked] = useState(true);

return (
    <>
     <Nava 
     tituloNav=" ZNK"
     setUSuarioId={setUsuarioId}
     setPersonajes={setPersonajes} 
     sesion={sesion}
     setSesion={setSesion}
     cerrarSesion={cerrarSesion}
     
     setEstatus={setEstatus}
     toggleFlotante={toggleFlotante}
     isVisible={isVisible}

    
     />
     
     <div>

     {isVisible && <Flotante saberes={saberes} />} {/* Renderiza el componente solo si es visible */}
     </div>

     <div>
     {sesion ? (
                <Enemigos
                coleccionPersonajes={coleccionPersonajes}
                values={values}
                setValues={setValues} // Pasar la función
                estatus={estatus}
                usuarioId={usuarioId}
                  
                />
              ):(<></>)}
     </div>

     
     





     <div  className="inicioGrupo">
     {pjSeleccionado ? (
                <MiGrupo
                  personajes={personajes}
                  setPersonajes={setPersonajes}
                  coleccionGrupos={coleccionGrupos}
                  coleccionPersonajes={coleccionPersonajes}

                  values={values} // Pasar el estado
                  setValues={setValues} // Pasar la función

                  key={pj.idpersonaje} 
                  idpersonaje={pj.idpersonaje}
                  nombre={pj.nombre}
                  imagen={pj.imagen}
                  pjUsuarioId={pj.usuarioId}
                  idusuario={usuarioId}
                  usuariosConectados={usuariosConectados} 
                  sesion={sesion}
                />
              ):(<></>)}
     </div>
    


     <div>
     {pjSeleccionado ? (
                <Panel
                  personajes={personajes}
                  setPersonajes={setPersonajes}
                  key={pj.idpersonaje} 
                  idpersonaje={pj.idpersonaje}
                  nombre={pj.nombre}
                  imagen={pj.imagen}
                  destreza={pj.destreza}
                  apCombate={pj.apCombate}
                  valCombate={pj.valCombate}
                  message={message}
                  setMessage={setMessage}
                  sock={sock}
                  setSock={setSock}
                  textareaRef={textareaRef }
                  messagesEndRef={messagesEndRef}
                />
              ):(<></>)}
     </div>
    
    <Tabs
            defaultActiveKey="Personajes"
            id="fill-tab-example"
            className="mb-3"
            fill
            style={{ marginTop: '1em'}} 
          >
            <Tab eventKey="cargarPersonajes" title="Cargar pj" className="fondoBody"  >
            {sesion==true ? (
            <CargarPersonaje 
              usuarioId={usuarioId}

              setActiveKey={setActiveKey}
              personajes={personajes} 
              setPersonajes={setPersonajes} 
              setNombre={setNombre} 
              setRaza={setRaza} 
              raza={raza} 
              setEdad={setEdad} 
              edad={edad} 
              setDominio={setDominio} 
              dominio={dominio} 
              ken={ken}
              setKen={setKen}
              ki={ki}
              setKi={setKi}
              destino={destino}
              setDestino={setDestino}
              pDestino={pDestino}
              setPdestino={setPdestino}
              setFuerza={setFuerza} 
              setFortaleza={setFortaleza} 
              setAgilidad={setAgilidad}
              setSabiduria={setSabiduria}
              setPresencia={setPresencia}
              setPrincipio={setPrincipio}
              setSentidos={setSentidos}
              sabiduria={sabiduria}
              presencia={presencia}
              principio={principio}
              sentidos={sentidos}
              setImagen={setImagen} 
              setDestreza={setDestreza} 
              setApCombate={setApCombate} 
              setValCombate={setValCombate} 
              setApCombate2={setApCombate2} 
              setValCombate2={setValCombate2}
              nombre={nombre} 
              fuerza={fuerza} 
              fortaleza={fortaleza} 
              agilidad={agilidad}  
              imagen={imagen} 
              destreza={destreza} 
              apCombate={apCombate} 
              valCombate={valCombate}
              apCombate2={apCombate2} 
              valCombate2={valCombate2}
              academisismo={academisismo}
              alerta={alerta}
              atletismo={atletismo}
              conBakemono={conBakemono}
              mentir={mentir}
              pilotear={pilotear}
              artesMarciales={artesMarciales}
              medicina={medicina}
              conObjMagicos={conObjMagicos}
              sigilo={sigilo}
              conEsferas={conEsferas}
              conLeyendas={conLeyendas}
              forja={forja}
              conDemonio={conDemonio}
              conEspiritual={conEspiritual}
              manejoBlaster={manejoBlaster}
              manejoSombras={manejoSombras}
              tratoBakemono={tratoBakemono}
              conHechiceria={conHechiceria}
              medVital={medVital}
              medEspiritual={medEspiritual}
              rayo={rayo}
              fuego={fuego}
              frio={frio}
              veneno={veneno}
              corte={corte}
              energia={energia}
              setAcademisismo={setAcademisismo}
              setAlerta={setAlerta}
              setAtletismo={setAtletismo}
              setConBakemono={setConBakemono}
              setMentir={setMentir}
              setPilotear={setPilotear}
              setArtesMarciales={setArtesMarciales}
              setMedicina={setMedicina}
              setConObjMagicos={setConObjMagicos}
              setSigilo={setSigilo}
              setConEsferas={setConEsferas}
              setConLeyendas={setConLeyendas}
              setForja={setForja}
              setConDemonio={setConDemonio}
              setConEspiritual={setConEspiritual}
              setManejoBlaster={setManejoBlaster}
              setManejoSombras={setManejoSombras}
              setTratoBakemono={setTratoBakemono}
              setConHechiceria={setConHechiceria}
              setMedVital={setMedVital}
              setMedEspiritual={setMedEspiritual}
              setRayo={setRayo}
              setFuego={setFuego}
              setFrio={setFrio}
              setVeneno={setVeneno}
              setCorte={setCorte}
              setEnergia={setEnergia}

              ventajas={ventajas}
              setVentajas={setVentajas}

              inventario={inventario}
              
              dominios={dominios}

              hechizos={hechizos}

              kenActual={kenActual}
              kiActual={kiActual}
              positiva={positiva}
              negativa={negativa}
              vidaActual={vidaActual}
              add1={add1}
              setAdd1={setAdd1}
              valAdd1={valAdd1}
              setValAdd1={setValAdd1}

              add2={add2}
              setAdd2={setAdd2}
              valAdd2={valAdd2}
              setValAdd2={setValAdd2}
              
              add3={add3}
              setAdd3={setAdd3}
              valAdd3={valAdd3}
              setValAdd3={setValAdd3}
              
              add4={add4}
              setAdd4={setAdd4}
              valAdd4={valAdd4}
              setValAdd4={setValAdd4}
              consumision={consumision}
              

              conviccion={conviccion}
              setConviccion={setConviccion}
              
              cicatriz={cicatriz}
              setCicatriz={setCicatriz}


              naturaleza={naturaleza}
              setNaturaleza={setNaturaleza}             
              ></CargarPersonaje>): (<p style={{color:"aliceblue", textAlign:"center"}}>Inicie sesion para poder cargar personajes</p>)}
          
            </Tab> 

            
            <Tab eventKey="personajes" title="personajes" className="container-fluid fondoBody">
      {loading ? (
        <div className="spinner-container">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={personajes} strategy={horizontalListSortingStrategy}>
            <div className="miniCartas">
              {personajes.length > 0 ? (
                personajes.map(pj => (
                  <MiniCard
                    vivoMuerto={vivoMuerto}
                    setVivoMuerto={setVivoMuerto}
                    setActiveKey={setActiveKey}
                    personajes={personajes}
                    setPersonajes={setPersonajes}
                    key={pj.idpersonaje}
                    id={pj.idpersonaje}
                    nombre={pj.nombre}
                    dominio={pj.dominio}
                    imagen={pj.imagen}
                    setPjSeleccionado={setPjSeleccionado}
                    pjSeleccionado={pjSeleccionado}
                  />
                ))
              ) : (
                <p style={{color:"aliceblue"}}>No existen personajes cargados</p>
              )}
            </div>
          </SortableContext>
        </DndContext>
      )}
            </Tab>

            <Tab eventKey="ficha" title="Ficha" className="fondoBody">
            {pjSeleccionado ? (
                <FichaPersonaje
                  usuarioId={usuarioId}
                  vivoMuerto={vivoMuerto}
                  setVivoMuerto={setVivoMuerto}
                  personajes={personajes}
                  setPersonajes={setPersonajes}
                  personaje={pj}
                  key={pj.idpersonaje} 
                  idpersonaje={pj.idpersonaje}
                  nombre={pj.nombre}
                  imagen={pj.imagen}
                  dominio={pj.dominio}
                  raza={pj.raza}
                  edad={pj.edad}
                  ken={pj.ken}
                  ki={pj.ki}
                  destino={pj.destino}
                  pDestino={pj.pDestino}
                  fuerza={pj.fuerza}
                  fortaleza={pj.fortaleza}
                  destreza={pj.destreza}
                  agilidad={pj.agilidad}
                  sabiduria={pj.sabiduria}
                  presencia={pj.presencia}
                  principio={pj.principio}
                  sentidos={pj.sentidos}
                  academisismo={pj.academisismo}
                  alerta={pj.alerta}
                  atletismo={pj.atletismo}
                  conBakemono={pj.conBakemono}
                  mentir={pj.mentir}
                  pilotear={pj.pilotear}
                  artesMarciales={pj.artesMarciales}
                  medicina={pj.medicina}
                  conObjMagicos={pj.conObjMagicos}
                  sigilo={pj.sigilo}
                  conEsferas={pj.conEsferas}
                  conLeyendas={pj.conLeyendas}
                  forja={pj.forja}
                  conDemonio={pj.conDemonio}
                  conEspiritual={pj.conEspiritual}
                  manejoBlaster={pj.manejoBlaster}
                  manejoSombras={pj.manejoSombras}
                  tratoBakemono={pj.tratoBakemono}
                  conHechiceria={pj.conHechiceria}
                  medVital={pj.medVital}
                  medEspiritual={pj.medEspiritual}
                  rayo={pj.rayo}
                  fuego={pj.fuego}
                  frio={pj.frio}
                  veneno={pj.veneno}
                  corte={pj.corte}
                  energia={pj.energia}
                  apCombate={pj.apCombate}
                  valCombate={pj.valCombate}
                  apCombate2={pj.apCombate2}
                  valCombate2={pj.valCombate2}
                  add1={pj.add1}
                  valAdd1={pj.valAdd1}
                  add2={pj.add2}
                  valAdd2={pj.valAdd2}
                  add3={pj.add3}
                  valAdd3={pj.valAdd3}
                  add4={pj.add4}
                  valAdd4={pj.valAdd4}                
                  ventajas={pj.ventajas}
                  inventario={pj.inventario} 
                  dominios={pj.dominios}
                  kenActual={pj.kenActual}
                  kiActual={pj.kiActual} 
                  positiva={pj.positiva}
                  negativa={pj.negativa}
                  vidaActual={pj.vidaActual}
                  hechizos={pj.hechizos}
                  consumision={pj.consumision}
                  iniciativa={pj.iniciativa}
                  historia={pj.historia}
                  naturaleza={pj.naturaleza}
                  eliminarPj={eliminarPj}
                  tecEspecial={pj.tecEspecial || []}

                  conviccion={pj.conviccion}
                  cicatriz={pj.cicatriz}
                  estatus={estatus}
                />
              ):(<p style={{color:"aliceblue", textAlign:"center"}}>Seleccione un personaje cargado</p>)}
            </Tab>
            <Tab eventKey="tiradas" title="Tiradas" className="fondoBody">
            {pjSeleccionado ? (
                <Tiradas
                  personajes={personajes}
                  setPersonajes={setPersonajes}
                  key={pj.idpersonaje} 
                  idpersonaje={pj.idpersonaje}
                  nombre={pj.nombre}
                  imagen={pj.imagen}
                  destreza={pj.destreza}
                  apCombate={pj.apCombate}
                  valCombate={pj.valCombate}
                  message={message}
                  setMessage={setMessage}
                  sock={sock}
                  setSock={setSock}
                  textareaRef={textareaRef}
                  messagesEndRef={messagesEndRef}

                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                />
              ):(<p style={{color:"aliceblue", textAlign:"center"}}>Seleccione un personaje cargado</p>)}
            </Tab>

            <Tab eventKey="reglas" title="Reglas" className="fondoBody"  >
              {sesion==true ? (<Reglas></Reglas>):(<p  style={{color:"aliceblue", textAlign:"center"}}>Se requiere inicio de sesion</p>)}
            </Tab>
              
            <Tab eventKey="unicos" title="Poderes unicos" className="fondoBody"  >
              {sesion==true ? (<Unicos></Unicos>):(<p  style={{color:"aliceblue", textAlign:"center"}}>Se requiere inicio de sesion</p>)}
            </Tab>
              
            <Tab eventKey="ranking" title="Ranking Ken" className="fondoBody">
              {sesion==true ?(<Ranking coleccionPersonajes={coleccionPersonajes}></Ranking>):(<p  style={{color:"aliceblue", textAlign:"center"}}>Se requiere estatus Narrador</p>)}

            </Tab>

            <Tab eventKey="cargarBakemono" title="Generar Kaiju" className="fondoBody"  >
            {sesion==true ? (
            <GeneradorBake 
              usuarioId={usuarioId}

              setActiveKey={setActiveKey}
              personajes={personajes} 
              setPersonajes={setPersonajes} 
              setNombre={setNombre} 
              setRaza={setRaza} 
              raza={raza} 
              setEdad={setEdad} 
              edad={edad} 
              setDominio={setDominio} 
              dominio={dominio} 
              ken={ken}
              setKen={setKen}
              ki={ki}
              setKi={setKi}
              destino={destino}
              setDestino={setDestino}
              pDestino={pDestino}
              setPdestino={setPdestino}
              setFuerza={setFuerza} 
              setFortaleza={setFortaleza} 
              setAgilidad={setAgilidad}
              setSabiduria={setSabiduria}
              setPresencia={setPresencia}
              setPrincipio={setPrincipio}
              setSentidos={setSentidos}
              sabiduria={sabiduria}
              presencia={presencia}
              principio={principio}
              sentidos={sentidos}
              setImagen={setImagen} 
              setDestreza={setDestreza} 
              setApCombate={setApCombate} 
              setValCombate={setValCombate} 
              setApCombate2={setApCombate2} 
              setValCombate2={setValCombate2}
              nombre={nombre} 
              fuerza={fuerza} 
              fortaleza={fortaleza} 
              agilidad={agilidad}  
              imagen={imagen} 
              destreza={destreza} 
              apCombate={apCombate} 
              valCombate={valCombate}
              apCombate2={apCombate2} 
              valCombate2={valCombate2}
              academisismo={academisismo}
              alerta={alerta}
              atletismo={atletismo}
              conBakemono={conBakemono}
              mentir={mentir}
              pilotear={pilotear}
              artesMarciales={artesMarciales}
              medicina={medicina}
              conObjMagicos={conObjMagicos}
              sigilo={sigilo}
              conEsferas={conEsferas}
              conLeyendas={conLeyendas}
              forja={forja}
              conDemonio={conDemonio}
              conEspiritual={conEspiritual}
              manejoBlaster={manejoBlaster}
              manejoSombras={manejoSombras}
              tratoBakemono={tratoBakemono}
              conHechiceria={conHechiceria}
              medVital={medVital}
              medEspiritual={medEspiritual}
              rayo={rayo}
              fuego={fuego}
              frio={frio}
              veneno={veneno}
              corte={corte}
              energia={energia}
              setAcademisismo={setAcademisismo}
              setAlerta={setAlerta}
              setAtletismo={setAtletismo}
              setConBakemono={setConBakemono}
              setMentir={setMentir}
              setPilotear={setPilotear}
              setArtesMarciales={setArtesMarciales}
              setMedicina={setMedicina}
              setConObjMagicos={setConObjMagicos}
              setSigilo={setSigilo}
              setConEsferas={setConEsferas}
              setConLeyendas={setConLeyendas}
              setForja={setForja}
              setConDemonio={setConDemonio}
              setConEspiritual={setConEspiritual}
              setManejoBlaster={setManejoBlaster}
              setManejoSombras={setManejoSombras}
              setTratoBakemono={setTratoBakemono}
              setConHechiceria={setConHechiceria}
              setMedVital={setMedVital}
              setMedEspiritual={setMedEspiritual}
              setRayo={setRayo}
              setFuego={setFuego}
              setFrio={setFrio}
              setVeneno={setVeneno}
              setCorte={setCorte}
              setEnergia={setEnergia}

              ventajas={ventajas}
              setVentajas={setVentajas}

              inventario={inventario}
              
              dominios={dominios}

              hechizos={hechizos}

              kenActual={kenActual}
              kiActual={kiActual}
              positiva={positiva}
              negativa={negativa}
              setPositivaActual={setPositivaActual}
              setNegativaActual={setNegativaActual}
              
              vidaActual={vidaActual}
              add1={add1}
              setAdd1={setAdd1}
              valAdd1={valAdd1}
              setValAdd1={setValAdd1}

              add2={add2}
              setAdd2={setAdd2}
              valAdd2={valAdd2}
              setValAdd2={setValAdd2}
              
              add3={add3}
              setAdd3={setAdd3}
              valAdd3={valAdd3}
              setValAdd3={setValAdd3}
              
              add4={add4}
              setAdd4={setAdd4}
              valAdd4={valAdd4}
              setValAdd4={setValAdd4}
              consumision={consumision}
              

              conviccion={conviccion}
              setConviccion={setConviccion}
              
              cicatriz={cicatriz}
              setCicatriz={setCicatriz}


              naturaleza={naturaleza}
              setNaturaleza={setNaturaleza}             
              ></GeneradorBake>): (<p style={{color:"aliceblue", textAlign:"center"}}>Inicie sesion para poder cargar personajes</p>)}
          
            </Tab> 

            <Tab eventKey="narrador" title="Narrador" className="fondoBody">
              {sesion==true && estatus=="narrador"?(<Narrador saberes={saberes} setSaberes={setSaberes} usuariosConectados={usuariosConectados}  coleccionGrupos={coleccionGrupos} setColeccionGrupos={setColeccionGrupos} sesion={sesion} estatus={estatus} setColeccionPersonajes={setColeccionPersonajes}  coleccionPersonajes={coleccionPersonajes}></Narrador>):(<p  style={{color:"aliceblue", textAlign:"center"}}>Se requiere estatus Narrador</p>)}

            </Tab>

           
      
    </Tabs>
    </>  
  );
}




