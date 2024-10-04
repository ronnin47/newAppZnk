import React, { useState, useEffect } from 'react';

export const Flotante = ({ saberes }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [relPosition, setRelPosition] = useState({ x: 0, y: 0 });
  const [contentIndex, setContentIndex] = useState(0);



  const handleMouseDown = (e) => {
    setDragging(true);
    setRelPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      e.preventDefault(); // Evitar comportamientos no deseados mientras se arrastra
      setPosition({
        x: e.clientX - relPosition.x,
        y: e.clientY - relPosition.y,
      });
    }
  };

  useEffect(() => {
    const initialX = window.innerWidth - 160; // Ajusta según el ancho del componente
    const initialY = 20; // Distancia desde la parte superior
    setPosition({ x: initialX, y: initialY });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (saberes.length > 0) { // Solo si hay saberes disponibles
        const randomIndex = Math.floor(Math.random() * saberes.length);
        setContentIndex(randomIndex);
      }
    }, 30000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonte el componente
  }, [saberes.length]);

  return (
    <div
      className="floating-component"
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `auto`,
        right: `${window.innerWidth - position.x}px`, // Para asegurar que esté alineado a la derecha
        cursor: dragging ? 'grabbing' : 'grab',
        
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {saberes.length > 0 ? ( // Comprobar si hay saberes
          <>
            <p style={{ marginLeft: '1em', textAlign: 'center' }}>{saberes[contentIndex].frase}</p>


            {saberes[contentIndex].imagensaber ? ( // Comprobar si hay una imagen
              <img
                src={saberes[contentIndex].imagensaber}
                alt="Imagen aleatoria"
                className="imagenFlotante"
               
              />
            ) : (
              <img
                src="/imagenBase.jpeg" // Imagen predeterminada si no hay imagen
                alt="Imagen por defecto"
                className="imagenFlotante"
              
              />
            )}
          </>
        ) : (
          <>
            <p style={{ marginLeft: '1em', textAlign: 'center' }}>No hay saberes disponibles.</p>
            <img
              src="/imagenBase.jpeg"
              alt="Imagen por defecto"
              className="imagenFlotante"
            
            />
          </>
        )}
      </div>
    </div>
  );
};