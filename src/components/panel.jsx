import { useEffect, useState, useRef } from "react"
import 'animate.css';
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BACKEND_URL);



export const Panel = ({textareaRef, messagesEndRef,nombre,setMessage,sock,setSock}) => {

    useEffect(() => {
      
      socket.on('message', (newMessage) => {
          const mensajeC=`${newMessage.nombre}: ${newMessage.mensaje}`
          setSock((prevMessages) => [...prevMessages, mensajeC]);
        });
        return () => {
          socket.off('message');
        };
      }, []);
      useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }, [sock]);

  return (
    <>
   <div style={{ display: 'flex', flexDirection: 'column', height: '170px' }}>
      <div className="contChat" style={{ flex: 1, overflowY: 'auto', border: '1px solid #ccc', padding: '1em',boxSizing: 'border-box' }}>
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


