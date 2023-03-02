import axios from "axios";
//Importamos la URL base del archivo .env
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

//Implementamos interceptores que actuen durante la peticion y respues del servidor
//El "config" es un Objeto, lo vamos a modificar
axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN');//Usamos una variable global para el TOKEN
    config.headers.Authorization = `Bearer ${token}`;
    

    return config;
})


//Para los errores q vienen del servidor
axiosClient.interceptors.response.use((response)=>{
    return response;
},(error)=>{

    try{
       const {response} = error;
   if(response.status === 401){//Si el token no existe-- NO AUTORIZADO --
     localStorage.removeItem('ACCESS_TOKEN');
   }
    }catch(e){
        console.error(e);
       
    }
   
throw error;//Muy importante para mostrar errores
   
})

export default axiosClient;