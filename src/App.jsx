import { useState, useEffect } from 'react'

function App() {
  // Estados para manejar la lista de usuarios y los campos del formulario
  const [usuarios, setUsuarios] = useState([])
  const [nuevoUsuarioId, setNuevoUsuarioId] = useState('')
  const [nuevoUsuarioNombre, setNuevoUsuarioNombre] = useState('')
  const [editandoUsuario, setEditandoUsuario] = useState(null)

  // Manejador para actualizar el estado del ID cuando se escribe en el input
  const handleNuevoUsuario = (e) => {
    setNuevoUsuarioId(e.target.value)
    /* Recordar que e.target.value es para obtener lo que tiene escrito
       un input, y sólo funciona en este tipo de controles (no en un botón p.ej.)
     */
  }

  // Manejador para actualizar el estado del nombre cuando se escribe en el input
  const handleNuevoNombre = (e) => {
    setNuevoUsuarioNombre(e.target.value)
  }

  // Función para agregar un nuevo usuario
  const handleAgregarUsuario = () => {
    // Crear objeto con los datos del nuevo usuario
    const nuevoUsuario = {
      id: nuevoUsuarioId,
      nombre: nuevoUsuarioNombre
    }
    console.log('Datos del usuario nuevo:', nuevoUsuario)

    // Actualizar el estado de usuarios y guardar en localStorage
    setUsuarios(prev => { // prev se ocupa para obtener el antiguo valor del estado "usuarios"
      const nuevoArreglo = [...prev, nuevoUsuario] // Crear nuevo array con todos los usuarios anteriores más el nuevo usando desestructuración
      localStorage.setItem("usuarios", JSON.stringify(nuevoArreglo)) // Guardar en localStorage
      return nuevoArreglo // Actualizar el estado, se modificará el estado "usuarios"
    })

    // Limpiar los campos del formulario después de agregar
    setNuevoUsuarioId('')
    setNuevoUsuarioNombre('')
  }

  // Función para eliminar un usuario
  const handleEliminarUsuario = (idUsuario) => {
    setUsuarios(prev => { // prev se ocupa para obtener el antiguo valor del estado "usuarios"
      // Filtrar el array para excluir el usuario con el ID especificado
      const resultadosEliminados = prev.filter(objeto => objeto.id !== idUsuario)
      localStorage.setItem("usuarios", JSON.stringify(resultadosEliminados)) // Actualizar localStorage
      return resultadosEliminados // Actualizar el estado
    })
  }

  // Función para iniciar la edición de un usuario
  const handleEditarUsuario = (usuario) => {
    setEditandoUsuario(usuario) // Marcar qué usuario se está editando
    setNuevoUsuarioId(usuario.id) // Llenar el campo de ID con el valor actual
    setNuevoUsuarioNombre(usuario.nombre) // Llenar el campo de nombre con el valor actual
  }

  // Función para guardar los cambios de la edición
  const handleGuardarEdicion = () => {
    setUsuarios(prev => {
      // Mapear a través de los usuarios, actualizando el que se está editando
      const usuariosActualizados = prev.map(u =>
          u.id === editandoUsuario.id ? { ...u, id: nuevoUsuarioId, nombre: nuevoUsuarioNombre } : u
      )
      localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados)) // Actualizar localStorage
      return usuariosActualizados // Actualizar el estado
    })
    // Resetear el estado de edición y limpiar los campos
    setEditandoUsuario(null)
    setNuevoUsuarioId('')
    setNuevoUsuarioNombre('')
  }

  // Función para cancelar la edición
  const handleCancelarEdicion = () => {
    setEditandoUsuario(null) // Quitar el marcador de edición
    setNuevoUsuarioId('') // Limpiar campo de ID
    setNuevoUsuarioNombre('') // Limpiar campo de nombre
  }

  // Efecto que se ejecuta al montar el componente para cargar usuarios desde localStorage
  useEffect(() => {
    const usuariosAlmacenados = JSON.parse(localStorage.getItem("usuarios") || "[]")
    setUsuarios(usuariosAlmacenados)
    console.log("Usuarios cargados desde localStorage:", usuariosAlmacenados)
  }, []) // El array vacío significa que este efecto solo se ejecuta una vez al montar el componente

  return (
      <div style={{ padding: '10px' }}>
        {/* Formulario para agregar/editar usuarios */}
        <div>
          <form onSubmit={(e) => e.preventDefault()}> {/* Prevenir envío del formulario */}
            <label htmlFor="id_usuario">ID Usuario</label><br />
            <input
                type="number"
                value={nuevoUsuarioId}
                onChange={handleNuevoUsuario}
                name="id_usuario"
            /><br /><br />
            <label htmlFor="nombre_usuario">Nombre usuario</label><br />
            <input
                type="text"
                value={nuevoUsuarioNombre}
                onChange={handleNuevoNombre}
                name="nombre_usuario"
                placeholder="Ingrese un usuario"
            /><br /><br />
            {/* Mostrar botones diferentes dependiendo de si se está editando o agregando */}
            {editandoUsuario ? (
                <>
                  <button type="button" style={{ marginRight: '10px' }} onClick={handleGuardarEdicion}>Guardar Cambios</button>
                  <button type="button" onClick={handleCancelarEdicion}>Cancelar</button>
                </>
            ) : (
                <button type="button" onClick={handleAgregarUsuario}>Añadir usuario</button>
            )}
          </form>
          <hr />
        </div>
        {/* Lista de usuarios */}
        <div>
          <h3>Lista de usuarios</h3>
          <ul>
            {usuarios.map((usu) => (
                <li key={usu.id}>
                  ID: {usu.id}, NOMBRE: {usu.nombre}
                  <button type="button" onClick={() => handleEditarUsuario(usu)} style={{ marginLeft: '10px', marginRight: '10px' }}>Editar</button>
                  <button type="button" onClick={() => handleEliminarUsuario(usu.id)}>Eliminar</button>
                </li>
            ))}
          </ul>
        </div>
      </div>
  )
}

export default App