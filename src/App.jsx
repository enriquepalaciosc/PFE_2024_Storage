import { useState, useEffect } from 'react'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [nuevoUsuarioId, setNuevoUsuarioId] = useState(1)
  const [nuevoUsuarioNombre, setNuevoUsuarioNombre] = useState('')

  /* función que administre cada vez que el usuario ingrese algo
     al input y actualice automáticamente el valor de "nuevoUsuarioId"
     cada vez que se escribe o elimina algo de la caja de entrada.
     _IMPORTANTE_: Recordar que el método handle debe recibir
     el evento (e)
   */
  const handleNuevoUsuario = (e) => {
    // cambia el nuevo id al estado nuevoUsuarioID cada vez que escribe
    // algo en la caja, este valor que escribe el usuario
    // se obtiene desde e.target.value
    setNuevoUsuarioId(e.target.value)
  }

  /* Se aplicará la misma lógica que el método anterior para el handle */
  const handleNuevoNombre = (e) => {
    setNuevoUsuarioNombre(e.target.value)
  }

  /* Crear función para que cuando se presione el botón
     obtenga el id y nombre desde los estados correspondientes
     (nuevoUsuarioID, nuevoUsuarioNombre) y los añade al estado llamado usuarios
   */
  const handleAgregarUsuario = () => {
    // creamos nuevo objeto con los datos registrados
    let nuevoUsuario = {
      id: nuevoUsuarioId,
      nombre: nuevoUsuarioNombre
    }
    // Impresión para validación
    console.log('Datos del usuario nuevo:', nuevoUsuario)

    // Actualizar el estado de usuarios para añadir el nuevo
    let nuevoArreglo = usuarios // usuarios es del tipo arreglo
    nuevoArreglo.push(nuevoUsuario) // añado nuevo usuario
    setUsuarios(nuevoArreglo) // reemplazar arreglo por el nuevo actualizado

    // Guardar el resultado a localStorage (key: usuarios)
    // hay que convertir el arreglo de usuarios a JSON (JSON stringify)
    let resultadoJson = JSON.stringify(nuevoArreglo)
    localStorage.setItem("usuarios", resultadoJson)

    console.log("Actuales usuarios", nuevoArreglo)

  }

  const handleEliminarUsuario = (idUsuario) => {
    // código para obtener un objeto según buscar por su atributo id
    /* let resultado = usuarios.filter(objeto => {
      return objeto.id === idUsuario
    }) */

    // Inverso al anterior, en vez de devolver un solo objeto
    // encontrado, devuelve todos los elementos del arreglo
    // pero no el que sea encontrado con el idUsuario
    // ingresado para su eliminación
    let resultadosEliminados = usuarios.filter(objeto => {
      return objeto.id !== idUsuario
    })

    // actualizar el estado de usuarios
    setUsuarios(resultadosEliminados)

    // actualizar el almacenamiento de localStorage
    // debemos convertir el arreglo a JSON con JSON stringify
    let nuevoArreglo = JSON.stringify(resultadosEliminados)
    localStorage.setItem("usuarios", nuevoArreglo)
  }

  /* gatillar una acción cuando la página se termine de cargar
     OBJ UseEffect: Verificar que existan o no existan usuarios
     almacenados previamente en el localStorage (el almacenamiento
     de la página)
   */
  useEffect(() => {
    // verificación para saber si tiene algo el localStorage
    console.log(localStorage.getItem("usuarios"))
    /* verificamos si tenemos usuarios guardados en el localStorage,
       para esto, intentaremos primero saber si existe la clave "usuarios"
     */
    if (localStorage.getItem("usuarios") !== null) {
      // crear variable usuarios, que obtenga desde localStorage("usuarios")
      // y los convierta a JSON (con JSON parse)
      let usuariosAlmacenados = JSON.parse(localStorage.getItem("usuarios"))
      setUsuarios(usuariosAlmacenados)
      console.log("Actualizados los usuarios almacenados desde localStorage")
    }
    /* el else se gatillará en caso de que no exista "usuarios"
       en el localStorage como clave
     */
    else
    {
      console.log("no existen usuarios en el localStorage('usuarios')")
    }
  }, [])

  return (
    <div style={{ padding: '10px' }}>
      {/* Añadir usuarios */}
      <div>
        <form action="#">
          <label htmlFor="id_usuario">ID Usuario</label><br />
          <input
              type="number"
              value={nuevoUsuarioId}
              onChange={handleNuevoUsuario}
              name="id_usuario"
          /><br /><br />
          <label htmlFor="nombre_usuario">Nombre usuario</label><br />
          <input type="text"
                 value={nuevoUsuarioNombre}
                 onChange={handleNuevoNombre}
                 name="nombre_usuario"
                 placeholder="Ingrese un usuario"
          /><br /><br />
          <button type="button"
                  onClick={handleAgregarUsuario}>
            Añadir usuario
          </button>
        </form>
        <hr />
      </div>
      {/* Listar usuarios (editar / eliminar) */}
      <div>
        <h3>Lista de usuarios</h3>
        <ul>
          {usuarios.map((usu, indice) => {
              return <li key={indice}>ID: {usu.id}, NOMBRE: {usu.nombre} <button type="button" onClick={() => { handleEliminarUsuario(usu.id) } }>Eliminar</button></li>
          })}
        </ul>

      </div>
    </div>
  )
}

export default App
