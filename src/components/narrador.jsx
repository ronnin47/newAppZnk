import { useState } from "react";
import { CartaNarrador } from "./cartaNarrador";
import '@fortawesome/fontawesome-free/css/all.min.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Swal from 'sweetalert2';
import axios from 'axios';


const Cartita=({
  eliminarPj,
  idpersonaje,
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
 
})=>{

  const [showCartaPj, setShowCartaPj] = useState(false);

  const handleCardClick = () => {
    setShowCartaPj(true);
  };

  const handleCloseCartaPj = () => {
    setShowCartaPj(false);
  };



  return(
        <>
           <div className="cartita"  onClick={handleCardClick}>
            <img src={imagen} alt={nombre} className="cartita-image" />
            <div className="cartita-info">
                <h3 className="cartita-name">{nombre}</h3>
        
                <p className="cartita-description">{dominio}</p>
            </div>
           </div>
           {showCartaPj && (
          <CartaNarrador
            eliminarPj={eliminarPj}
            onClose={handleCloseCartaPj}
            idpersonaje={idpersonaje}
            imagen={imagen}
            nombre={nombre}
            dominio={dominio}
            ken={ken}
            ki={ki}
           

            fuerza={fuerza}
            fortaleza={fortaleza}
            destreza={destreza}
            agilidad={agilidad}
            sabiduria={sabiduria}
            presencia={presencia}
            principio={principio}
            sentidos={sentidos}
            academisismo={academisismo}
            alerta={alerta}
            atletismo={atletismo}
            conBakemono={conBakemono}
            mentir={mentir}
            pilotear={pilotear}
            artesMarciales={artesMarciales}
            medicina={medicina}
            conObjMagicos={conObjMagicos}
            sigilo={sigilo}
            conEsferas={conEsferas}
            conLeyendas={conLeyendas}
            forja={forja}
            conDemonio={conDemonio}
            conEspiritual={conEspiritual}
            manejoBlaster={manejoBlaster}
            manejoSombras={manejoSombras}
            tratoBakemono={tratoBakemono}
            conHechiceria={conHechiceria}
            medVital={medVital}
            medEspiritual={medEspiritual}
            rayo={rayo}
            fuego={fuego}
            frio={frio}
            veneno={veneno}
            corte={corte}
            energia={energia}
            apCombate={apCombate}
            valCombate={valCombate}
            apCombate2={apCombate2}
            valCombate2={valCombate2}
            add1={add1}
            valAdd1={valAdd1}
            add2={add2}
            valAdd2={valAdd2}
            add3={add3}
            valAdd3={valAdd3}
            add4={add4}
            valAdd4={valAdd4}                
            ventajas={ventajas}


            inventario={inventario} 


            
            dominios={dominios}
            kenActual={kenActual}
            kiActual={kiActual} 
            positiva={positiva}
            negativa={negativa}
            vidaActual={vidaActual}
            hechizos={hechizos}
            consumision={consumision}
            iniciativa={iniciativa}
            historia={historia}
            naturaleza={naturaleza}

            tecEspecial={tecEspecial || []}

            conviccion={conviccion}
            cicatriz={cicatriz}

           

          />
        )}
     
         
        </>
    )

}




