import { useEffect, useState } from 'react'
import './App.css'
import Conversor from './Conversor'

function App() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [logueado, setLogueado] = useState(false)

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) {
    setClave(evento.target.value)
  }
  
  async function ingresar() {
    //conección con el backend
    const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario + '&clave=' + clave, { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)      
    }else{
      alert('Usuario o clave incorrectos')
    }
  }
  
  async function validar() {
    const peticion = await fetch('http://localhost:3000/validar', { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)      
    }
  }

  useEffect(() => {
    validar()
  }, []) // con esa lista en blanco se esta referenciando a que se carga una vez se visualice la página web

  if(logueado){
    return (
      <Conversor />
    )
  }  
  return (
    <>
      <h1>Inicio de Sesion</h1>
      <input placeholder= "Usuario" type="text" name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario}/>
      <input placeholder= "Contraseña" type="password" name="clave" id="clave" value={clave} onChange={cambiarClave} />
      <button onClick={ingresar}>Ingresar</button>
    
    </>
  )
}

export default App
