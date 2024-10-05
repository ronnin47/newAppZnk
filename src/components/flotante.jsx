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
      e.preventDefault();
      setPosition({
        x: e.clientX - relPosition.x,
        y: e.clientY - relPosition.y,
      });
    }
  };

  useEffect(() => {
    const initialX = window.innerWidth - 160;
    const initialY = 20;
    setPosition({ x: initialX, y: initialY });
  }, []);

  const changeContentRandomly = () => {
    if (saberes.length > 0) {
      const randomIndex = Math.floor(Math.random() * saberes.length);
      setContentIndex(randomIndex);
    }
  };

  // Cambia el contenido cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      changeContentRandomly();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [saberes.length]);

  return (
    <div
      className="floating-component"
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: 'auto',
        right: `${window.innerWidth - position.x}px`, // Asegurar alineado a la derecha
        cursor: dragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={changeContentRandomly} // Cambia el contenido cuando haces clic en el componente
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {saberes.length > 0 ? (
          <>
            <p style={{ marginLeft: '1em', textAlign: 'center' }}>{saberes[contentIndex].frase}</p>
            {saberes[contentIndex].imagensaber ? (
              <img
                src={saberes[contentIndex].imagensaber}
                alt="Imagen aleatoria"
                className="imagenFlotante"
              />
            ) : (
              <img
                src="/imagenBase.jpeg"
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