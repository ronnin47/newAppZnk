
import React, { useState } from 'react';
import axios from 'axios';

export const PruebaImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  // Manejar la selección de la imagen
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Crear una vista previa de la imagen
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
  
      try {
        const response = await axios.post('http://localhost:4000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          setUploadStatus('Imagen subida exitosamente');
          
          // Verifica la respuesta del servidor
          console.log('Respuesta completa del servidor:', response.data);
  
          // Revisa si 'filename' está en 'response.data'
          if (response.data.filename) {
            setUploadedImageUrl(`http://localhost:4000/uploads/${response.data.filename}`);
          } else {
            console.error('No se recibió el nombre del archivo en la respuesta del servidor');
          }
        } else {
          setUploadStatus('Error al subir la imagen');
        }
      } catch (error) {
        setUploadStatus('Error en la solicitud');
        console.error('Error al enviar la imagen:', error);
      }
    }
  };

  return (
    <div>
      <h2>Cargar Imagen</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Subir Imagen</button>
      </form>

      {/* Vista previa de la imagen seleccionada */}
      {preview && (
        <div>
          <h3>Vista Previa:</h3>
          <img src={preview} alt="Vista previa" style={{ width: '200px' }} />
        </div>
      )}

      {/* Mensaje de estado de la carga */}
      {uploadStatus && <p>{uploadStatus}</p>}

      {/* Mostrar la imagen que fue subida */}
      {uploadedImageUrl && (
        <div>
          <h3>Imagen Subida:</h3>
          <img src={uploadedImageUrl} alt="Imagen subida" style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
};