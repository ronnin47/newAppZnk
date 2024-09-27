import React, { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';




import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BACKEND_URL);




export const MiGrupo = ({ idpersonaje, coleccionGrupos, coleccionPersonajes }) => {
  const [gruposFiltrados, setGruposFiltrados] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  useEffect(() => {
    setIsLoading(true); // Indicar que está cargando
    if (coleccionGrupos?.length > 0 && coleccionPersonajes?.length > 0) {
      // Filtrar los grupos que contienen el idpersonaje
      const gruposConPersonaje = coleccionGrupos.filter(grupo =>
        Array.isArray(grupo.idspersonajes) && grupo.idspersonajes.includes(idpersonaje)
      );

      // Añadir personajes a los grupos
      const gruposConPersonajes = gruposConPersonaje.map(grupo => {
        const personajesDelGrupo = coleccionPersonajes.filter(personaje =>
          grupo.idspersonajes.includes(personaje.idpersonaje)
        );

        return {
          ...grupo,
          personajes: personajesDelGrupo
        };
      });

      setTimeout(() => {
        setGruposFiltrados(gruposConPersonajes);
        setIsLoading(false); // Terminar carga después del procesamiento
      }, 100); // Un pequeño retardo suaviza la transición
    }
  }, [idpersonaje, coleccionGrupos, coleccionPersonajes]);


  const [values, setValues] = useState({}); // Estado para almacenar los valores de ken y ki


// Función para calcular vidaTotal
const calcularVidaTotal = (personaje) => {
  return (personaje.ki + personaje.fortaleza) * (personaje.positiva + personaje.negativa);
};

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
  

  // Función para renderizar el tooltip
  const renderTooltip = (idpersonaje) => (props) => {
    // Buscar el personaje seleccionado por idpersonaje
    const personaje = coleccionPersonajes.find((p) => p.idpersonaje === idpersonaje);
    
    // Si no se encuentra el personaje, retornar un mensaje de error o similar
    if (!personaje) {
      return (
        <Tooltip className="tipInfo" id="button-tooltip" {...props}>
          <p>Personaje no encontrado</p>
        </Tooltip>
      );
    }

    // Obtener los valores de ken y ki para el personaje actual
    const data = values[idpersonaje] || { 
      kenActual: personaje.kenActual || 0, 
      ken: personaje.ken || 0, 
      kiActual: personaje.kiActual || 0, 
      ki: personaje.ki || 0 ,
      vidaActual: personaje.vidaActual || 0, 
      vidaTotal: calcularVidaTotal(personaje) // Calculamos vidaTotal
    };

    // Retornar el tooltip con los datos del personaje
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
        {/* Puedes agregar más información del personaje aquí */}
      </Tooltip>
    );
  };

  return (
    <div>
      {gruposFiltrados.length > 0 ? (
        gruposFiltrados.map(grupo => (
          <div key={grupo.idgrupo} className={`grupoPj ${isLoading ? 'loading' : ''}`}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {grupo.personajes.length > 0 ? (
                grupo.personajes.map(({ nombre, imagen, idpersonaje }) => (
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
                      <img src={imagen} alt={nombre} className="grupo-card-image" />
                    </OverlayTrigger>
                    <p>{nombre}</p>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};