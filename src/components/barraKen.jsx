import React, { useState } from 'react';
import { io } from 'socket.io-client';
//const socket = io(process.env.REACT_APP_BACKEND_URL);
const socket = io('https://appmobileznk.onrender.com');


export const BarraKen = ({ nombreN,estatus, usuarioId,imagenurl, kenN, kenActualN, setKenActualN,idpersonaje }) => {

    const [animacionActiva, setAnimacionActiva] = useState(true);
    const [consumir,setConsumir]=useState("")
    const porcentajeKen = (kenActualN / kenN) * 100;

    const handleInput = (event) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue) && newValue >= 0 && newValue <= kenN) {
            setKenActualN(newValue);
        }
    };

    const handleConsumir=(event)=>{
      setConsumir(event.target.value)
    }
    const consumirKen=()=>{
        setAnimacionActiva(true);
        setTimeout(() => {
          setAnimacionActiva(false);
        }, 1000); 
        
        const newValue=kenActualN-consumir
        if (!isNaN(newValue) && newValue >= 0) {
           
            setKenActualN(newValue);
            let message
/*
            if(consumir>0){
                message = `            Consumio ${consumir} p de KEN                     KEN: ${newValue} / ${kenN}`;
            }else if(consumir<0){
                let recuperado=-(consumir)
                message = `            Recupero ${recuperado} p de KEN                     KEN: ${newValue} / ${kenN}`;
            }else {
                message = `                             KEN: ${newValue} / ${kenN}`;
            } 
  */
            if (parseInt(consumir) > 0) {
                    message = `✨ Consumió ${consumir} p de KEN         KEN: ${newValue} / ${kenN}`;
                } else if (parseInt(consumir) < 0) {
                    let recuperado = -(parseInt(consumir));
                    message = `✨ Recuperó ${recuperado} p de KEN         KEN: ${newValue} / ${kenN}`;
                } else {
                    message = `✨ KEN: ${newValue} / ${kenN}`;
                }
            const nombre=nombreN
            /*
            const msgEnviar = {
              idpersonaje: idpersonaje,    
              nombre:nombre,
              kenActual: newValue,         
              ken: kenN,                   
              mensaje: message            
          };
*/

             const msgEnviar = {
                //id: Date.now().toString() + Math.random().toString(36).substring(2),
                usuarioId: usuarioId, // ok
                idpersonaje: idpersonaje, //ok  
                nombre:nombre, // ok
                kenActual: newValue,         
                ken: kenN,                
                mensaje: message, // ok
                estatus:estatus, // ok
                imagenPjUrl:imagenurl || "", // ok
                nick: "",   // este campo no existe
                tipo: "ken",   //ok
            };
            socket.emit('chat-chat', msgEnviar);
            
        }
       
    }

    return (
        <div className="col1" style={{marginTop:"10px"}}>
            <div className='col4'>
            <div className={`animate__animated ${animacionActiva ? 'animate__flip' : ''}`}>
            <p style={{ fontSize: "20px", color: "aliceblue",marginTop:"10px" }}>Ken: {kenActualN}/{kenN}</p>
            </div>
            <button className='btn btn-success' onClick={consumirKen} style={{margin:"7px"}} >consumir ken</button>
            <input type="number" value={consumir} onChange={handleConsumir}className='inputKen'/>
            </div>

            <div className="barraExterna">
                <div
                    className="barraInternaKen"
                    style={{ width: `${porcentajeKen > 100 ? 100 : porcentajeKen}%`}}
                ></div>
            </div>
        </div>
    );
};

