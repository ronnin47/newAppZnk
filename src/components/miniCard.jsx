import React from 'react';
import Card from 'react-bootstrap/Card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import 'animate.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';


export const MiniCard = ({ setVivoMuerto, vivoMuerto,setActiveKey,id, nombre,dominio, imagen, setPjSeleccionado, pjSeleccionado }) => {

  const [animacionActiva, setAnimacionActiva] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  }=useSortable({
    id:id
  })



  const seleccionar = () => {
    setPjSeleccionado(id)
    setActiveKey("2")
    setAnimacionActiva(true);
    setTimeout(() => {
      setAnimacionActiva(false); 
    }, 1000);     
  }

  const cardClassName = id === pjSeleccionado ? "selected-card" : "";

  const style= {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    
    <div className='col1' style={{padding:"2em"}}>    
       <div className='container' {...attributes} {...listeners} ref={setNodeRef} style={style}>
          <div className={`animate__animated ${animacionActiva ? 'animate__flip' : ''}`}>
              <Card  style={{  transform: "rotate(4deg)",width: '8em', border: "8px solid black", boxShadow: id === pjSeleccionado 
              ? "0 4px 20px rgba(0, 255, 0, 1), 0 0 40px rgba(0, 255, 0, 0.8)"
              : "0 4px 10px rgba(255, 255, 255, 0.8)",
              transition: "box-shadow 0.3s ease",}} 
      
      className={cardClassName}>
              <Card.Img   variant="top" src={imagen} style={{ maxWidth: "100%", maxHeight: "100%",   opacity: !vivoMuerto && id === pjSeleccionado ? 0.3 : 1}} />
              <Card.Body 
                    
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: "linear-gradient(to right, #FDF5E6, #FFDAB9, #FFE4B5, #FFDAB9, #FDF5E6)",
                minHeight: "100%",
                width: "100%",
                height: "100%",
                border: "3px solid orange"
              }}>
              
                <Card.Title style={{ textAlign: "center" ,margin:"0px"}}>{nombre}</Card.Title>
              
                <p style={{ fontFamily: "impact", textAlign: "center" , margin:"0", fontSize:"0.9rem"}}>{dominio}</p>
              
              </Card.Body>
              </Card>
          </div>
      </div>
     <Button variant="outline-warning" onClick={seleccionar} style={{transform:"scale(0.7)" , marginTop:"0px"}} onMouseEnter={(e) => { e.target.style.boxShadow= "0 0 20px 5px rgba(0, 255, 0, 0.8)"  }}
      onMouseLeave={(e) => { e.target.style.boxShadow = "none" }}>Seleccionar Pj</Button>
     
    </div>
  )
}


