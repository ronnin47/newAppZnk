import { useState } from "react";
import { CartaNarrador } from "./cartaNarrador";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { PowerEspeciales } from "./powerEspeciales";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Cartita=({
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




export const Narrador = ({estatus,coleccionPersonajes}) => {

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
  const personajesFiltrados = coleccionPersonajes.filter((pj) =>
    pj.nombre.toLowerCase().includes(pjBuscado.toLowerCase())
  );





  const poderesFiltrados = coleccionPersonajes.filter((pj) => {
    // Verificamos si tecEspecial existe y es un array con al menos un elemento
    if (Array.isArray(pj.tecEspecial) && pj.tecEspecial.length > 0) {
      // Iteramos sobre las técnicas especiales
      return pj.tecEspecial.some(tecnica => {
        // Depuramos el valor de tecnica.nombre
        const nombre = tecnica?.nombre;
  
        // Imprimimos en consola para verificar los valores
        console.log("Nombre de técnica especial:", nombre);
  
        // Verificamos que nombre sea una cadena no vacía
        if (typeof nombre === 'string' && nombre.trim() !== '') {
          return nombre.toLowerCase().includes(tecBuscar.toLowerCase());
        }
  
        return false; // Excluimos técnicas con nombres vacíos o no válidos
      });
    }
    return false; // Excluimos personajes sin técnicas especiales
  });




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
        placeholder="ingrese nombre de tecnica/poder espcecial" 
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
        {poderesFiltrados.length> 0? (poderesFiltrados.map((pj)=>(
          <PowerEspeciales
          poderesFiltrados={poderesFiltrados}
          key={pj.idpersonaje}
          nombre={pj.nombre} 
          idpersonaje={pj.idpersonaje} 
          dominio={pj.dominio} 
          tecEspecial={pj.tecEspecial}

          ></PowerEspeciales>
        ))):( <p style={{textAlign:"center", fontFamily:"cursive", color:"yellow", fontSize:"1.5em"}}>No se encontraron tecncias con ese nombreN</p>)}

       </div>
        
        
        </div>


        </Tab>
      
    </Tabs>
    

    </>
   
  )
}
