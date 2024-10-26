import { useState } from 'react'
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
  function ingresar() {
    if (usuario == 'admin' && clave == 'admin'){
      alert('Estas adentro Maaestro')
      setLogueado(true)
    }else{
      alert('Usuario o clave incorrecto')
    }
  }

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
