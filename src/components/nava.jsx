
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import axios from 'axios';
import Swal from 'sweetalert2';



export const Nava= ({tituloNav})=> {


//visible o no visible
 const [modalLogin,setModalLogin]=useState(false);

const mostrar=()=>setModalLogin(true);
const desaparecer=()=>setModalLogin(false);

//estados de lso campos de login
const[loginEmail,setLoginEmail]=useState("");
const[loginPassword,setLoginPassword]=useState("")



 
const handleSubmit = (e) => {
  e.preventDefault();

  console.log("boton de login funciona");
  console.log("Email: ",loginEmail);
  console.log("Contraseña: ",loginPassword);

  
  const loginUsuario = async () => {
    try {
      const response = await axios.post('http://localhost:4000/loginUsuario', {
        email:loginEmail,
        contrasenia: loginPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      //const { personajes } = response.data;
  
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        //text: `Se han recuperado ${personajes.length} personajes.`,
      });
  
      //console.log('Personajes recuperados:', personajes);
      
      // Puedes manejar los personajes como desees
      // Por ejemplo, almacenarlos en el estado de tu aplicación
  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al iniciar sesión ACAAAA.',
      });
    }
  };

  loginUsuario();









  console.log('Login submitted');
  desaparecer();
};



//****************NUEVO REGISTRO************

const [modalRegistarme,setModalRegistrarme]=useState(false);
const mostrarRegistrar=()=>setModalRegistrarme(true);
const desaparecerRegistrar=()=>setModalRegistrarme(false);

 
 // Estados para los campos del formulario de registro
 const [registroEmail, setRegistroEmail] = useState('');
 const [registroPassword, setRegistroPassword] = useState('');

 //REGISTRARSE OK!!
const handleSubmitRegistro = (e) => {
  e.preventDefault();
  console.log('funciona registarse');
  
  console.log('Email:', registroEmail);
  console.log('Password:', registroPassword);

//CARGAR NUEVO USUARIO OK!!
const cargarNuevoUsuario = async () => {
  const newUsuario = {
    email: registroEmail,
    contrasenia: registroPassword,
  };
  try {
    const response = await axios.post(`http://localhost:4000/insert-usuario`, newUsuario, { 
    //const response = await axios.post(`https://rankingznk.onrender.com/insert-personaje`, newPersonaje, {   
    headers: {
        'Content-Type': 'application/json', // Asegúrate de que el encabezado Content-Type sea application/json
      },
    });
    const { idusuario,message } = response.data;
    
  
    console.log("El ID de usuario es:", idusuario);

    if (idusuario) {
      Swal.fire({
        icon: 'success',
        title: 'Nuevo registro exitoso',
        text: message || 'Usuario registrado exitosamente.',
        footer: `ID de Usuario: ${idusuario}`,
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message || 'El mail ya esta registrado.',
      });
    }


  } catch (error) {
    console.error('Error al insertar el personaje:', error.message);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Error al insertar el usuario/contraseña.',
    });
  }
};

cargarNuevoUsuario();
  
  setLoginEmail(registroEmail);
  setLoginPassword(registroPassword);
  setRegistroEmail("");
  setRegistroPassword("");
  desaparecerRegistrar();
};



  return (
    <>
    <Navbar expand="lg" bg="dark" variant="dark" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#">
        <img
          alt=""
          src="/mitamaDorada.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          style={{marginLeft:"3em"}}
        />
          {tituloNav}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" onClick={mostrar}>Iniciar sesion</Nav.Link>
            <Nav.Link href="#action2"></Nav.Link>          
            <Nav.Link href="#" disabled>
              
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>








          {/* Modal de Login */}
          <Modal show={modalLogin} onHide={desaparecer}>
          <Modal.Header closeButton>
            <Modal.Title>Inicia sesion ZNK</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="loginEmail">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ingresa tu email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="loginPassword">
                <Form.Label>contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="ingresa tu contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </Form.Group>

             <div style={{display:"flex", gap:"3px"}}>
             <Button variant="primary"  className="mt-3" onClick={mostrarRegistrar}>
                Registrarme
              </Button>
              <Button variant="danger"  className="mt-3">
                Ups! olvide mi contraseña
              </Button>
              <Button variant="success" type="submit" className="mt-3">
                Login
              </Button>
             </div>
              
            </Form>
          </Modal.Body>
          </Modal>










           {/* Modal de Nuevo registro */}
           <Modal show={modalRegistarme} onHide={desaparecerRegistrar}>
          <Modal.Header closeButton>
            <Modal.Title>Registrate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitRegistro}>
              <Form.Group controlId="registroEmail">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ingresa tu email"
                  value={registroEmail}
                  onChange={(e) => setRegistroEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="registroPassword">
                <Form.Label>contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="ingresa tu contraseña"
                  value={registroPassword}
                  onChange={(e) => setRegistroPassword(e.target.value)}
                  required
                />
              </Form.Group>

           
              <Button variant="success" type="submit" className="mt-3">
                registrarme
              </Button>
           
              
            </Form>
          </Modal.Body>
          </Modal>


    </>
    
  );
}
