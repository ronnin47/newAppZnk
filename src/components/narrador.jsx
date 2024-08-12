


const Cartita=({nombre,dominio,imagen})=>{
    return(
        <>
           <div className="cartita" >
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

 console.log("lo que hay en componente narrador ",coleccionPersonajes)

  return (
    <div  className="cartita-container">
        {coleccionPersonajes.map((pj)=>(
          <Cartita key={pj.idpersonaje} nombre={pj.nombre} dominio={pj.dominio} imagen={pj.imagen}></Cartita>
        ))}
  
      
    </div>
  )
}
