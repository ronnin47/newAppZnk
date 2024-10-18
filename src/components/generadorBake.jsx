import React, { useRef, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';


export const GeneradorBake = ({
    setActiveKey,
    personajes,
    setPersonajes,
   
  
    setRaza,
    setEdad,
    imagen,
    setImagen,
    setKen,
  
    setDestino,
    setPdestino,
    fuerza,
    setFuerza,
    fortaleza,
    setFortaleza,
    destreza,
    setDestreza,
    agilidad,
    setAgilidad,
    principio,
    setPrincipio,
    presencia,
    setPresencia,
    sentidos,
    setSentidos,
    sabiduria,
    setSabiduria,
  
    ki,
    setKi,
  
    raza,
    edad,
    ken,
  
    destino,
    pDestino,
    
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
    setAcademisismo,
    setAlerta,
    setAtletismo,
    setConBakemono,
    setMentir,
    setPilotear,
    setArtesMarciales,
    setMedicina,
    setConObjMagicos,
    setSigilo,
    setConEsferas,
    setConLeyendas,
    setForja,
    setConDemonio,
    setConEspiritual,
    setManejoBlaster,
    setManejoSombras,
    setTratoBakemono,
    setConHechiceria,
    setMedVital,
    setMedEspiritual,
    setRayo,
    setFuego,
    setFrio,
    setVeneno,
    setCorte,
    setEnergia,
    setApCombate,
    setValCombate,
    setApCombate2,
    setValCombate2,
    apCombate,
    valCombate,
    apCombate2,
    valCombate2,
    ventajas,
    setVentajas,
    inventario,
    dominios,
    kenActual,
    positiva,
    negativa,
    vidaActual,
    hechizos,
    add1,
    setAdd1,
    valAdd1,
    setValAdd1,
    add2,
    setAdd2,
    valAdd2,
    setValAdd2,
    add3,
    setAdd3,
    valAdd3,
    setValAdd3,
    add4,
    setAdd4,
    valAdd4,
    setValAdd4,
    consumision,
    naturaleza,
    setNaturaleza,
    usuarioId,
    conviccion,
    setConviccion,
    cicatriz,
    setCicatriz,
    setPositivaActual,
    setNegativaActual,
  }) => {
  
    //useState de este componente 
    const [nombre, setNombre] = useState("");
    const [dominio, setDominio] = useState("");
    const [dificultad, setDificultad] = useState("basica");
  

  //IMAGEN 
  const inputFileRef = useRef(null);
  const handleImageUpload = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagen(reader.result);
    };
    reader.readAsDataURL(file);
  };
  

