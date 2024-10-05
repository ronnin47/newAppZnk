import React, { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { io } from 'socket.io-client';


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


  useEffect(() => {
    setIsLoading(true);

    if (coleccionGrupos?.length > 0 && coleccionPersonajes?.length > 0) {
      const gruposConPersonaje = coleccionGrupos.filter(grupo =>
        Array.isArray(grupo.idspersonajes) && grupo.idspersonajes.includes(idpersonaje)
      );

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
        setIsLoading(false); 
      }, 100);
    }
  }, [idpersonaje, coleccionGrupos, coleccionPersonajes]);


  const calcularVidaTotal = (personaje) => {
    return (personaje.ki + personaje.fortaleza) * (personaje.positiva + personaje.negativa);
  };

 
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
      ki: personaje.ki || 0,
      vidaActual: personaje.vidaActual || 0,
      vidaTotal: calcularVidaTotal(personaje) 
    };

   
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
                grupo.personajes.map(({ nombre, imagen, idpersonaje, usuarioId }) => {
                 
                  
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