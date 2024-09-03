import React from 'react';

export const PowerEspeciales = ({ poderesFiltrados, nombre, idpersonaje, dominio, tecEspecial }) => {
  // Variables para almacenar la información de técnicas especiales
  let técnicasEspeciales = [];

  if (Array.isArray(tecEspecial) && tecEspecial.length > 0) {
    técnicasEspeciales = tecEspecial.map((tecnica) => {
      return {
        nombre: tecnica.nombre || "desconocido",
        descripcion: tecnica.presentacion || "desconocido",
        sistema: tecnica.sistema || "desconocido"
      };
    });
  } else {
    console.log('No hay técnicas especiales disponibles.');
  }

  return (
    <div>
      <div className='tecnicasEspeciales'>
        <p style={{ color: "yellow", fontFamily:"cursive" }}>{nombre}</p>
        {técnicasEspeciales.length > 0 ? (
          técnicasEspeciales.map((tecnica, index) => (
            <div key={index} style={{marginTop:"3.5em"}}>
              <p style={{ color: "yellow" }}><strong style={{color:"orange"}}>Nombre:</strong> {tecnica.nombre}</p>
              <p style={{ color: "aliceblue" }}><strong style={{color:"orange"}}>Descripción:</strong> {tecnica.descripcion}</p>
              <p style={{ color: "aliceblue" }}><strong style={{color:"orange"}}>Sistema:</strong> {tecnica.sistema}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "aliceblue" }}>No hay técnicas especiales disponibles.</p>
        )}
      </div>
    </div>
  );
};