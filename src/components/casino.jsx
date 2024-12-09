import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


export const Casino = ({coleccionPersonajes}) => {

  const imagenesPersonajes = coleccionPersonajes.map(personaje => personaje.imagen);
  const [result, setResult] = useState([null, null, null]);  // Resultado de las 3 imágenes
  const [spinning, setSpinning] = useState(false); // Estado de la animación

  // Función que genera imágenes aleatorias para las 3 posiciones
  const startSpin = () => {
    if (spinning) return;  // No permitir iniciar otro giro mientras está en curso

    setSpinning(true);

    // Función que se ejecutará después de cierto tiempo
    const interval = setInterval(() => {
      const randomImages = [
        imagenesPersonajes[Math.floor(Math.random() * imagenesPersonajes.length)],
        imagenesPersonajes[Math.floor(Math.random() * imagenesPersonajes.length)],
        imagenesPersonajes[Math.floor(Math.random() * imagenesPersonajes.length)]
      ];
      setResult(randomImages);
    }, 100); // Actualizar cada 100ms para el efecto de giro

    // Detener el giro después de 2 segundos (2000ms)
    setTimeout(() => {
      clearInterval(interval);  // Detener la animación
      setSpinning(false);  // Finalizar el estado de giro
    }, 2000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        display: "flex", 
        justifyContent: "center", 
        gap: "1em", 
        marginBottom: "1em"
      }}>
        {/* Mostrar las 3 imágenes de la máquina */}
        {result.map((image, index) => (
          <img 
            key={index} 
            src={image || "./defaultImage.jpg"} 
            alt={`slot-${index}`} 
            style={{
              width: "150px", 
              height: "150px", 
              border: "2px solid #ccc", 
              borderRadius: "8px", 
              transition: "transform 0.2s ease-in-out",
              transform: spinning ? "scale(1.1)" : "scale(1)"
            }} 
          />
        ))}
      </div>
      <Button 
       className="btn btn-outline-warning" 
        onClick={startSpin} 
    
      >
        Comenzar
      </Button>
    </div>
  );
};