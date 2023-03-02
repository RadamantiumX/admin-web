import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayoutAdmin from "./components/DefaultLayoutAdmin";
import DefaultLayoutUser from "./components/DefaultLayoutUser";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserDashboard from "./views/UserDashboard";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
//import Signup from "./views/Signup";
import UserForm from "./views/UserForm";
import Users from "./views/Users";


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayoutAdmin/>,
        children: [
            {
                path: '/',//Ruta por defecto con Auth
                element: <Navigate to="/users"/>

            },
            {
                path: '/users',
                element: <Users/>
        
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
        
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"/>
        
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            }
        ]
    },
    {
        path: '/',
        element: <DefaultLayoutUser/>,
        children: [
           
            {
                path: '/userdashboard',
                element: <UserDashboard/>
            }
        ]
    },
    {
        path:'/',
        element: <GuestLayout/>,
        children: [
            {
               path: '/login',
               element: <Login/>

            },
           
        ]
    },
    
    {
        path: '*',
        element: <NotFound/>//Para las rutas no encontradas

    },
    
])

export default router;