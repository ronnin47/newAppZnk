import React, { useRef, useEffect } from 'react';
import { useState } from "react"
import Swal from 'sweetalert2';
import { VentajasN } from './ventajasN.jsx';
import { Inventario } from "./inventario.jsx"
import { Dominios } from './dominios.jsx';

import { Hechizos } from './hechizos.jsx';
import { Historia } from './historia.jsx';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import { TecnicaEspecial } from './tecEspecial.jsx';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BACKEND_URL);

const apiUrl =import.meta.env.VITE_API_URL;


export const FichaPersonaje = ({
  personaje,
  personajes, 
  setPersonajes, 
  idpersonaje, 
  nombre, 
  dominio, 
  raza, 
  naturaleza,
  edad,
  ken,
  ki,
  destino,
  pDestino,
  fuerza, 
  fortaleza, 
  agilidad, 
  imagen, 
  destreza, 
  sabiduria, 
  presencia, 
  principio, 
  sentidos, 
  academisismo,
  alerta,
  atletismo,
  conBakemono,
  mentir,
  pilotear,
  artesMarciales,
  medicina,
  conObjMagicos,
  sigilo,
  conEsferas,
  conLeyendas,
  forja,
  conDemonio,
  conEspiritual,
  manejoBlaster,
  manejoSombras,
  tratoBakemono,
  conHechiceria,
  medVital,
  medEspiritual,
  rayo,
  fuego,
  frio,
  veneno,
  corte,
  energia,
  apCombate, 
  valCombate,
  apCombate2, 
  valCombate2,
  ventajas,
  inventario,
  dominios,
  hechizos,
  kenActual,
  kiActual,
  positiva,
  negativa,
  vidaActual,
  add1,
  valAdd1,
  add2,
  valAdd2,
  add3,
  valAdd3,
  add4,
  valAdd4,
  consumision,
  iniciativa,
  historia,
  eliminarPj,
  setVivoMuerto,
  vivoMuerto,
  tecEspecial,
  usuarioId,
  conviccion,
  cicatriz,
  estatus,


  pjsCombinados,
  setPjsCombinados,

  resistencia,
 
}) => {
  
  const inputFileRef = useRef(null);

  const handleImageUpload = () => {
    inputFileRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
    
      setImagenN(reader.result);
    };
    reader.readAsDataURL(file);
  
  };
  
  
  const [nombreN,setNombreN]=useState(nombre)
  const [imagenN,setImagenN]=useState(imagen)
  const [dominioN,setDominioN]=useState(dominio)
  const [razaN,setRazaN]=useState(raza)
  const [naturalezaN,setNaturalezaN]=useState(naturaleza)
  const [edadN,setEdadN]=useState(edad) 
  const [kenN,setKenN]=useState(ken)

  const [kiN,setKiN]=useState(ki)

  const [destinoN,setDestinoN]=useState(destino)
  const [pDestinoN,setPdestinoN]=useState(pDestino) 
  const [fuerzaN,setFuerzaN]=useState(fuerza)
  const [fortalezaN,setFortalezaN]=useState(fortaleza)
  const [destrezaN,setDestrezaN]=useState(destreza)
  const [agilidadN,setAgilidadN]=useState(agilidad)
  const [sabiduriaN,setSabiduriaN]=useState(sabiduria)
  const [presenciaN,setPresenciaN]=useState(presencia)
  const [principioN,setPrincipioN]=useState(principio)
  const [sentidosN,setSentidosN]=useState(sentidos)
  const [academisismoN,setAcademisismoN]=useState(academisismo)
  const [alertaN,setAlertaN]=useState(alerta)
  const [atletismoN,setAtletismoN]=useState(atletismo)
  const [conBakemonoN,setConBakemonoN]=useState(conBakemono)
  const [mentirN,setMentirN]=useState(mentir)
  const [pilotearN,setPilotearN]=useState(pilotear)
  const [artesMarcialesN,setArtesMarcialesN]=useState(artesMarciales)
  const [medicinaN,setMedicinaN]=useState(medicina)
  const [conObjMagicosN,setConObjMagicosN]=useState(conObjMagicos)
  const [sigiloN,setSigiloN]=useState(sigilo)
  const [conEsferasN,setConEsferasN]=useState(conEsferas)
  const [conLeyendasN,setConLeyendasN]=useState(conLeyendas)
  const [forjaN,setForjaN]=useState(forja)
  const [conDemonioN,setConDemonioN]=useState(conDemonio)
  const [conEspiritualN,setConEspiritualN]=useState(conEspiritual)
  const [manejoBlasterN,setManejoBlasterN]=useState(manejoBlaster)
  const [manejoSombrasN,setManejoSombrasN]=useState(manejoSombras)
  const [tratoBakemonoN,setTratoBakemonoN]=useState(tratoBakemono)
  const [conHechiceriaN,setConHechiceriaN]=useState(conHechiceria)
  const [medVitalN,setMedVitalN]=useState(medVital)
  const [medEspiritualN,setMedEspiritualN]=useState(medEspiritual)
  const [rayoN,setRayoN]=useState(rayo)
  const [fuegoN,setFuegoN]=useState(fuego)
  const [frioN,setFrioN]=useState(frio)
  const [venenoN,setVenenoN]=useState(veneno)
  const [corteN,setCorteN]=useState(corte)
  const [energiaN,setEnergiaN]=useState(energia)
  const [ventajasN, setVentajasN] = useState(ventajas);
  const [inventarioN, setInventarioN] = useState(inventario);
  const [dominiosN, setDominiosN] = useState(dominios);
  const [hechizosN, setHechizosN] = useState(hechizos);
  const [kenActualN,setKenActualN]=useState(kenActual);
  const [kiActualN,setKiActualN]=useState(kiActual);
  const [positivaN,setPositivaN]=useState(positiva);
  const [negativaN,setNegativaN]=useState(negativa);
  const [damageActualN,setDamageActualN]=useState(vidaActual);
  const [consumisionN,setConsumisionN]=useState(consumision)
  const [apCombateN,setApCombateN]=useState(apCombate)
  const [valCombateN,setValCombateN]=useState(valCombate)
  const [apCombate2N,setApCombate2N]=useState(apCombate2)
  const [valCombate2N,setValCombate2N]=useState(valCombate2)
  const [add1N,setAdd1N]=useState(add1)
  const [valAdd1N,setValAdd1N]=useState(valAdd1)
  const [add2N,setAdd2N]=useState(add2)
  const [valAdd2N,setValAdd2N]=useState(valAdd2)
  const [add3N,setAdd3N]=useState(add3)
  const [valAdd3N,setValAdd3N]=useState(valAdd3)
  const [add4N,setAdd4N]=useState(add4);
  const [valAdd4N,setValAdd4N]=useState(valAdd4);
  const [iniciativaN,setIniciativaN]=useState(iniciativa) 
  const [historiaN,setHistoriaN]=useState(historia);
  const [tecEspecialN,setTecEspecialN]=useState(tecEspecial);
  const [conviccionN,setConviccionN]=useState(conviccion);
  const [cicatrizN,setCicatrizN]=useState(cicatriz);
  const [resistenciaN,setResistenciaN]=useState(resistencia);

 
 useEffect(()=>{
  
  },[vivoMuerto])

