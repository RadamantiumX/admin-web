import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

//Aca esta el formulario para editar un usuario existente o crear uno nuevo
export default function UserForm() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email:'',     
        password: '',
        password_confirmation:''
    });
    const [loading, setLoading] = useState(false);
    const {id}= useParams();//Obtenemos el parametro q se envia por URL
    const [errors, setErrors]= useState();//Para mostrar los errores
    const {setNotification} = useStateContext();

    //Si la ID esta disponible
    if(id){
       useEffect(()=>{
          setLoading(true);
          axiosClient.get(`/users/${id}`)//Obtenemos la informacion del usuario
            .then(({data})=>{
                setLoading(false);
                setUser(data.data);
            })
            .catch(()=>{
                setLoading(false);
            })
       },[])
    }

    const onSubmit=(ev)=>{
      ev.preventDefault();
      if(user.id){//Si existe el usuario
        axiosClient.put(`/users/${user.id}`,user)//le pasamos el OBJ de "user"
         .then(()=>{
            //TODO muestra de notificacion
            setNotification('User was successfully updated');
            navigate('/users');//Redirigimos
         })
         .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){//El contenido enviado no coincide con lo que el servidor espera
              console.log(response.data.errors);
              setErrors(response.data.errors);
            }
         })
      }else{//Si no existe el usuario
        axiosClient.post(`/users/`,user)//le pasamos el OBJ de "user"
         .then(()=>{
            //TODO muestra de notificacion
            setNotification('User was successfully created');
            navigate('/users');//Redirigimos
         })
         .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){//El contenido enviado no coincide con lo que el servidor espera
              console.log(response.data.errors);
              setErrors(response.data.errors);
            }
         })
      }

    }
    
    return(
        <>
        {user.id && <h1>Updated User: {user.name}</h1>}
        {!user.id && <h1>New User</h1>}
        <div className="card animated fadeInDown">
            {loading &&
            <div className="text-center">
                Loading...
            </div>}

            {errors && <div className="alert">
                  {Object.keys(errors).map(key=>{return(
                     <p key={key}>{errors[key][0]}</p>
                  )})}
                </div>
                }
         {!loading&&
         <form onSubmit={onSubmit}>
            <input type="text" value={user.name} onChange={ev=>setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <input type="email" value={user.email} onChange={ev=>setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <input type="password" onChange={ev=>setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <input type="password" onChange={ev=>setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
            <button className="btn-edit">Save</button>
         </form>
         }       
        </div>
        </>
    )
    
}