import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const socket = io(process.env.REACT_APP_BACKEND_URL);

export const Enemigos = ({ values, estatus, usuarioId }) => {
  const [images, setImages] = useState([]);
  const [borderClasses, setBorderClasses] = useState({}); // Cambiado a borderClasses
  const [imagenData, setImagenData] = useState({}); // Estado para almacenar imagenData

  useEffect(() => {
    // Escuchar evento para nuevas imágenes
    socket.on('image', (imageData) => {
      setImages((prevImages) => [...prevImages, imageData]);

      // Guardar vidaPositiva para cada personaje individualmente
      setImagenData((prevData) => ({
        ...prevData,
        [imageData.idpersonaje]: imageData.vidaPositiva // Almacenar vidaPositiva con idpersonaje como clave
      }));

      console.log("VIDA POSITIVA ", imageData.vidaPositiva);
    });

    // Escuchar evento para remover una imagen
    socket.on('removeImage', (idpersonaje) => {
      setImages((prevImages) => prevImages.filter(image => image.idpersonaje !== idpersonaje));
      setImagenData((prevData) => {
        const newData = { ...prevData };
        delete newData[idpersonaje]; // Eliminar vidaPositiva al remover la imagen
        return newData;
      });
    });

    // Escuchar evento de desconexión de usuario
    socket.on('user-disconnect', (data) => {
      const { usuarioId: disconnectedUserId } = data; // Obtener el usuarioId del que se desconectó
      console.log(`Usuario desconectado: ${disconnectedUserId}`);
      setImages((prevImages) => prevImages.filter(image => image.usuarioId !== disconnectedUserId)); // Filtra las imágenes de este usuario
      setImagenData((prevData) => {
        const newData = { ...prevData };
        delete newData[disconnectedUserId]; // Eliminar vidaPositiva al desconectarse
        return newData;
      });
    });

    // Limpiar los eventos al desmontar el componente
    return () => {
      socket.off('image');
      socket.off('removeImage');
      socket.off('user-disconnect'); // Limpia el evento de desconexión
    };
  }, [usuarioId]); // Agrega usuarioId como dependencia

  // useEffect para actualizar classNames según la vidaActual de cada personaje
  useEffect(() => {
    const newBorderClasses = {};
    Object.keys(values).forEach((idpersonaje) => {
      const vidaActual = values[idpersonaje]?.vidaActual;
      const vidaPositiva = imagenData[idpersonaje]; // Obtener vidaPositiva específica del personaje
      // Verificamos si vidaActual y vidaPositiva están definidos antes de comparar
      newBorderClasses[idpersonaje] = (vidaActual !== undefined && vidaPositiva !== undefined && vidaActual > vidaPositiva) ?
        'border-verde' : ''; // Asigna la clase de borde verde si es necesario
    });
    setBorderClasses(newBorderClasses);
  }, [values, imagenData]); // Añadir imagenData como dependencia

  const renderTooltip = (idpersonaje) => (props) => {
    const data = values[idpersonaje] || {
      kenActual: undefined,
      kiActual: undefined,
      vidaActual: undefined,
      ken: undefined,
      ki: undefined,
      vidaTotal: undefined
    };

    const vidaActual = data.vidaActual !== undefined ? data.vidaActual : "??";
    const vidaTotal = data.vidaTotal !== undefined ? data.vidaTotal : "??";
    const kiActual = data.kiActual !== undefined ? data.kiActual : "??";
    const ki = data.ki !== undefined ? data.ki : "??";
    const kenActual = data.kenActual !== undefined ? data.kenActual : "??";
    const ken = data.ken !== undefined ? data.ken : "??";

    return (
      <Tooltip className="tipInfo" id="button-tooltip" {...props}>
        <p style={{ fontSize: "1em", margin: "0", color: "yellow" }}>
          Vida: {vidaActual} / {vidaTotal}
        </p>
        <p style={{ fontSize: "1em", margin: "0", color: "yellow" }}>
          Ki: {kiActual} / {ki}
        </p>
      </Tooltip>
    );
  };

  const handleDoubleClick = (idpersonaje) => {
    socket.emit('removeImage', idpersonaje);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
      {[...new Map(images.map(item => [item.idpersonaje, item])).values()].map((imageObj) => {
        const { image, idpersonaje } = imageObj;
  
        return (
          <OverlayTrigger
            key={idpersonaje}
            placement="right"
            overlay={renderTooltip(idpersonaje)}
          >
            <img
              src={image || "/imagenBase"}
              alt={`imagen-${idpersonaje}`}
              style={{ width: '100px', height: 'auto', margin: '10px', cursor: 'pointer' }}
              className={`imagenEnemigos ${borderClasses[idpersonaje]}`} // Asignar las clases
              onDoubleClick={estatus === "narrador" ? () => handleDoubleClick(idpersonaje) : undefined}
            />
          </OverlayTrigger>
        );
      })}
    </div>
  );
};