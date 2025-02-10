import { useEffect, useState, useRef } from "react";
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BACKEND_URL);

export const Panel = ({ textareaRef, messagesEndRef, nombre, setMessage, sock, setSock }) => {
  const chatContainerRef = useRef(null);
  const [isAtTop, setIsAtTop] = useState(true);  // Estado para saber si estamos en la parte superior de la página

  useEffect(() => {
    // Verificar si estamos en la parte superior
    const checkIfAtTop = () => {
      setIsAtTop(window.scrollY === 0);  // Si el scroll es 0, estamos en la parte superior
    };

    window.addEventListener('scroll', checkIfAtTop);
    return () => {
      window.removeEventListener('scroll', checkIfAtTop);
    };
  }, []);

  useEffect(() => {
    // Solo hacer scroll al último mensaje si estamos en la parte superior
    if (isAtTop && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [sock, isAtTop]); // Ejecutar el efecto cuando recibimos un mensaje y si estamos en la parte superior

  useEffect(() => {
    socket.on('message', (newMessage) => {
      const mensajeC = `${newMessage.nombre}: ${newMessage.mensaje}`;
      setSock((prevMessages) => [...prevMessages, mensajeC]);
    });
    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '120px' }}>
        <div
          ref={chatContainerRef}
          className="contChat"
          style={{
            flex: 1,
            overflowY: 'auto',
            border: '1px solid #ccc',
            padding: '1em',
            boxSizing: 'border-box',
          }}
        >
          {sock.map((msg, index) => {
            const [msgNombre, ...msgMensajeArray] = msg.split(': ');
            const msgMensaje = msgMensajeArray.join(': ');
            return (
              <div key={index} className={msgNombre === nombre ? 'red' : 'green'} style={{ marginBottom: '6px' }}>
                <span>{msgNombre}: {msgMensaje}</span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
};