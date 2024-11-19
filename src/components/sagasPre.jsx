import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';


export const SagasPre = ({ coleccionSecciones,coleccionSagas,coleccionPersonajes }) => {
  return (
    <div
      className='container'
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        padding: '20px',
        justifyItems:"center"
      }}
    >
      {coleccionSagas.map((saga) => (
        <SagaUni
          key={saga.idsaga}
          idsaga={saga.idsaga}
          titulo={saga.titulo}
          imagensaga={saga.imagensaga}
          presentacion={saga.presentacion}
          secciones={coleccionSecciones.filter((seccion) => seccion.idsaga === saga.idsaga)} // Filtra las secciones que corresponden a la saga actual
          personajesSaga={saga.personajes}

          coleccionPersonajes={coleccionPersonajes}
        />
      ))}
    </div>
  );
};


const SagaUni = ({ personajesSaga, coleccionPersonajes, secciones, idsaga, titulo, imagensaga, presentacion }) => {
 
  const personajesFiltrados = (coleccionPersonajes || []).filter((personaje) =>
    (personajesSaga || []).includes(personaje.idpersonaje) // Verificar si el ID del personaje está en personajesSaga
  );
 // console.log("Personajes filtrados: ", personajesFiltrados);
  
  //console.log("PERSONAJES FILTRADISIMOS: ", personajesFiltrados);

  const [showModal, setShowModal] = useState(false);

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const ImagenModal = ({ show, onHide, imagen}) => {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <img
            src={imagen}
            alt="Vista ampliada"
            style={{ maxWidth: '100%', maxHeight: '80vh' }}
          />
        
        </Modal.Body>
      </Modal>
    );
  };

  const [showModalImg, setShowModalImg] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState('');

  const handleImagenClick = (imagen) => {
    setImagenSeleccionada(imagen);
    setShowModalImg(true);
  };

  const handleCloseModalImg = () => {
    setShowModalImg(false);
  };


  const renderTooltip = (idpersonaje,nombre) => (
    <Tooltip id={`tooltip-${idpersonaje}`} 
    
    className='toll'
    style={{
      textAlign: 'center' }}>
      {nombre}
    </Tooltip>
  );

  return (
    <>
      {/* Contenedor de la saga (imagen y título) */}
      <div
        className="estructuraSaga"
        onClick={handleOpen}
        style={{
          cursor: 'pointer',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        {/* Imagen y título alineados en una columna */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={imagensaga}
            alt="Imagen de la saga"
            className='agrandarC'
            style={{
              width: '12em',
              height: '12em',
              borderRadius: '50%',
              border: '3px solid red',
            }}
          />
          {/* Título justo debajo de la imagen */}
          <p style={{ color: 'yellowgreen', marginTop: '10px', fontFamily:"cursive",fontSize:"1.5em" }}>{titulo}</p>
        </div>
      </div>

      {/* Modal que se muestra al hacer clic */}
      <Modal show={showModal} onHide={handleClose} fullscreen style={{ backgroundColor: 'black' }}>
        <Modal.Header closeButton style={{ backgroundColor: 'black', borderBottom: '1px solid #444' }} closeVariant="white">
          <Modal.Title style={{ color: 'white', display:"flex", flexDirection:"row",gap:"5em" }}>

            <div   
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '20px',
                alignItems:"center",
                justifyContent: 'center',
                color:"yellowgreen",
                fontFamily:"cursive",
                fontSize:"1.5em",
              }}>
            {titulo}
            </div>
         
            
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '20px',
                justifyContent: 'center',
              }}
            >
              {personajesFiltrados.map((personaje) => (
                           
               <OverlayTrigger
               placement="right"
               overlay={renderTooltip(personaje.idpersonaje,personaje.nombre)}
           >
               <img
                className="agrandarB"
                  key={personaje.idpersonaje}
                  src={personaje.imagen || '/imagenBase.jpeg'} // Imagen por defecto si no existe una imagen
                  alt={personaje.nombre}
                  style={{
                    width: '2.5em',
                    height: '2.5em',
                    borderRadius: '50%',
                    border: '2px solid yellow',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImagenClick(personaje.imagen)}
                />
                </OverlayTrigger>
              ))}
            </div>
            
            </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: 'black', color: 'white' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: 'black',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <img
              src={imagensaga}
              alt="Imagen de la saga"
              onClick={() => handleImagenClick(imagensaga)}
              style={{
                width: '20em',
                height: '20em',
                borderRadius: '15px',
                border: '3px solid red',
                marginRight: '20px',
              }}
            />
            <p style={{ color: 'aliceblue', margin: 0 }}>{presentacion}</p>
          </div>

         

          {/* Renderizar secciones */}
          {secciones.map((seccion, index) => (
            <div key={index} style={{ marginTop: '20px' }}>
              <div className="container" style={{ display: 'flex', flexDirection: 'row', gap: '1em', marginBottom: '20px' }}>
                <img
                  src={seccion.imagen || '/imagenBase.jpeg'}
                  alt="Previsualización"
                  style={{ width: '16em', height: '16em' }}
                  onClick={() => handleImagenClick(seccion.imagen)}
                />
                <div style={{ flexGrow: 1 }}>
                  <p style={{ color: 'red' }}>{seccion.titulo}</p>
                  <p style={{ color: 'white' }}>{seccion.presentacion}</p>
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>

      <ImagenModal show={showModalImg} onHide={handleCloseModalImg} imagen={imagenSeleccionada} />
    </>
  );
};