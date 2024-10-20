import { useEffect, useState, useRef } from "react"
import 'animate.css';
import { io } from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

const socket = io(process.env.REACT_APP_BACKEND_URL);

export const Panel = ({textareaRef, messagesEndRef,nombre,setMessage,sock,setSock}) => {



    useEffect(() => {
        // Escuchar mensajes del servidor y actualizar el estado
      socket.on('message', (newMessage) => {
          const mensajeC=`${newMessage.nombre}: ${newMessage.mensaje}`
          setSock((prevMessages) => [...prevMessages, mensajeC]);
        });
        return () => {
          socket.off('message');
        };
      }, []);
      useEffect(() => {
        // Desplazar el contenedor del chat hacia abajo cuando lleguen nuevos mensajes
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }, [sock]);

/*
      useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [sock]);
*/
/*
      <input type="text" className="chatcito" value={mensajeChat} onChange={handleChangeM} onKeyPress={handleKeyPress}/>
      <button className="btn btn-primary" onClick={enviar} style={{marginLeft:"10px"}}>enviar</button>

*/

  return (
    <>
   <div style={{ display: 'flex', flexDirection: 'column', height: '200px' }}>
      <div className="contChat" style={{ flex: 1, overflowY: 'auto', border: '1px solid #ccc', padding: '1em',boxSizing: 'border-box' }}>
        {/* Verificar contenido de sock */}
        {console.log("Contenido de sock:", sock)}
        {sock.map((msg, index) => {
          const [msgNombre, ...msgMensajeArray] = msg.split(': ');
          const msgMensaje = msgMensajeArray.join(': ');
          return (
            <div key={index} className={msgNombre === nombre ? 'red' : 'green' } style={{ marginBottom: '6px' }}>
              <span>{msgNombre}: {msgMensaje}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
   
   
    </>
  )
}


