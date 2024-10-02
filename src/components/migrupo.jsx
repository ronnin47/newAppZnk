import React, { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { io } from 'socket.io-client';

// Conectar al socket usando la URL del backend desde las variables de entorno
const socket = io(process.env.REACT_APP_BACKEND_URL);

export const MiGrupo = ({
  usuariosConectados,
  idusuario,
  pjUsuarioId,
  idpersonaje,
  coleccionGrupos,
  coleccionPersonajes,
  values,
  sesion,
  setValues
}) => {
  const [gruposFiltrados, setGruposFiltrados] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

/*
  // Efecto para escuchar cambios en usuariosConectados
  useEffect(() => {
    console.log("***********Usuarios conectados: ", usuariosConectados); // Console log de usuarios conectados
  }, [usuariosConectados,sesion]); // Ejecutar cuando usuariosConectados cambie
*/

  useEffect(() => {
    setIsLoading(true); // Inicia el estado de carga

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

      // Establecer grupos filtrados con un pequeño retardo para suavizar la transición
      setTimeout(() => {
        setGruposFiltrados(gruposConPersonajes);
        setIsLoading(false); // Finaliza el estado de carga
      }, 100);
    }
  }, [idpersonaje, coleccionGrupos, coleccionPersonajes]);

  // Función para calcular la vida total de un personaje
  const calcularVidaTotal = (personaje) => {
    return (personaje.ki + personaje.fortaleza) * (personaje.positiva + personaje.negativa);
  };

  // Función para renderizar el tooltip
  const renderTooltip = (idpersonaje) => (props) => {
    // Buscar el personaje correspondiente por id
    const personaje = coleccionPersonajes.find((p) => p.idpersonaje === idpersonaje);

    // Si no se encuentra el personaje, retornar un mensaje de error
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
      ki: personaje.ki || 0,
      vidaActual: personaje.vidaActual || 0,
      vidaTotal: calcularVidaTotal(personaje) // Calcular vidaTotal
    };

    // Retornar el tooltip con los datos del personaje
    return (
      <Tooltip className="tipInfo" id="button-tooltip" {...props}>
        <p style={{ fontSize: "1em", margin: "0", color: "yellow" }}>
          Vida: {data.vidaActual} / {data.vidaTotal}
        </p>
        <p style={{ fontSize: "1em", margin: "0", color: "yellow" }}>
          Ki: {data.kiActual} / {data.ki}
        </p>
        <p style={{ fontSize: "1em", margin: "0", color: "yellow" }}>
          Ken: {data.kenActual} / {data.ken}
        </p>
      </Tooltip>
    );
  };

  return (
    <div>
      {isLoading ? ( // Mostrar un estado de carga mientras se procesan los grupos
        <p>Cargando...</p>
      ) : gruposFiltrados.length > 0 ? (
        gruposFiltrados.map(grupo => (
          <div key={grupo.idgrupo} className="grupoPj">
            <div style={{ display: "flex", flexDirection: "row" }}>
              {grupo.personajes.length > 0 ? (
                grupo.personajes.map(({ nombre, imagen, idpersonaje, usuarioId }) => { // Asegúrate de que `usuarioId` está incluido en cada personaje
                  console.log(`Personaje ID: ${idpersonaje}, Usuario ID: ${usuarioId}`); // Console log para el id de personaje y usuario
                  
                  return (
                    <div
                      className="grupo-card"
                      key={idpersonaje}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <OverlayTrigger
                        placement="right"
                        overlay={renderTooltip(idpersonaje)}
                      >
                        <img
                          src={imagen}
                          alt={nombre}
                          className="grupo-card-image"
                          style={{
                           
                            boxShadow: usuariosConectados.includes(Number(usuarioId)) 
                            ? '0 0 15px rgba(255, 255, 255, 1), 0 0 30px rgba(0, 191, 255, 0.9), 0 0 60px rgba(0, 191, 255, 0.6)' // Sombra brillante azul y blanco
                            : 'none',
                          }}
                        />
                      </OverlayTrigger>
                      <p>{nombre}</p>
                    </div>
                  );
                })
              ) : (
                <p>No hay personajes en este grupo.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No se encontraron grupos.</p>
      )}
    </div>
  );
};