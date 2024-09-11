import React, { useRef, useEffect } from 'react';
import { useState } from "react"
import Swal from 'sweetalert2';
import { VentajasN } from './ventajasN.jsx';
import { Inventario } from "./inventario.jsx"
import { Dominios } from './dominios.jsx';
import { BarraKen } from './barraKen.jsx';
import { BarraKi } from './barraKi.jsx';
import {BarraVida} from "./barraVida.jsx";
import { Hechizos } from './hechizos.jsx';
import { Historia } from './historia.jsx';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import { TecnicaEspecial } from './tecEspecial.jsx';


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

}) => {
  

 
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
  
  const [kenActualN,setKenActualN]=useState(kenActual)

  const [kiActualN,setKiActualN]=useState(kiActual)
  const [positivaN,setPositivaN]=useState(positiva)
  const [negativaN,setNegativaN]=useState(negativa)
  const [damageActualN,setDamageActualN]=useState(vidaActual)
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
  const [add4N,setAdd4N]=useState(add4)
  const [valAdd4N,setValAdd4N]=useState(valAdd4)

  
 const [iniciativaN,setIniciativaN]=useState(iniciativa) 
 const [historiaN,setHistoriaN]=useState(historia)
 
 
 const [tecEspecialN,setTecEspecialN]=useState(tecEspecial)

 
 const [conviccionN,setConviccionN]=useState(conviccion);
 const [cicatrizN,setCicatrizN]=useState(cicatriz);

 

 useEffect(()=>{
  
  },[vivoMuerto])


  useEffect(() => {
    const vidaTotal=(parseInt(kiN)+parseInt(fortalezaN))*(positivaN+negativaN)
    //console.log("VIDA total: ", vidaTotal)
    if (damageActualN > vidaTotal) {
      setVivoMuerto(false);
    } else {
      setVivoMuerto(true);
    }
  }, [damageActualN,kiN,fortalezaN,positivaN,negativaN]);



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
  const handleChangeNaturaleza= (event)=>{
    setNaturalezaN(event.target.value)
  }
  const handleChangeConviccion= (event)=>{
    setConviccionN(event.target.value)
  }



  //aca andamos trabajando en la solucion de imagen
 //const [imagenPreview, setImagenPreview] = useState('/imagenBase.jpeg'); 
 const [imagenPreview, setImagenPreview] = useState(imagenN); 
 const inputFileRef = useRef(null);

 const handleImageUpload = () => {
   inputFileRef.current.click();
 };

const handleFileChange = (e) => {
  const file = e.target.files[0];

  // Validar si es un archivo válido (por ejemplo, que sea imagen)
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    
    // Guardamos el archivo en el estado para luego ser subido al servidor
    setImagenN(file);

    // Vista previa de la imagen
    reader.onload = () => {
      setImagenPreview(reader.result); // Aquí guardas la URL de la vista previa
    };

    // Leer el archivo como data URL
    reader.readAsDataURL(file);
  } else {
    // Maneja el error, si el archivo no es una imagen válida
    alert("Por favor, selecciona un archivo de imagen válido.");
  }
};
 




