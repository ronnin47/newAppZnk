import React, { useState, useEffect } from 'react';

export const PjFlotante = ({ idpersonaje }) => {
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
  
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <h3>Flotante de {idpersonaje}</h3> 

       
   
      </div>
    </div>
  );
};