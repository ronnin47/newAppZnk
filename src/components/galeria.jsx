import React, { useEffect, useState } from "react";


export const Gallery = ({ personajes,setPersonajes,pjSeleccionado,setPjSeleccionado,setActiveKey, coleccionPersonajes }) => {

//console.log("****PERSONAJES: ",personajes)

  const [selectedIndex, setSelectedIndex] = useState(0);

  //const imagenesPersonajes = personajes.map(personaje => personaje.imagen);

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % personajes.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + personajes.length) % personajes.length);
  };
/*
  useEffect(()=>{
    console.log("este es el personaje selecionado: ",selectedIndex)

  },[selectedIndex])
*/



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
    <div className="container gallery-container" style={{marginTop:"0px"}}>
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
    
          >
            <img  onClick={()=>seleccionado(pj.idpersonaje)} 
            
            style={{
              cursor: "pointer",
              boxShadow: pj.idpersonaje === pjSeleccionado ? "0px 0px 15px 5px #FFFF00" : "none", // Box-shadow blanco para el seleccionado
              transition: "box-shadow 0.3s ease", // Animación suave para el cambio de box-shadow
            }}

            src={pj.imagen} alt={`Image ${index}`} className="gallery-image"/>
            {index === selectedIndex ? (<p style={{color:"yellow", fontFamily:"cursive",textAlign:"center",marginTop:"10px"}}>{pj.nombre}</p>):(<></>)}
           
          </div>
        ))}
      </div>

      <button onClick={handleNext} className="gallery-btn next">Next</button>
    </div>
  );
};