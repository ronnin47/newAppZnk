import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';



import { ModalHorizontal } from "./modalHorizontal";


import { Tooltip, OverlayTrigger } from 'react-bootstrap';


import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BACKEND_URL);


export const Sagas = ({ sesion,usuariosConectados, coleccionGrupos, setColeccionGrupos, coleccionPersonajes }) => {
  const [gruposConPersonajes, setGruposConPersonajes] = useState([]);
  const [busquedas, setBusquedas] = useState({}); // Estado para las búsquedas por grupo
  const [resultadosBusqueda, setResultadosBusqueda] = useState({}); // Estado para los resultados de búsqueda

 

  useEffect(() => {
    if (coleccionGrupos && coleccionGrupos.length > 0 && coleccionPersonajes && coleccionPersonajes.length > 0) {
      const gruposActualizados = coleccionGrupos.map(grupo => {
        // Verificar si 'idspersonajes' en el grupo es un array
        const personajesDelGrupo = Array.isArray(grupo.idspersonajes)
          ? coleccionPersonajes.filter(personaje =>
              grupo.idspersonajes.includes(personaje.idpersonaje)
            )
          : [];
        
        return {
          ...grupo, // Retornamos el grupo original
          personajes: personajesDelGrupo // Añadimos los personajes filtrados por ID
        };
      });

        // Ordenar los grupos por idgrupo o cualquier otro criterio
     gruposActualizados.sort((a, b) => a.idgrupo - b.idgrupo);
    setGruposConPersonajes(gruposActualizados);
   
    } else {
      setGruposConPersonajes([]); // Si no hay grupos o personajes, reseteamos el estado
    }
  }, [coleccionGrupos, coleccionPersonajes]);



  const eliminarPersonaje = async (idgrupo, idpersonaje) => {
    setGruposConPersonajes(prevGrupos => {
      const gruposActualizados = prevGrupos.map(grupo => {
        if (grupo.idgrupo === idgrupo) {
          const personajesActualizados = grupo.personajes.filter(personaje => personaje.idpersonaje !== idpersonaje);
  
          // Si el grupo no tiene personajes restantes, lo eliminamos
          if (personajesActualizados.length === 0) {
            return null; // Marca el grupo para eliminarlo
          }
  
          return { ...grupo, personajes: personajesActualizados }; // Actualizar el grupo con los personajes restantes
        }
        return grupo; // Retornar el grupo sin cambios
      }).filter(grupo => grupo !== null); // Filtrar los grupos que no han sido eliminados
  
      // Encuentra el grupo actualizado sin el personaje eliminado
      const grupoActualizado = gruposActualizados.find(grupo => grupo.idgrupo === idgrupo);
  
      // Si el grupo ya no existe, es porque fue eliminado
      if (!grupoActualizado) {
        console.log(`El grupo con id ${idgrupo} ha sido eliminado por no tener personajes restantes.`);
        // Aquí puedes realizar una acción adicional para eliminar el grupo de la base de datos si es necesario
        eliminarGrupoDeBBDD(idgrupo); 
        setShowModal(false);
        return gruposActualizados; // Retorna los grupos actualizados
      }
  
      // Llamar a la función para guardar los cambios en la base de datos
      const idsPersonajes = grupoActualizado.personajes.map(personaje => personaje.idpersonaje);
      guardarCambiosBBDD(grupoActualizado.idgrupo, idsPersonajes); // Llamada sin await
      
      setShowModal(false);
      return gruposActualizados; 
    });
  };


const agregarPersonaje = async (idgrupo, idpersonaje) => {
  
  const gruposActualizados = gruposConPersonajes.map(grupo => {
    if (grupo.idgrupo === idgrupo) {
     
      const personajeYaEnGrupo = grupo.personajes.some(personaje => personaje.idpersonaje === idpersonaje);
      
      if (!personajeYaEnGrupo) {
       
        const personajeAgregado = coleccionPersonajes.find(personaje => personaje.idpersonaje === idpersonaje);
        
        return {
          ...grupo,
          personajes: [...grupo.personajes, personajeAgregado]
        };
      }
    }
    return grupo; 
  });

  setGruposConPersonajes(gruposActualizados);
  const grupoActualizado = gruposActualizados.find(grupo => grupo.idgrupo === idgrupo);

  if (grupoActualizado) {
    const idsPersonajes = grupoActualizado.personajes.map(personaje => personaje.idpersonaje);
    await guardarCambiosBBDD(idgrupo, idsPersonajes);
  }
};

  
  const eliminarGrupoDeBBDD = async (idgrupo) => {
    try {
      //const response = await axios.delete(`http://localhost:4000/delete-grupo/${idgrupo}`);
      const response = await axios.delete(`https://zepironokioku.onrender.com/delete-grupo/${idgrupo}`);
      console.log('Grupo eliminado exitosamente:', response.data);
/*
      Swal.fire({
        icon: 'success',
        title: '¡Grupo Eliminado!',
        text: 'El grupo ha sido eliminado correctamente.',
        confirmButtonText: 'Aceptar'
      });*/
    } catch (error) {
      console.error('Error al eliminar el grupo:', error);
    }
  };


const guardarCambiosBBDD = async (idgrupo, idspersonajes) => {
  try {
    //const response = await axios.put(`http://localhost:4000/update-grupos`, {
    const response = await axios.put(`https://zepironokioku.onrender.com/update-grupos`, {
      idgrupo,
      idspersonajes
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
/*
    Swal.fire({
      icon: 'success',
      title: '¡Cambios!',
      text: 'Los cambios se han guardado correctamente.',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      // Recargar la página después de que el usuario cierre la alerta
     
    });
*/
  } catch (error) {
    console.error('Error al guardar cambios:', error);
  }
};


  const handleBuscarPersonaje = (idgrupo, e) => {
    const nuevaBusqueda = e.target.value;
    setBusquedas(prevBusquedas => ({
      ...prevBusquedas,
      [idgrupo]: nuevaBusqueda
    }));

    if (nuevaBusqueda.trim() === '') {
      setResultadosBusqueda(prevResultados => ({
        ...prevResultados,
        [idgrupo]: [] 
      }));
    } else {
      const resultados = coleccionPersonajes.filter(personaje =>
        personaje.nombre.toLowerCase().includes(nuevaBusqueda.toLowerCase())
      );
      setResultadosBusqueda(prevResultados => ({
        ...prevResultados,
        [idgrupo]: resultados 
      }));
    }
  };
 
  const [showModal, setShowModal] = useState(false);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);
  const [idGrupoSeleccionado, setIdGrupoSeleccionado] = useState(null);

  const abrirPersonaje=(nombre,idpersonaje,idgrupo)=>{
    setPersonajeSeleccionado(idpersonaje);
    setIdGrupoSeleccionado(idgrupo);
    setShowModal(true); 
  }




const [values, setValues] = useState({});

const calcularVidaTotal = (personaje) => {
  return (personaje.ki + personaje.fortaleza) * (personaje.positiva + personaje.negativa);
};

useEffect(() => {
  const handleMessage = (data) => {
    setValues((prevValues) => {
      const personajeEnColeccion = coleccionPersonajes.find((p) => p.idpersonaje === data.idpersonaje);
      if (!personajeEnColeccion) return prevValues;
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
          vidaTotal: data.vidaTotal !== undefined ? data.vidaTotal : 
            (prevValues[data.idpersonaje]?.vidaTotal || vidaTotalCalculada),
        },
      };
    });
  };

    socket.on('message', handleMessage);

  
    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket, coleccionPersonajes]);
  

  const renderTooltip = (idpersonaje) => (props) => {
    const personaje = coleccionPersonajes.find((p) => p.idpersonaje === idpersonaje);
     
    if (!personaje) {
      return (
        <Tooltip className="tipInfo" id="button-tooltip" {...props}>
          <p>Personaje no encontrado</p>
        </Tooltip>
      );
    }

 
    const data = values[idpersonaje] || { 
      kenActual: personaje.kenActual || 0, 
      ken: personaje.ken || 0, 
      kiActual: personaje.kiActual || 0, 
      ki: personaje.ki || 0 ,
      vidaActual: personaje.vidaActual || 0, 
      vidaTotal: calcularVidaTotal(personaje)
    };

   
    return (
      <Tooltip className="tipInfo" id="button-tooltip" {...props}>
      <p style={{ fontSize: "1em", margin: "0", color:"yellow"}}>
        Vida: {data.vidaActual} / {data.vidaTotal}
      </p>
      <p style={{ fontSize: "1em", margin: "0" , color:"yellow"}}>
        Ki: {data.kiActual} / {data.ki}
      </p>
      <p style={{ fontSize: "1em", margin: "0", color:"yellow"}}>
        Ken: {data.kenActual} / {data.ken}
      </p>
      </Tooltip>
    );
  };

  return (
    <div>
      {gruposConPersonajes.length > 0 ? (
        gruposConPersonajes.map(grupo => (
          <div key={grupo.idgrupo} className="cuadroGrupo">
            <p style={{ color: "orange", fontSize: "1.5em",fontFamily:"cursive", marginBottom:"1.5em"}}>{grupo.nombre}</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {grupo.personajes.length > 0 ? (
                    
                 grupo.personajes.map(({ nombre, imagen, idpersonaje, usuarioId }) => (
                  
                  <div
                    className="grupo-card"
                    key={idpersonaje}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    
                    <OverlayTrigger
                        placement="right"
                        overlay={renderTooltip(idpersonaje)}
                    >
                    <img src={imagen} alt={nombre} className="grupo-card-image" 
                      style={{
                           
                        boxShadow: usuariosConectados.includes(Number(usuarioId)) 
                        ? '0 0 15px rgba(255, 255, 255, 1), 0 0 30px rgba(0, 191, 255, 0.9), 0 0 60px rgba(0, 191, 255, 0.6)' // Sombra brillante azul y blanco
                        : 'none',
                      }} 
                     onClick={()=>{abrirPersonaje(nombre,idpersonaje,grupo.idgrupo)}} />
                    </OverlayTrigger>
                   
                  
                   
                    <p>{nombre}</p>
                  
                    
                  </div>
                ))
              ) : (
                <p style={{ color: "aliceblue" }}>No hay personajes en este grupo</p>
              )}
            </div>


            <ModalHorizontal
                      show={showModal}
                      onHide={() => setShowModal(false)} // Cerrar el modal
                      idpersonaje={personajeSeleccionado}
                      idGrupoSeleccionado={idGrupoSeleccionado}
                      eliminarPersonaje={eliminarPersonaje}
                     
                      coleccionPersonajes={coleccionPersonajes}
                    />




            <div style={{display:"flex", flexDirection:"column", marginTop: '20px'}}>
              <input
                type="text"
                value={busquedas[grupo.idgrupo] || ''} // Valor basado en el grupo actual
                onChange={(e) => handleBuscarPersonaje(grupo.idgrupo, e)} // Manejar búsqueda por grupo
                placeholder="Buscar personaje por nombre"
                className="buscador"
                style={{
                  marginBottom: '10px',
                  padding: '5px',
                  height: "1.5em",
                  width: '50%',
                  border: "2px solid aliceblue",
                  borderRadius: "5px",
                  backgroundColor: "black",
                  color: "greenyellow"
                }}
              />
              <div>
                {resultadosBusqueda[grupo.idgrupo] && resultadosBusqueda[grupo.idgrupo].length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: "row" }}>
                      {resultadosBusqueda[grupo.idgrupo].map(personaje => (
                        <div key={personaje.idpersonaje} style={{ margin: '10px', textAlign: 'center' }}>
                          <img src={personaje.imagen} alt={personaje.nombre} style={{ borderRadius: "50%", width: '40px', height: '40px' }} />
                          <p style={{color:"aliceblue"}}>{personaje.nombre}</p>
                          <Button variant="outline-warning" onClick={() => agregarPersonaje(grupo.idgrupo, personaje.idpersonaje)}>Agregar</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "aliceblue" }}>No hay grupos disponibles</p>
      )}
    </div>
  );
};