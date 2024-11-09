import { useEffect } from "react";
import React, { useState } from "react";
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BACKEND_URL);

import 'animate.css';

export const BarraVida = ({idpersonaje,cicatrizN, setCicatrizN, nombreN,fortalezaN, kiN, positivaN,setPositivaN, negativaN,setNegativaN, damageActualN, setDamageActualN }) => {
  const faseSalud = parseInt(kiN) + parseInt(fortalezaN);
  const vidaTotalPositiva = faseSalud * parseInt(positivaN);
  const vidaTotalNegativa = faseSalud * parseInt(negativaN);
  const vidaTotal = vidaTotalPositiva + vidaTotalNegativa;

  
  let porcentajeVidaPositivaInicial = (damageActualN * 100) / vidaTotalPositiva;
  let porcentajeVidaNegativaInicial = 0;

  if (porcentajeVidaPositivaInicial > 100) {
    porcentajeVidaNegativaInicial = ((damageActualN - vidaTotalPositiva) * 100) / vidaTotalNegativa;
    porcentajeVidaPositivaInicial = 100;
    porcentajeVidaNegativaInicial = porcentajeVidaNegativaInicial > 100 ? 100 : porcentajeVidaNegativaInicial;
  }

  const [porcentajeVidaPositiva, setPorcentajeVidaPositiva] = useState(porcentajeVidaPositivaInicial);
  const [porcentajeVidaNegativa, setPorcentajeVidaNegativa] = useState(porcentajeVidaNegativaInicial);
  const [consumirVida, setConsumirVida] = useState("");
  const [animacionActiva, setAnimacionActiva] = useState(true);
  
  useEffect(() => {
    const cicatrizValue = parseInt(cicatrizN, 10);
    if (cicatrizValue > 0 && damageActualN < cicatrizValue) {
      setDamageActualN(cicatrizValue);
    }
  }, [cicatrizN, damageActualN]);

  useEffect(() => {
    if (parseInt(cicatrizN) > 0) {
      if (damageActualN < parseInt(cicatrizN)) {
        setDamageActualN(parseInt(cicatrizN));
      }
    }
  }, [cicatrizN, damageActualN]);


  const handleChangeCicatrizN=(event)=>{
    setCicatrizN(event.target.value);
   }


  const agregarDamage = async () => {
    let newValue = parseInt(consumirVida)|| 0;
    let newDamage = damageActualN + newValue;
  
    setAnimacionActiva(true);
    setTimeout(() => {
      setAnimacionActiva(false); 
    }, 1000); 

    if (newDamage < 0) {
      newDamage = 0; 
    }


     const cicatrizValue = parseInt(cicatrizN, 10);
     if (cicatrizValue > 0 && newDamage < cicatrizValue) {
       newDamage = cicatrizValue;
     }
  
    setDamageActualN(newDamage);
   
    if (newDamage <= vidaTotalPositiva) {
      setPorcentajeVidaPositiva((newDamage * 100) / vidaTotalPositiva);
      setPorcentajeVidaNegativa(0); 
    } else {
    
      const nuevoPorcentajeNegativa = ((newDamage - vidaTotalPositiva) * 100) / vidaTotalNegativa;
      const porcentajeNegativaAjustado = nuevoPorcentajeNegativa > 100 ? 100 : nuevoPorcentajeNegativa;
      setPorcentajeVidaPositiva(100);
      setPorcentajeVidaNegativa(porcentajeNegativaAjustado); 
    }
    
    let estadoDeFase=""

    if(newDamage<=vidaTotalPositiva && newDamage>=(vidaTotalPositiva-faseSalud)){
      if(newDamage!==0){
      estadoDeFase="fase MALHERIDO"
      }
   }
   
   if(newDamage<=(vidaTotalPositiva-faseSalud) && newDamage>=(vidaTotalPositiva-faseSalud*2)){
    if(newDamage!==0){
    estadoDeFase="fase MALTRECHO"
    }
  }
  if(newDamage<=(vidaTotalPositiva-faseSalud*2) && newDamage>=(vidaTotalPositiva-faseSalud*3)){
    if(newDamage!==0){
     estadoDeFase="fase RAZGADO"
    }
  }

  if(newDamage<=(vidaTotalPositiva-faseSalud*3)){
    if(positivaN>=3){
      if(newDamage!==0){
        estadoDeFase="fase RAZGADO"
       }
    } 
}

   if(newDamage>vidaTotalPositiva && newDamage<=(vidaTotalPositiva+faseSalud)){    
   
    if(negativaN==1){
       estadoDeFase="fase MORIBUNDO"
    }else if(negativaN==2){
      estadoDeFase="fase INCAPACITADO"
    }else if(negativaN>=3){
      estadoDeFase="fase INCONCIENTE"
    }
   }

   if(newDamage>(vidaTotalPositiva+faseSalud) && newDamage<=(vidaTotalPositiva+faseSalud*2)){

    if(negativaN==1){
      estadoDeFase="fase MORIBUNDO"
   }else if(negativaN==2){
     estadoDeFase="fase MORIBUNDO"
   }else if(negativaN>=3){
     estadoDeFase="fase INCAPACITADO"
   }
    //estadoDeFase="fase iNCAPACITADO"
   }
   if(newDamage>(vidaTotalPositiva+faseSalud*2) && newDamage<=(vidaTotalPositiva+faseSalud*3)){
    
    if(negativaN==1){
      estadoDeFase=""
   }else if(negativaN==2){
     estadoDeFase=""
   }else if(negativaN>=3){
     estadoDeFase="fase MORIBUNDO"
   }
    //estadoDeFase="fase MORIBUNDO"
   }
  




    let aturdimiento="";
    //catidad de fase positivas, cantidad de fases negativas
    if(newValue>=faseSalud){
      aturdimiento="****ATURDIDO*****"
    }

    let estadoSalud
    if(newDamage>vidaTotalPositiva){
      if(newDamage<=vidaTotal){
          estadoSalud=`barra negativa ${aturdimiento}`
      }else if(newDamage>vidaTotal){
        estadoSalud=`********************* ${nombreN} MUERTO ********************* ${aturdimiento}`
      }
      
    }else if(newDamage<=vidaTotalPositiva){
      estadoSalud=`barra positiva ${aturdimiento}`
    }


    let message

    if(newValue>0){
        message = `            Recibio ${newValue} p de DAÑO                        VITALIDAD: ${newDamage} / ${vidaTotal}                             ${estadoDeFase}   ${estadoSalud}`;
    }else if(newValue<0){
        let recuperado=-(newValue)
        message = `            Restauro ${recuperado} p de VIDA                     VITALIDAD: ${newDamage} / ${vidaTotal}                             ${estadoDeFase}   ${estadoSalud}`;
    }else {
        message = `                             VITALIDAD: ${newDamage} / ${vidaTotal}          ${estadoDeFase}   ${estadoSalud}`;
    }
  
   
    const nombre=nombreN

    
      // Emitiendo el objeto con idpersonaje, kenActual y ken
      const msgEnviar = {
        idpersonaje: idpersonaje,    
        nombre:nombre,
        vidaActual: newDamage,         
        vidaTotal: vidaTotal,                   
        mensaje: message            
    };
    
    socket.emit('message', msgEnviar);
   
   
  };

  const handleConsumirVida = (event) => {
    setConsumirVida(event.target.value);
  };

  const estaMuerto = damageActualN > vidaTotal;

  const handlePos=(event)=>{
    const newPos=parseInt(event.target.value)
    setPositivaN(newPos)
  }
  const handleNeg=(event)=>{
    const newNeg=parseInt(event.target.value)
    setNegativaN(newNeg)
  }
  const curarFase=async()=>{
    setConsumirVida("")
    setConsumirVida(-(faseSalud))
    if(consumirVida==-(faseSalud)){
      agregarDamage();
      setConsumirVida("")
    }
   
  }
  
  return (
    <div className="col1" >
      <div className='colBarraVida'>
  <div className={`animate__animated ${animacionActiva ? 'animate__flip' : ''}`}>
    <p
      style={{
        fontSize: "20px",
        color: "aliceblue",
        marginTop: "5px",
        textAlign: "right",
        width: "100%",
        display: "block"
      }}
    >
      Daño: {damageActualN}/{vidaTotal}
    </p>
  </div>

  {/* Columna con el botón y el input de Daño */}
  <div className="col2" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
    <button className='btn btn-danger' onClick={agregarDamage} style={{ margin: "3px" }}>
      + Daño
    </button>
    <input
      type="number"
      value={consumirVida}
      onChange={handleConsumirVida}
      className='inputKen'
      style={{ marginLeft: "10px", width: "80px" }}
    />
  </div>

  {/* Columna con los inputs de Fases */}
  <div className="col6" id="fases" style={{ display: "flex", alignItems: "center", marginLeft: "0%", marginBottom: "15px" }}>
    {/* Fase positiva */}
    <div style={{ marginRight: "1em" }}>
      <p style={{ color: "aliceblue", marginRight: "5px" }}>F+</p>
      <input
        type="number"
        value={positivaN}
        onChange={handlePos}
        className='inputKen'
        style={{ width: "80px" }}
      />
    </div>

    {/* Fase negativa */}
    <div style={{ marginRight: "1em" }}>
      <p style={{ color: "aliceblue", marginRight: "5px" }}>F-</p>
      <input
        type="number"
        value={negativaN}
        onChange={handleNeg}
        className='inputKen'
        style={{ width: "80px" }}
      />
    </div>

    {/* Imagen de curación */}
    <div style={{ marginRight: "1em" }}>
      <img
        alt=""
        src="/salud.svg"
        width="60px"
        height="60px"
        className="boton-imagen d-inline-block align-top"
        onClick={curarFase}
        style={{ cursor: "pointer" }}
      />
    </div>

    {/* Input de cicatriz */}
    <div>
      <input
        type="number"
        value={cicatrizN}
        onChange={handleChangeCicatrizN}
        className='inputCicatriz'
        placeholder="cicatriz"
        style={{ width: "80px", marginLeft: "10px" }}
      />
    </div>
  </div>
</div>
     
      {estaMuerto ? (
        <>
        
        <div className="barraExterna">
            <div className="barraInternaVida" style={{ width: "100%", background: "black" }}></div>
          </div>
          <div className="barraExterna">
            <div className="barraInternaVidaNegativa" style={{ width: "100%", background: "black" }}></div>
          </div>
  
         
        </>
        
      ) : (
        <>
          <div className="barraExternaN"  style={{ '--divisiones': positivaN }}>
            <div className="barraInternaVida" style={{ width: `${porcentajeVidaPositiva}%` }}></div>
          </div>
          <div className="barraExternaN"  style={{ '--divisiones': negativaN }}>
            <div className="barraInternaVidaNegativa" style={{ width: `${porcentajeVidaNegativa}%` }}></div>
          </div>
        </>
      )}
    </div>
  );
}







