import { useEffect, useState } from "react";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

const EstatusDrop = ({ estatusN, setEstatusN, idusuario }) => {


    //console.log("EL ID USUARIO:",idusuario)
    // Función que realiza la petición de actualización
    const cambiarEstatus = async (idusuario, estatus) => {
      try {
        const response = await axios.put(`https://universoceleste.onrender.com/cambiarEstatus`, 
        //const response = await axios.put(`http://localhost:4000/cambiarEstatus`, 
          { idusuario, estatus }, 
          { 
            headers: {
              'Content-Type': 'application/json', 
            },
          }
        );
        
        // Maneja la respuesta si es necesario
        //console.log("Respuesta de la solicitud:", response.data);
  
      } catch (error) {
        // Captura cualquier error y muestra un mensaje
        console.error("Error al cambiar el estatus:", error);
      }
    };
  
    // Función que maneja el cambio de selección del estatus
    const handleSelect = (selectedEstatus) => {
      // Solo cambia el estatus y hace la petición si el estatus es diferente al actual
      if (selectedEstatus !== estatusN) {
        setEstatusN(selectedEstatus); // Actualiza el estatus localmente
        cambiarEstatus(idusuario, selectedEstatus); // Realiza la petición
      }
    };
  
    // Determina el color del dropdown según el estatus
    const dropdownVariant = estatusN === "jugador" ? "success" : estatusN === "narrador" ? "warning" : "secondary";
  
    return (
      <Dropdown>
        <Dropdown.Toggle variant={dropdownVariant} id="dropdown-basic">
          {estatusN}
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSelect("jugador")}>jugador</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect("narrador")}>narrador</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };














const UsuarioPre = ({ idusuario, email, estatus, pass }) => {
  const [estatusN, setEstatusN] = useState(estatus); // Estado local para el estatus

  useEffect(() => {
    setEstatusN(estatus); // Sincroniza el estatus cuando se pase un nuevo valor
  }, [estatus]);

  return (
    <div className="cadaUsuario" style={{ color: "aliceblue", display: "flex", flexDirection: "row", gap: "2em", alignItems: "center" }}>
      <p>
        <span style={{ color: "skyblue" }}>Email:</span>
        <span style={{ color: "aliceblue", marginLeft: "5px" }}>{email}</span>
      </p>
      <p>
        <span style={{ color: "skyblue" }}>Contraseña:</span>
        <span style={{ color: "aliceblue", marginLeft: "5px" }}>{pass}</span>
      </p>

      <p style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
        <span style={{ color: "skyblue" }}>Estatus:</span>
        <span
          style={{
            color: estatusN === "narrador" ? "orange" : estatusN === "jugador" ? "aliceblue" : "white",
          }}
        >
          <EstatusDrop estatusN={estatusN} idusuario={idusuario} setEstatusN={setEstatusN} />
        </span>
      </p>
    </div>
  );
};

// Componente Usuarios
export const Usuarios = ({ sesion, estatus }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const consumirUsuarios = async () => {
      try {
        const response = await axios.get('https://universoceleste.onrender.com/consumirUsuarios');
        //const response = await axios.get('http://localhost:4000/consumirUsuarios');
        if (response.data && response.data.length > 0) {
          setUsuarios(response.data);
          //console.log("Estado actualizado justo después de setUsuarios:", response.data);
        } else {
          setUsuarios([]);
        }
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        setUsuarios([]);
      }
    };

    if (sesion && estatus === "narrador") {
      consumirUsuarios();
    }
  }, [sesion, estatus]);



  return (
    <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1em" }}>
      {usuarios ? (
        usuarios.map((user) => (
          <UsuarioPre key={user.idusuario} idusuario={user.idusuario} email={user.email} estatus={user.estatus} pass={user.contrasenia} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

