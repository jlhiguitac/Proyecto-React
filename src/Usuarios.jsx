import { useEffect, useState } from 'react'
import './App.css'


function Usuarios({recargar}) {
  //constantes del usuarios tabla
  const [usuarios, setUsuarios] = useState([])//corchetes por que recibe una lista

  async function obtenerUsuarios() {
    const peticion = await fetch('http://localhost:3000/usuarios', { credentials: 'include' })
    if (peticion.ok) {
      const respuesta = await peticion.json()
      setUsuarios(respuesta) //estamos pasando el archivo json que de la peticion al State usuarios    
    }
  }

  async function eliminarUsuario(id) {
    const peticion = await fetch("http://localhost:3000/usuarios?id=" + id, { credentials: 'include', method: 'DELETE' })
    if (peticion.ok) {
      obtenerUsuarios()
    }
  }

  useEffect(() => {
    obtenerUsuarios()

  }, [recargar]) // con esa lista en blanco se esta referenciando a que se carga una vez se visualice la página web

  return (
    <>
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
                <th>
                  <button
                    onClick={() => { eliminarUsuario(usuario.id) }}
                  >Eliminar</button>
                </th>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Usuarios
