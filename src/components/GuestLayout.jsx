import { Navigate, Outlet } from "react-router-dom";//Lo utilizamos para renderizar otras vistas
import { useStateContext } from "../contexts/ContextProvider";

//Vista para usuarios NO autenticados
export default function GuestLayout() {
    const{token}=useStateContext();

    if(token){
        return <Navigate to="/"/>//Si esta Auth nos redirije al Default page
    }

    return(
        <div>
            
                
              <Outlet/>
            
           
        </div>
    )
}