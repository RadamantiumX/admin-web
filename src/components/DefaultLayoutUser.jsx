import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

//Vista para el usuario autenticado
export default function DefaultLayoutUser() {
    
    //Creamos variables para el CONTEXTO
   const{user,token,notification,setUser,setToken}= useStateContext();//importamos lo q necesitamos de useStateContext()

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

    return(
        <div id="defaultLayout">    
            <div className="content">
                <header className="header">
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
            {/* Mostramos las notificaciones si las hay */}
           {notification && <div className="notification">
              {notification}
           </div>}
        </div>
    )
}