import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export const Saberes = ({ saberes, setSaberes }) => {
  const [titulo, setTitulo] = useState('');
  const [frase, setFrase] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);
  const [selectedSaberId, setSelectedSaberId] = useState(null);

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

  const insertSaber = async () => {
    const nuevoSaber = {
      titulo:titulo,
      frase: frase,
      imagen: imagen,
    };

    try {
        const response = await axios.post('http://localhost:4000/insertSaber', nuevoSaber, {
        //const response = await axios.post('https://zepironokioku.onrender.com/insertSaber', nuevoSaber, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      if (response.data) {
        const { idsaber, titulo, frase, imagensaber } = response.data;

        if (titulo && frase && imagensaber) {
    
          setSaberes((prevSaberes) => [
            ...prevSaberes,
            {
              idsaber: idsaber,
              titulo: titulo || "desconocido",
              frase: frase || "desconocido",
              imagensaber: imagensaber,
            },
          ]);
        } else {
          console.error("La respuesta no tiene las propiedades 'frase' o 'imagensaber'", response.data);
        }
      } else {
        console.error("La respuesta no tiene el formato esperado", response.data);
      }

      // Reinicia los campos de entrada
      setTitulo("");
      setFrase('');
      setImagen(null);
      setImagenFile(null);
    } catch (error) {
      console.error('Error al enviar el saber:', error);
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
    }
  };

  const updateSaber = async () => {
    const updatedSaber = {
      id: selectedSaberId,
      titulo:titulo,
      frase: frase,
      imagen: imagen,
    };

    try {

        const response = await axios.put('http://localhost:4000/updateSaber', updatedSaber, {
        //const response = await axios.put('https://zepironokioku.onrender.com/updateSaber', updatedSaber, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      if (response.data) {
        setSaberes((prevSaberes) => 
          prevSaberes.map((saber) =>
            saber.idsaber === selectedSaberId
              ? { ...saber, titulo: response.data.titulo, frase: response.data.frase, imagensaber: response.data.imagensaber }
              : saber
          )
        );

        setTitulo("");
        setFrase('');
        setImagen(null);
        setImagenFile(null);
        setSelectedSaberId(null);
      }
    } catch (error) {
      console.error('Error al actualizar el saber:', error);
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
    }
  };

  const [deletedSaberId, setDeletedSaberId] = useState(null); 

  useEffect(() => {
    if (deletedSaberId) {
      setSaberes((prevSaberes) => prevSaberes.filter((saber) => saber.idsaber !== deletedSaberId));
      setDeletedSaberId(null); 
    }
  }, [deletedSaberId, setSaberes, saberes]); 

  const deleteSaber = async (id) => {
    const saberExists = saberes.some(saber => saber.idsaber === id);

    if (!saberExists) {
      console.error(`No se puede eliminar: el saber con ID ${id} no existe`);
      return;
    }
    
    try {
      //const response = await axios.delete(`https://zepironokioku.onrender.com/deleteSaber/${id}`);
      const response = await axios.delete(`http://localhost:4000/deleteSaber/${id}`);
      
      if (response.status === 200) { 
          setDeletedSaberId(id);
      } else {
        console.error('Error al eliminar el saber, respuesta no exitosa', response);
      }
      
    } catch (error) {
      console.error('Error al eliminar el saber:', error);
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
    }
  };

  return (
    <>
      <div className='container' style={{ marginBottom: '2em', transform: "scale(0.9)" }}>
        {saberes.length > 0 ? (
          saberes.map((saber) => {
            // Comprobar si 'saber' tiene los campos esperados y renderizar un valor por defecto si no existen
            const tituloRenderizada = saber.titulo || "Titulo desconocido";
            const fraseRenderizada = saber.frase || "Frase desconocida";
            const imagenRenderizada = saber.imagensaber || "/imagenBase.jpeg";
  
            return (
              <div
                key={saber.idsaber || Math.random()}
                style={{
                  position: 'relative', // Hacemos el contenedor relativo
                  marginBottom: '1em',
                  padding: '1em',
                  border: "4px solid aliceblue",
                  borderRadius: "15px",
                }}
              >
                {/* Título del saber */}
                <p style={{
                  position: 'absolute',
                  top: '-15px', // Ajusta la posición vertical del título
                  left: '20px', // Ajusta la posición horizontal del título
                  backgroundColor: 'black', // Fondo del título para que resalte
                  color: 'yellow',
                  padding: '0 10px', // Espaciado interno para que el texto no esté pegado a los bordes
                  fontWeight: 'bold',
                  fontSize: '1.1em'
                }}>
                  {tituloRenderizada}
                </p>
  
                {/* Contenido del saber */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1em' }}>
                    <img
                      src={imagenRenderizada}
                      alt="Imagen del saber"
                      className='imagenFlotante'
                    />
                  </div>
                  <div>
                    <p style={{ color: "yellow", marginLeft: "2em" }}>{fraseRenderizada}</p>
                  </div>
                  <Button
                    variant="outline-info"
                    onClick={() => {
                      setTitulo(tituloRenderizada);
                      setFrase(fraseRenderizada);
                      setImagen(imagenRenderizada);
                      setSelectedSaberId(saber.idsaber);
                    }}
                    style={{ marginLeft: 'auto' }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteSaber(saber.idsaber)}
                    style={{ marginLeft: '1em' }}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay saberes disponibles.</p>
        )}
  
        {/* Formulario para agregar o actualizar saber */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1em',
          width: '100%',
          padding: '3em',
          border: "4px solid aliceblue",
          borderRadius: "15px",
          position: 'relative' // Hacemos este contenedor relativo también
        }}>
          {/* Título en la parte superior del borde */}
          <p style={{
            position: 'absolute',
            top: '-15px', // Ajusta la posición vertical
            left: '20px', // Ajusta la posición horizontal
            backgroundColor: 'black',
            color: 'yellow',
            padding: '0 10px',
            fontWeight: 'bold',
            fontSize: '1.1em'
          }}>
            {titulo || 'Ingresar Título'}
          </p>
  
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={imagen || '/imagenBase.jpeg'}
              alt="Previsualización"
              className='imagenFlotante'
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
              placeholder="Ingresa el saber del juego"
              value={frase}
              onChange={(e) => setFrase(e.target.value)}
              required
              style={{ width: '100%', height: "5.5em", boxSizing: 'border-box', padding: "0.5em", backgroundColor: "black", color: "yellow" }}
            />
            <div style={{ display: "flex", flexDirection: "row", gap: "1em" }}>
              <Button variant="outline-success" onClick={insertSaber} style={{ marginTop: '10px', width: '10em' }}>
                Agregar Saber
              </Button>
              {selectedSaberId && (
                <Button variant="outline-primary" onClick={updateSaber} style={{ marginTop: '10px', width: '10em' }}>
                  Actualizar Saber
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};