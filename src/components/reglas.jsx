import Table from 'react-bootstrap/Table';


import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';




export const Reglas = () => {
  
    const[tituloCanvas,setTituloCanvas]=useState("");
    const[infoCanvas,setInfoCanvas]=useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (titulo, info) => {
        setTituloCanvas(titulo);
        setInfoCanvas(info);
        setShow(true);
      };
  
  const reglas={
    salud:{
        titulo:"Recuperación de salud:",
        info:"Dependiendo del nivel de la característica Fortaleza que un personaje posea, que tan rápido y bajo qué condiciones este se recuperara de sus lesiones. La puntuación de Fortaleza nos indicará su categoría, y según esta que tan rápido o lento sanaran sus heridas. Un personaje para iniciar su recuperación de salud requerirá de algún efecto de sanación tal como ser atendido con medicina, ingerir una poción curativa o la utilización de un poder mágico de sanación. El personaje tras algún efecto de sanación, se le considerara estabilizado, esto quiere decir que este no perderá puntos de vida y comenzará  a sanar sus heridas según su categoría de fortaleza (además del efecto curativo implementado). Desde categoría de Fortaleza 3, un personaje contará con una capacidad regenerativa extraordinaria por la cual no requerirá sanaciones para curar sus heridas.",
    },
    incremento:{
        titulo:"Incremento de caracteristicas:",
        info:"Incremento de capacidades: Al realizarse una tirada esforzando una característica, no sólo importará el valor obtenido de la suma de los d10, sino que será importante también contar los 10 obtenidos, dado que estos serán éxitos de incremento. Si un personaje obtuviera cierta cantidad de éxitos de incremento (dependiendo del nivel de su característica principal), este conseguirá un incremento permanente en su rama del tronco. Además, al mismo tiempo los éxitos de incremento obtenidos, también incrementarán la aptitud utilizada en combinación de dicha característica. Todos los incrementos obtenidos durante la sesión se sumarán a la ficha de personaje al finalizar la misma, pudiendo notarse la evolución en el siguiente capítulo de la saga.",
    },
    campo:{
        titulo:"Campo de invocacion:",
        info:"Las invocaciones completas son propias de habilidades mágicas que manifestaran efectos contundentes, su canalización tomará todo un turno, en el que invocador deberá detenerse en el sitio envuelto en una potente aura de ki, hasta liberar la impresión mágica deseada. De manera similar sucedera con las invocaciones extendidas, las cuales son aquellas que tomaran más de un turno para concretar la liberación de su magia.Únicamente las técnicas que posean un tiempo de invocación completa o extendida manifestaran alrededor del invocador un potente campo de energía que expulsara a todo agresor hasta concretar la invocación. La protección del campo de invocación dependera de la categoria de ki del invocador, será de 60 p a nivel de ki superior, 100 p a nivel de ki especial, 200 a nivel de ki extraordinario y 300 p a nivel de ki epico, esta se restará a cualquier fuente de daño que intentara impactar. Además si un invocador se encontrara agarrado al realizar una invocación mágica completa, el personaje agresor deberá superar la potencia de su campo de invocación o saldrá expulsado.",
    },
    ken:{
        titulo:"Ken",
        info:"El ken es la fuerza oculta de nuestros jóvenes protagonistas, quienes seguramente a lo largo de su vida han tenido que afrontar difíciles situaciones, momentos donde estos forjaron sus valores. Los personajes de los jugadores al nacer bajo las enigmáticas influencias de las marcas del destino, desde su infancia posiblemente han percibido dicha fuerza oculta, una inexplicable esencia compuesta de poderosas emociones que en las situaciones más cruciales de su vida podría haberse liberado manifestándose para reafirmar sus genuinos deseos.El Ken es la  característica más importante que posee un personaje, este representará su voluntad de superación para cumplir sus metas e ideales, y así algún día alcanzar sus sueños en la vida. Esta característica estará expresada en la ficha de un personaje con un valor que irá incrementando sesión a sesión, producto de su esfuerzo y desarrollo protagónico dentro de las historias.Un personaje inicial comenzará con un puntaje de 100 puntos de ken, este puntaje inicial podrá recibir una bonificación de puntos por la historia del personaje presentada al narrador, la cual le podría otorgar de 10 a 100 puntos adicionales.Un personaje podrá dar uso de su ken, manifestandolo en dos formas narrativas posibles, la liberación total de ken o el uso parcial de ken por nivel de destino. La liberación total de ken será posible cuando un personaje confronte las situaciones antagónicas relacionadas con su propia convicción , siendo así este podrá utilizar su ken totalmente. Mientras que el uso parcial de ken por nivel de destino, será propio de escenas en donde el personaje expresando sus deseos relacionados o no a su convicción en la vida, podrá manifestar parte de su voluntad.",
    },
    estudio:{
        titulo:"Estudio exaustivo",
        info:" Un personaje podrá asimilar conocimientos a través del estudio de manuscritos, para esto el personaje estudiará de estos durante un tiempo el cual estará marcado por su categoría de sabiduría y el nivel de manuscrito.Al transcurrir dicho tiempo dentro de juego el jugador podrá realizar una tirada de Sab+ Academicismo, la dificultad dependerá del nivel de manuscrito (20+20 por nivel de manuscrito). Si logra superar dicha acción de interpretación de lo estudiado obtendrá un puntaje de incremento de 1p por nivel de manuscrito a dicho conocimiento en cuestión.Nota para el narrador: No será necesario que el personaje pase estudiando de corrido el tiempo de estudio requerido, con que este durante dicho tiempo intérprete en sus momentos libres de aventura las escenas de estudio será válido.",
    },
    herbolaria:{
        titulo:"Herbolaria",
        info:"Un personaje al utilizar este conocimiento podrá saber de los diversos elementos especiales que surgen en los escenarios naturales, ya sean plantas de propiedades curativas, hiervas tan filosas como una katana, o inclusive elementos que, al ser correctamente preparados y aplicados, confieran a quien los utilice habilidades fantásticas. Dichos elementos de herbolaria se clasificarán segun su rareza. Aquellos que se puedan encontrar en escenarios comunes tales como arroyos, bosques, llanuras,etc, serán de categoría vulgar. Elementos poco comunes podrían llegar a crecer en pantanos, cavernas montañosas, desiertos o escenarios inhóspitos, aumentando el peligro de su búsqueda. En el caso de los elementos raros, estos se atarán a situaciones específicas o peligrosos escenarios inhóspitos, siendo mucho mayor la dificultad de dar con ellos. A continuación, se detallará un listado de elementos naturales. Siendo que el personaje se encontrará en dicho escenario podría realizar una tirada de Sab+ Herbolaria, el narrador estipulará el tiempo necesario, la dificultad estará detallada en el listado. En el caso de tener éxito la cantidad de elementos encontrados estara sujeta a criterio del narrador.",
    },
    accion:{
        titulo:"Acciones",
        info:"Un personaje a la hora de resolver una acción deberá sumar el valor de una determinada característica principal con una determinada aptitud, consiguiendo así su “valor base” para realizar dicha acción. Si el valor base igualará o superará la dificultad marcada por el narrador no se requerirá una tirada. Las tiradas de dados de esfuerzo, se aplicarán generalmente cuando el personaje no alcanzara la dificultad de la acción, esforzando al máximo su característica principal. Un personaje al esforzarse añadirá 1d10+1d10 adicional cada 10 puntos en la característica principal que se está combinando en dicha acción.",
    },

  }

 
    return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="top">
        <Offcanvas.Header closeButton style={{backgroundColor:"black", color:"aliceblue"}}>
          <Offcanvas.Title >{tituloCanvas}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='topCanvas'>
        {infoCanvas}
        </Offcanvas.Body>
        </Offcanvas>    
        <div className='reglas1Columnas' style={{padding:"1em",fontSize:"0.8em"}}>
       <div className="cuadros lumina">
        <Button style={{border:"2px solid red", color:"yellow", borderRadius:"10px", textAlign:"center",fontSize:"1em",padding:"5px",backgroundColor:"black"}} onClick={()=>handleShow(reglas.accion.titulo,reglas.accion.info)}>
        Acciones
        </Button>
        <Table  className='lumina bordes'>
        <thead>
            <tr>
            <th>Accion</th>
            <th>Caracteristicas</th>
            <th>Dificultad</th>
            <th>Sistema</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>Avistar</td>
            <td>Sen + Alerta</td>
            <td>escana dif 20/distancia 200mts dif 40/distancia 400mts o mas dif 60</td>
            <td>avistar a distancia sera una tirada libre una unica vez por escena</td>
            </tr>

            <tr>
            <td>Medicina</td>
            <td>Sab + Medicina</td>
            <td>tirada libre</td> 
            <td>tras 1hr restaura 1d20 cada 20 p de la tirada/una vez x dia sobre el herido</td>
            </tr>
            
            <tr>
            <td>Cazar</td>
            <td>Des + Alerta</td>
            <td>dif 20 caceria simple/dif 40 caceria normal/dif 60 o superior para dificil</td>
            <td>dependiendo de la situacion de escenario la dificultad de cazar para comer</td>
            </tr>

            <tr>
            <td>Leer mapas</td>
            <td>Sab + Academisimo</td>
            <td>dif 40</td>
            <td>interpretara informaciones de todo tipo maapas de viaje</td>
            </tr>

            <tr>
            <td>Saltar/Caidas/Trepar/carrera</td>
            <td>Agi + Atletismo</td>
            <td>dif 20 x 10 mts</td>          
            <td>proezas de salto, caida, carrera y maniobras para trepar</td>
            </tr>

            <tr>
            <td>Elevar alerta</td>
            <td>Sen + Alerta</td>
            <td>dif enfrentada contra objetivos ocultos/tirada libre</td> 
            <td>el personaje elevara su alerta para percibir la escena</td>
            </tr>      

            <tr>
            <td>Iniciativa</td>
            <td>Sen + Agi</td>
            <td>dependiendo de situacion/tirada libre enfrentada</td> 
            <td>reflejo efectivo ante una situacion especifica</td>
            </tr>

            <tr>
            <td>Sigilo</td>
            <td>Agi + Sigilo/M. de Sombras</td>
            <td>dif enfrentada contra los presentes/tirada libre</td> 
            <td>el personaje se mantendra oculto</td>
            </tr>

            <tr>
            <td>Presicion de Ataque</td>
            <td>Des + Ap. marcial</td>
            <td>dif enfrentada contra def del objetivo/tirada libre</td>
            <td>mide la presicion de un ataque, y como resultado bono de daño por presicion</td>
            </tr>

            <tr>
            <td>Bloqueo</td>
            <td>Fort + Ap. marcial</td>
            <td>dif enfrentada contra presicion de ataques</td>
            <td>defenza contra todos los ataques del turno, siendo exitosa anula resolucion de daño</td>
            </tr>

            <tr>
            <td>Desvio</td>
            <td>Des + Ap. marcial</td>
            <td>dif enfrentada contra presicion de ataques</td>
            <td>defenza desviando contra todos los ataques del turno, siendo exitosa anula resolucion de daño</td>
            </tr>

            <tr>
            <td>Esquiva</td>
            <td>Agi + Ap. marcial/Atletismo</td>
            <td>dif enfrentada contra presicion de ataques</td>
            <td>defenza esquivando contra todos los ataques del turno, siendo exitosa anula resolucion de daño</td>
            </tr>

            <tr>
            <td>Seducir</td>
            <td>Sab + Mentir</td>
            <td>dif enfrentada contra Pre del objetivo</td>
            <td>filirteo para conseguir favores de la victima</td>
            </tr>  

            <tr>
            <td>Metir/detectar mentiras</td>
            <td>Sab + Mentir</td>
            <td>dif enfrentada contra el objetivo/tirada libre</td> 
            <td>tras una hora obtienes visiones si existen fuerzas Yokais</td>
            </tr>          

            <tr>
            <td>Rezo Shintoista</td>
            <td>Sen + Con. Shinto</td>
            <td>dif 40/tirada libre</td> 
            <td>tras una hora obtienes visiones si existen fuerzas Yokais</td>
            </tr>
            
        </tbody>
    </Table>
        

       </div>
      </div>
     
     <div className="reglas4columnas" style={{padding:"1em", fontSize:"0.8em"}}>

        <div className="cuadros lumina">
        <Button style={{border:"2px solid red", color:"yellow", borderRadius:"10px", textAlign:"center",fontSize:"1em",padding:"5px",backgroundColor:"black"}} onClick={()=>handleShow(reglas.salud.titulo,reglas.salud.info)}>
        Recuperacion de Salud
        </Button>

        <Table  className='lumina bordes'>
            <thead>
                <tr>
                <th>Fort</th>
                <th>Fases Positivas</th>
                <th>Fases Negativas</th>
                
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>cat 0 (1 a 9)</td>
                <td>1 fase x dia</td>
                <td>1 fase cada 2 dias</td>
                
                </tr>
                <tr>
                <td>cat 1 (10 a 19)</td>
                <td>1 fase cada 12hrs</td>
                <td>1 fase x dia</td>
                
                </tr>
                <tr>
                <td>cat 2 (20 a 29)</td>
                <td>1 fase cada 6hrs</td>
                <td>1 fase x 12hrs</td>
                
                </tr>
                <tr>
                <td>cat 3 (30 a 39)</td>
                <td>1 fase cada 3hrs/ sin sanacion</td>
                <td>1 fase cada 6hrs</td>
                
                </tr>
                <tr>
                <td>cat 4 (40 a 49)</td>
                <td>1 fase cada 3hrs/ sin sanacion</td>
                <td>1 fase cada 6hrs/ sin sanacion</td>
                
                </tr>
                <tr>
                <td>cat 5 (50 o superior)</td>
                <td>1 fase x hr/ sin sanacion</td>
                <td>1 fase x hr/ sin sanacion</td>
                
                </tr> 
            </tbody>
        </Table>
      </div>





        <div className="cuadros lumina">
        <Button style={{border:"2px solid red", color:"yellow", borderRadius:"10px", textAlign:"center",fontSize:"1em",padding:"5px",backgroundColor:"black"}} onClick={()=>handleShow(reglas.incremento.titulo,reglas.incremento.info)}>
        Incremento de caracteristicas
        </Button>
           <p>Un persoanje segun su valor de caracteristica principal tendra 1d10 + 1d10 adicional cada 10p a sus tiradas de esfuerzo.</p> 
        <Table  className='lumina bordes'>
            <thead>
                <tr>
                <th>Caracteristica</th>
                <th>Exitos de incremento</th>
                
                
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1p a 19p</td>
                <td>Cada 10 en la tirada incrementara 1 p</td>
                
                </tr>
                <tr>
                <td>20p a 59p</td>
                <td>Cada dos 10 en la tirada incrementara 1 p</td>
                
                </tr>
                <tr>
                <td>60p a 99p</td>
                <td>Cada tres 10 en la tirada incrementara 1 p</td>
                
                </tr>
               
            </tbody>
        </Table>
         <p>En el caso de las aptitudes cada 10 incrementará 1 p siempre que estas tengan un puntaje menor a 60 p. En caso de ser mayor a 60 p se incrementará 1 p cada dos 10.</p>

        </div>


        <div className="cuadros lumina">
        <Button style={{border:"2px solid red", color:"yellow", borderRadius:"10px", textAlign:"center",fontSize:"1em",padding:"5px",backgroundColor:"black"}} onClick={()=>handleShow(reglas.campo.titulo,reglas.campo.info)}>
        Campo de Invocacion
        </Button>

        <Table  className='lumina bordes'>
            <thead>
                <tr>
                <th>Aura de ki</th>
                <th>Campo de reduccion</th>
                
                
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Superior (10 a 29)</td>
                <td>60p de reduccion a daños</td>
                
                </tr>
                <tr>
                <td>Especial (30 a 59)</td>
                <td>100p de reduccion a daños</td>
                
                </tr>
                <tr>
                <td>Extraordinario (60 a 99)</td>
                <td>200p de reduccion a daños</td>
                
                </tr>
                <tr>
                <td>Epico (100 a 139)</td>
                <td>300p de reduccion a daños</td>
                
                </tr>
               
            </tbody>
        </Table>
         <p>Cualquier personaje considerado agresor que esté sujetándolo ( agarre o presa), deberá superar el valor de protección del campo para mantenerlo retenido, caso contrario saldrá expulsado. Cuando un personaje realice una invocación completa, este no tendrá disponible su movimiento en el turno.</p>

        </div>   

     </div>

     <div className='reglas2columnas' style={{padding:"1em",fontSize:"0.8em"}}>
     <div className="cuadros lumina">
        <Button style={{border:"2px solid red", color:"yellow", borderRadius:"10px", textAlign:"center",fontSize:"1em",padding:"5px",backgroundColor:"black"}} onClick={()=>handleShow(reglas.ken.titulo,reglas.ken.info)}>
        Proezas del Ken
        </Button>
        <Table  className='lumina bordes'>
        <thead>
            <tr>
            <th>Proezas</th>
            <th>Nivel 1</th>
            <th>Nivel 2</th>
            <th>Nivel 3</th>
            <th>Nivel 4</th>
            
            
            
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>Incrementar esfuerzos</td>
            <td>1 activacion</td>
            <td>2 activaciones</td>
            <td>3 activaciones</td>
            <td>sin limite</td>
            </tr>

            <tr>
            <td>Temple</td>
            <td>1 activacion</td>
            <td>2 activaciones</td>
            <td>3 activaciones</td>
            <td>sin limite</td>              
            </tr>

            <tr>
            <td>Resurgimiento</td>
            <td>----------</td>
            <td>una vez x escena</td>
            <td>dos veces x escena</td>
            <td>sin limite</td>  
            
            </tr>
            <tr>
            <td>Velocidad Extraordianria</td>
            <td>----------</td>
            <td>----------</td>
            <td>una vez x escena</td>
            <td>sin limite</td> 
            
            </tr>

            <tr>
            <td>Veluntad inquebrantable</td>
            <td>----------</td>
            <td>----------</td>
            <td>una vez x escena</td>
            <td>sin limite</td> 
            
            </tr>
            <tr>
            <td>Ki inagotable</td>
            <td>----------</td>
            <td>----------</td>
            <td>----------</td>
            <td>una invocaicon x escena</td> 
            
            </tr>
            
        </tbody>
    </Table>
        

    </div>


        <div className="cuadros">
        <Button style={{border:"2px solid red", color:"yellow", borderRadius:"10px", textAlign:"center",fontSize:"1em",padding:"5px",backgroundColor:"black"}} onClick={()=>handleShow(reglas.estudio.titulo,reglas.estudio.info)}>
          Estudio
        </Button>
        <Table  className='lumina bordes'>
            <thead>
                <tr>
                <th>Sabiburia</th>
                <th>Tiempo de Estudio</th>
                <th>Dificultad</th>
                
                
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>cat 0 (1 a 9)</td>
                <td>10 dias por n de manuscrito/hechizo</td>
                <td>20+20 por nivel de manuscrito/hechizo</td>
                
                </tr>
                <tr>
                <td>cat 1 (10 a 19)</td>
                <td>4 dias por n de manuscrito/hechizo</td>
                <td>20+20 por nivel de manuscrito/hechizo</td>
                
                </tr>
                <tr>
                <td>cat 2 (20 a 29)</td>
                <td>2 dias por n de manuscrito/hechizo</td>
                <td>20+20 por nivel de manuscrito/hechizo</td>
                
                </tr>
                <tr>
                <td>cat 3 (30 a 39)</td>
                <td>1 dia por n de manuscrito/hechizo</td>
                <td>20+20 por nivel de manuscrito/hechizo</td>
                
                </tr>
                <tr>
                <td>cat 4 (40 a 49)</td>
                <td>12 hrs por n de manuscrito/hechizo</td>
                <td>20+20 por nivel de manuscrito/hechizo</td>
                
                </tr>
                <tr>
                <td>cat 5 (50 o superior)</td>
                <td>1 hr por n de manuscrito/hechizo</td>
                <td>20+20 por nivel de manuscrito/hechizo</td>
                
                </tr> 
            </tbody>
        </Table>
        </div>     

     </div>

      <div className='reglas1Columnas' style={{padding:"1em",fontSize:"0.8em"}}>
       <div className="cuadros lumina">
        <Button style={{border:"2px solid red", color:"yellow", borderRadius:"10px", textAlign:"center",fontSize:"1em",padding:"5px",backgroundColor:"black"}} onClick={()=>handleShow(reglas.herbolaria.titulo,reglas.herbolaria.info)}>
        Herbolaria
        </Button>
        <Table  className='lumina bordes'>
        <thead>
            <tr>
            <th>Elemento</th>
            <th>Rios/arroyos</th>
            <th>Bosques</th>
            <th>Campos/Arrozales</th>
            <th>Pantanos</th>
            <th>Montañas</th>
            <th>Desiertos</th>
            <th>Templos</th>
            <th>Lagos</th>
            <th>Rios subt.</th>
            <th>Cavernas</th>
            <th>Tierra inhospita</th>
            <th>Efecto</th>
            
            

            
            
            
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>Seta curtativa</td>
            <td>dif 40</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>ingierir y restaurar 1d20 pv</td>
            </tr>

            <tr>
            <td>Baya Nym</td>
            <td>-----------</td>
            <td>dif 30</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>ingerir, sacia hambre y sed x 3 dias</td>
            </tr>

            <tr>
            <td>Raiz Halcon</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 60</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>ingerir, +10 a sent</td>
            </tr>
            
            
            <tr>
            <td>Savia de fortaleza</td>
            <td>-----------</td>
            <td>dif 60</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>ingerir, +20 absorcion</td>
            </tr>

            <tr>
            <td>Pasionaria</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 20</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>locion, +20 Seduccion</td>
            </tr>

            <tr>
            <td>Mirra</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 60</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>incienso, +1d20 tiradas Rezo</td>
            </tr>

            <tr>
            <td>Antitoxico</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 40</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>ingerir, dota resistencia natural Veneno</td>
            </tr>

            <tr>
            <td>Musgo salvaje</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 60</td> 
            <td>-----------</td>
            <td>-----------</td>
            <td>ingerir, garras +1d120 daño especial corte</td>
            </tr>

            <tr>
            <td>Flor Alfa</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 80</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>ingerir, +1d120 tiradas Pri </td>
            </tr>

            <tr>
            <td>Espada de Hierba</td>
            <td>-----------</td>
            <td>dif 80</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>espada +1d20 daño especial corte</td>
            </tr>

            <tr>
            <td>Estiercol trasgo</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 40</td>
            <td>-----------</td>
            <td>ingerir, dota Vision Nocturna</td>
            </tr>

            <tr>
            <td>Escama Naga</td>
            <td>-----------</td>
            <td>dif 60</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>unguento, borra desventaja Cicatiz</td>
            </tr>

            <tr>
            <td>Veneno Yozen</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 60</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>ifectar, dota al arma de +1d20 daño veneno</td>
            </tr>

            <tr>
            <td>Hongo Titan</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 100</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>ingerir, +20 proezas de Fuerza</td>
            </tr>

            <tr>
            <td>Fruto repulsion Kaiju</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 100</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>abrirse, repele Kaijus hasta poco comunes</td>
            </tr>

            <tr>
            <td>Fruto elemental</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 80</td>
            <td>ingerir, dota res natural elemento</td>
            </tr>

            <tr>
            <td>Semilla Yuki</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 100</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>ingerir,restaura 1 fase de salud-buenos</td>
            </tr>

            <tr>
            <td>Fruto demonio</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 100 especifico</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>ingerir,+2d10 Fza/Des,deb daño sagrado</td>
            </tr>

            <tr>
            <td>Flor Nadeshiko</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 120</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>manifiesta entierro de almas</td>
            </tr>

            <tr>
            <td>Sanzuki</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 140</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>ingerir, disipa toda maldicion</td>
            </tr>

            <tr>
            <td>Fruto repulsion sagrado</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 100</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>abirse,repele Kaijus hasta raros</td>
            </tr>

            <tr>
            <td>Fruto Megatama</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>-----------</td>
            <td>dif 140,especifico</td>
            <td>ingerir, +1d6 incremento caracteristica</td>
            </tr>

            
        </tbody>
    </Table>
        

       </div>
      </div>
     
    </>
  )
}


