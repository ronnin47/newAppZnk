import { useState,useEffect} from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { Estrellitas } from './estrellitas';




import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import 'animate.css';



export const CartaUnica = ({ 
    onClose,
    nombre,
    dominio,
    ken,
    imagen,
    historia,  
    naturaleza,
    tecEspecial,
    conviccion,
 
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

          
            <div style={{ color: "yellow", fontFamily:"cursive", fontSize:"1.1em" ,display:"flex",flexDirection:"row",gap:"1em"}}>
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
            <p style={{textAlign:"center", marginTop:"5px"}}>Dominio: <span style={{ color: "yellow" }}>{dominio}</span></p>
            <p style={{textAlign:"center"}}>Ken: <span style={{ color: "yellow" }}>{ken}</span></p>
            <p style={{textAlign:"center"}}>Naturaleza: <span style={{ color: "yellow" }}>{naturaleza}</span></p>
            <p style={{ textAlign: "center" }}>
              Conviccion: <span style={{ color: "yellow" }}>{conviccion}</span>
            </p>
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
        <textarea className='historia' readOnly>
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
  
      </Tabs>
    
      </Modal>
  
      </>
      
    );
  };
  


  const Cartita = ({
    idpersonaje,
    nombre,
    dominio,
    ken,
    imagen,
    historia,  
    naturaleza,
    conviccion,
    rank, 
  }) => {
  
    const [showCartaPj, setShowCartaPj] = useState(false);
  
    const handleCardClick = () => {
      setShowCartaPj(true);
    };
  
    const handleCloseCartaPj = () => {
      setShowCartaPj(false);
    };

  const [classBrillosDestino, setClassBrillosDestino] = useState("numeroRanking");
  const [classCardDestino, setClassCardDestino] = useState("shadowBody");

    useEffect(() => {
      if (ken >= 400) {
        setClassBrillosDestino("numeroRanking classEstrella");
        setClassCardDestino("classCardDestino");
        console.log("es una estrella del destino")
      } else {
        setClassBrillosDestino("numeroRanking");
        setClassCardDestino("shadowBody");
      }
    }, [ken]);





  
    return (
      <>
        <div className={`cartaR ${classCardDestino}`} onClick={handleCardClick} style={{ position: 'relative', overflow: 'visible' }}>
          {/* El número de ranking, sobresaliendo del div */}
          <span className="ranking-number" 
          style={{ 
            position: 'absolute', 
            top: '-15px',  
            left: '-15px', 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#f1c40f',  // Amarillo dorado
            color: 'aliceblue',
            borderRadius: '50%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            fontSize: '1.5em', 
            fontWeight: 'bold',
            zIndex: 1,
            boxShadow: '0 0 15px 5px rgba(255, 255, 0, 0.8)', // Borde brillante
          }}
        >
          {rank}
        </span>
          
          <img src={imagen} alt={nombre} className="cartaImagenRanking" />
          <div className="cartitaElementos">
            <Estrellitas ken={ken}></Estrellitas>
            <p className="cartita-name" style={{ fontSize: "1em", color: "yellow" }}>{nombre}</p>
            <p className="cartita-description" style={{ fontSize: "0.8em" }}>{dominio}</p>
          </div>
        </div>
        
        {showCartaPj && (
          <CartaUnica
            onClose={handleCloseCartaPj}
            idpersonaje={idpersonaje}
            imagen={imagen}
            nombre={nombre}
            dominio={dominio}
            ken={ken}         
            historia={historia}
            naturaleza={naturaleza}
            conviccion={conviccion}
          />
        )}
      </>
    );
  }



export const Ranking = ({coleccionPersonajes}) => {

 //console.log("lo que hay en componente narrador ",coleccionPersonajes)
 // vamos a colocar un imput para el filter con includes 
 // y luego renderizar el resultado con 


const [pjBuscado, setPjBuscado]=useState("");
const [tecBuscar, setTectBuscar]=useState("");


const handleInputTecBuscar=(event)=>{
  setTectBuscar(event.target.value);
}


const handleInputBuscardor=(event)=>{
 setPjBuscado(event.target.value);
 console.log("Nombre buscado: ",pjBuscado)
}


  // Filtramos la colección de personajes según el valor de la búsqueda
  const personajesFiltrados = coleccionPersonajes
  .filter((pj) =>
    pj.nombre.toLowerCase().includes(pjBuscado.toLowerCase()) && pj.ken >= 40
  )
  .sort((a, b) => b.ken - a.ken);  // Ordenamos de mayor a menor según el valor de 'ken'


  return (
    <>

        <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
            <div style={{ position: "relative", width: "30%"}}>
        <input 
            type="text" 
            className="buscador" 
            value={pjBuscado} 
            onChange={handleInputBuscardor} 
            placeholder="ingrese nombre del pj" 
            style={{
            width: "100%", 
            paddingLeft: '30px',  // Espacio para la lupa
            backgroundImage: `url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css')`,
            backgroundPosition: '10px center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '16px 16px' // Ajusta el tamaño del ícono de lupa
            }}
        />
        <i 
            className="fas fa-search" 
            style={{ 
            position: 'absolute', 
            left: '10px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: '#aaa' 
            }} 
        />
            </div>
        </div>


        <div  className="container tresCartas" style={{marginTop:"1em"}}>

{personajesFiltrados.length >0 ?  (personajesFiltrados.map((pj, index)=>(
  <Cartita
  rank={index + 1} 
  key={pj.idpersonaje} 
  nombre={pj.nombre} 
  idpersonaje={pj.idpersonaje} 
  dominio={pj.dominio} 
  imagen={pj.imagen} 
  ken={pj.ken} 
  historia={pj.historia}
  naturaleza={pj.naturaleza}
  conviccion={pj.conviccion}
  ></Cartita>
))
) : (
<p style={{textAlign:"center", fontFamily:"cursive", color:"yellow", fontSize:"1.5em"}}>No se encontraron personajes con ese nombre</p>
)}


        </div>
    

    </>
   
  )
}