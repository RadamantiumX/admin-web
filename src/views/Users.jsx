import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";
import { useStateContext } from "../contexts/ContextProvider";

//Aca se muestra el CRUD con todos los usuarios
export default function Users() {
   
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [metaData, setMetaData] = useState([]);//Guardamos la data de la paginación

    const {setNotification} = useStateContext();

    useEffect(()=>{
      getUsers();
    },[])
   

    //"data" esta entre llaves porque es un OBJETO
    //Nos retorna todos los usuarios
    const getUsers = (pageNumber = 1)=> {
        setLoading(true);
        axiosClient.get(`/users?page=${pageNumber}`)
        .then(({data})=>{
           setLoading(false);
           
           setUsers(data.data);
           setMetaData(data.meta);
        })
        .catch(()=>{
            setLoading(false);
        })
    }
    
    //Va a recibir el "user" que se borrara del registro
    const onDelete=(u)=>{
       if(!window.confirm("Are you sure you want delete this user?")){
         return
       }

       axiosClient.delete(`/users/${u.id}`)
         .then(()=>{
            //TODO muestra las notificaciones
            setNotification("User was successfully deleted");
            getUsers()
         })
    }

    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <h1>Users</h1>
                <Link to="/users/new" className="btn-add">Add new</Link> 
            </div>
            <div className="container-fluid">
                <table className="table table-responsive table-hover table-success table-striped">
                    <thead>
                       <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Create Date</th>
                          <th scope="col">Actions</th>
                       </tr>
                    </thead>

                       {loading &&<tbody>
                          <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                          </tr>
                       </tbody>} 

                       {!loading && <tbody>
                        {users.map(u=>(
                            <tr>
                                <th scope="row">{u.id}</th>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
                                    &nbsp;{/* Para dar un espacio entre los botones */}
                                    <button onClick={ev=>onDelete(u)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                       </tbody>}
                     <Pagination 
                       activePage={metaData.current_page}
                       totalItemsCount={metaData.total}
                       itemsCountPerPage={metaData.per_page}
                       onChange={(pageNumber)=> getUsers(pageNumber)}
                       itemClass="page-item"
                       linkClass="page-link"
                       firstPageText="First"
                       lastPageText="Last"
                        />
                </table>
            </div>      
        </div>
    )
}