//SERA PARA REVISAR
  useEffect(() => {
    const vidaTotal=(parseInt(kiN)+parseInt(fortalezaN))*(positivaN+negativaN)
    if (damageActualN > vidaTotal) {
      setVivoMuerto(false);
    } else {
      setVivoMuerto(true);
    }
  }, [damageActualN,kiN,fortalezaN,positivaN,negativaN]);


  /*
  useEffect(()=>{
    const nuevoValorIniciativa=parseInt(agilidadN)+parseInt(sentidosN);
    setIniciativaN(nuevoValorIniciativa);
  },[agilidadN, sentidosN])

  useEffect(()=>{
    const nuevoValorResistencia=parseInt(fuerzaN)+parseInt(fortalezaN);
    setResistenciaN(nuevoValorResistencia);
  },[fuerzaN, fortalezaN])
*/

  const handleChangeNombre = (event) => {
    setNombreN(event.target.value)    
  }
  const handleChangeDominio = (event) => {
    setDominioN(event.target.value)    
  }
  const handleChangeRaza = (event) => {
    setRazaN(event.target.value)    
  }
  const handleChangeEdad = (event) => {
   setEdadN(event.target.value)    
  }
  const handleChangeKen=(event)=>{
    setKenN(event.target.value)
  }
  const handleChangeKi=(event)=>{
    setKiN(event.target.value)
  }
  const handleChangeDestino=(event)=>{
    setDestinoN(event.target.value)
  }
  const handleChangePdestino=(event)=>{
    setPdestinoN(event.target.value)
  }
  const handleChangeFuerza = (event) => {
    setFuerzaN(event.target.value)    
  }
  const handleChangeFortaleza = (event) => {
    setFortalezaN(event.target.value)    
  }
  const handleChangeDestreza = (event) => {
    setDestrezaN(event.target.value)    
  }
  const handleChangeAgilidad = (event) => {
    setAgilidadN(event.target.value)    
  }
  const handleChangeSabiduria = (event) => {
    setSabiduriaN(event.target.value)    
  }
  const handleChangePresencia = (event) => {
    setPresenciaN(event.target.value)    
  }
  const handleChangePrincipio = (event) => {
    setPrincipioN(event.target.value)    
  }
  const handleChangeSentidos = (event) => {
    setSentidosN(event.target.value)    
  }
  const handleChangeAcademisismo = (event) => {
    setAcademisismoN(event.target.value)    
  }
  const handleChangeAlerta = (event) => {
    setAlertaN(event.target.value)    
  }
  const handleChangeAtletismo = (event) => {
    setAtletismoN(event.target.value)    
  }
  const handleChangeConBakemono = (event) => {
    setConBakemonoN(event.target.value)    
  }
  const handleChangeMentir = (event) => {
    setMentirN(event.target.value)    
  }
  const handleChangePilotear = (event) => {
    setPilotearN(event.target.value)    
  }
  const handleChangeArtesMarciales = (event) => {
    setArtesMarcialesN(event.target.value)    
  }
  const handleChangeMedicina = (event) => {
    setMedicinaN(event.target.value)    
  }
  const handleChangeObjMagicos = (event) => {
    setConObjMagicosN(event.target.value)    
  }
  const handleChangeSigilo = (event) => {
    setSigiloN(event.target.value)    
  }
  const handleChangeConEsferas = (event) => {
    setConEsferasN(event.target.value)    
  }
  const handleChangeConLeyendas = (event) => {
    setConLeyendasN(event.target.value)    
  }
  const handleChangeForja = (event) => {
    setForjaN(event.target.value)    
  }
  const handleChangeConDemonio = (event) => {
    setConDemonioN(event.target.value)    
  }
  const handleChangeConEspiritual = (event) => {
    setConEspiritualN(event.target.value)    
  }
  const handleChangeManejoBlaster = (event) => {
    setManejoBlasterN(event.target.value)    
  }
  const handleChangeManejoSombras = (event) => {
    setManejoSombrasN(event.target.value)    
  }
  const handleChangeTratoBakemono = (event) => {
    setTratoBakemonoN(event.target.value)    
  }
  const handleChangeConHechiceria = (event) => {
    setConHechiceriaN(event.target.value)    
  }
  const handleChangeMedVital = (event) => {
    setMedVitalN(event.target.value)    
  }
  const handleChangeMedEspiritual = (event) => {
    setMedEspiritualN(event.target.value)    
  }
  const handleChangeRayo = (event) => {
    setRayoN(event.target.value)    
  }
  const handleChangeVeneno = (event) => {
    setVenenoN(event.target.value)    
  }
  const handleChangeFuego = (event) => {
    setFuegoN(event.target.value)    
  }
  const handleChangeFrio = (event) => {
    setFrioN(event.target.value)    
  }
  const handleChangeCorte = (event) => {
    setCorteN(event.target.value)    
  }
  const handleChangeEnergia = (event) => {
    setEnergiaN(event.target.value)    
  }
  const handleChangeApCombate = (event) => {
    setApCombateN(event.target.value)   
  }
  const handleChangeValCombate = (event) => {
    setValCombateN(event.target.value)
  }
  const handleChangeApCombate2 = (event) => {
    setApCombate2N(event.target.value)   
  }
  const handleChangeValCombate2 = (event) => {
    setValCombate2N(event.target.value)
  }
  const handleChangeAdd1=(event)=>{
    setAdd1N(event.target.value)
  }
  const handleChangeValAdd1=(event)=>{
    setValAdd1N(event.target.value)
  }
  const handleChangeAdd2=(event)=>{
    setAdd2N(event.target.value)
  }
  const handleChangeValAdd2=(event)=>{
    setValAdd2N(event.target.value)
  }
   const handleChangeAdd3=(event)=>{
    setAdd3N(event.target.value)
   }
   const handleChangeValAdd3=(event)=>{
    setValAdd3N(event.target.value)
   }
   const handleChangeAdd4=(event)=>{
    setAdd4N(event.target.value)
   }
   const handleChangeValAdd4=(event)=>{
    setValAdd4N(event.target.value)
   }



  const handleChangeIniciativa = (event) => {
    setIniciativaN(event.target.value)
  }

 //nueva caracteristica resistencia
 const handleChangeResistencia= (event)=>{
  setResistenciaN(event.target.value)
}



  const handleChangeNaturaleza= (event)=>{
    setNaturalezaN(event.target.value)
  }
  const handleChangeConviccion= (event)=>{
    setConviccionN(event.target.value)
  }










