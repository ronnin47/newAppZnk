import React from 'react';
import { Modal, Button } from 'react-bootstrap';



export const ModalHorizontal = ({ idGrupoSeleccionado,eliminarPersonaje, show, onHide, idpersonaje, coleccionPersonajes, fullscreen = true }) => {
  

  // Buscar el personaje seleccionado por idpersonaje
  const personaje = coleccionPersonajes.find(p => p.idpersonaje === idpersonaje);

  // Si no se encuentra el personaje, no mostrar el modal (o puedes mostrar un mensaje de error)
  if (!personaje) {
    return null;
  }



  console.log("Id grupo a eliminar",idGrupoSeleccionado);

  return (
    <Modal
      show={show}
      fullscreen={fullscreen}
      onHide={onHide}
      centered
      className="bg-dark text-light" // Aplicar el tema oscuro
    >
 <Modal.Header closeButton className="bg-dark text-light" style={{ display: "flex", alignItems: "center" }}>
    <img 
        src={personaje.imagen} 
        alt={personaje.nombre} 
        className='grupo-card-image' 
        style={{ width: "60px", height: "60px", marginRight: "1em" }} 
    />
    
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
    
        <div style={{ textAlign: "center", marginTop: "0.5em" }}>
        <p style={{ color: "orange", fontSize: "1.5em", margin: "0" }}>{personaje.nombre}</p>
            <p style={{ fontFamily: "cursive", color: "yellow", margin: "0" }}>"{personaje.conviccion}"</p>
        </div>
    </div>

    <img 
        src={personaje.imagen} 
        alt={personaje.nombre} 
        className='grupo-card-image' 
        style={{ width: "60px", height: "60px", marginRight: "1em" }} 
    />
</Modal.Header>
      <Modal.Body className="bg-dark text-light">

      <div className='bordeRev'  style={{ display: "flex", flexDirection: "row", gap: "2em", alignItems: "center", textAlign: "left" }}>
         
            <p style={{ fontSize: "1em", color: "aliceblue", margin: "0" }}>Dominio: {personaje.dominio}</p>
            <p style={{ fontSize: "1em", color: "aliceblue", margin: "0" }}>Naturaleza: {personaje.naturaleza}</p>
            <p style={{ fontSize: "1em", margin: "0" }}>Vida: {personaje.vidaActual} /{(personaje.ki + personaje.fortaleza) * (personaje.positiva + personaje.negativa)}</p>
            <p style={{ fontSize: "1em", margin: "0" }}>Ki: {personaje.kiActual}/{personaje.ki}</p>
            <p style={{ fontSize: "1em", margin: "0" }}>Ken: {personaje.kenActual} /{personaje.ken}</p>
        </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
    

    <div className='bordeRev'  style={{display:"flex", flexDirection:"row", gap:"1em"}}>
    <p>Fuerza: {personaje.fuerza}</p>
    <p>Fortaleza: {personaje.fortaleza}</p>
    <p>Destreza: {personaje.destreza}</p>
    <p>Agilidad: {personaje.agilidad}</p>
    <p>Sentidos: {personaje.sentidos}</p>
    <p>Sabiduría: {personaje.sabiduria}</p>
    <p>Presencia: {personaje.presencia}</p>
    <p>Principio: {personaje.principio}</p>
   </div>


    <div className='bordeRev' style={{display:"flex", flexDirection:"row", gap:"1em"}}>
      <p>Consumo ki: {personaje.consumision}</p>
      <p>iniciativa: {personaje.iniciativa}</p>
      <p>Fases +: {personaje.positiva}</p>
      <p>Fases -: {personaje.negativa}</p>
      <p>Cicatrices: {personaje.cicatriz}</p>

    </div>
  
    
    <div className='bordeRev'  style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5em" }}>
  <p style={{ margin: "0" }}>Academisismo: {personaje.academisismo}</p>
  <p style={{ margin: "0" }}>Alerta: {personaje.alerta}</p>
  <p style={{ margin: "0" }}>Atletismo: {personaje.atletismo}</p>
  <p style={{ margin: "0" }}>Con. Bakemono: {personaje.conBakemono}</p>
  <p style={{ margin: "0" }}>Mentir: {personaje.mentir}</p>
  <p style={{ margin: "0" }}>Pilotear: {personaje.pilotear}</p>
  <p style={{ margin: "0" }}>Artes Marciales: {personaje.artesMarciales}</p>
  <p style={{ margin: "0" }}>Medicina: {personaje.medicina}</p>
  <p style={{ margin: "0" }}>Con. Obj. Mágicos: {personaje.conObjMagicos}</p>
  <p style={{ margin: "0" }}>Sigilo: {personaje.sigilo}</p>
  <p style={{ margin: "0" }}>Con. Esferas: {personaje.conEsferas}</p>
  <p style={{ margin: "0" }}>Con. Leyendas: {personaje.conLeyendas}</p>
  <p style={{ margin: "0" }}>Forja: {personaje.forja}</p>
  <p style={{ margin: "0" }}>Con Demonio: {personaje.conDemonio}</p>
  <p style={{ margin: "0" }}>Con Espiritual: {personaje.conEspiritual}</p>
  <p style={{ margin: "0" }}>Manejo Blaster: {personaje.manejoBlaster}</p>
  <p style={{ margin: "0" }}>Manejo Sombras: {personaje.manejoSombras}</p>
  <p style={{ margin: "0" }}>Trato Bakemono: {personaje.tratoBakemono}</p>
  <p style={{ margin: "0" }}>Con Hechicería: {personaje.conHechiceria}</p>
  <p style={{ margin: "0" }}>Med. Vital: {personaje.medVital}</p>
  <p style={{ margin: "0" }}>Med. Espiritual: {personaje.medEspiritual}</p>
  <p style={{ margin: "0" }}>Rayo: {personaje.rayo}</p>
  <p style={{ margin: "0" }}>Fuego: {personaje.fuego}</p>
  <p style={{ margin: "0" }}>Frío: {personaje.frio}</p>
  <p style={{ margin: "0" }}>Veneno: {personaje.veneno}</p>
  <p style={{ margin: "0" }}>Corte: {personaje.corte}</p>
  <p style={{ margin: "0" }}>Energía: {personaje.energia}</p>
  <p style={{ margin: "0" }}>{personaje.apCombate || "Aptitud combate"}: {personaje.valCombate}</p>
  <p style={{ margin: "0" }}>{personaje.apCombate2 || "Aptitud combate"}: {personaje.valCombate2}</p>
  <p style={{ margin: "0" }}>{personaje.add1 || "Aptitud nueva"}: {personaje.valAdd1}</p>
  <p style={{ margin: "0" }}>{personaje.add2 || "Aptitud nueva"}: {personaje.valAdd2}</p>
  <p style={{ margin: "0" }}>{personaje.add3 || "Aptitud nueva"}: {personaje.valAdd3}</p>
  <p style={{ margin: "0" }}>{personaje.add4 || "Aptitud nueva"}: {personaje.valAdd4}</p>
</div>
    
  </div>
        

      </Modal.Body>
      <Modal.Footer className="bg-dark text-light">
      <Button variant="outline-warning" onClick={() => eliminarPersonaje(idGrupoSeleccionado, idpersonaje)}>Quitar pj de grupo</Button>
        
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};


