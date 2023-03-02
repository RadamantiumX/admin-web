import { createContext, useContext, useState } from "react";

//Contexto q contiene la INFO del usuario, TOKEN y notificaciones
const StateContext = createContext({
   user: null,
   token: null,
   notification: null,
   role: null,
   setUser: ()=>{},
   setToken: ()=>{},
   setNotification: ()=>{},
   setRole: ()=>{}
})

export const ContextProvider = ({children})=>{
    const [user, setUser] = useState({});//Indicamos un objeto vacio
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN')); //Indicamos el SET con guion bajo porque necesitamos ese nombre, le ponemos el TOKEN por defecto
    const [role, setRole] = useState({});
   
    //Notificaciones
    const setNotification =(message)=>{
      _setNotification(message);
      setTimeout(()=>{
        _setNotification('');
      },5000)

    }

    //Tomara el TOKEN como argumento y luego lo seteamos en "token"
    const setToken=(token)=>{
      _setToken(token);
      if(token){//Para mantenerse autenticado por cualquier cosa q pase
        localStorage.setItem('ACCESS_TOKEN',token);
      }else{
        localStorage.removeItem('ACCESS_TOKEN')
      }
    }

  return(
    <StateContext.Provider value={{
        user,
        token,
        setUser,
        setToken,
        notification,
        setNotification,
        role,
        setRole

    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)