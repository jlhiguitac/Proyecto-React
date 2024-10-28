import { useEffect, useState } from 'react'
import './App.css'


function Registro({recargarAhora}) {
  //constantes del registro
  const [usuarioRegistro, setUsuarioRegistro] = useState('')
  const [claveRegistro, setClaveRegistro] = useState('')

  function cambiarUsuarioRegistro(evento) {
    setUsuarioRegistro(evento.target.value)
  }

  function cambiarClaveRegistro(evento) {
    setClaveRegistro(evento.target.value)
  }

  async function registrar() {//crear nuevo usuario
    //conección con el backend
    if (!usuarioRegistro || !claveRegistro) {
      alert('Debe escribir un usuario y contraseña')
    } else {
      const peticion = await fetch('http://localhost:3000/registro?usuario=' + usuarioRegistro + '&clave=' + claveRegistro, { credentials: 'include' })
      if (peticion.ok) {
        alert('Usuario registrado exitosamente')
        recargarAhora()
      } else {
        alert('Usuario no registrado')
      }
    }
  }

  useEffect(() => {
  }, []) // con esa lista en blanco se esta referenciando a que se carga una vez se visualice la página web

  
  return (
    <>
      <h1>Registro</h1>
        <input placeholder="Usuario" type="text" name="usuarioRegistro" id="usuarioRegistro" value={usuarioRegistro} onChange={cambiarUsuarioRegistro} />
        <input placeholder="Contraseña" type="password" name="claveRegistro" id="claveRegistro" value={claveRegistro} onChange={cambiarClaveRegistro} />
        <button onClick={registrar}>Registrar</button>
    </>
  )
}

export default Registro
