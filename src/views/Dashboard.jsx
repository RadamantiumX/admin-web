import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";

export default function Dashboard() {

    const [records, setRecords] = useState([]);
    const [table, setTable] = useState('/msg');

    const valueRef = useRef();

    const getRecords=()=>{
        axiosClient.get(table)
          .then(({data})=>{
             console.log(data);
             setRecords(data.data);
          })
    }

    const switchTable=()=>{
        setTable(valueRef.current.value);
    }

    useEffect(()=>{
       getRecords();
    },[])

    return(
        <div>
            <select class="form-select" aria-label="Default select example" onChange={switchTable}>
                <option selected >Seleccion de tabla</option>
                <option value="/msg" ref={valueRef}>EpsiWeb</option>
                <option value="/epikka" ref={valueRef}>Epikka</option>            
            </select>
            <div className="card animated fadeInDown">
                <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email@</th>
                        <th>Telefono</th>
                        <th>Mensaje</th>
                      </tr>
                    </thead>
                    <tbody>
                        {records.map(r=>(
                            <tr>
                                <td>{r.id}</td>
                                <td>{r.nombre}</td>
                                <td>{r.email}</td>
                                <td>{r.telefono}</td>
                                <td>{r.mensaje}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}