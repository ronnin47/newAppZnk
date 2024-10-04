import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export const Saberes = ({ saberes, setSaberes }) => {
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
      frase: frase,
      imagen: imagen,
    };

    try {
      //const response = await axios.post('http://localhost:4000/insertSaber', nuevoSaber, {
        const response = await axios.post('https://znk.onrender.com/insertSaber', nuevoSaber, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Respuesta de la API:", response);

      if (response.data) {
        const { idsaber, frase, imagensaber } = response.data;

        if (frase && imagensaber) {
          // Agrega el nuevo saber al estado
          setSaberes((prevSaberes) => [
            ...prevSaberes,
            {
              idsaber: idsaber,
              frase: frase || "desconocida",
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
      frase: frase,
      imagen: imagen,
    };

    try {

      //const response = await axios.put('http://localhost:4000/updateSaber', updatedSaber, {
        const response = await axios.put('https://znk.onrender.com/updateSaber', updatedSaber, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Respuesta de la API al actualizar:", response);

      if (response.data) {
        // Actualiza el saber en el estado
        setSaberes((prevSaberes) => 
          prevSaberes.map((saber) =>
            saber.idsaber === selectedSaberId
              ? { ...saber, frase: response.data.frase, imagensaber: response.data.imagensaber }
              : saber
          )
        );

        // Reinicia los campos de entrada
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

  const [deletedSaberId, setDeletedSaberId] = useState(null); // Estado para ID de saberes eliminados

  // useEffect para actualizar el estado cuando se elimina un saber
  useEffect(() => {
    if (deletedSaberId) {
      setSaberes((prevSaberes) => prevSaberes.filter((saber) => saber.idsaber !== deletedSaberId));
      console.log("Lo que queda en el ARRAY SABERES", saberes.filter((saber) => saber.idsaber !== deletedSaberId));
      setDeletedSaberId(null); // Reinicia el estado de ID eliminado
    }
  }, [deletedSaberId, setSaberes, saberes]); // Agregar 'saberes' como dependencia

  const deleteSaber = async (id) => {
    console.log("ID DEL SABER:", id);
    const saberExists = saberes.some(saber => saber.idsaber === id);

    if (!saberExists) {
      console.error(`No se puede eliminar: el saber con ID ${id} no existe`);
      return;
    }
    
    try {
      const response = await axios.delete(`https://znk.onrender.com/deleteSaber/${id}`);
      //const response = await axios.delete(`http://localhost:4000/deleteSaber/${id}`);
      
      if (response.status === 200) { // Verificar que la respuesta fue exitosa
        console.log("Respuesta de la API al eliminar:", response.data);
        // Establecer el ID del saber eliminado para que useEffect lo procese
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

  useEffect(() => {
    console.log("Saberes al cargar el componente:", saberes);
  }, [saberes]);

  return (
    <>
      <div className='container' style={{ marginBottom: '2em', transform: "scale(0.9)" }}>
      {saberes.length > 0 ? (
  saberes.map((saber) => {
    // Comprobar si 'saber' tiene los campos esperados y renderizar un valor por defecto si no existen
    const fraseRenderizada = saber.frase || "Frase desconocida";
    const imagenRenderizada = saber.imagensaber || "/imagenBase.jpeg";

    return (
      <div
        key={saber.idsaber || Math.random()} // Usa 'idsaber' si está disponible, de lo contrario usa una clave aleatoria
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1em',
          padding: '1em',
          border: "4px solid aliceblue",
          borderRadius: "15px"
        }}
      >
        <div style={{ marginRight: '1em' }}>
          <img
            src={imagenRenderizada}
            alt="Imagen del saber"
            className='imagenFlotante'
          />
        </div>
        <p style={{ color: "yellow", marginLeft: "2em" }}>{fraseRenderizada}</p>
        <Button
          variant="outline-info"
          onClick={() => {
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
    );
  })
) : (
  <p>No hay saberes disponibles.</p>
)}


<div style={{ display: 'flex', flexDirection: 'row', gap: '1em', width: '100%', padding: '3em', border:"4px solid aliceblue", borderRadius:"15px"}}>
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
          <textarea
            id="frase"
            placeholder="Ingresa el saber del juego"
            value={frase}
            onChange={(e) => setFrase(e.target.value)}
            required
            style={{ width: '100%', height:"8.5em", boxSizing: 'border-box', padding:"1em", backgroundColor:"black", color:"yellow" }}
          />
          <div style={{display:"flex", flexDirection:"row", gap:"1em"}}>
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