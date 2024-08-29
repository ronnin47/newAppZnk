import { useState } from "react";
import { CartaNarrador } from "./cartaNarrador";



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



  return (
    <div  className="cartita-container">
        {coleccionPersonajes.map((pj)=>(
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
        ))}
  
      
    </div>
  )
}