const btnGuardarCambios = () => {
   
  const index = personajes.findIndex(pj => pj.idpersonaje == idpersonaje);

 //console.log("ultimo valores",personajes)
  const nuevosPersonajes = [...personajes];


  nuevosPersonajes[index] = {
    ...nuevosPersonajes[index],

    nombre: nombreN,
    dominio: dominioN,
    raza:razaN,
    edad:edadN,
    imagen: imagenN,
    ken:kenN,
    ki:kiN,
    destino:destinoN,
    pDestino:pDestinoN,
    fuerza: fuerzaN,
    fortaleza: fortalezaN,
    destreza: destrezaN,
    agilidad: agilidadN,
    sabiduria:sabiduriaN,
    presencia:presenciaN,
    principio:principioN,
    sentidos:sentidosN,
    academisismo:academisismoN,
    alerta:alertaN,
    atletismo:atletismoN,
    conBakemono:conBakemonoN,
    mentir:mentirN,
    pilotear:pilotearN,
    artesMarciales:artesMarcialesN,
    medicina:medicinaN,
    conObjMagicos:conObjMagicosN,
    sigilo:sigiloN,
    conEsferas:conEsferasN,
    conLeyendas:conLeyendasN,
    forja:forjaN,
    conDemonio:conDemonioN,
    conEspiritual:conEspiritualN,
    manejoBlaster:manejoBlasterN,
    manejoSombras:manejoSombrasN,
    tratoBakemono:tratoBakemonoN,
    conHechiceria:conHechiceriaN,
    medVital:medVitalN,
    medEspiritual:medEspiritualN,
    rayo:rayoN,
    fuego:fuegoN,
    frio:frioN,
    veneno:venenoN,
    corte:corteN,
    energia:energiaN,
    apCombate: apCombateN,
    valCombate: valCombateN,
    apCombate2: apCombate2N,
    valCombate2: valCombate2N,
    ventajas: ventajasN,
    inventario:inventarioN,
    dominios:dominiosN,
    hechizos:hechizosN,

    kenActual:kenActual,
    kiActual:kiActual,
    positiva:positiva,
    negativa:negativa,
    vidaActual:vidaActual,

    add1:add1N,
    valAdd1: valAdd1N,
    add2:add2N,
    valAdd2: valAdd2N,
    add3:add3N,
    valAdd3: valAdd3N,
    add4:add4N,
    valAdd4: valAdd4N,

    consumision: consumision,
    
    iniciativa:iniciativaN,
    historia:historiaN,
    naturaleza:naturalezaN,
    tecEspecial:tecEspecialN,
    conviccion: conviccionN,
    cicatriz: cicatriz,  
    resistencia:resistenciaN,
  };


  setPersonajes(nuevosPersonajes);
 /* Swal.fire({
    position: "top-center",
    icon: "success",
    title: `Los cambios de ${nombre} fueron guardados`,
    showConfirmButton: false,
    timer: 1500
  });*/
}

