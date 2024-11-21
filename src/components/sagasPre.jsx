import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';



export const SagasPre = ({ setColeccionPersonajes,usuarioid,coleccionSecciones,coleccionSagas,coleccionPersonajes }) => {
  
 // console.log("este es el usuario ID que tiene: ",usuarioid)
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
          setColeccionPersonajes={setColeccionPersonajes}
          usuarioid={usuarioid}
        />
      ))}
    </div>
  );
};


const SagaUni = ({  coleccionPersonajes, setColeccionPersonajes,usuarioid,personajesSaga, secciones, idsaga, titulo, imagensaga, presentacion }) => {
 
  const personajesFiltrados = (coleccionPersonajes || []).filter((personaje) =>
    (personajesSaga || []).includes(personaje.idpersonaje) // Verificar si el ID del personaje está en personajesSaga
  );
 // console.log("Personajes filtrados: ", personajesFiltrados);
  
  //console.log("PERSONAJES FILTRADISIMOS: ", personajesFiltrados);
 // console.log("este es el usuario ID que tiene: ",usuarioid)
  const [showModal, setShowModal] = useState(false);

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);



  const ImagenModal = ({ setColeccionPersonajes, coleccionPersonajes, usuarioid, show, onHide, imagen, nombre, notaSaga, usuarioIdPj, idpersonaje }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableHistoria, setEditableHistoria] = useState(notaSaga);
  
    // Encontrar dinámicamente la nota actualizada del personaje
    const personajeActual = coleccionPersonajes.find((personaje) => personaje.idpersonaje === idpersonaje);
    const notaActualizada = personajeActual ? personajeActual.notasaga : notaSaga;
  
    //console.log("ID del personaje:", idpersonaje);
    //console.log("Colección de personajes:", coleccionPersonajes);
  
    // Función para abrir el modal de edición
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    // Función para manejar el cambio en el input
    const handleInputChange = (event) => {
      setEditableHistoria(event.target.value);
    };
  
    // Función para guardar los cambios en el backend
    const handleSaveChanges = async (idpersonaje) => {
    
      //console.log("Este es el ID para el UPDATE:", idpersonaje);
  
      try {
        const response = await axios.put(
          //`http://localhost:4000/update-notas/${idpersonaje}`,
          `https://zepiro.onrender.com/update-notas/${idpersonaje}`,
          { nota: editableHistoria },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
  
        console.log("Cambios guardados exitosamente:", response.data);
  
        // Actualizar la nota en el estado global
        setColeccionPersonajes((prevPersonajes) =>
          prevPersonajes.map((personaje) =>
            personaje.idpersonaje === idpersonaje
              ? { ...personaje, notasaga: editableHistoria }
              : personaje
          )
        );
  
        Swal.fire({
          icon: "success",
          title: "¡Cambios guardados!",
          text: "Las notas han sido actualizadas correctamente.",
          confirmButtonText: "Aceptar",
        });
  
        setIsEditing(false); // Cierra el modal de edición
      } catch (error) {
        console.error("Error al guardar cambios:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo guardar la nota. Inténtalo nuevamente.",
        });
      }
    };
  
    return (
      <>
        {/* Modal principal */}
        <Modal show={show} onHide={onHide} size="lg">
          <Modal.Body
            className="modalPre"
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#222",
              color: "aliceblue",
              padding: "20px",
              position: "relative",
            }}
          >
            {/* Imagen a la izquierda */}
            <div>
              <img
                src={imagen}
                alt={nombre}
                style={{
                  width: "20em",
                  height: "20em",
                  borderRadius: "8px",
                  marginTop: "2em",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                }}
              />
            </div>
  
            {/* Texto a la derecha */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1em", padding: "1em" }}>
              <h4
                style={{
                  fontWeight: "bold",
                  marginBottom: "0",
                  color: "yellow",
                  fontFamily: "cursive",
                  textAlign: "center",
                }}
              >
                {nombre}
              </h4>
              <p style={{ lineHeight: "1.5", fontSize: "1em" }}>{notaActualizada}</p>
            </div>
  
            {/* Botón Editar */}
            {parseInt(usuarioid) === parseInt(usuarioIdPj) && (
              <Button
                variant="outline-primary"
                onClick={handleEditClick}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
              >
                Editar
              </Button>
            )}
          </Modal.Body>
        </Modal>
  
        {/* Modal de edición */}
        <Modal show={isEditing} onHide={() => setIsEditing(false)} size="lg">
          <Modal.Body
            className="modalPre"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#222",
              color: "aliceblue",
              padding: "20px",
            }}
          >
            <h4
              style={{
                fontWeight: "bold",
                marginBottom: "0",
                color: "yellow",
                fontFamily: "cursive",
                textAlign: "center",
              }}
            >
              Editar notas de {nombre}
            </h4>
  
            {/* Campo de texto editable */}
            <textarea
              value={editableHistoria}
              onChange={handleInputChange}
              style={{
                backgroundColor: "#333",
                color: "aliceblue",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "1em",
                width: "100%",
                height: "200px",
                resize: "none",
              }}
            />
  
            {/* Botón para guardar cambios */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <Button variant="outline-success" onClick={() => handleSaveChanges(idpersonaje)}>
                Guardar Cambios
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };




  const ImagenModalN = ({ show, onHide, imagen}) => {
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
  const [nombrePj, setNombrePj] = useState('');
  const [notaSagaPj, setNotaSagaPj] = useState('');
  const [usuarioIdPj, setUsuarioIdPj] = useState('');
  const [idePj, setIdePj] = useState('');

  const handleImagenClick = (imagen,nombre,notasaga,usuarioid,idpersonaje) => {


    //console.log("**********vemos que tien usaurioid",usuarioid)
    
    //console.log("**********vemos que teien IDPERSONAJE",idpersonaje)
    setImagenSeleccionada(imagen);
    setNombrePj(nombre);
    setNotaSagaPj(notasaga)
    setUsuarioIdPj(usuarioid)
    setIdePj(idpersonaje)
    setShowModalImg(true);
  };

  const handleCloseModalImg = () => {
    setShowModalImg(false);
  };



  const [showModalImgN, setShowModalImgN] = useState(false);
  const [imagenSeleccionadaN, setImagenSeleccionadaN] = useState('');
  const handleCloseModalImgN = () => {
    setShowModalImgN(false);
  };

  const handleImagenClickN = (imagen,nombre,notasaga) => {
    setImagenSeleccionadaN(imagen);
    setNombrePj(nombre);
    setNotaSagaPj(notasaga);
    setShowModalImgN(true);
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
                  onClick={() => handleImagenClick(personaje.imagen, personaje.nombre,personaje.notasaga,personaje.usuarioId,personaje.idpersonaje)}
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
              onClick={() => handleImagenClickN(imagensaga)}
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
                  onClick={() => handleImagenClickN(seccion.imagen)}
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

      <ImagenModal setColeccionPersonajes={setColeccionPersonajes} coleccionPersonajes={coleccionPersonajes} show={showModalImg} onHide={handleCloseModalImg} imagen={imagenSeleccionada} nombre={nombrePj} notaSaga={notaSagaPj} usuarioIdPj={usuarioIdPj} usuarioid={usuarioid} idpersonaje={idePj}/>
      <ImagenModalN show={showModalImgN} onHide={handleCloseModalImgN} imagen={imagenSeleccionadaN} ></ImagenModalN>
    
    </>
  );
};