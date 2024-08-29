
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import 'animate.css';


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { Estrellitas } from './estrellitas';







export const ElementoVentaja = ({  itemVentaja }) => {
  if (!itemVentaja) {
    return <div>Item values no disponibles</div>;
  }

  console.log(itemVentaja)

  return (
    <div style={{ marginBottom: '5px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }}>
      <ul>
        <li><strong> </strong> {itemVentaja || "desconocido"}</li>
      </ul>
    </div>
  );
};

export const Item = ({ id, itemValues }) => {
  if (!itemValues) {
    return <div>Item values no disponibles</div>;
  }

 

  return (
    <div style={{ marginBottom: '5px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }}>
      <ul>
        <li><strong>Nombre:</strong> {itemValues.nombre || "desconocido"}</li>
        <li><strong>Cantidad:</strong> {itemValues.cantidad || "desconocida"}</li>
        <li><strong>Descripción:</strong> {itemValues.descripcion || "desconocida"}</li>
      </ul>
    </div>
  );
};


export const TecnicasDominio = ({ ID, itemValues }) => {
  if (!itemValues) {
    return <div>Item values no disponibles</div>;
  }

 

  return (
    <div style={{ marginBottom: '5px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }}>
      <ul>
        <li><strong>Dominio:</strong> {itemValues.dominio || "desconocida"}</li>
        <li><strong>Nombre:</strong> {itemValues.nombre || "desconocido"}</li>
        <li><strong>Nivel de ki:</strong> {itemValues.nivelKi || "desconocida"}</li>
        <li><strong>Descripcion:</strong> {itemValues.descripcion || "desconocida"}</li>
        <li><strong>Sistema:</strong> {itemValues.sistema || "desconocida"}</li>
        <li><strong>Coste de ki:</strong> {itemValues.costeKi || "desconocida"}</li>
        <li><strong>tiempo de invo:</strong> {itemValues.invo || "desconocida"}</li>
      </ul>
    </div>
  );
};

export const Hechizos = ({ ID, itemValues }) => {
  if (!itemValues) {
    return <div>Item values no disponibles</div>;
  }

  

  return (
    <div style={{ marginBottom: '5px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }}>
      <ul>
        <li><strong>Ryu:</strong> {itemValues.ryu || "desconocida"}</li>
        <li><strong>Nombre:</strong> {itemValues.nombre || "desconocido"}</li>
        <li><strong>Nivel de ki:</strong> {itemValues.nivelKi || "desconocida"}</li>
        <li><strong>Descripcion:</strong> {itemValues.descripcion || "desconocida"}</li>
        <li><strong>Sistema:</strong> {itemValues.sistema || "desconocida"}</li>
        <li><strong>Coste de ki:</strong> {itemValues.costeKi || "desconocida"}</li>
        <li><strong>tiempo de invo:</strong> {itemValues.invo || "desconocida"}</li>
      </ul>
    </div>
  );
};

export const TecnicasEspeciales = ({ ID, itemValues }) => {
  if (!itemValues) {
    return <div>Item values no disponibles</div>;
  }

 

  return (


<div className="container-fluid tecnicaEspecial" style={{marginTop:"1em"}}>
<input
  className="inputInventario"
  type="text"
  value={itemValues.nombre} 
  placeholder="Nombre"
  style={{fontFamily:"cursive", fontSize:"1em", color:"yellow"}}
/>
  <textarea
  className="tecnica"
  value={itemValues.presentacion}  // Mantener la referencia correcta
  placeholder="Presentacion:"  // Corregido aquí
/>
<textarea
  className="tecnica"
  value={itemValues.sistema}  // Mantener la referencia correcta
  placeholder="Sistema:"  // Corregido aquí
/>
</div>
  );
};





export const CartaNarrador = ({ 
  onClose,
  nombre,
  dominio,
  ken,
  ki,
  imagen,
  fuerza, 
  fortaleza, 
  agilidad, 
  destreza, 
  sabiduria, 
  presencia, 
  principio, 
  sentidos, 

  academisismo,
  alerta,
  atletismo,
  conBakemono,
  mentir,
  pilotear,
  artesMarciales,
  medicina,
  conObjMagicos,
  sigilo,
  conEsferas,
  conLeyendas,
  forja,

  conDemonio,
  conEspiritual,
  manejoBlaster,
  manejoSombras,
  tratoBakemono,
  conHechiceria,
  medVital,
  medEspiritual,
  rayo,
  fuego,
  frio,
  veneno,
  corte,
  energia,

  apCombate, 
  valCombate,
  apCombate2, 
  valCombate2,
  ventajas,
  inventario,
  dominios,
  hechizos,
  kenActual,
  kiActual,
  positiva,
  negativa,
  vidaActual,

  add1,
  valAdd1,
  add2,
  valAdd2,
  add3,
  valAdd3,
  add4,
  valAdd4,
  consumision,
  iniciativa,
  historia,  
  naturaleza,
  tecEspecial,
  conviccion,
  cicatriz,
}) => {

console.log("TECNICA ESPECIAL ",tecEspecial)

const [fade,setFade]=useState(false)
const [animacion,setAnimacion]=useState("")



const cerrar=()=>{
  
  setFade(true)
  //setAnimacion("animate__animated animate__flipOutY");
  setTimeout(() => {
    //setAnimacion("");
    setFade(false); 
    onClose()
  }, 700);
}

const [key, setKey] = useState('personaje');
  

return (
    <>
      <Modal show={true} onHide={cerrar} className={`${animacion}`}>

          <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
    >
      <Tab eventKey="personaje" title="Personaje" className="fondoBody">
         
       <div className={`modalus ${fade==true ? 'fadeOut' : 'fadeIn'}`}>
       <Modal.Header closeButton style={{backgroundColor:"black", color:"aliceblue"}}>
        <Modal.Title>
          <div style={{display:"flex", flexDirection:"row", gap:"2em"}}>
          <p style={{textAlign:"center",fontSize:"1em",color:"Yellow", fontFamily:"cursive"}}>{nombre}</p>
          <Estrellitas ken={ken}></Estrellitas>
         
       </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className='modalCartaPjBody' style={{backgroundColor:"black", color:"aliceblue"}}>
      <Card.Img
            variant="top"
            src={imagen}
            style={{ maxWidth: "100%", maxHeight: "100%"}}
            className='imagenCartaPj'
          />

         <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p style={{textAlign:"center"}}>Dominio: {dominio}</p>
          <p style={{textAlign:"center"}}>Ken: {ken}</p>
          <p style={{textAlign:"center"}}>Naturaleza: {naturaleza}</p>
          <p style={{textAlign:"center"}}>Conviccion: {conviccion}</p>
         </div>
        


      </Modal.Body>
      
      <Modal.Footer style={{backgroundColor:"black", color:"aliceblue"}}> 
        <Button variant="outline-danger" onClick={cerrar}>
          Cerrar
        </Button>
        
      </Modal.Footer>
        
       </div>
      </Tab>



      <Tab eventKey="caracteristicas" title="Caracteristicas" className="fondoBody">
      <div className={`modalus ${fade==true ? 'fadeOut' : 'fadeIn'}`}>
      

      <Modal.Body className='modalCartaPjBody' style={{ backgroundColor: "black", color: "aliceblue", overflow: 'auto' }}>
      <div className='saludNarrador'>
    <p style={{textAlign:"center"}}>VITALIDAD: {vidaActual}/{(fortaleza + ki) * (positiva + negativa)}</p>
    <p style={{textAlign:"center"}}>KI: {kiActual}/{ki}</p>
    <p style={{textAlign:"center"}}>KEN: {kenActual}/{ken}</p>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
    
    {/* Columna 1 */}
    <div class="filaDeCuatro">
    <p>Fuerza: {fuerza}</p>
    <p>Fortaleza: {fortaleza}</p>
    <p>Destreza: {destreza}</p>
    <p>Agilidad: {agilidad}</p>
    <p>Sentidos: {sentidos}</p>
    <p>Sabiduría: {sabiduria}</p>
    <p>Presencia: {presencia}</p>
    <p>Principio: {principio}</p>
   </div>


    <div class="filaDeCuatroMasCicatriz">
      <p>Consumision: {consumision}</p>
      <p>iniciativa: {iniciativa}</p>
      <p>Fases +: {positiva}</p>
      <p>Fases -: {negativa}</p>
      <p>Cicatrices: {cicatriz}</p>

    </div>
  
    
    <div class="filaDeTres">
     
      <p>Academisismo: {academisismo}</p>
      <p>Alerta: {alerta}</p>
      <p>Atletismo: {atletismo}</p>
      <p>Con. Bakemono: {conBakemono}</p>
      <p>Mentir: {mentir}</p>
      <p>Pilotear: {pilotear}</p>
      <p>Artes Marciales: {artesMarciales}</p>
      <p>Medicina: {medicina}</p>
      <p>Con. Obj. Mágicos: {conObjMagicos}</p>
      <p>Sigilo: {sigilo}</p>
      <p>Con. Esferas: {conEsferas}</p>
      <p>Con. Leyendas: {conLeyendas}</p>
      <p>Forja: {forja}</p>
    
    
   
      <p>Con Demonio: {conDemonio}</p>
      <p>Con Espiritual: {conEspiritual}</p>
      <p>Manejo Blaster: {manejoBlaster}</p>
      <p>Manejo Sombras: {manejoSombras}</p>
      <p>Trato Bakemono: {tratoBakemono}</p>
      <p>Con Hechicería: {conHechiceria}</p>
      <p>Med. Vital: {medVital}</p>
      <p>Med. Espiritual: {medEspiritual}</p>
      <p>Rayo: {rayo}</p>
      <p>Fuego: {fuego}</p>
      <p>Frío: {frio}</p>
      <p>Veneno: {veneno}</p>
      <p>Corte: {corte}</p>
      <p>Energía: {energia}</p>
      <p>{apCombate}: {valCombate}</p>
      <p>{apCombate2}: {valCombate2}</p>
    
     
    
  
      
      
     
      <p>{add1}:{ valAdd1}</p>
      <p>{add2}:{ valAdd2}</p>
      <p>{add3}:{ valAdd3}</p>
      <p>{add4}:{ valAdd4}</p>
    
    </div>
    
  </div>
</Modal.Body>
      <Modal.Footer style={{backgroundColor:"black", color:"aliceblue"}}> 
        <Button variant="outline-danger" onClick={cerrar}>
          Cerrar
        </Button>
        
      </Modal.Footer>
        
       </div>
      </Tab>



      <Tab eventKey="historia" title="Historia" className="fondoBody">
      <div className={`modalus ${fade==true ? 'fadeOut' : 'fadeIn'}`}>
      

      <Modal.Body className='modalCartaPjBody' style={{ backgroundColor: "black", color: "aliceblue", overflow: 'auto' }}>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
    
   
    
   
    <div style={{ flex: 1, padding: '10px', overflow: 'hidden' }}>
    
      <h3>Historia:</h3>
      <textarea className='historia'>
      {historia}
      </textarea>
    
    </div>
    
  </div>
</Modal.Body>
      <Modal.Footer style={{backgroundColor:"black", color:"aliceblue"}}> 
        <Button variant="outline-danger" onClick={cerrar}>
          Cerrar
        </Button>
        
      </Modal.Footer>
        
       </div>
      </Tab>




      <Tab eventKey="ventajas" title="Ventajas" className="fondoBody">
      <div className={`modalus ${fade==true ? 'fadeOut' : 'fadeIn'}`}>
      

      <Modal.Body className='modalCartaPjBody' style={{ backgroundColor: "black", color: "aliceblue", overflow: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
    
   
    
    
    <div style={{ flex: 1, padding: '10px', overflow: 'hidden' }}>
    
    <div style={{ marginTop: '20px' }}>
   
      <h3>Ventajas</h3>
      {ventajas.map((itemVentaja, index) => {
          return (
            <ElementoVentaja
            key={index}
            itemVentaja={itemVentaja}
            />
          );
          })}
    
    </div> 

     
    </div>
    
  </div>
</Modal.Body>
      <Modal.Footer style={{backgroundColor:"black", color:"aliceblue"}}> 
        <Button variant="outline-danger" onClick={cerrar}>
          Cerrar
        </Button>
        
      </Modal.Footer>
        
       </div>
      </Tab>


      <Tab eventKey="inventario" title="Inventario">
      <div className={`modalus ${fade==true ? 'fadeOut' : 'fadeIn'}`}>
      

      <Modal.Body className='modalCartaPjBody' style={{ backgroundColor: "black", color: "aliceblue", overflow: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
    
   
    
    
    <div style={{ flex: 1, padding: '10px', overflow: 'hidden' }}>
    
    <div style={{ marginTop: '20px' }}>
    <h3>Inventario</h3>
    {inventario.map((item, index) => {
        return (
          <Item
            key={index}
            id={index} // O usa item.id si es único
            itemValues={item || {}}
          />
        );
      })}    
    </div> 

     
    </div>
    
  </div>
  </Modal.Body>
      <Modal.Footer style={{backgroundColor:"black", color:"aliceblue"}}> 
        <Button variant="outline-danger" onClick={cerrar}>
          Cerrar
        </Button>
        
      </Modal.Footer>
        
       </div>
      </Tab>

     

      <Tab eventKey="dominios" title="Dominios">
      <div className={`modalus ${fade==true ? 'fadeOut' : 'fadeIn'}`}>
      

      <Modal.Body className='modalCartaPjBody' style={{ backgroundColor: "black", color: "aliceblue", overflow: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
   
    <div style={{ flex: 1, padding: '10px', overflow: 'hidden' }}>
    
    <div style={{ marginTop: '20px' }}>
    <h3>Tecnicas</h3>
    {dominios.map((item, index) => {
        return (
          <TecnicasDominio
            key={index}
            id={index}
            itemValues={item || {}}
          />
        );
      })}    
    </div> 
    
    </div>
    
  </div>
</Modal.Body>
      <Modal.Footer style={{backgroundColor:"black", color:"aliceblue"}}> 
        <Button variant="outline-danger" onClick={cerrar}>
          Cerrar
        </Button>
        
      </Modal.Footer>
        
       </div>
      </Tab>


      <Tab eventKey="hehcizos" title="Hechizos">
      <div className={`modalus ${fade==true ? 'fadeOut' : 'fadeIn'}`}>
      

      <Modal.Body className='modalCartaPjBody' style={{ backgroundColor: "black", color: "aliceblue", overflow: 'auto' }}>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
    
   
    
   
    <div style={{ flex: 1, padding: '10px', overflow: 'hidden' }}>
    
    <div style={{ marginTop: '20px' }}>
    <h3>Hechizos</h3>
    {hechizos.map((item, index) => {
        return (
          <Hechizos
            key={index}
            id={index}
            itemValues={item || {}}
          />
        );
      })}    
    </div> 
    
    </div>
    
  </div>
</Modal.Body>
      <Modal.Footer style={{backgroundColor:"black", color:"aliceblue"}}> 
        <Button variant="outline-danger" onClick={cerrar}>
          Cerrar
        </Button>
        
      </Modal.Footer>
        
       </div>
      </Tab>



      

    <Tab eventKey="tecEspeciales" title="Tecnicas Especiales">
      <div className={`modalus ${fade==true ? 'fadeOut' : 'fadeIn'}`}>
      

      <Modal.Body className='modalCartaPjBody' style={{ backgroundColor: "black", color: "aliceblue", overflow: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
   
    <div style={{ flex: 1, padding: '10px', overflow: 'hidden' }}>
    
    <div style={{ marginTop: '10px' }}>
    <h3>Tecnicas Especiales</h3>
    {tecEspecial.map((item, index) => {
        return (
          <TecnicasEspeciales
            key={index}
            id={index}
            itemValues={item || {}}
          />
        );
      })}    
    </div> 
    
    </div>
    
  </div>
</Modal.Body>
      <Modal.Footer style={{backgroundColor:"black", color:"aliceblue"}}> 
        <Button variant="outline-danger" onClick={cerrar}>
          Cerrar
        </Button>
        
      </Modal.Footer>
        
       </div>
      </Tab>



    </Tabs>











   
      
    </Modal>

    </>
    
  );
};