const guardarCambiosBBDD = async () => {
  try { 
    const personaje = {
      nombre: nombreN,
      dominio: dominioN,
      raza:razaN,
      naturaleza:naturalezaN,
      edad:edadN,
      ken:kenN || 0,
      ki:kiN || 0,
      destino:destinoN || 0,
      pDestino:pDestinoN || 0,
      fuerza: fuerzaN|| 0,
      fortaleza: fortalezaN || 0,
      destreza: destrezaN || 0,
      agilidad: agilidadN || 0,
      sabiduria:sabiduriaN || 0,
      presencia:presenciaN || 0,
      principio:principioN ||0,
      sentidos:sentidosN ||0,
      academisismo:academisismoN ||0,
      alerta:alertaN ||0,
      atletismo:atletismoN||0,
      conBakemono:conBakemonoN ||0,
      mentir:mentirN ||0,
      pilotear:pilotearN||0,
      artesMarciales:artesMarcialesN ||0,
      medicina:medicina ||0,
      conObjMagicos:conObjMagicosN ||0,
      sigilo:sigilo ||0,
      conEsferas:conEsferasN ||0,
      conLeyendas:conLeyendasN ||0,
      forja:forjaN ||0,
      conDemonio:conDemonioN ||0,
      conEspiritual:conEspiritualN ||0,
      manejoBlaster:manejoBlasterN ||0,
      manejoSombras:manejoSombrasN ||0,
      tratoBakemono:tratoBakemonoN ||0,
      conHechiceria:conHechiceriaN ||0,
      medVital:medVitalN ||0,
      medEspiritual:medEspiritualN ||0,
      rayo:rayoN ||0,
      fuego:fuegoN ||0,
      frio:frioN ||0,
      veneno:venenoN ||0,
      corte:corteN ||0,
      energia:energiaN ||0,
      ventajas:ventajasN,    
      apCombate: apCombateN,
      valCombate: valCombateN ||0,
      apCombate2:apCombate2N,
      valCombate2:valCombate2N ||0,
      add1:add1N ||"",
      valAdd1: valAdd1N || 0,
      add2:add2N,
      valAdd2: valAdd2N || 0,
      add3:add3N,
      valAdd3: valAdd3N || 0,
      add4:add4N,
      valAdd4: valAdd4N || 0,
      imagen: imagenN,
      inventario: inventarioN,//JSON
      dominios: dominiosN,//JASON

      kenActual:kenActual || 0,
      kiActual:kiActual || 0,    
      positiva:positiva,
      negativa:negativa,
      vidaActual:vidaActual,

      hechizos:hechizosN,//JSON

      consumision:consumision || 0,

      iniciativa: iniciativaN || 0,
      historia:historiaN,
      usuarioId: usuarioId,
      tecEspecial: tecEspecialN,
      conviccion: conviccionN || "",

      cicatriz: cicatriz || 0,
      resistencia: resistenciaN || 0,
    };
    
    //const response = await axios.put(`http://localhost:4000/update-personaje/${idpersonaje}`, personaje, {
    const response = await axios.put(`${apiUrl}/update-personaje/${idpersonaje}`, personaje, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Cambios guardados exitosamente:', response.data);

    Swal.fire({
      icon: 'success',
      title: '¡Cambios!',
      text: 'Los cambios se han guardado correctamente.',
      confirmButtonText: 'Aceptar'
    });

  } catch (error) {
    console.error('Error al guardar cambios:', error);
  }
};



useEffect(() => {
 btnGuardarCambios();
}, [ 
  nombreN,
  dominioN,
  razaN,
  edadN,
  imagenN,
  kenN,
  kiN,
  destinoN,
  pDestinoN,
  fuerzaN,
  fortalezaN,
  destrezaN,
  agilidadN,
  sabiduriaN,
  presenciaN,
  principioN,
  sentidosN,
  academisismoN,
  alertaN,
  atletismoN,
  conBakemonoN,
  mentirN,
  pilotearN,
  artesMarcialesN,
  medicinaN,
  conObjMagicosN,
  sigiloN,
  conEsferasN,
  conLeyendasN,
  forjaN,
  conDemonioN,
  conEspiritualN,
  manejoBlasterN,
  manejoSombrasN,
  tratoBakemonoN,
  conHechiceriaN,
  medVitalN,
  medEspiritualN,
  rayoN,
  fuegoN,
  frioN,
  venenoN,
  corteN,
  energiaN,
  apCombateN,
  valCombateN,
  apCombate2N,
  valCombate2N,
  ventajasN,
  inventarioN,
  dominiosN,
  hechizosN,
  kenActualN,
  kiActualN,
  positivaN,
  negativaN,
  damageActualN,
  add1N,
  valAdd1N,
  add2N,
  valAdd2N,
  add3N,
  valAdd3N,
  add4N,
  valAdd4N,
  consumisionN,
  iniciativaN,
  historiaN,
  naturalezaN,
  tecEspecialN,
  conviccionN,
  cicatrizN,
  resistenciaN,
]);

 
  const handleEliminarPj = async() => {

      const eliminar= await eliminarPj(personaje.idpersonaje);

      

      if(eliminar===true){
        try { 
          //const response = await axios.delete(`http://localhost:4000/deletePersonaje/${idpersonaje}`);
          const response = await axios.delete(`${apiUrl}/deletePersonaje/${idpersonaje}`);
          } catch (error) {
            console.error('Error al eliminar el personaje:', error);
          }
      }

    
  };



  const presentar=()=>{



 // console.log("Usuario id presnetado: ",usuarioId)
  
    // Calcula vidaPositiva
    const vidaPositivaMensaje = (fortalezaN + kiN) * positivaN;

  let msgEnviar = {
      image: imagenN, 
      idpersonaje: idpersonaje,
      usuarioId: usuarioId,
      vidaPositiva: vidaPositivaMensaje,
      nombre:nombreN,
    };
  
    // Enviar la imagen y el idpersonaje a través del socket
    socket.emit('image', msgEnviar);
  }

  const [contador, setContador] = useState(2);
  




   // Función para convertir números a romanos
   const convertirARomanos = (numero) => {
    const valores = [
      { valor: 1000, simbolo: 'M' },
      { valor: 900, simbolo: 'CM' },
      { valor: 500, simbolo: 'D' },
      { valor: 400, simbolo: 'CD' },
      { valor: 100, simbolo: 'C' },
      { valor: 90, simbolo: 'XC' },
      { valor: 50, simbolo: 'L' },
      { valor: 40, simbolo: 'XL' },
      { valor: 10, simbolo: 'X' },
      { valor: 9, simbolo: 'IX' },
      { valor: 5, simbolo: 'V' },
      { valor: 4, simbolo: 'IV' },
      { valor: 1, simbolo: 'I' },
    ];

    let resultado = '';
    for (const { valor, simbolo } of valores) {
      while (numero >= valor) {
        resultado += simbolo;
        numero -= valor;
      }
    }
    return resultado;
  };

  
  const clonar=()=>{  
    agregarPersonaje()
  }


  const agregarPersonaje = async () => {
  
    setContador(contador+1)

    const pjNuevo = {      
      nombre:`${nombre} ${convertirARomanos(contador)}`,
      dominio: dominio,
      raza:raza,
      naturaleza:naturaleza,
      edad:edad,
      ken:ken || 0,
      ki:ki || 0,
      destino:destino || 0,
      pDestino:pDestino || 0,
      fuerza: fuerza || 0,
      fortaleza: fortaleza || 0,
      destreza: destreza || 0,
      agilidad: agilidad || 0,
      sabiduria:sabiduria || 0,
      presencia:presencia || 0,
      principio:principio ||0,
      sentidos:sentidos ||0,
      academisismo:academisismo ||0,
      alerta:alerta ||0,
      atletismo:atletismo ||0,
      conBakemono:conBakemono ||0,
      mentir:mentir||0,
      pilotear:pilotear ||0,
      artesMarciales:artesMarciales ||0,
      medicina:medicina ||0,
      conObjMagicos:conObjMagicos ||0,
      sigilo:sigilo ||0,
      conEsferas:conEsferas ||0,
      conLeyendas:conLeyendas ||0,
      forja:forja ||0,
      conDemonio:conDemonio ||0,
      conEspiritual:conEspiritual ||0,
      manejoBlaster:manejoBlaster ||0,
      manejoSombras:manejoSombras ||0,
      tratoBakemono:tratoBakemono ||0,
      conHechiceria:conHechiceria ||0,
      medVital:medVital ||0,
      medEspiritual:medEspiritual ||0,
      rayo:rayo ||0,
      fuego:fuego ||0,
      frio:frio ||0,
      veneno:veneno ||0,
      corte:corte ||0,
      energia:energia ||0,
      ventajas:ventajas,
      apCombate: apCombate,
      valCombate: valCombate ||0,
      apCombate2:apCombate2,
      valCombate2:valCombate2 ||0,
      add1:add1,
      valAdd1: valAdd1 || 0,
      add2:add2,
      valAdd2: valAdd2 || 0,
      add3:add3,
      valAdd3: valAdd3 || 0,
      add4:add4,
      valAdd4: valAdd4 || 0,
      imagen: imagen,
      inventario: inventario,
      dominios: dominios,
      kenActual:ken || 0,
      kiActual:ki || 0,
      positiva:positiva,
      negativa:negativa,
      vidaActual:0,
      hechizos:hechizos,
      consumision:consumision || 0,
      iniciativa:(parseInt(sentidos)+parseInt(agilidad)) || 0,
      historia:"",
      conviccion: conviccion || "",
      cicatriz: cicatriz || 0,
      resistencia:(parseInt(fortaleza)+parseInt(fuerza)) || 0,
      usuarioId: usuarioId, 
    };


    try {  
      const response = await axios.post(`${apiUrl}/insert-personaje`, pjNuevo, {   
      //const response = await axios.post(`http://localhost:4000/insert-personaje`, pjNuevo, { 
      headers: {
          'Content-Type': 'application/json', 
        },
      });
      const { idpersonaje } = response.data;
      
      setPersonajes([...personajes, { ...pjNuevo, idpersonaje }]);
  
    } catch (error) {
      console.error('Error al insertar el personaje:', error.message);
    }
    
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: `${nombre} fue clonado`,
      showConfirmButton: false,
      timer: 1500
    });
   
  };


 
  

