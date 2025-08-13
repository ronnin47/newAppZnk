import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
// const socket = io(process.env.REACT_APP_BACKEND_URL);
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
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const checkIfAtTop = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", checkIfAtTop);
    checkIfAtTop();
    return () => {
      window.removeEventListener("scroll", checkIfAtTop);
    };
  }, []);

  useEffect(() => {
    if (isAtTop && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [sock, isAtTop]);

  useEffect(() => {
    // 🔹 Pedimos historial al conectar
    socket.emit("solicitar-historial");

    // 🔹 Escuchamos historial inicial
    socket.on("historial-chat", (mensajes) => {
      setSock(mensajes);
    });

    // 🔹 Escuchamos mensajes nuevos en tiempo real
    socket.on("chat-chat", (newMessage) => {
      setSock((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("historial-chat");
      socket.off("chat-chat");
    };
  }, [setSock]);

  return (
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
  );
};