
import { Button } from "react-bootstrap"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const apiUrl =import.meta.env.VITE_API_URL;

export const Sagas = ({coleccionPersonajes,coleccionSecciones,setColeccionSecciones,coleccionSagas,setColeccionSagas}) => {

    const [titulo, setTitulo] = useState('');
    const [presentacion, setPresentacion] = useState('');
    const [imagen, setImagen] = useState(null);

    const [imagenFile, setImagenFile] = useState(null);

    const [saga, setSaga] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setImagen(reader.result);
            setImagenFile(file);
          };
          reader.readAsDataURL(file);
        }
      };

      const consumirSagasZnk = async () => {
        try {
            //const response = await axios.get('http://localhost:4000/consumirSagas', {
            const response = await axios.get(`${apiUrl}/consumirSagas`, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            const { coleccionSagas } = response.data;
      
            if (!Array.isArray(coleccionSagas)) {
              console.error('El formato de datos no es un array.');
              return;
            }
            
      
            //console.log("SAGAS ZNK: ",coleccionSagas)
            setColeccionSagas(coleccionSagas);
      
        } catch (error) {
          console.error("Cliente: Fallo al consumir Sagas ZNK", error.message);
        }
      };
      
      const crearSaga = async () => {
        const nuevaSaga = {
          titulo:titulo,
          presentacion: presentacion,
          imagen: imagen,
        };
    
        try {
            //const response = await axios.post('http://localhost:4000/insertSaga', nuevaSaga, {
            const response = await axios.post(`${apiUrl}/insertSaga`, nuevaSaga, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
    /*
          if (response.data) {
            const { idsaga, titulo, presentacion, imagensaga } = response.data;
    
            if (titulo && presentacion && imagensaga) {
        
              setSaga((prevSaberes) => [
                ...prevSaberes,
                {
                  idsaga: idsaga,
                  titulo: titulo || "desconocido",
                  presentacion: presentacion || "desconocido",
                  imagensaga: imagensaga,
                },
              ]);
            } else {
              console.error("La respuesta no tiene las propiedades 'presnetacion' o 'imagensaga'", response.data);
            }
          } else {
            console.error("La respuesta no tiene el formato esperado", response.data);
          }
    */
          // Reinicia los campos de entrada
          setTitulo("");
          setPresentacion('');
          setImagen(null);
          setImagenFile(null);
          consumirSagasZnk()
        } catch (error) {
          console.error('Error al enviar el saber:', error);
          if (error.response) {
            console.error('Detalles del error:', error.response.data);
          }
        }
      };


      //console.log("coleecion de sagas en el compoennete sagas de Narraor",coleccionSagas)

  return (
    <>
          {/* aca vamos a presnetar todas las sagas en el componente narrador */}
          <div 
          className="container"
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
          setColeccionSecciones={setColeccionSecciones}
          coleccionSagas={coleccionSagas}


          setColeccionSagas={setColeccionSagas}

          coleccionPersonajes={coleccionPersonajes}

          personajesSaga={saga.personajes}
        />
      ))}
    </div>

         <div className="container" style={{display:"flex", flexDirection:"row", gap:"1em",transform:"scale(0.9"}}>

         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={imagen || '/imagenBase.jpeg'}
              alt="Previsualización"
              className='imagenSaga'
            />
            <Button variant="outline-warning" onClick={() => document.getElementById('imagen').click()} style={{ marginTop: '10px' }}>
              Seleccionar Imagen
            </Button>
            <input
              type="file"
              id="imagen"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              required
            />
          </div>
  
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <input
              type="text"
              placeholder="ingresa el titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              style={{ width: '100%', marginBottom: '5px', padding: '0.5em', borderRadius: '5px', backgroundColor: "black", color: "yellow" }}
            />
            <textarea
              id="frase"
              placeholder="Ingresa descripcion de saga"
              value={presentacion}
              onChange={(e) => setPresentacion(e.target.value)}
              required
              style={{ width: '100%', height: "15.5em", boxSizing: 'border-box', padding: "0.5em", backgroundColor: "black", color: "yellow" }}
            />
            <div style={{display:"flex", justifyContent: "flex-end" }}>
            <Button variant="outline-primary" onClick={crearSaga} style={{ marginTop: '10px', width: '10em' }}>
                  Crear Saga
            </Button>

            </div>

          
      
      </div>

         </div>

       
  
          
      
    </>
  )
}




