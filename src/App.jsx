import { useEffect, useState } from 'react'
import './App.css'
import Conversor from './Conversor'
import Registro from './Registro'
import Usuarios from './Usuarios'

function App() {
  //constantes del inicio
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [logueado, setLogueado] = useState(false)
  const [recargar, setRecargar] = useState(false)

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value)
  }

  function recargarAhora() {
    setRecargar(!recargar)
  }

  function cambiarClave(evento) {
    setClave(evento.target.value)
  }

  async function ingresar() {//ingresar al sistema
    //conección con el backend
    const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario + '&clave=' + clave, { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)
      obtenerUsuarios()
    } else {
      alert('Usuario o clave incorrectos')
    }
  }


  async function validar() {//validar que el usuario si esta en la 
    const peticion = await fetch('http://localhost:3000/validar', { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)
      obtenerUsuarios()
    }
  }

  async function salir() {//cerrar sesion
    await fetch('http://localhost:3000/salir', { credentials: 'include' })
    setLogueado(false)

  }

  async function obtenerUsuarios() {
    const peticion = await fetch('http://localhost:3000/usuarios', { credentials: 'include' })
    if (peticion.ok) {
      const respuesta = await peticion.json()
      setUsuarios(respuesta) //estamos pasando el archivo json que de la peticion al State usuarios    
    }
  }

 
  useEffect(() => {
    validar()

  }, []) // con esa lista en blanco se esta referenciando a que se carga una vez se visualice la página web

  if (logueado) {
    return (
      <>
        <Registro recargarAhora={recargarAhora} />
        <Conversor />
        <Usuarios recargar={recargar}/>
        <button onClick={salir}>Cerrar Sesión</button>
      </>
    )
  }
  return (
    <>
      <h1>Inicio de Sesion</h1>
      <input placeholder="Usuario" type="text" name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario} />
      <input placeholder="Contraseña" type="password" name="clave" id="clave" value={clave} onChange={cambiarClave} />
      <button onClick={ingresar}>Ingresar</button>
    </>
  )
}

export default App
