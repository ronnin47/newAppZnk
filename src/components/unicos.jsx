
import { useState, useEffect } from "react";
import axios from "axios";
import { Estrellitas } from "./estrellitas";

export const Unicos = () => {
  const [coleccionTecEspeciales, setColeccionTecEspeciales] = useState([]);
  const [tecBuscar, setTectBuscar] = useState("");

  // Petición GET al servidor para obtener todas las técnicas especiales
  const consumirTecEspeciales = async () => {
    try {
      const response = await axios.get('http://localhost:4000/consumirTecEspeciales', {
      //const response = await axios.get('https://zepironokioku.onrender.com/consumirTecEspeciales', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      //console.log('Respuesta del servidor para técnicas especiales:', response.data);
      const { poderesEspeciales } = response.data;
      
      //console.log("REVISANDO PODERES ESPECIALES QUE TRAE: ",poderesEspeciales)
      if (!Array.isArray(poderesEspeciales)) {
        console.error('El formato de datos no es un array.');
        return;
      }

      setColeccionTecEspeciales(poderesEspeciales);
    } catch (error) {
      console.error("Cliente: fallo al consumir tec especiales", error.message);
    }
  };

  useEffect(() => {
    consumirTecEspeciales();
  }, []);

  const handleInputTecBuscar = (event) => {
    setTectBuscar(event.target.value);
  };

  // Filtrar personajes que tengan técnicas que coincidan con la búsqueda
  const poderesFiltrados = coleccionTecEspeciales.map(personaje => {
      // Filtrar solo las técnicas especiales que coincidan con la búsqueda
      const tecnicasFiltradas = personaje.tecEspecial.filter(tecnica => {
        //console.log("Nombre de la técnica:", tecnica.nombre, "Valor de check:", tecnica.check)
        return tecnica.nombre.toLowerCase().includes(tecBuscar.toLowerCase()) && tecnica.check === true
      }
      );
      //console.log("Técnicas filtradas para el personaje", personaje.nombre, tecnicasFiltradas);

      // Si alguna técnica coincide, devolvemos el personaje con solo esas técnicas
      if (tecnicasFiltradas.length > 0) {
        return { ...personaje, tecEspecial: tecnicasFiltradas };
      }

      // Si ninguna técnica coincide, excluimos este personaje
      return null;
    })
    .filter(personaje => personaje !== null);  // Filtrar personajes sin técnicas coincidentes

  return (
    <div>
      <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
      <div style={{ position: "relative", width: "30%" }}>
        <input 
          type="text" 
          className="buscador" 
          value={tecBuscar} 
          onChange={handleInputTecBuscar} 
          placeholder="ingrese nombre de técnica/objeto/poder especial" 
          style={{
            width: "100%", 
            paddingLeft: '30px',  
            backgroundPosition: '10px center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '16px 16px'
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

      <div className='container'>
        {poderesFiltrados.length > 0 ? (
          poderesFiltrados.map((personaje, index) => (
            <div key={index} style={{ marginTop: "1.5em" }} className="poderesEspecialesPj">
              <p style={{ color: "yellow", fontFamily:"cursive", fontSize:"1.5em" ,display:"flex",flexDirection:"row",gap:"1em"}}>
                <strong style={{ color: "orange" }}></strong> {personaje.nombre || "Desconocido"}
                <Estrellitas ken={personaje.ken}></Estrellitas>

              </p>

              {personaje.tecEspecial.map((tecnica, indexTec) => (
                <div key={indexTec} style={{ marginTop:"5px" }} className="cadaPoder">
                  <p style={{ color: "yellow", marginTop: "0.5em", fontFamily:"cursive",fontSize:"1.2em", marginBottom: "0.3em" }}>
                    <strong style={{ color: "orange" }}></strong> {tecnica.nombre || "Desconocida"}
                  </p>
                  <p style={{ color: "aliceblue", marginTop: "0.5em", marginBottom: "0.3em" }}>
                    <strong style={{ color: "orange" }}>Descripción:</strong> {tecnica.presentacion || "No disponible"}
                  </p>
                    {/* <p style={{ color: "aliceblue", marginTop: "0.5em", marginBottom: "0.3em" }}>
                    <strong style={{ color: "orange" }}>Sistema:</strong> {tecnica.sistema || "No especificado"}
                  </p>*/}
                </div>
              ))}
            </div>
          ))
        ) : (
          <p style={{marginTop:"2em", textAlign:"center", fontFamily:"cursive", color:"yellow", fontSize:"1.5em"}}>No se encontro la tecncia espeical buscada.</p>
        )}
      </div>
    </div>
    </div>

  );
};