const SagaUni = ({personajesSaga,coleccionPersonajes, secciones,setColeccionSecciones,setColeccionSagas,coleccionSagas, idsaga, titulo, imagensaga, presentacion }) => {
  const [showModal, setShowModal] = useState(false);

  // Estado para las secciones dinámicas
  //const [secciones, setSecciones] = useState(secciones);

  // Estado para los campos de cada sección
  const [tituloSeccion, setTituloSeccion] = useState('');
  const [presentacionSeccion, setPresentacionSeccion] = useState('');
  const [imagenSeccion, setImagenSeccion] = useState(null);
  const [imagenFileSeccion, setImagenFileSeccion] = useState(null);

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Manejar el cambio de archivo para la imagen por sección
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagenSeccion(reader.result); // Almacena la imagen cargada
      };
      reader.readAsDataURL(file);
    }
  };


  const handleInputChange = (e, index, field) => {
    const updatedSecciones = [...secciones];
    updatedSecciones[index][field] = e.target.value;
    setColeccionSecciones(updatedSecciones);
  };



  const consumirSeccionesZnk = async () => {
    try {
  
      
        //const response = await axios.get('http://localhost:4000/consumirSecciones', {
        const response = await axios.get(`${apiUrl}/consumirSecciones`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const { coleccionSecciones } = response.data;
  
        if (!Array.isArray(coleccionSecciones)) {
          console.error('El formato de datos no es un array.');
          return;
        }
        
  
        //console.log("Secciones de Sagas: ",coleccionSecciones)
        setColeccionSecciones(coleccionSecciones);
      
    } catch (error) {
      console.error("Cliente: Fallo al consumir Secciones de Sagas", error.message);
    }
  }; 

   

  const crearNewSeccion = async (index) => {


    if (!tituloSeccion || !presentacionSeccion || !imagenSeccion) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const nuevaSeccion = {
      titulo: tituloSeccion,
      presentacion: presentacionSeccion,
      imagen: imagenSeccion,
      idsaga:idsaga,
    };


  

    try {
        //const response = await axios.post('http://localhost:4000/insertSeccion', nuevaSeccion, {
        const response = await axios.post(`${apiUrl}/insertSeccion`, nuevaSeccion, {  
        headers: {
          'Content-Type': 'application/json',
        },
      });


    // Limpiar los campos después de agregar la sección
    setTituloSeccion('');
    setPresentacionSeccion('');
    setImagenSeccion(null);
    setImagenFileSeccion(null);
    consumirSeccionesZnk();

      // Mostrar la alerta de éxito
      Swal.fire({
        title: 'Éxito',
        text: 'La sección se ha guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error('Error al guardar la sección:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al guardar la sección. Intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const guardarCambiosSeccion = async (index) => {
    // Obtener la sección que se va a actualizar usando el índice proporcionado
    const seccion = secciones[index];
  
    try {
      // Realizar la solicitud PUT al servidor para actualizar la sección
       // const response = await axios.put(`http://localhost:4000/updateSeccion/${seccion.idseccion}`, seccion, {
      const response = await axios.put(`${apiUrl}/updateSeccion/${seccion.idseccion}`, seccion, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Verificar si la respuesta fue exitosa
      if (response.status === 200) {
        Swal.fire({
          title: 'Éxito',
          text: 'Sección actualizada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
  

        //VAMOS A PROBAR ACA

       consumirSeccionesZnk();
         
       /*
        // Actualizar el estado local si es necesario
        const nuevasSecciones = [...secciones];
        nuevasSecciones[index] = seccion;
        setColeccionSecciones(nuevasSecciones);
       */

      } else {
        throw new Error('Error al actualizar la sección');
      }
    } catch (error) {
      console.error('Error al guardar cambios de la sección:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al guardar los cambios.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };
   
  const eliminarSeccion = async (index) => {
    const seccion = secciones[index];
  
    // Confirmar antes de eliminar
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (confirmacion.isConfirmed) {
      try {
        // Realizar la solicitud DELETE al servidor
        //const response = await axios.delete(`http://localhost:4000/deleteSeccion/${seccion.idseccion}`);
        const response = await axios.delete(`${apiUrl}/deleteSeccion/${seccion.idseccion}`);
        if (response.status === 200) {
          Swal.fire('Eliminado', 'La sección ha sido eliminada correctamente.', 'success');
  


            //VAMOS A PROBAR ACA

            consumirSeccionesZnk();
          /*
            // Actualizar el estado local para eliminar la sección
          const nuevasSecciones = [...secciones];
          nuevasSecciones.splice(index, 1);
          setColeccionSecciones(nuevasSecciones);
        */
          } else {
          throw new Error('Error al eliminar la sección');
        }
      } catch (error) {
        console.error('Error al eliminar la sección:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar la sección.', 'error');
      }
    }
  };

  const [presentacionSaga, setPresentacionSaga] = useState(presentacion);

  const consumirSagasZnk = async () => {
    try {
       // const response = await axios.get('http://localhost:4000/consumirSagas', {
        const response = await axios.get(`${apiUrl}/consumirSagas`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const { coleccionSagas } = response.data;
  
        if (!Array.isArray(coleccionSagas)) {
          console.error('El formato de datos no es un array.');
          return;
        }
        
  
        //console.log("SAGAS ZNK: ",coleccionSagas)
        setColeccionSagas(coleccionSagas);
  
    } catch (error) {
      console.error("Cliente: Fallo al consumir Sagas ZNK", error.message);
    }
  };

  const guardarCambiosSaga = async () => {
    // Obtener la sección (o saga) que se va a actualizar usando el índice o ID
    const sagaActualizada = {
      presentacion: presentacionSaga, // El valor actualizado que tomamos del input/textarea
    };
  
    try {
      //const response = await axios.put(`http://localhost:4000/updateSaga/${idsaga}`, sagaActualizada, {
      const response = await axios.put(`${apiUrl}/updateSaga/${idsaga}`, sagaActualizada, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      
      if (response.status === 200) {
        Swal.fire({
          title: 'Éxito',
          text: 'Saga actualizada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
  
        // Si la actualización fue exitosa, actualizamos el estado local (si es necesario)
        // Aquí puedes cambiar el valor de presentacionSaga dentro de las secciones o de donde esté el estado global
        
        
        await consumirSagasZnk();

      // Actualizar el estado local con la nueva presentación
      setPresentacionSaga(response.data.presentacion || presentacionSaga);
      } else {
        throw new Error('Error al actualizar la saga');
      }
    } catch (error) {
      console.error('Error al guardar cambios de la saga:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al guardar los cambios.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };



 
    const eliminarSaga = async (index) => {
      
    
      // Confirmar antes de eliminar
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });
    
      if (confirmacion.isConfirmed) {
        try {
          // Realizar la solicitud DELETE al servidor
          const response = await axios.delete(`${apiUrl}/deleteSaga/${idsaga}`);
          //const response = await axios.delete(`http://localhost/deleteSaga/${idsaga}`);
    
          if (response.status === 200) {
            Swal.fire('Eliminado', 'La sección ha sido eliminada correctamente.', 'success');
    
            // Actualizar el estado local para eliminar la sección
          
          await consumirSagasZnk();

          } else {
            throw new Error('Error al eliminar la saga');
          }
        } catch (error) {
          console.error('Error al eliminar la saga:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar la saga.', 'error');
        }
      }
    };
  







   const [nombreBuscado,setNombreBuscado]=useState("")

   const handleChangeNombreBuscado = (e) => {
    const valor = e.target.value;
    setNombreBuscado(valor);
  
    // Filtrar los personajes que coincidan con el texto
    const resultados = coleccionPersonajes.filter((personaje) =>
      personaje.nombre.toLowerCase().includes(valor.toLowerCase())
    );
  
    setResultadosBusqueda(resultados);
  };

  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);



 const [pjsSaga, setPjsSaga]=useState(personajesSaga || [])


 const agregarPjSaga = async (idpersonaje, idsaga) => {
  try {
    // Verificar que pjsSaga sea un array válido antes de llamar a includes
    if (Array.isArray(pjsSaga) && pjsSaga.includes(idpersonaje)) {
      console.log('Este personaje ya está en la saga.');
      Swal.fire({
        title: 'Advertencia',
        text: 'Este personaje ya está en la saga.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return; // No hacer nada si ya está en la saga
    }

   
     //const response = await axios.post('http://localhost:4000/insertPjSaga',
     const response = await axios.post(`${apiUrl}/insertPjSaga`,
      {
        idpersonaje: idpersonaje, 
        idsaga: idsaga            
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Si la inserción fue exitosa, actualizar el estado
    if (response.status === 200) {
      setPjsSaga((prevPersonajes) => [...prevPersonajes, idpersonaje]);
      Swal.fire({
        title: 'Éxito',
        text: 'El personaje se añadió a la saga.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    }

  } catch (error) {
    console.error('Error al añadir personaje:', error);

    // Mostrar alerta de error
    Swal.fire({
      title: 'Error',
      text: 'Hubo un error al guardar el personaje en la saga. Intenta nuevamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }
};



const renderTooltip = (idpersonaje,nombre) => (
  <Tooltip id={`tooltip-${idpersonaje}`} 
  
  className='toll'
  style={{
    textAlign: 'center' }}>
    {nombre}
  </Tooltip>
);



const ImagenModal = ({ show, onHide, imagen }) => {
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={imagensaga}
            alt="Imagen de la seccion"
            style={{
              width: '12em',
              height: '12em',
              borderRadius: '50%',
              border: '3px solid red',
            }}
          />
          <p style={{ color: 'yellowgreen', marginTop: '10px' }}>{titulo}</p>
        </div>
      </div>

   
      

      {/* Modal para agregar secciones */}
      <Modal show={showModal} onHide={handleClose} fullscreen style={{ backgroundColor: 'black' }}>
        <Modal.Header closeButton closeVariant="white" style={{ backgroundColor: 'black', borderBottom: '1px solid #444' }}>
          <Modal.Title style={{ color: 'white' }}>
          
          <div style={{ display: 'flex',flexDirection:"row", gap:'1em', flexWrap: 'wrap' }}>
          <div>{titulo}</div>

          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Verificar si personajesSaga es un array válido */}
          {Array.isArray(pjsSaga) ? (
          pjsSaga.map((idpersonaje) => {
          // Buscar el personaje en coleccionPersonaje usando el idpersonaje
          const personaje = coleccionPersonajes.find(p => p.idpersonaje === idpersonaje);

          if (!personaje) {
          // Si no se encuentra el personaje, puedes mostrar un "loading" o simplemente retornar null
          //console.log(`No se encontró el personaje con id: ${idpersonaje}`);
          return null;
          }

          // Renderizar la imagen del personaje
          return (
          <div key={personaje.idpersonaje} style={{ textAlign: 'center' }}>
               <OverlayTrigger
               placement="right"
               overlay={renderTooltip(personaje.idpersonaje,personaje.nombre)}
                >
                <img
                  className="agrandar"
                  src={personaje.imagen}
                  alt={personaje.nombre}
                  onClick={() => handleImagenClick(personaje.imagen)}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',  // Hace que la imagen sea un círculo
                    border: '2px solid aliceblue', // Borde alrededor de la imagen
                  }}
                />
               </OverlayTrigger>
       
          </div>
          );
          })
          ) : (
          // Si personajesSaga no es un array válido, mostrar mensaje de error
          <div>No se ha encontrado la lista de personajes o los datos son incorrectos.</div>
          )}
          </div>
          </div>
          
          </Modal.Title>
        
        
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: 'black', color: 'white' }}>
        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black', padding: '20px', borderRadius: '10px' }}>
            <img
              src={imagensaga}
              alt="Imagen de la saga"
              style={{
                width: '20em',
                height: '20em',
                borderRadius: '15px',
                border: '3px solid red',
                marginRight: '20px',
              }}
            />

            <div style={{ flexGrow: 1 }}>
              <div style={{ width: '100%' }}>
                <textarea
                  placeholder="Ingresa descripcion de saga"
                  value={presentacionSaga}
                  onChange={(e) => setPresentacionSaga(e.target.value)}
                  style={{
                    width: '100%',
                    height: '15.5em',
                    boxSizing: 'border-box',
                    padding: '0.5em',
                    backgroundColor: 'black',
                    color: 'yellow',
                  }}
                />
              </div>

    <div style={{ display: "flex", flexDirection: "row", gap: "1em", marginTop: "2em", justifyContent: "flex-end" }}>
      <Button variant="outline-primary" onClick={guardarCambiosSaga}>Guardar cambios</Button>
      <Button variant="outline-danger" onClick={eliminarSaga}>Eliminar Saga</Button>
    </div>
  </div>
        </div>

        <div
  className="container"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "black", // Fondo negro del contenedor principal
    color: "aliceblue", // Color del texto predeterminado
  }}
>
 





 
  {/* Input de búsqueda */}
  <input
    type="text"
    value={nombreBuscado}
    onChange={handleChangeNombreBuscado}
    placeholder="Agregar personaje a Saga"
    style={{
      marginBottom: "1em",
      width: "20em",
      
      border: "2px solid aliceblue",
      borderRadius: "5px",
      outline: "none",
      fontSize: "1em",
      textAlign:"center",
      backgroundColor: "black", // Fondo negro del input
      color: "aliceblue", // Texto blanco
    }}
  />

  {/* Resultados de búsqueda */}
  <div style={{ width: "100%", maxWidth: "800px" }}>
    {nombreBuscado && resultadosBusqueda.length > 0 ? (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "3px",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        {resultadosBusqueda.map((personaje) => (
          <div
            key={personaje.idpersonaje}
            style={{
              textAlign: "center",
              
              backgroundColor: "black", // Fondo negro de la tarjeta
              color: "aliceblue", // Texto claro
            }}
          >
            <img
              className="agrandar"
              src={personaje.imagen}
              alt={personaje.nombre}
              style={{
                width: "6em",
                height: "6em",
                borderRadius: "50%",
                marginBottom: "10px",
                border: "2px solid aliceblue", // Borde blanco alrededor de la imagen
              }}
              onClick={() => agregarPjSaga(personaje.idpersonaje,idsaga)} // Usar una función anónima
            />
            <p
              style={{
                margin: "0",
                fontWeight: "bold",
                fontSize: "14px",
                color: "yellow",
              }}
            >
              {personaje.nombre}
            </p>
          </div>
        ))}
      </div>
    ) : (
      nombreBuscado && (
        <p style={{ textAlign: "center", color: "aliceblue", marginTop: "20px" }}>
          No se encontraron personajes.
        </p>
      )
    )}
  </div>
</div>











          {/* Crear sección */}
          





          <div className="container" style={{display:"flex", flexDirection:"row", gap:"1em",transform:"scale(0.9"}}>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={imagenSeccion || '/imagenBase.jpeg'}
                alt=""
                className='imagenSaga'
              />
              <Button variant="outline-warning" onClick={() => document.getElementById('imagenSeccion').click()} style={{ marginTop: '10px' }}>
                Seleccionar Imagen
              </Button>
              <input
                type="file"
                id="imagenSeccion"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <input
                type="text"
                placeholder="ingresa el titulo"
                value={tituloSeccion}
                onChange={(e) => setTituloSeccion(e.target.value)}
                required
                style={{ width: '100%', marginBottom: '5px', padding: '0.5em', borderRadius: '5px', backgroundColor: "black", color: "yellow" }}
              />
              <textarea
                id="frase"
                placeholder="Ingresa descripcion de saga"
                value={presentacionSeccion}
                onChange={(e) => setPresentacionSeccion(e.target.value)}
                required
                style={{ width: '100%', height: "15.5em", boxSizing: 'border-box', padding: "0.5em", backgroundColor: "black", color: "yellow" }}
              />
              <div style={{display:"flex", justifyContent: "flex-end" }}>
              <Button variant="outline-primary" onClick={crearNewSeccion} style={{ marginTop: '10px', width: '10em' }}>
                    Crear Seccion
              </Button>

              </div>

            

            </div>

           </div>

















           {secciones.map((seccion, index) => (
  <div key={index} style={{ marginTop: '20px' }}>
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1em', marginBottom: '20px' }}>
      {/* Imagen de la sección */}
      <img
        src={seccion.imagen || '/imagenBase.jpeg'}
        alt="Previsualización"
        style={{ width: '20em', height: '20em', objectFit: 'cover' }}
      />

      {/* Inputs para editar título y presentación */}
      <div style={{ flexGrow: 1 }}>
        {/* Input para editar el título */}
        <input
          type="text"
          value={seccion.titulo}
          onChange={(e) => handleInputChange(e, index, 'titulo')}
          placeholder="Editar Título"
          style={{ width: '100%', marginBottom: '10px', padding: '0.5em', backgroundColor: 'black', color: 'yellow' }}
        />

        {/* Textarea para editar la presentación */}
        <textarea
          value={seccion.presentacion}
          onChange={(e) => handleInputChange(e, index, 'presentacion')}
          placeholder="Editar Presentación"
          style={{ width: '100%', height: '10em', padding: '0.5em', backgroundColor: 'black', color: 'yellow' }}
        />

        {/* Botón para guardar los cambios */}
        <Button
          variant="outline-primary"
          onClick={() => guardarCambiosSeccion(index)}
          style={{ marginTop: '10px' }}
        >
          Guardar Cambios
        </Button>

        <Button
          variant="outline-danger"
          onClick={() => eliminarSeccion(index)}
          style={{ marginTop: '10px' }}
        >
          eliminar Seccion
        </Button>
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