export const Narrador = ({estatus,setColeccionPersonajes,coleccionPersonajes}) => {



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
  const personajesFiltrados = coleccionPersonajes.filter((pj) =>
    pj.nombre.toLowerCase().includes(pjBuscado.toLowerCase())
  );



  // Filtrar personajes que tengan técnicas que coincidan con la búsqueda
const poderesFiltrados = coleccionPersonajes
.map(personaje => {
  // Verificar si tecEspecial es un array y tiene al menos un elemento
  const tecnicasFiltradas = Array.isArray(personaje.tecEspecial) 
    ? personaje.tecEspecial.filter(tecnica => 
        tecnica.nombre.toLowerCase().includes(tecBuscar.toLowerCase())
      )
    : []; // Si no es un array, devolvemos un array vacío

  // Si alguna técnica coincide, devolvemos el personaje con solo esas técnicas
  if (tecnicasFiltradas.length > 0) {
    return { ...personaje, tecEspecial: tecnicasFiltradas };
  }

  // Si ninguna técnica coincide, excluimos este personaje
  return null;
})
.filter(personaje => personaje !== null); 


const eliminarPj = (idpersonaje,nombre) => {
  Swal.fire({
      title: `¿Narrador quieres eliminar el personaje ${nombre} ?`,
      html: '<p style="color: red;">A razón de mantener la coherencia narrativa de un personaje y de las tramas de las sagas, aquel personaje que fuera abortado por un jugador quedará borrado. ZNK es un juego que busca mantenerse como una obra compuesta de historias únicas, y la obra debe ser mayor que una mala decisión de un jugador.</p>' +
      '<p style="color: red;">¡Se borrará completamente de la base de datos, no se podrá revertir una vez hecho!</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
  }).then((result) => {
      if (result.isConfirmed) {
          const listaNueva = coleccionPersonajes.filter((pj) => pj.idpersonaje !== idpersonaje);
          
          destruirPj(idpersonaje);
          setColeccionPersonajes(listaNueva);
          Swal.fire(
              '¡Eliminado!',
              'Tu personaje ha sido eliminado.',
              'success'
          );
      }
  });
};

const destruirPj=async(idpersonaje)=>{
  try {
  
    //const response = await axios.delete(`http://localhost:4000/deletePersonaje/${idpersonaje}`);
    const response = await axios.delete(`https://zepironokioku.onrender.com/deletePersonaje/${idpersonaje}`);
    console.log('Personaje eliminado:', response.data);
  } catch (error) {
    console.error('Error al eliminar el personaje:', error);
  }
 
 console.log("*****************Este es el id de personaje:",idpersonaje)
}

  return (
    <>

    <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
        <Tab eventKey="personajes" title="Persoanjes ZNK">
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


        <div  className="cartita-container">

{personajesFiltrados.length >0 ?  (personajesFiltrados.map((pj)=>(
  <Cartita
  eliminarPj={eliminarPj}
  key={pj.idpersonaje} 
  nombre={pj.nombre} 
  idpersonaje={pj.idpersonaje} 
  dominio={pj.dominio} 
  imagen={pj.imagen} 
  ken={pj.ken} 
  ki={pj.ki}
  
  fuerza={pj.fuerza}
  fortaleza={pj.fortaleza}
  destreza={pj.destreza}
  agilidad={pj.agilidad}
  sabiduria={pj.sabiduria}
  presencia={pj.presencia}
  principio={pj.principio}
  sentidos={pj.sentidos}
  academisismo={pj.academisismo}
  alerta={pj.alerta}
  atletismo={pj.atletismo}
  conBakemono={pj.conBakemono}
  mentir={pj.mentir}
  pilotear={pj.pilotear}
  artesMarciales={pj.artesMarciales}
  medicina={pj.medicina}
  conObjMagicos={pj.conObjMagicos}
  sigilo={pj.sigilo}
  conEsferas={pj.conEsferas}
  conLeyendas={pj.conLeyendas}
  forja={pj.forja}
  conDemonio={pj.conDemonio}
  conEspiritual={pj.conEspiritual}
  manejoBlaster={pj.manejoBlaster}
  manejoSombras={pj.manejoSombras}
  tratoBakemono={pj.tratoBakemono}
  conHechiceria={pj.conHechiceria}
  medVital={pj.medVital}
  medEspiritual={pj.medEspiritual}
  rayo={pj.rayo}
  fuego={pj.fuego}
  frio={pj.frio}
  veneno={pj.veneno}
  corte={pj.corte}
  energia={pj.energia}
  apCombate={pj.apCombate}
  valCombate={pj.valCombate}
  apCombate2={pj.apCombate2}
  valCombate2={pj.valCombate2}
  add1={pj.add1}
  valAdd1={pj.valAdd1}
  add2={pj.add2}
  valAdd2={pj.valAdd2}
  add3={pj.add3}
  valAdd3={pj.valAdd3}
  add4={pj.add4}
  valAdd4={pj.valAdd4}                
  ventajas={pj.ventajas}

  inventario={pj.inventario} 

  dominios={pj.dominios}
  kenActual={pj.kenActual}
  kiActual={pj.kiActual} 
  positiva={pj.positiva}
  negativa={pj.negativa}
  vidaActual={pj.vidaActual}
  hechizos={pj.hechizos}
  consumision={pj.consumision}
  iniciativa={pj.iniciativa}
  historia={pj.historia}
  naturaleza={pj.naturaleza}
  tecEspecial={pj.tecEspecial}

  conviccion={pj.conviccion}
  cicatriz={pj.cicatriz}
  
  ></Cartita>
))
) : (
<p style={{textAlign:"center", fontFamily:"cursive", color:"yellow", fontSize:"1.5em"}}>No se encontraron personajes con ese nombre</p>
)}


        </div>


        </Tab>





        
        <Tab eventKey="tecnicas" title="Tecnicas y poderes especiales">
         
        <div style={{display:"flex", flexDirection:"column",alignItems: "center"}}>
        
        <div style={{ position: "relative", width: "30%"}}>
      <input 
        type="text" 
        className="buscador" 
        value={tecBuscar} 
        onChange={handleInputTecBuscar} 
        placeholder="ingrese nombre de tecnica/objeto/poder espcecial" 
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

        <div className="container">
        
        {poderesFiltrados.length > 0 ? (
          poderesFiltrados.map((personaje, index) => (
            <div key={index} style={{ marginTop: "1.5em" }} className="poderesEspecialesPj">
              <p style={{ color: "yellow", fontFamily:"cursive", fontSize:"1.5em" }}>
                <strong style={{ color: "orange" }}></strong> {personaje.nombre || "Desconocido"}
              </p>

              {personaje.tecEspecial.map((tecnica, indexTec) => (
                <div key={indexTec} style={{ marginTop:"5px" }} className="cadaPoder">
                  <p style={{ color: "yellow", marginTop: "0.5em", marginBottom: "0.3em",fontFamily:"cursive",fontSize:"1.2em" }}>
                    <strong style={{ color: "orange" }}></strong> {tecnica.nombre || "Desconocida"}
                  </p>
                  <p style={{ color: "aliceblue", marginTop: "0.5em", marginBottom: "0.3em" }}>
                    <strong style={{ color: "orange" }}>Descripción:</strong> {tecnica.presentacion || "No disponible"}
                  </p>
                  <p style={{ color: "aliceblue", marginTop: "0.5em", marginBottom: "0.3em" }}>
                    <strong style={{ color: "orange" }}>Sistema:</strong> {tecnica.sistema || "No especificado"}
                  </p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p style={{marginTop:"2em", textAlign:"center", fontFamily:"cursive", color:"yellow", fontSize:"1.5em"}}>No se encontro la tecncia especial buscada.</p>
        )}
        
       </div>
        </div>
        </Tab>
      
    </Tabs>
    

    </>
   
  )
}