//este es el boton de abajo que guarda cambios en la base de datos
const guardarCambiosBBDD = async () => {
  
    // Inicializamos la URL de la imagen
    let imagenUrl = imagenN;

    // Verificamos si hay una nueva imagen para subir
    if (imagenN && imagenN instanceof File) {
      // Si `imagenN` es un archivo, subimos la imagen
      const formData = new FormData();
      formData.append('image', imagenN);  // La clave 'image' debe coincidir con lo que espera el servidor
      
      try {
        //const response = await axios.post('http://localhost:4000/upload', formData, {
          const response = await axios.post('https://zepironokioku.onrender.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
 
        // Verificamos que la imagen se haya subido correctamente
        if (response.status === 200 && response.data.filename) {
          // Obtenemos la URL de la imagen subida
         // imagenUrl = `http://localhost:4000/uploads/${response.data.filename}`;
         imagenUrl = `https://zepironokioku.onrender.com/uploads/${response.data.filename}`;
        
        } else {
          console.error('Error al subir la imagen');
          return;
        }
      } catch (error) {
        console.error('Error en la subida de la imagen:', error);
        return;
      }
    } else if (typeof imagenN === 'string') {
      // Si `imagenN` es una URL, usamos la URL proporcionada
      console.log('Usando la URL de la imagen proporcionada.');
    } else {
      console.error('La imagen proporcionada no es válida.');
      return;
    }



  try {
    console.log("Guardando cambios del personaje con id:", idpersonaje);
     // Crear una URL para el archivo si imagenN está definido
     //const imagenUrl = imagenN ? URL.createObjectURL(imagenN) : null;
    // Supongamos que el personaje tiene estos datos
   
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
      
      //aca estamos probando
      imagen: imagenUrl,//aca estamos probandolo



      inventario: inventarioN,//JSON
      dominios: dominiosN,//JASON

      kenActual:kenActualN || 0,
      kiActual:kiActualN || 0,
      
      positiva:positivaN,
      negativa:negativaN,
      vidaActual:damageActualN,
      hechizos:hechizosN,//JSON
      consumision:consumisionN || 0,
      iniciativa: iniciativaN || 0,
      historia:historiaN,
      usuarioId: usuarioId,
      tecEspecial: tecEspecialN,

      conviccion: conviccionN || "",
      cicatriz: cicatrizN || 0,
    };
    
    //const response = await axios.put(`http://localhost:4000/update-personaje/${idpersonaje}`, personaje, {
    const response = await axios.put(`https://zepironokioku.onrender.com/update-personaje/${idpersonaje}`, personaje, {
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

//funcion que se dispara cuando un valor cambia
const btnGuardarCambios = async() => {
  const index = personajes.findIndex(pj => pj.idpersonaje === idpersonaje);

  let imagenUrl = imagenN;

  // Verifica si hay una nueva imagen
  if (imagenN && imagenN instanceof File && imagenN !== '/imagenBase.jpeg') {
    const formData = new FormData();
    formData.append('image', imagenN);
    //const response = await axios.post('http://localhost:4000/upload', formData, {

    try {
      
        const response = await axios.post('https://zepironokioku.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
          //imagenUrl = `http://localhost:4000/uploads/${response.data.filename}`;
      if (response.status === 200) {
        imagenUrl = `https://zepironokioku.onrender.com/uploads/${response.data.filename}`;
    
        console.log("URL de la imagen: ", imagenUrl);
      } else {
        console.error('Error al subir la imagen');
        return;
      }
    } catch (error) {
      console.error('Error en la subida de la imagen:', error);
      return;
    }
  }
  
  // Crea una copia del array de personajes
  const nuevosPersonajes = [...personajes];

  
  nuevosPersonajes[index] = {

    ...nuevosPersonajes[index],

    nombre: nombreN,
    dominio: dominioN,
    raza:razaN,
    edad:edadN,

    imagen: imagenUrl,

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
    kenActual:kenActualN,
    kiActual:kiActualN,
    positiva:positivaN,
    negativa:negativaN,
    vidaActual:damageActualN,
    add1:add1N,
    valAdd1: valAdd1N,
    add2:add2N,
    valAdd2: valAdd2N,
    add3:add3N,
    valAdd3: valAdd3N,
    add4:add4N,
    valAdd4: valAdd4N,
    consumision: consumisionN,
    iniciativa:iniciativaN,
    historia:historiaN,
    naturaleza:naturalezaN,
    tecEspecial:tecEspecialN,
    conviccion: conviccionN,
    cicatriz: cicatrizN,
    
  };

  // Actualiza el estado de los personajes con la copia modificada
  setPersonajes(nuevosPersonajes);
}

//useEffect que se dispara cuando algun state cambia
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

]);



    const handleEliminarPj = async() => {
       eliminarPj(personaje.idpersonaje);
       
       try {      
        //const response = await axios.delete(`http://localhost:4000/deletePersonaje/${idpersonaje}`);
        const response = await axios.delete(`https://zepironokioku.onrender.com/deletePersonaje/${idpersonaje}`);
        console.log('Personaje eliminado:', response.data);
      } catch (error) {
        console.error('Error al eliminar el personaje:', error);
      }
    };


  return (
    <>
    <div className='container'>
         <p style={{color:"yellow", fontSize:"2em", fontFamily:"cursive",display:"grid",justifyItems:"center"}}>{nombreN}</p>
         <div style={{marginLeft:"20px"}}>  
          <BarraVida cicatrizN={cicatrizN} setCicatrizN={setCicatrizN} nombreN={nombreN} fortalezaN={fortalezaN} kiN={kiN} positivaN={positivaN} setPositivaN={setPositivaN} negativaN={negativaN} setNegativaN={setNegativaN} damageActualN={damageActualN} setDamageActualN={setDamageActualN}></BarraVida>
          <BarraKi nombreN={nombreN} consumisionN={consumisionN} setConsumisionN={setConsumisionN} kiN={kiN} kiActualN={kiActualN} setKiActualN={setKiActualN}></BarraKi>
          <BarraKen nombreN={nombreN} kenN={kenN} kenActualN={kenActualN} setKenActualN={setKenActualN}></BarraKen>
        </div>
        <div className='row col2' style={{marginBottom:"1em", marginTop:"4.5em"}}>


          <div className='col1'>
            <img src={imagenPreview} alt="imagen del personaje" className={vivoMuerto ? "imagenPj" : "muertoPJ"} />
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

          </div>
        </div>
         
    
     

        </div>

      <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header style={{textAlign:"center"}}>Caracteristicas</Accordion.Header>
        <Accordion.Body style={{backgroundColor:"black", padding:"0px"}}>
       
        <div className="col4 gradComp" style={{padding:"15px"}}>
        
        <div className="col1" >          
          <label htmlFor="" >Fuerza:</label>
          <input type="number" value={fuerzaN} onChange={handleChangeFuerza} placeholder="Fza" />
          <label htmlFor="">Fortaleza:</label>
          <input type="number" value={fortalezaN} onChange={handleChangeFortaleza} placeholder="Fort" />
          <label htmlFor="">Destreza:</label>
          <input type="number" value={destrezaN} onChange={handleChangeDestreza} placeholder="Des"/>
          <label htmlFor="">Agilidad</label>
          <input type="number" value={agilidadN} onChange={handleChangeAgilidad} placeholder="Agi" />          
          <label htmlFor="">Sabiduria</label>
          <input type="number" value={sabiduriaN} onChange={handleChangeSabiduria} placeholder="Sab" />
          <label htmlFor="">Presencia</label>
          <input type="number" value={presenciaN} onChange={handleChangePresencia} placeholder="Pre" />
          <label htmlFor="">Principio</label>
          <input type="number" value={principioN} onChange={handleChangePrincipio} placeholder="Pri" />
          <label htmlFor="">Sentidos</label>
          <input type="number" value={sentidosN} onChange={handleChangeSentidos} placeholder="Sen" />

          <div className='col1' style={{marginTop:"20px"}}>
          <label htmlFor="">Iniciativa</label>
          <input type="number" style={{borderRadius:"20px", color:"yellow"}} value={iniciativaN} onChange={handleChangeIniciativa} placeholder="0" />
          </div>
          

          
      
        </div>
        <div className='col1'>
        <label htmlFor="">Academisismo</label>
          <input type="number" value={academisismoN} onChange={handleChangeAcademisismo} placeholder="0" />
          <label htmlFor="">Alerta</label>
          <input type="number" value={alertaN} onChange={handleChangeAlerta} placeholder="0" />
          <label htmlFor="">Atletismo</label>
          <input type="number" value={atletismoN} onChange={handleChangeAtletismo} placeholder="0" />        
          <label htmlFor="">Con. Bakemono</label>
          <input type="number" value={conBakemonoN} onChange={handleChangeConBakemono} placeholder="0" />
          <label htmlFor="">Mentir</label>
          <input type="number" value={mentirN} onChange={handleChangeMentir} placeholder="0" />
          <label htmlFor="">Pilotear</label>
          <input type="number" value={pilotearN} onChange={handleChangePilotear} placeholder="0" />
          <label htmlFor="">Artes marciales</label>
          <input type="number" value={artesMarcialesN} onChange={handleChangeArtesMarciales} placeholder="0" />
          <input style={{border:"3px solid black",width:"80%"}} type="text" value={apCombateN} onChange={handleChangeApCombate} placeholder="ingrese Arma:"/>
          <input type="number" value={valCombateN} onChange={handleChangeValCombate} placeholder="0"/>
          <input style={{border:"3px solid black",width:"80%"}} type="text" value={apCombate2N} onChange={handleChangeApCombate2} placeholder="ingrese Arma:"/>
          <input type="number" value={valCombate2N} onChange={handleChangeValCombate2} placeholder="0"/>

          <input style={{border:"3px solid black",width:"80%"}} type="text" value={add1N} onChange={handleChangeAdd1} placeholder="Ap. nueva:"/>
            <input type="number" value={valAdd1N} onChange={handleChangeValAdd1} placeholder="0"/>
            <input style={{border:"3px solid black", width:"80%"}} type="text" value={add2N} onChange={handleChangeAdd2} placeholder="Ap. nueva:"/>
            <input type="number" value={valAdd2N} onChange={handleChangeValAdd2} placeholder="0"/>
        
        </div>

        <div className='col1'>
          <label htmlFor="">Medicina</label>
          <input type="number" value={medicinaN} onChange={handleChangeMedicina} placeholder="0" />
          <label htmlFor="">Con. Obj Magicos</label>
          <input type="number" value={conObjMagicosN} onChange={handleChangeObjMagicos} placeholder="0" />
          <label htmlFor="">Sigilo</label>
          <input type="number" value={sigiloN} onChange={handleChangeSigilo} placeholder="0" />
          <label htmlFor="">Con. de Esferas</label>
          <input type="number" value={conEsferasN} onChange={handleChangeConEsferas} placeholder="0" />  
          <label htmlFor="">Con. de Leyendas</label>
          <input type="number" value={conLeyendasN} onChange={handleChangeConLeyendas} placeholder="0" />
          <label htmlFor="">Forja</label>
          <input type="number" value={forjaN} onChange={handleChangeForja} placeholder="0" />
          <label htmlFor="">Con. Demonio</label>
          <input type="number" value={conDemonioN} onChange={handleChangeConDemonio} placeholder="0" />
          <label htmlFor="">Con. Espiritual</label>
          <input type="number" value={conEspiritualN} onChange={handleChangeConEspiritual} placeholder="0" />
          <label htmlFor="">Manejo de Blaster</label>
          <input type="number" value={manejoBlasterN} onChange={handleChangeManejoBlaster} placeholder="0" />

          
          <input style={{border:"3px solid black", width:"80%"}} type="text" value={add3N} onChange={handleChangeAdd3} placeholder="Ap. nueva:"/>
            <input type="number" value={valAdd3N} onChange={handleChangeValAdd3} placeholder="0"/>
            <input style={{border:"3px solid black", width:"80%"}} type="text" value={add4N} onChange={handleChangeAdd4} placeholder="Ap. nueva:"/>
            <input type="number" value={valAdd4N} onChange={handleChangeValAdd4} placeholder="0"/>



        </div>

        <div className='col1'>
          <label htmlFor="">Manejo de sombras</label>
          <input type="number" value={manejoSombrasN} onChange={handleChangeManejoSombras} placeholder="0" />
          <label htmlFor="">Trato Bakemono</label>
          <input type="number" value={tratoBakemonoN} onChange={handleChangeTratoBakemono} placeholder="0" />
          <label htmlFor="">Con. de hechiceria</label>
          <input type="number" value={conHechiceriaN} onChange={handleChangeConHechiceria} placeholder="0" />
          <label htmlFor="">Meditacion vital</label>
          <input type="number" value={medVitalN} onChange={handleChangeMedVital} placeholder="0" />
          <label htmlFor="">Meditacion Espiritual</label>
          <input type="number" value={medEspiritualN} onChange={handleChangeMedEspiritual} placeholder="0" />
          <label htmlFor="">Res. Esp. Rayo</label>
          <input type="number" value={rayoN} onChange={handleChangeRayo} placeholder="0" />
          <label htmlFor="">Res. Esp. Veneno</label>
          <input type="number" value={venenoN} onChange={handleChangeVeneno} placeholder="0" />
          <label htmlFor="">Res. Esp. Fuego</label>
          <input type="number" value={fuegoN} onChange={handleChangeFuego} placeholder="0" />
          <label htmlFor="">Res Esp. Frio</label>
          <input type="number" value={frioN} onChange={handleChangeFrio} placeholder="0" />
          <label htmlFor="">Res. Esp. Corte</label>
          <input type="number" value={corteN} onChange={handleChangeCorte} placeholder="0" />
          <label htmlFor="">Res. Esp. Energia</label>
          <input type="number" value={energiaN} onChange={handleChangeEnergia} placeholder="0" />

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
   

      <Button variant="outline-success"  onClick={guardarCambiosBBDD} style={{width:"150px", marginTop:"10px"}}>Guardar Cambios</Button>
    </div>
       
    </div>

   
    </>
    
     
  )
}






