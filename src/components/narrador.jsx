import { useState } from "react";



const Cartita=({nombre,dominio,imagen,idpersonaje,ken})=>{

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
     
         
        </>
    )

}




export const Narrador = ({estatus,coleccionPersonajes}) => {

 //console.log("lo que hay en componente narrador ",coleccionPersonajes)



  return (
    <div  className="cartita-container">
        {coleccionPersonajes.map((pj)=>(
          <Cartita key={pj.idpersonaje} nombre={pj.nombre} idpersonaje={pj.idpersonaje} dominio={pj.dominio} imagen={pj.imagen} ken={pj.ken}></Cartita>
        ))}
  
      
    </div>
  )
}