//Input nombre
  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  //selecion dominio para el tipo de Kaiju
  const handleChangeDominio = (event) => {
    const selectedDominio = event.target.value;
    setDominio(selectedDominio);

    switch (selectedDominio) {
        case "Trasgo":
          setImagen("/trasgo.jpg");
          break;
      
        case "Aracnida":
          setImagen("/aracnida.jfif");       
          break;
      
        case "Abeja":
          setImagen("/abeja.jpg");         
          break;

          case "Rata":
          setImagen("/rata.jpg");
          break;
      
        case "Kriak":
          setImagen("/kriak.jfif");       
          break;
      
        case "Bagu":
          setImagen("/bagu.jfif");         
          break;

          case "Cangrejogro":
          setImagen("/cangrejogro.jfif");
          break;
      
        case "Troll":
          setImagen("/troll.jpg");       
          break;
      
        case "Aparicion":
          setImagen("/aparicion.jpg");         
          break;
          
          case "Gatana":
          setImagen("/gatana.jpg");
          break;
      
        case "Wuargo":
          setImagen("/wuargo.jfif");       
          break;
      
        case "Zombi":
          setImagen("/zombi.jfif");         
          break;

        case "Esqueleto":
          setImagen("/esqueleto.jfif");
          break;
      
        case "Necrofago":
          setImagen("/necrofago.jpg");       
          break;
      
        case "Zing":
          setImagen("/zing.jpg");         
          break;

        case "Kappa":
          setImagen("/kappa.jpg");
          break;
      
        case "Gargola":
          setImagen("/gargola.jfif");
          break;

        case "Babosa":
          setImagen("/babosa.jpg");
          break;

        case "Escorpion":
          setImagen("/escorpion.jfif");
          break;

        case "Sierpe":
          setImagen("/sierpe.jpg");
          break;

        case "Caballero":
          setImagen("/caballero.jpg");
          break;

        case "Licano":
          setImagen("/licano.jfif");       
          break;
      
       
      
        default:
          // Acción por defecto si no coincide con ninguno de los casos anteriores
          break;
    }
    
  };

  //selecion de dificultad
  const handleChangeDificultad = (event) => {
    const selectedDificultad = event.target.value;
    setDificultad(selectedDificultad);
    
  };

  
  //insertar bakemono
    const agregarPersonaje = async () => {

   
        console.log("DIFICULTAD: ",dificultad);
        console.log("DOMINIO: ",dominio);
        
        

    let fuerzaBase, fortalezaBase, destrezaBase, agilidadBase, sabiduriaBase, presenciaBase, sentidosBase, principioBase, kiBase;
    let valCombateBase, alertaBase, sigiloBase, atletismoBase, corteBase, fuegoBase, rayoBase, energiaBase, venenoBase, frioBase;
    
    let fuerzaBono, fortalezaBono, destrezaBono, agilidadBono, sabiduriaBono, presenciaBono, sentidosBono, principioBono, kiBono;
    let valCombateBono, alertaBono, sigiloBono, atletismoBono, corteBono, fuegoBono, rayoBono, energiaBono, venenoBono, frioBono;
    
    let positivaBase, negativaBase;
    
    switch (dominio) {
       

        case "Trasgo":
        
        fuerzaBase = 15;
        fortalezaBase = 10;
        destrezaBase = 10;
        agilidadBase = 15;
        sabiduriaBase = 10;
        presenciaBase = 20;
        sentidosBase = 10;
        principioBase = 5;
        kiBase = 10;
        valCombateBase = 20;
        alertaBase = 40;
        sigiloBase = 20;
        atletismoBase = 20;
      

        positivaBase = 1;
        negativaBase = 1;
        break;

        case "Aracnida":
          fuerzaBase = 15;
          fortalezaBase = 10;
          destrezaBase = 10;
          agilidadBase = 15;
          sabiduriaBase = 10;
          presenciaBase = 20;
          sentidosBase = 10;
          principioBase = 10;
          kiBase = 10;
          valCombateBase = 20;
          alertaBase = 40;
          sigiloBase = 20;
          atletismoBase = 20;
          frioBase = 20;
          positivaBase = 1;
          negativaBase = 1;
          break;

        case "Abeja":
          fuerzaBase = 15;
          fortalezaBase = 10;
          destrezaBase = 20;
          agilidadBase = 10;
          sabiduriaBase = 10;
          presenciaBase = 20;
          sentidosBase = 10;
          principioBase = 20;
          kiBase = 10;
          valCombateBase = 20;
          alertaBase = 20;
          sigiloBase = 0;
          atletismoBase = 20;
          rayoBase = 20;

          positivaBase = 1;
          negativaBase = 1;
        break;
       
        case "Rata":
        
        fuerzaBase = 10;
        fortalezaBase = 15;
        destrezaBase = 10;
        agilidadBase = 15;
        sabiduriaBase = 20;
        sentidosBase = 20;
        principioBase = 10;
        presenciaBase = 20;
        kiBase = 10;
        valCombateBase = 20;
        alertaBase = 30;
        sigiloBase = 20;
        atletismoBase = 20;
       

        positivaBase = 1;
        negativaBase = 1;

        break;

        case "Kriak":
          fuerzaBase = 40;
          fortalezaBase = 20;
          destrezaBase = 20;
          agilidadBase = 20;
          sabiduriaBase = 10;
          presenciaBase = 40;
          sentidosBase = 20;
          principioBase = 10;
          kiBase = 20;
          valCombateBase = 40;
          alertaBase = 20;
          sigiloBase = 0;
          atletismoBase = 20;
          fuegoBase = 20;
          positivaBase = 6;
          negativaBase = 3;
          break;
        
        case "Bagu":

        fuerzaBase = 30;
        fortalezaBase = 10;
        destrezaBase = 20;
        agilidadBase = 10;
        sabiduriaBase = 20;
        sentidosBase = 20;
        principioBase = 5;
        presenciaBase = 30;
        kiBase = 20;
        valCombateBase = 30;
        alertaBase = 30;
        sigiloBase = 30;
        atletismoBase = 20;
        corteBase=20;
        fuegoBase=20;
       

        positivaBase = 3;
        negativaBase = 3;

        break;

        case "Cangrejogro":
        
        fuerzaBase = 40;
        fortalezaBase = 30;
        destrezaBase = 20;
        agilidadBase = 10;
        sabiduriaBase = 30;
        sentidosBase = 10;
        principioBase = 10;
        presenciaBase = 40;
        kiBase = 20;
        valCombateBase = 40;
        alertaBase = 20;
        sigiloBase = 0;
        atletismoBase = 20;
        corteBase=20;
        fuegoBase=20;
       

        positivaBase = 6;
        negativaBase = 3;

        break;

        case "Troll":

        fuerzaBase = 40;
        fortalezaBase = 30;
        destrezaBase = 20;
        agilidadBase = 10;
        sabiduriaBase = 30;
        sentidosBase = 10;
        principioBase = 10;
        presenciaBase = 40;
        kiBase = 20;
        valCombateBase = 40;
        alertaBase = 20;
        sigiloBase = 0;
        atletismoBase = 20;
        corteBase=0;
        fuegoBase=0;
       

        positivaBase = 6;
        negativaBase = 3;
        
        break;

        case "Aparicion":
        
        fuerzaBase = 25;
        fortalezaBase = 10;
        destrezaBase = 20;
        agilidadBase = 20;
        sabiduriaBase = 20;
        sentidosBase = 30;
        principioBase = 10;
        presenciaBase = 20;
        kiBase = 20;
        valCombateBase = 30;
        alertaBase = 30;
        sigiloBase = 30;
        atletismoBase = 20;
        corteBase=0;
        fuegoBase=0;
       

        positivaBase = 3;
        negativaBase = 3;
        
        break;

       case "Gatana":

              fuerzaBase = 40;
              fortalezaBase = 30;
              destrezaBase = 20;
              agilidadBase = 20;
              sabiduriaBase = 20;
              sentidosBase = 20;
              principioBase = 10;
              presenciaBase = 40;
              kiBase = 20;
              valCombateBase = 40;
              alertaBase = 20;
              sigiloBase = 20;
              atletismoBase = 20;
              corteBase=0;
              fuegoBase=0;
              

              positivaBase = 3;
              negativaBase = 3;

              break;

        case "Wuargo":

              fuerzaBase = 20;
              fortalezaBase = 20;
              destrezaBase = 20;
              agilidadBase = 20;
              sabiduriaBase = 20;
              sentidosBase = 20;
              principioBase = 10;
              presenciaBase = 30;
              kiBase = 20;
              valCombateBase = 30;
              alertaBase = 30;
              sigiloBase = 20;
              atletismoBase = 20;
              corteBase=0;
              fuegoBase=0;
              

              positivaBase = 3;
              negativaBase = 3;

              break;
                
        case "Zombi":

                fuerzaBase = 15;
                fortalezaBase = 10;
                destrezaBase = 10;
                agilidadBase = 1;
                sabiduriaBase = 1;
                sentidosBase = 5;
                principioBase = 1;
                presenciaBase = 20;
                kiBase = 10;
                valCombateBase = 30;
                alertaBase = 0;
                sigiloBase = 20;
                atletismoBase = 0;
                corteBase=0;
                fuegoBase=0;
                

                positivaBase = 3;
                negativaBase = 0;

              break;

        case "Esqueleto":

              fuerzaBase = 20;
              fortalezaBase = 10;
              destrezaBase = 20;
              agilidadBase = 10;
              sabiduriaBase = 10;
              sentidosBase = 10;
              principioBase = 1;
              presenciaBase = 30;
              kiBase = 10;
              valCombateBase = 30;
              alertaBase = 20;
              sigiloBase = 20;
              atletismoBase = 20;
              frioBase=20;
              

              positivaBase = 3;
              negativaBase = 0;

            break;

        case "Necrofago":

            fuerzaBase = 20;
            fortalezaBase = 10;
            destrezaBase = 20;
            agilidadBase = 10;
            sabiduriaBase = 20;
            sentidosBase = 10;
            principioBase = 1;
            presenciaBase = 30;
            kiBase = 20;
            valCombateBase = 40;
            alertaBase = 20;
            sigiloBase = 20;
            atletismoBase = 20;
            frioBase=0;
            

            positivaBase = 3;
            negativaBase = 0;

          break;

         case "Zing":

          fuerzaBase = 20;
          fortalezaBase = 10;
          destrezaBase = 20;
          agilidadBase = 20;
          sabiduriaBase = 20;
          sentidosBase = 10;
          principioBase = 1;
          presenciaBase = 30;
          kiBase = 20;
          valCombateBase = 30;
          alertaBase = 30;
          sigiloBase = 30;
          atletismoBase = 20;
          frioBase=0;
          

          positivaBase = 2;
          negativaBase = 0;

        break;

         case "Kappa":

  fuerzaBase = 30;
  fortalezaBase = 30;
  destrezaBase = 20;
  agilidadBase = 20;
  sabiduriaBase = 10;
  sentidosBase = 20;
  principioBase = 10;
  presenciaBase = 40;
  kiBase = 20;
  valCombateBase = 40;
  alertaBase = 20;
  sigiloBase = 20;
  atletismoBase = 20;
  frioBase=0;
 

  positivaBase = 3;
  negativaBase = 3;

break;
              
         case "Gargola":
  fuerzaBase = 30;
  fortalezaBase = 30;
  destrezaBase = 20;
  agilidadBase = 30;
  sabiduriaBase = 30;
  sentidosBase = 30;
  principioBase=20;
  presenciaBase = 40;

  kiBase = 30;
  
  valCombateBase = 40;
  alertaBase = 40;
  sigiloBase = 30;
  atletismoBase = 30;
  corteBase = 40;
  positivaBase = 3;
  negativaBase = 3;
  break;      

         case "Babosa":
    fuerzaBase = 40;
    fortalezaBase = 30;
    destrezaBase = 20;
    agilidadBase = 10;
    sabiduriaBase = 20;
    sentidosBase = 20;
    principioBase=35;
    presenciaBase = 40;
    
    kiBase = 30;
    valCombateBase = 40;
    alertaBase = 20;
    sigiloBase = 0;
    atletismoBase = 0;
    frioBase = 20;
    positivaBase = 6;
    negativaBase = 3;
    break;

          case "Escorpion":
      fuerzaBase = 50;
      fortalezaBase = 40;
      destrezaBase = 30;
      agilidadBase = 20;
      sabiduriaBase = 40;
      principioBase=20;
      sentidosBase = 20;
      presenciaBase = 60;
      kiBase = 40;

      valCombateBase = 60;
      alertaBase = 40;
      sigiloBase = 40;
      atletismoBase = 0;
      frioBase = 30;

      positivaBase = 6;
      negativaBase = 3;
      break;

          case "Sierpe":
        fuerzaBase = 50;
        fortalezaBase = 30;
        destrezaBase = 30;
        agilidadBase = 20;
        sabiduriaBase = 40;
        principioBase= 30;
        sentidosBase = 40;
        presenciaBase = 60;
        kiBase = 40;
        valCombateBase = 60;
        alertaBase = 40;
        sigiloBase = 0;
        atletismoBase = 30;
        corteBase = 0;
        positivaBase = 6;
        negativaBase = 3;
        break;

          case "Caballero":
          fuerzaBase = 50;
          fortalezaBase = 30;
          destrezaBase = 30;
          agilidadBase = 20;
          sabiduriaBase = 40;
          principioBase = 20;
          sentidosBase = 20;
          presenciaBase = 50;

          kiBase = 40;
          valCombateBase = 60;
          alertaBase = 40;
          sigiloBase = 20;
          atletismoBase = 0;
          frioBase = 40;
          positivaBase = 3;
          negativaBase = 0;
          break;

         case "Licano":
          fuerzaBase = 50;
          fortalezaBase = 40;
          destrezaBase = 40;
          agilidadBase = 30;
          sabiduriaBase = 30;
          principioBase= 10;
          sentidosBase = 30;
          presenciaBase = 60;
          kiBase = 40;
          valCombateBase = 60;
          alertaBase = 40;
          sigiloBase = 30;
          atletismoBase = 30;
          corteBase = 40;
          positivaBase = 3;
          negativaBase = 3;
          break;

        default:
        // Acción por defecto si no coincide con ninguno de los casos anteriores
        break;
    }


    // Funciones para generar números aleatorios según la dificultad
    const getRandomBonusD10 = () => Math.floor(Math.random() * 10) + 1;
    const getRandomBonusD20 = () => Math.floor(Math.random() * 20) + 1;
    const getRandomBonusD30 = () => Math.floor(Math.random() * 30) + 1;
    const getRandomBonusD40 = () => Math.floor(Math.random() * 40) + 1;
    const getRandomBonusD50 = () => Math.floor(Math.random() * 50) + 1;
    const getRandomBonusD60 = () => Math.floor(Math.random() * 60) + 1;
    const getRandomBonusD70 = () => Math.floor(Math.random() * 70) + 1;
    const getRandomBonusD80 = () => Math.floor(Math.random() * 80) + 1;
    const getRandomBonusD90 = () => Math.floor(Math.random() * 90) + 1;
    const getRandomBonusD100 = () => Math.floor(Math.random() * 100) + 1;



  
   
switch (dificultad) {
    case "normal":
      fuerzaBono = 0;
      destrezaBono = 0;
      agilidadBono = 0;
      sabiduriaBono = 0;
      fortalezaBono = 0;
      presenciaBono = 0;
      sentidosBono = 0;
      principioBono = 0;
      kiBono = 0;
  
      valCombateBono = 0;
      alertaBono = 0;
      sigiloBono = 0;
      atletismoBono = 0;
      



      break;
  
    case "entrenamiento":
      fuerzaBono = 0 + getRandomBonusD10();
      destrezaBono = 0 + getRandomBonusD10();
      agilidadBono = 0 + getRandomBonusD10();
      sabiduriaBono = 0 + getRandomBonusD10();
      fortalezaBono = 0 + getRandomBonusD10();
      presenciaBono = 0 + getRandomBonusD10();
      sentidosBono = 0 + getRandomBonusD10();
      principioBono = 0 + getRandomBonusD10();
  
      valCombateBono = 0 + getRandomBonusD20();
      alertaBono = 0 + getRandomBonusD20();
      sigiloBono = 0 + getRandomBonusD20();
      atletismoBono = 0 + getRandomBonusD20();
  
      if (corteBase > 0) {
        corteBono = getRandomBonusD10();
      }
      if (rayoBase > 0) {
        rayoBono = getRandomBonusD10();
      }
      if (frioBase > 0) {
        frioBono = getRandomBonusD10();
      }
      if (fuegoBase > 0) {
        fuegoBono = getRandomBonusD10();
      }
      if (venenoBase > 0) {
        venenoBono = getRandomBonusD10();
      }
  
      kiBono = 0 + getRandomBonusD10();
      break;
  
    case "experto":

     //de esta manera controlo el nivel de ki de los monstruos
    if(kiBase<30){
      kiBase=30
    }
    kiBono = 0 + getRandomBonusD30();

    if((kiBase+ kiBono)>=60){
      kiBono=60-kiBase-1
    }

      fuerzaBono = 10 + getRandomBonusD20();
      destrezaBono = 10 + getRandomBonusD20();
      agilidadBono = 10 + getRandomBonusD20();
      sabiduriaBono = 10 + getRandomBonusD20();
      fortalezaBono = 10 + getRandomBonusD20();
      presenciaBono = 10 + getRandomBonusD20();
      sentidosBono = 10 + getRandomBonusD20();
      principioBono = 10 + getRandomBonusD20();
  
     

      valCombateBono = 20 + getRandomBonusD40();
      alertaBono = 10 + getRandomBonusD20();
      sigiloBono = 10 + getRandomBonusD30();
      atletismoBono = 10 + getRandomBonusD20();


      if (corteBase > 0) {
        corteBono = getRandomBonusD20();
      }
      if (rayoBase > 0) {
        rayoBono = getRandomBonusD20();
      }
      if (frioBase > 0) {
        frioBono = getRandomBonusD20();
      }
      if (fuegoBase > 0) {
        fuegoBono = getRandomBonusD20();
      }
      if (venenoBase > 0) {
        venenoBono = getRandomBonusD20();
      }
  
  
      if (positivaBase || negativaBase < 3) {
        positivaBase = 3;
        negativaBase = 3;
      }
      break;
  
    case "extraordinaria":

   
    if(kiBase<60){
      kiBase=60
    }

    kiBono = 0 + getRandomBonusD40();

    if((kiBase+ kiBono)>=100){
      kiBono=100-kiBase-1
    }

      fuerzaBono = 20 + getRandomBonusD50();
      destrezaBono = 20 + getRandomBonusD50();
      agilidadBono = 20 + getRandomBonusD20();
      sabiduriaBono = 20 + getRandomBonusD30();
      fortalezaBono = 20 + getRandomBonusD50();
      presenciaBono = 20 + getRandomBonusD50();
      sentidosBono = 20 + getRandomBonusD30();
      principioBono = 20 + getRandomBonusD20();
  
      

      valCombateBono = 40 + getRandomBonusD50();
      alertaBono = 20 + getRandomBonusD40();
      sigiloBono = 20 + getRandomBonusD40();
      atletismoBono = 20 + getRandomBonusD40();

      if (corteBase > 0) {
        corteBono = getRandomBonusD30();
      }
      if (rayoBase > 0) {
        rayoBono = getRandomBonusD30();
      }
      if (frioBase > 0) {
        frioBono = getRandomBonusD30();
      }
      if (fuegoBase > 0) {
        fuegoBono = getRandomBonusD30();
      }
      if (venenoBase > 0) {
        venenoBono = getRandomBonusD30();
      }
  
  
      if (positivaBase || negativaBase < 3) {
        positivaBase = 3;
        negativaBase = 3;
      }
      break;
  
    case "epica":

    if(kiBase<100){
      kiBase=100
    }
    kiBono = 0 + getRandomBonusD20();

    if((kiBase+ kiBono)>=140){
      kiBono=140-kiBase-1
    }
      fuerzaBono = 50 + getRandomBonusD100();
      fortalezaBono = 50 + getRandomBonusD100();
      destrezaBono = 50 + getRandomBonusD80();
      agilidadBono = 20 + getRandomBonusD50();
      sabiduriaBono = 10 + getRandomBonusD50();
      presenciaBono = 80 + getRandomBonusD50();
      sentidosBono = 50 + getRandomBonusD50();
      principioBono = 50 + getRandomBonusD50();
      

      valCombateBono = 60 + getRandomBonusD100();
      alertaBono = 0 + getRandomBonusD50();
      sigiloBono = 0 + getRandomBonusD50();
      atletismoBono = 0 + getRandomBonusD50();

      if (corteBase > 0) {
        corteBono = 40 + getRandomBonusD50();
      }
      if (rayoBase > 0) {
        rayoBono = 40 + getRandomBonusD50();
      }
      if (frioBase > 0) {
        frioBono = 40 + getRandomBonusD50();
      }
      if (fuegoBase > 0) {
        fuegoBono = 40 + getRandomBonusD50();
      }
      if (venenoBase > 0) {
        venenoBono = 40 + getRandomBonusD50();
      }
  
  
      if (positivaBase < 7) {
        positivaBase = 12;
        negativaBase = 3;
      }
      break;
  
    default:
      break;
  }
            
// Ahora sumamos base + bonificación para obtener los valores finales

        const fuerzaFinal = (fuerzaBase || 0) + (fuerzaBono || 0);
        const fortalezaFinal = (fortalezaBase || 0) + (fortalezaBono || 0);
        const destrezaFinal = (destrezaBase || 0) + (destrezaBono || 0);
        const agilidadFinal = (agilidadBase || 0) + (agilidadBono || 0);
        const sabiduriaFinal = (sabiduriaBase || 0) + (sabiduriaBono || 0);
        const presenciaFinal = (presenciaBase || 0) + (presenciaBono || 0);
        const sentidosFinal = (sentidosBase || 0) + (sentidosBono || 0);
        const principioFinal = (principioBase || 0) + (principioBono || 0);

        const kiFinal = (kiBase || 0) + (kiBono || 0);

        const valCombateFinal = (valCombateBase || 0) + (valCombateBono || 0);
        const alertaFinal = (alertaBase || 0) + (alertaBono || 0);
        const sigiloFinal = (sigiloBase || 0) + (sigiloBono || 0);
        const atletismoFinal = (atletismoBase || 0) + (atletismoBono || 0);

        const frioFinal = (frioBase || 0) + (frioBono || 0);
        const corteFinal = (corteBase || 0) + (corteBono || 0);
        const fuegoFinal = (fuegoBase || 0) + (fuegoBono || 0);

        const rayoFinal = (rayoBase || 0) + (rayoBono || 0);
        const energiaFinal = (energiaBase || 0) + (energiaBono || 0);
        const venenoFinal = (venenoBase || 0) + (venenoBono || 0);

        const positivaFinal = positivaBase || 0;
        const negativaFinal = negativaBase || 0;
    
    
          const pjNuevo = {
            nombre: nombre,
            dominio: dominio,
            raza:raza,
            naturaleza:naturaleza,
            edad:edad,
            ken:ken || 0,
            ki:kiFinal || 0,
            destino:destino || 0,
            pDestino:pDestino || 0,
            fuerza: fuerzaFinal || 0,
            fortaleza: fortalezaFinal || 0,
            destreza: destrezaFinal || 0,
            agilidad: agilidadFinal || 0,
            sabiduria: sabiduriaFinal || 0,
            presencia: presenciaFinal || 0,
            principio: principioFinal || 0,
            sentidos: sentidosFinal || 0,
            academisismo:academisismo ||0,
            alerta:alertaFinal ||0,
            atletismo:atletismoFinal ||0,
            conBakemono:conBakemono ||0,
            mentir:mentir||0,
            pilotear:pilotear ||0,
            artesMarciales:artesMarciales ||0,
            medicina:medicina ||0,
            conObjMagicos:conObjMagicos ||0,
            sigilo:sigiloFinal ||0,
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
            rayo:rayoFinal ||0,
            fuego:fuegoFinal ||0,
            frio:frioFinal ||0,
            veneno:venenoFinal ||0,
            corte:corteFinal ||0,
            energia:energiaFinal ||0,
            ventajas:ventajas,
            apCombate: apCombate || "Combate",
            valCombate: valCombateFinal ||0,
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
            kiActual:kiFinal || 0,
            positiva: positivaFinal || 3,
            negativa: negativaFinal === 0 ? 0 : (negativaFinal ?? 3),
            vidaActual:0,
            hechizos:hechizos,
            consumision:consumision || 0,
            iniciativa:(parseInt(sentidosFinal)+parseInt(agilidadFinal)) || 0,
            historia:"",
            conviccion: conviccion || "",
            cicatriz: cicatriz || 0,
            usuarioId: usuarioId, 
        };
    
        try {
          //const response = await axios.post("http://localhost:4000/insert-personaje", pjNuevo, {
           const response = await axios.post("https://zepironokioku.onrender.com/insert-personaje", pjNuevo, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const { idpersonaje } = response.data;
          setPersonajes([...personajes, { ...pjNuevo, idpersonaje }]);
        } catch (error) {
          console.error('Error al insertar el personaje:', error.message);
        }
    
        setNombre("");
        setDominio("");
        setImagen("/imagenBase.jpeg");
        
    
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${nombre} fue cargado`, // Corregido aquí
          showConfirmButton: false,
          timer: 1500
        });
      };
  

    return (
   
    <>
      <div className='container' style={{border:"3px solid red", borderRadius:"15px", padding:"2em"}}>
        <div className='row col1'style={{marginTop:"2em"}}>
          <div className='row col2'>
            <div className='col1'>
              <img src={imagen} className="imagenBakemono" />
              <button onClick={handleImageUpload} className='btn btn-danger' style={{ width: "30%", fontSize: "10px", marginTop: "3px" }}>Seleccionar Imagen</button>
              <input type="file" accept="image/*" ref={inputFileRef} style={{ display: 'none' }} onChange={handleFileChange} />
            </div>
            <div className='col1'>
              <label htmlFor=""  >Nombre:</label>
              <input type="text" value={nombre} onChange={handleChangeNombre} style={{width:"60%", border:"3px solid aliceblue", borderRadius:"15px"}} placeholder="ingrese nombre" />
              <label htmlFor="">Tipo:</label>
              <select value={dominio}  className="select" onChange={handleChangeDominio}>
                <option value="">Selecciona un tipo</option>
                <option value="Trasgo">Trasgo</option>
                <option value="Aracnida">Aracnida</option>
                <option value="Abeja">Abeja tormenta</option>
                <option value="Rata">Rata Gremlin</option>
                <option value="Kriak">Kriak</option>
                <option value="Bagu">Bagu</option>
                <option value="Cangrejogro">Cangrejogro</option>
                <option value="Troll">Trol Hermetico</option>
                <option value="Aparicion">Aparicion de los callejones</option>
                <option value="Gatana">Gatana</option>
                <option value="Wuargo">Wuargo</option>
                <option value="Zombi">Zombi</option>
                <option value="Esqueleto">Esqueleto</option>
                <option value="Necrofago">Necrofago</option>
                <option value="Zing">Zing</option>
                <option value="Kappa">Kappa</option>
                <option value="Gargola">Gargola del Ebano</option>
                <option value="Babosa">Babosa devoradora</option>
                <option value="Escorpion">Escorpion medusa</option>
                <option value="Sierpe">Sierpe</option>
                <option value="Caballero">Caballero</option>
                <option value="Licano">Licano</option>
             
                
              </select>


              <label htmlFor="">Dificultad:</label>
              <select value={dificultad} className="select" onChange={handleChangeDificultad} >
              <option value="">Selecciona dificultad</option>
              <option value="normal">Basica</option>
              <option value="entrenamiento">Entrenamiento</option>
              <option value="experto">Especial</option>
              <option value="extraordinaria">Extraordinaria</option>
              <option value="epica">Epica</option>
            </select>
            </div>

            
          </div>
        </div>

        <div className='col1'>
          <button className="btn btn-success" style={{ width: "150px", marginTop: "10px" }} onClick={agregarPersonaje}>Crear Kaiju</button>
        </div>
      </div>
    </>
      
    
  )
}


