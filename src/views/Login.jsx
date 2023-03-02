import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

import axiosClient from "../axios-client";

export default function Login() {
    
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const [errors, setErrors] = useState(null);
  const {setUser, setToken}= useStateContext();


    const onSubmit=(ev)=>{
       ev.preventDefault();
       const payload ={
        
        email: emailRef.current.value,
        password: passwordRef.current.value,
        
     }
     setErrors(null)
     
     axiosClient.post('/login',payload)
       .then(({data})=>{//Seteamos la info del usuario y el token
          setUser(data.user)
          setToken(data.token)
       })
       .catch(err =>{
          const response = err.response;
          if(response && response.status === 422){//El contenido enviado no coincide con lo que el servidor espera
            if(response.data.errors){
            setErrors(response.data.errors);
          }else{
            setErrors({
              email:[response.data.message]
            })
          }
          }
       })
    }
    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
              <form onSubmit={onSubmit}>
                <h1 className="title">Login into your Account</h1>
                  
                {errors && <div className="alert">
                  {Object.keys(errors).map(key=>{return(
                     <p key={key}>{errors[key][0]}</p>
                  )})}
                </div>}

                <input ref={emailRef} type="email"  placeholder="Email"/>
                <input ref={passwordRef} type="password"  placeholder="Password"/>
                <button type="" className="btn btn-block">Login</button>
                
              </form>  
            </div>
        </div>
    )
}