const isChecked = pjsCombinados.some((pj) => pj.idpersonaje === idpersonaje);

const combinarPjs = (idpersonaje, nombre, imagen, isAdding) => {
  const nuevoPJ = { idpersonaje, nombre, imagen };

  setPjsCombinados((prevPjs) => {
    if (isAdding) {
      // Agregar si no está en la lista
      if (!prevPjs.some((pj) => pj.idpersonaje === idpersonaje)) {
        return [...prevPjs, nuevoPJ];
      }
    } else {
      // Quitar si está en la lista
      return prevPjs.filter((pj) => pj.idpersonaje !== idpersonaje);
    }
    return prevPjs; // Devuelve el estado sin cambios si no se hace nada
  });
};

const handleCheckboxChange = () => {
  combinarPjs(idpersonaje, nombreN, imagenN, !isChecked);
};

const renderTooltipCombinados = () => (
  <Tooltip id={`tooltip-${idpersonaje}`} style={{textAlign: 'center' }}>
    <p>Agrega el pj a tiradas</p>
  </Tooltip>
);
  
  return (
    <>
    <div className='container'>
         <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems: "center", width: "100%"}}>
         <p style={{color:"yellow", fontSize:"2em", fontFamily:"cursive",flex:"1",textAlign:"center"}}>{nombreN}</p>
         
         <OverlayTrigger
              placement="top" // Puedes elegir entre "top", "bottom", "left", "right"
              overlay={renderTooltipCombinados()}  >
                <input 
                  type="checkbox" 
              

                  checked={isChecked} // Maneja el estado
                  onChange={handleCheckboxChange} // Cambia el estado y llama a la función
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer"
                  }}
                />
            </OverlayTrigger>
         </div>
       
        <div className='row col2' style={{marginBottom:"1em", marginTop:"2.5em"}}>
          <div className='col1'>
            <img src={imagenN} alt="imagen del personaje" className={vivoMuerto ? "imagenPj" : "muertoPJ"} />
            <Button onClick={handleImageUpload} variant="outline-danger" style={{width:"30%",fontSize:"10px", marginTop:"3px"}}>Seleccionar Imagen</Button>
            <input type="file" accept="image/*" ref={inputFileRef} style={{ display: 'none' }} onChange={handleFileChange} />
          </div>
          <div className='col1'>
            <label htmlFor="">Nombre:</label>
            <input type="text" value={nombreN} onChange={handleChangeNombre} placeholder="ingrese nombre" />
            <label htmlFor="">Dominio:</label>
            <input type="text" value={dominioN} onChange={handleChangeDominio} placeholder="ingrese dominio" />
            <label htmlFor="">Raza:</label>
            <input type="text" value={razaN} onChange={handleChangeRaza} placeholder="ingrese raza" />
            <label htmlFor="">Naturaleza:</label>
            <input type="text" value={naturalezaN} onChange={handleChangeNaturaleza} placeholder="ingrese naturaleza" />
            <label htmlFor="">Edad:</label>
            <input type="text" value={edadN} onChange={handleChangeEdad} placeholder="ingrese edad" />
            <label htmlFor="">Convicion:</label>
            <input type="text" value={conviccionN} onChange={handleChangeConviccion} placeholder="ingrese conviccion" />
          
            <div className='col4' style={{gap:"10%" ,justifyContent: "center"}}>
              <div className='col1' >
              <label htmlFor="">Ki</label>
              <input type="number"  value={kiN} onChange={handleChangeKi} placeholder="0" />
              </div>
              
              <div className='col1'>
              <label htmlFor="">Ken</label>
              <input type="number" value={kenN} onChange={handleChangeKen} placeholder="0" />
              </div>

              <div className='col1'>
              <label htmlFor="">Destino</label>
              <input type="number" value={destinoN} onChange={handleChangeDestino} placeholder="0" />
              </div>
              <div className='col1'>
              <label htmlFor="">P. Destino</label>
              <input type="number" value={pDestinoN} onChange={handleChangePdestino} placeholder="0" />
              </div>
            </div>
            ´{/*<Button onClick={()=>combinarPjs(idpersonaje,nombreN,imagenN)} variant='outline-warning'>combinar pj</Button>*/}
         
           
           
          </div>
        </div>
        </div>

      <Accordion defaultActiveKey={['0']} alwaysOpen>
      
      <Accordion.Item eventKey="0">
        <Accordion.Header style={{textAlign:"center"}}>Caracteristicas</Accordion.Header>
        <Accordion.Body style={{backgroundColor:"black", padding:"0px"}}>
       

       <div className='gradComp '>
       <div className="caracTronco" style={{marginTop:"2em"}} >
          <div className='circularContainer'>
          <input className='inputCirculo' type="number" value={fuerzaN} onChange={handleChangeFuerza} placeholder="Fza" />
          <label htmlFor="" >Fuerza</label>
          </div> 

          <div className='circularContainer'>
          <input className='inputCirculo' type="number" value={fortalezaN} onChange={handleChangeFortaleza} placeholder="Fort" />
          <label htmlFor="">Fortaleza</label>
          </div>         
          
          <div className='circularContainer'>    
          <input className='inputCirculo'  type="number" value={destrezaN} onChange={handleChangeDestreza} placeholder="Des"/>    
          <label htmlFor="">Destreza</label>   
          </div>

          <div className='circularContainer'>     
          <input className='inputCirculo' type="number" value={agilidadN} onChange={handleChangeAgilidad} placeholder="Agi" /> 
          <label htmlFor="">Agilidad</label>  
          </div>
        
          <div className='circularContainer'>
          <input className='inputCirculo' type="number" value={sabiduriaN} onChange={handleChangeSabiduria} placeholder="Sab" />
          <label   htmlFor="">Sabiduria</label>
          </div>

          <div className='circularContainer'>
          <input className='inputCirculo'  type="number" value={presenciaN} onChange={handleChangePresencia} placeholder="Pre" />
          <label  htmlFor="">Presencia</label>
          </div>
         
         <div className='circularContainer'>
         <input className='inputCirculo'  type="number" value={principioN} onChange={handleChangePrincipio} placeholder="Pri" />
         <label   htmlFor="">Principio</label>
         </div>
      
         <div className='circularContainer'>      
         <input className='inputCirculo'  type="number" value={sentidosN} onChange={handleChangeSentidos} placeholder="Sen" />
         <label  htmlFor="">Sentidos</label>
         </div>
         
          

          <div className='circularContainer' style={{marginLeft:"5em"}}>          
          <input className='inputCirculo' style={{borderRadius:"15px", height:"40px"}} type="number" value={iniciativaN} onChange={handleChangeIniciativa} placeholder="0" />
          <label htmlFor="" >Iniciativa</label>
          </div>

          <div className='circularContainer' style={{marginLeft:"1em"}}>          
          <input className='inputCirculo' style={{borderRadius:"15px", height:"40px"}} type="number" value={resistenciaN} onChange={handleChangeResistencia} placeholder="0" />
          <label htmlFor="" >Resistencia</label>
          </div>
          

        </div>

       <div className="caracSecu" style={{padding:"15px"}}>
        
       
        <div className='circularContainer'>
        <label htmlFor="">Academisismo</label>
        <input type="number" value={academisismoN} onChange={handleChangeAcademisismo} placeholder="0" />
        </div>

        <div className='circularContainer'>
        <label htmlFor="">Alerta</label>
        <input type="number" value={alertaN} onChange={handleChangeAlerta} placeholder="0" />
        </div>
       
      <div className='circularContainer'>
      <label htmlFor="">Artes marciales</label>
      <input type="number" value={artesMarcialesN} onChange={handleChangeArtesMarciales} placeholder="0" />
      </div>
       
      <div className='circularContainer'>
     <input className="inputLabel"  style={{border:"none"}}  type="text" value={apCombate2N} onChange={handleChangeApCombate2} placeholder="ingrese Arma:"/>
     <input type="number" value={valCombate2N} onChange={handleChangeValCombate2} placeholder="0"/>
     </div>
   
     <div className='circularContainer'>
     <input className="inputLabel" style={{border:"none"}} type="text" value={apCombateN} onChange={handleChangeApCombate} placeholder="ingrese Arma:"/>
     <input type="number" value={valCombateN} onChange={handleChangeValCombate} placeholder="0"/>
     </div>

       <div className='circularContainer'>
     <label htmlFor="">Con. de Esferas</label>
     <input type="number" value={conEsferasN} onChange={handleChangeConEsferas} placeholder="0" />  
     </div>

       <div className='circularContainer'>
       <label htmlFor="">Atletismo</label>
       <input type="number" value={atletismoN} onChange={handleChangeAtletismo} placeholder="0" />  
       </div>
  
       <div className='circularContainer'>
     <input className="inputLabel"  style={{border:"none"}} type="text" value={add2N} onChange={handleChangeAdd2} placeholder="Ap. nueva:"/>
     <input type="number" value={valAdd2N} onChange={handleChangeValAdd2} placeholder="0"/>
     </div>
   

     <div className='circularContainer'>
     <input className="inputLabel"  style={{border:"none"}} type="text" value={add1N} onChange={handleChangeAdd1} placeholder="Ap. nueva:"/>
     <input type="number" value={valAdd1N} onChange={handleChangeValAdd1} placeholder="0"/>
     </div>
      
  
     <div className='circularContainer'>
     <input  className="inputLabel" style={{border:"none"}} type="text"  value={add3N} onChange={handleChangeAdd3} placeholder="Ap. nueva:"/>
     <input type="number" value={valAdd3N} onChange={handleChangeValAdd3} placeholder="0"/>
     </div>




     <div className='circularContainer'>
       <label htmlFor="">Mentir</label>
       <input type="number" value={mentirN} onChange={handleChangeMentir} placeholder="0" />
       </div>

     
       
   
     <div className='circularContainer'>
     <label htmlFor="">Medicina</label>
     <input type="number" value={medicinaN} onChange={handleChangeMedicina} placeholder="0" />
     </div>

     
     <div className='circularContainer'>
     <label htmlFor="">Con. Obj Magicos</label>
     <input type="number" value={conObjMagicosN} onChange={handleChangeObjMagicos} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Sigilo</label>
     <input type="number" value={sigiloN} onChange={handleChangeSigilo} placeholder="0" />
     </div>
     
     <div className='circularContainer'>
     <input  className="inputLabel" style={{border:"none"}} type="text" value={add4N} onChange={handleChangeAdd4} placeholder="Ap. nueva:"/>
     <input type="number" value={valAdd4N} onChange={handleChangeValAdd4} placeholder="0"/>
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Con. de Leyendas</label>
     <input type="number" value={conLeyendasN} onChange={handleChangeConLeyendas} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Forja</label>
     <input type="number" value={forjaN} onChange={handleChangeForja} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Con. Demonio</label>
     <input type="number" value={conDemonioN} onChange={handleChangeConDemonio} placeholder="0" />
     </div>  

     <div className='circularContainer'>
     <label htmlFor="">Con. Espiritual</label>
     <input type="number" value={conEspiritualN} onChange={handleChangeConEspiritual} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Manejo de Blaster</label>
     <input type="number" value={manejoBlasterN} onChange={handleChangeManejoBlaster} placeholder="0" />
     </div>


     <div className='circularContainer'>
       <label htmlFor="">Con. Bakemono</label>
       <input type="number" value={conBakemonoN} onChange={handleChangeConBakemono} placeholder="0" />
       </div>
     


       <div className='circularContainer'>
       <label htmlFor="">Pilotear</label>
       <input type="number" value={pilotearN} onChange={handleChangePilotear} placeholder="0" />
       </div>

   
      
     <div className='circularContainer'>
     <label htmlFor="">Manejo de sombras</label>
     <input type="number" value={manejoSombrasN} onChange={handleChangeManejoSombras} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Trato Bakemono</label>
     <input type="number" value={tratoBakemonoN} onChange={handleChangeTratoBakemono} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Con. de hechiceria</label>
     <input type="number" value={conHechiceriaN} onChange={handleChangeConHechiceria} placeholder="0" />
     </div>
     
     <div className='circularContainer'>
     <label htmlFor="">Meditacion vital</label>
     <input type="number" value={medVitalN} onChange={handleChangeMedVital} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Meditacion Espiritual</label>
     <input type="number" value={medEspiritualN} onChange={handleChangeMedEspiritual} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Res. Esp. Rayo</label>
     <input type="number" value={rayoN} onChange={handleChangeRayo} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Res. Esp. Veneno</label>
     <input type="number" value={venenoN} onChange={handleChangeVeneno} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Res. Esp. Fuego</label>
     <input type="number" value={fuegoN} onChange={handleChangeFuego} placeholder="0" />
     </div>  

     <div className='circularContainer'>
     <label htmlFor="">Res Esp. Frio</label>
     <input type="number" value={frioN} onChange={handleChangeFrio} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Res. Esp. Corte</label>
     <input type="number" value={corteN} onChange={handleChangeCorte} placeholder="0" />
     </div>

     <div className='circularContainer'>
     <label htmlFor="">Res. Esp. Energia</label>
     <input type="number" value={energiaN} onChange={handleChangeEnergia} placeholder="0" />
     </div>

       </div>

       </div>
    
          
        </Accordion.Body>
      </Accordion.Item>
      
      <Accordion.Item eventKey="1">
        <Accordion.Header>Ventajas y desventajas</Accordion.Header>
        <Accordion.Body  style={{backgroundColor:"black"}}>
         <div>
          <VentajasN ventajasN={ventajasN} setVentajasN={setVentajasN}></VentajasN>
         </div>
        </Accordion.Body>
      </Accordion.Item>


      <Accordion.Item eventKey="2">
        <Accordion.Header style={{textAlign:"center"}}>Inventario</Accordion.Header>
        <Accordion.Body  style={{backgroundColor:"black"}}>
        <div>
          <Inventario inventarioN={inventarioN} setInventarioN={setInventarioN}></Inventario>
        </div>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>Dominios y Tecnicas</Accordion.Header>
        <Accordion.Body  style={{backgroundColor:"black"}}>
        <div>
        <Dominios dominiosN={dominiosN} setDominiosN={setDominiosN}></Dominios>
        </div>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="4">
        <Accordion.Header>Hechiceria</Accordion.Header>
        <Accordion.Body  style={{backgroundColor:"black"}}>
        <div>
        <Hechizos hechizosN={hechizosN} setHechizosN={setHechizosN}></Hechizos>
        </div>
         
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="5">
        <Accordion.Header>Historia de personaje</Accordion.Header>
        <Accordion.Body  style={{backgroundColor:"black"}}>
        <div>
        <Historia historiaN={historiaN} setHistoriaN={setHistoriaN}></Historia>
        </div>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="6">
        <Accordion.Header>Tecnicas, poderes y objetos especiales</Accordion.Header>
        <Accordion.Body  style={{backgroundColor:"black"}}>
        <div>
        <TecnicaEspecial tecEspecialN={tecEspecialN} setTecEspecialN={setTecEspecialN}></TecnicaEspecial>
        </div>
        </Accordion.Body>
      </Accordion.Item>


    </Accordion>   

     
   



    <div style={{padding:"2rem"}} className='col1'>
     
    <div>
      <Button variant="outline-danger" onClick={handleEliminarPj} style={{width:"150px", marginTop:"10px", marginRight:"1em"}}>Eliminar Pj</Button>
   

      <Button variant="outline-success"  onClick={guardarCambiosBBDD} style={{width:"150px", marginTop:"10px", marginRight:"1em"}}>Guardar Cambios</Button>
      {estatus=="narrador"?(<Button variant="outline-warning"  onClick={presentar} style={{width:"150px", marginTop:"10px", marginRight:"1em"}}>Presentar</Button>):(<></>)}
      
      
      
      {estatus=="narrador"?(<Button variant="outline-primary"  onClick={clonar} style={{width:"150px", marginTop:"10px"}}>Clonar</Button>):(<></>)}
     
    </div>
       
    </div>

   
    </>
    
     
  )
}






