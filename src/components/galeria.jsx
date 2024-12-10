import React, { useEffect, useState } from "react";


/*
vivoMuerto={vivoMuerto}
                    setVivoMuerto={setVivoMuerto}
                    setActiveKey={setActiveKey}
                    personajes={personajes}
                    setPersonajes={setPersonajes}
                    key={pj.idpersonaje}
                    id={pj.idpersonaje}
                    nombre={pj.nombre}
                    dominio={pj.dominio}
                    imagen={pj.imagen}
                    setPjSeleccionado={setPjSeleccionado}
                    pjSeleccionado={pjSeleccionado}
*/


export const Gallery = ({ personajes,setPersonajes,pjSeleccionado,setPjSeleccionado,setActiveKey, coleccionPersonajes }) => {

console.log("****PERSONAJES: ",personajes)

  const [selectedIndex, setSelectedIndex] = useState(0);

  //const imagenesPersonajes = personajes.map(personaje => personaje.imagen);

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % personajes.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + personajes.length) % personajes.length);
  };

  useEffect(()=>{
    console.log("este es el personaje selecionado: ",selectedIndex)

  },[selectedIndex])




  const seleccionado=(idpersonaje)=>{
   console.log("el id del personaje selecionado es: ",idpersonaje)
   setPjSeleccionado(idpersonaje)
   setActiveKey("2")
//   setAnimacionActiva(true);
  /* setTimeout(() => {
     setAnimacionActiva(false); 
   }, 1000);*/     
  }


  return (
    <div className="gallery-container">
      <button onClick={handlePrev} className="gallery-btn prev">Prev</button>

      <div className="gallery">
        {personajes.map((pj, index) => (
          <div
            key={index}
            className={`gallery-item ${index === selectedIndex ? "selected" : ""}`}
            style={{
              transform: `rotateY(${(index - selectedIndex) * 45}deg) translateZ(300px)`,
              zIndex: index === selectedIndex ? 1 : 0,
            }}
            /*onClick={() => setSelectedIndex(index)}*/
            onClick={()=>seleccionado(pj.idpersonaje)}
          >
            <img src={pj.imagen} alt={`Image ${index}`} className="gallery-image"/>
            <p style={{color:"greenyellow", fontFamily:"cursive",textAlign:"center",marginTop:"10px"}}>{pj.nombre}</p>
           
          </div>
        ))}
      </div>

      <button onClick={handleNext} className="gallery-btn next">Next</button>
    </div>
  );
};