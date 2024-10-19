import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const socket = io(process.env.REACT_APP_BACKEND_URL);

export const Enemigos = ({ values, estatus, usuarioId }) => {
  const [images, setImages] = useState([]);
  const [borderClasses, setBorderClasses] = useState({});
  const [imagenData, setImagenData] = useState({});

  useEffect(() => {
    socket.on('image', (imageData) => {
      setImages((prevImages) => [...prevImages, imageData]);

      setImagenData((prevData) => ({
        ...prevData,
        [imageData.idpersonaje]: imageData.vidaPositiva
      }));

      console.log("VIDA POSITIVA ", imageData.vidaPositiva);
    });

    socket.on('removeImage', (idpersonaje) => {
      setImages((prevImages) => prevImages.filter(image => image.idpersonaje !== idpersonaje));
      setImagenData((prevData) => {
        const newData = { ...prevData };
        delete newData[idpersonaje];
        return newData;
      });
    });

    socket.on('user-disconnect', (data) => {
      const { usuarioId: disconnectedUserId } = data;
      console.log(`Usuario desconectado: ${disconnectedUserId}`);
      setImages((prevImages) => prevImages.filter(image => image.usuarioId !== disconnectedUserId));
      setImagenData((prevData) => {
        const newData = { ...prevData };
        delete newData[disconnectedUserId];
        return newData;
      });
    });

    return () => {
      socket.off('image');
      socket.off('removeImage');
      socket.off('user-disconnect');
    };
  }, [usuarioId]);

  useEffect(() => {
    const newBorderClasses = {};
    Object.keys(values).forEach((idpersonaje) => {
      const vidaActual = values[idpersonaje]?.vidaActual;
      const vidaPositiva = imagenData[idpersonaje];
      newBorderClasses[idpersonaje] = (vidaActual !== undefined && vidaPositiva !== undefined && vidaActual > vidaPositiva) ?
        'border-verde' : '';
    });
    setBorderClasses(newBorderClasses);
  }, [values, imagenData]);

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
        const { image, idpersonaje, nombre } = imageObj;

        return (
          <div key={idpersonaje} style={{ textAlign: 'center', margin: '10px' }}>
            <OverlayTrigger
              placement="right"
              overlay={renderTooltip(idpersonaje)}
            >
              <img
                src={image || "/imagenBase"}
                alt={`imagen-${idpersonaje}`}
                style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                className={`imagenEnemigos ${borderClasses[idpersonaje]}`}
                onDoubleClick={estatus === "narrador" ? () => handleDoubleClick(idpersonaje) : undefined}
              />
            </OverlayTrigger>
            <p style={{ color: "yellow", fontFamily:"cursive" }}>{nombre}</p> {/* Mostrar el nombre debajo de la imagen */}
          </div>
        );
      })}
    </div>
  );
};