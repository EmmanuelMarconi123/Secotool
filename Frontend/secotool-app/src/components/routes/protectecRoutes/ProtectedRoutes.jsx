
import {Navigate, Outlet} from 'react-router-dom'

//por el momento este componenete no tiene funcionalidad, simplemente lo voy a usar cuando demos acceso a ususario o administrador para mostrar cosas diferentes


const ProtectedRoutes = () => {

    let isLoged = localStorage.getItem('token');

    if (!isLoged) {
       return <Navigate to='/'/>
    }

  return (
    <Outlet/>
  )
}

export default ProtectedRoutes