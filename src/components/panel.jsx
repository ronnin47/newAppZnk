import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
//const socket = io(process.env.REACT_APP_BACKEND_URL);
const socket = io("https://appmobileznk.onrender.com");

export const Panel = ({
  textareaRef,
  messagesEndRef,
  imagenurl,
  nombre,
  setMessage,
  sock,
  setSock,
}) => {
  const chatContainerRef = useRef(null);
  const [isAtTop, setIsAtTop] = useState(true); // Estado para saber si estamos en la parte superior de la página

  useEffect(() => {
    const checkIfAtTop = () => {
      setIsAtTop(window.scrollY === 0); // Si el scroll es 0, estamos en la parte superior
    };

    window.addEventListener("scroll", checkIfAtTop);
    checkIfAtTop(); // Llamar a la función al principio para establecer el valor correcto
    return () => {
      window.removeEventListener("scroll", checkIfAtTop);
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  useEffect(() => {
    if (isAtTop && chatContainerRef.current) {
      // Establecer scroll al final del contenedor
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [sock, isAtTop]);

  useEffect(() => {
    socket.on("chat-chat", (newMessage) => {
      setSock((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off("chat-chat");
    };
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "120px" }}>
        <div
          ref={chatContainerRef}
          className="contChat"
          style={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "1em",
            boxSizing: "border-box",
          }}
        >
          {sock.map((msg, index) => {
            const esPropio = msg.nombre === nombre;

            const esImagen =
              typeof msg.mensaje === "string" &&
              (msg.mensaje.startsWith("http://") ||
                msg.mensaje.startsWith("https://")) &&
              (msg.mensaje.endsWith(".jpg") ||
                msg.mensaje.endsWith(".jpeg") ||
                msg.mensaje.endsWith(".png") ||
                msg.mensaje.includes("cloudinary"));

            return (
              <div
                key={index}
                className={esPropio ? "red" : "green"}
                style={{ marginBottom: "6px" }}
              >
                <strong>{msg.nombre}:</strong>{" "}
                {esImagen ? (
                  <img
                    src={msg.mensaje}
                    alt="imagen enviada"
                    style={{
                      maxWidth: "150px",
                      maxHeight: "120px",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <span>{msg.mensaje}</span>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
};