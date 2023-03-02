import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Logo from '../assets/img/test-logo.jpg';

//Vista para el usuario autenticado
export default function DefaultLayoutAdmin() {
    
    //Creamos variables para el CONTEXTO
   const{user,token,role,notification,setUser,setToken,setRole}= useStateContext();//importamos lo q necesitamos de useStateContext()

   if(!token){//Si no hay token
      return <Navigate to ="/login"/>//Redirige al LOGIN
   }

   
   const onLogout = (ev)=>{
      ev.preventDefault();
      
      //Al darle al boton de LOGOUT vaciamos la info del usuario y el token de esa sesion
      axiosClient.post('/logout')
        .then(()=>{
            setUser({});
            setToken(null);
        })//Al finalizar esto se redirije a la ruta de "/login" como lo hace en la linea Nº11
   }

   //Obtenemos la info del usuario para mostrarla
   useEffect(()=>{
      axiosClient.get('/user')
        .then(({data})=>{
            setUser(data);
        })
   },[])

   if (user.role === 'user'){
       return <Navigate to = "/userdashboard"/>
   }

  

    return(
     

    <div className="defaultLayout">
      
    
    

    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">EpsiWeb</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link active" aria-current="page" href="#">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className="nav-link active" aria-current="page" href="#">Users</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {user.name}
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#" onClick={onLogout}>Logout</a></li>   
          </ul>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>

    <main>
      <Outlet/>
    </main>
 </div>
    )
}