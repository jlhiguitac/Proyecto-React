import { useEffect, useState } from 'react'
import './App.css'
import Conversor from './Conversor'

function App() {
  //constantes del inicio
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [logueado, setLogueado] = useState(false)
  //constantes del registro
  const [usuarioRegistro, setUsuarioRegistro] = useState('')
  const [claveRegistro, setClaveRegistro] = useState('')
  //constantes del usuarios tabla
  const [usuarios, setUsuarios] = useState([])//corchetes por que recibe una lista


  function cambiarUsuario(evento) {
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) {
    setClave(evento.target.value)
  }
  function cambiarUsuarioRegistro(evento) {
    setUsuarioRegistro(evento.target.value)
  }

  function cambiarClaveRegistro(evento) {
    setClaveRegistro(evento.target.value)
  }



  async function ingresar() {
    //conección con el backend
    const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario + '&clave=' + clave, { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)
    } else {
      alert('Usuario o clave incorrectos')
    }
  }

  async function registrar() {
    //conección con el backend
    if (!usuarioRegistro || !claveRegistro) {
      alert('Debe escribir un usuario y contraseña')
    } else {
      const peticion = await fetch('http://localhost:3000/registro?usuario=' + usuarioRegistro + '&clave=' + claveRegistro, { credentials: 'include' })
      if (peticion.ok) {
        alert('Usuario registrado exitosamente')
        setLogueado(true)
      } else {
        alert('Usuario no registrado')
      }
    }

  }

  async function validar() {
    const peticion = await fetch('http://localhost:3000/validar', { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)
    }
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
    obtenerUsuarios()
  }, []) // con esa lista en blanco se esta referenciando a que se carga una vez se visualice la página web

  if (logueado) {
    return (
      <Conversor />
    )
  }
  return (
    <>
      <h1>Inicio de Sesion</h1>
      <input placeholder="Usuario" type="text" name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario} />
      <input placeholder="Contraseña" type="password" name="clave" id="clave" value={clave} onChange={cambiarClave} />
      <button onClick={ingresar}>Ingresar</button>

      <h1>Registro</h1>
      <input placeholder="Usuario" type="text" name="usuarioRegistro" id="usuarioRegistro" value={usuarioRegistro} onChange={cambiarUsuarioRegistro} />
      <input placeholder="Contraseña" type="password" name="claveRegistro" id="claveRegistro" value={claveRegistro} onChange={cambiarClaveRegistro} />
      <button onClick={registrar}>Registrar</button>
      <br />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Usuario</th>
            <th>Clave</th>
          </tr>
        </thead>
        <tbody>
          {
            usuarios.map(usuario => (
              <tr key={usuario.id}>
                <th>{usuario.id}</th>
                <th>{usuario.usuario}</th>
                <th>{usuario.clave}</th>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default App
