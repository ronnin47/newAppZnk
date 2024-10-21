
import { useState , useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BACKEND_URL);



export const Nava= ({ isVisible,toggleFlotante, setEstatus,cerrarSesion,setUSuarioId,tituloNav,setPersonajes,sesion,setSesion})=> {

 const [modalLogin,setModalLogin]=useState(false);




const mostrar=()=>setModalLogin(true);
const desaparecer=()=>setModalLogin(false);

const [loginEmail, setLoginEmail] = useState(() => {
  const savedEmail = localStorage.getItem('loginEmail');
  return savedEmail || '';
});

const [loginPassword, setLoginPassword] = useState(() => {
  const savedPassword = localStorage.getItem('loginPassword');
  return savedPassword || '';
});



const handleSubmit = (e) => {
  e.preventDefault();

  const loginUsuario = async () => {
    try {
      
      //const response = await axios.post('http://localhost:4000/loginUsuario', {    
      const response = await axios.post('https://zepironokioku.onrender.com/loginUsuario', {
        email:loginEmail,
        contrasenia: loginPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const { idusuario, estatus } = response.data;

      setEstatus(estatus);
    
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        //text: `Se han recuperado ${personajes.length} personajes.`,
      });
  
      socket.emit('user-connected', { usuarioId: idusuario });
  

       localStorage.setItem('estatus', estatus);
       localStorage.setItem('loginEmail', loginEmail);
       localStorage.setItem('loginPassword', loginPassword);
       //localStorage.setItem('idusuario', idusuario);
       localStorage.setItem('idusuario', String(idusuario));
       setUSuarioId(idusuario)
       setSesion(true)
     
  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al iniciar sesión ACAAAA.',
      });
    }
  };

  loginUsuario();

  desaparecer();
};


const [modalRegistarme,setModalRegistrarme]=useState(false);
const mostrarRegistrar=()=>setModalRegistrarme(true);
const desaparecerRegistrar=()=>setModalRegistrarme(false);
 const [registroEmail, setRegistroEmail] = useState('');
 const [registroPassword, setRegistroPassword] = useState('');


const handleSubmitRegistro = (e) => {
  e.preventDefault();
 
const cargarNuevoUsuario = async () => {
  const newUsuario = {
    email: registroEmail,
    contrasenia: registroPassword,
  };
  try {
    
   // const response = await axios.post(`http://localhost:4000/insert-usuario`, newUsuario, { 
    const response = await axios.post(`https://zepironokioku.onrender.com/insert-usuario`, newUsuario, { 
    headers: {
        'Content-Type': 'application/json', // Asegúrate de que el encabezado Content-Type sea application/json
      },
    });
    const { idusuario, message, estatus } = response.data;

    if (idusuario) {
      Swal.fire({
        icon: 'success',
        title: 'Nuevo registro exitoso',
        text: message || 'Usuario registrado exitosamente.',
        footer: `Tu sesion es de: ${estatus}`,
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message || 'El mail ya esta registrado.',
      });
    }


  } catch (error) {
    console.error('Error al insertar el usuario/contaseña:', error.message);
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
           {sesion==false?(<Nav.Link href="#action1" onClick={mostrar}>Iniciar sesion</Nav.Link>):(<Nav.Link href="#action1" onClick={cerrarSesion}>Cerrar sesion</Nav.Link>)} 



            {sesion===true ? (<Nav.Link href="#action2" style={{color:"yellow"}}>{loginEmail}</Nav.Link>) : (<Nav.Link href="#action2"></Nav.Link>) }       
            <Nav.Link href="#" disabled>
              
            </Nav.Link>
            <div>
            <Button variant="outline-warning" style={{ borderRadius: "50%", border: "2px solid goldenrod", boxShadow: "0 4px 15px rgba(255, 223, 0, 0.6)" }} onClick={toggleFlotante} >
            {isVisible ? 'Off' : 'on'}
              </Button>
            </div>
           

           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

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
