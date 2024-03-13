import React, { useEffect, useState } from 'react'
import { getProspectos } from '../../services/Services';
import { useNavigate } from 'react-router-dom';

const Prospectos = () => {
    const [prospectos, setProspectos] = useState([]);
    const navigate = useNavigate()
    async function fetchProspectos() {
        await getProspectos().then((result) => {
            setProspectos(result.data)

        });

    }
    useEffect(() => {

        fetchProspectos();
    }, [])


    return (
        <div style={{ margin: 20 }}>
            <header>
                <h1>Prospectos</h1>
                <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                    <button onClick={() => navigate("/prospectos")}>Añadir</button>
                </div>
            </header>
            <div className="contain-table">
                <table className="striped-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Estatus</th>
                            <th colSpan={2} className="text-center">
                                Editar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {prospectos.length > 0 ? (
                            prospectos.map((prospecto, i) => (
                                <tr key={prospecto.id}>
                                    <td>{i + 1}</td>
                                    <td>{prospecto.nombre}</td>
                                    <td>{prospecto.primerApellido}</td>
                                    <td>{prospecto.segundoApellido}</td>
                                    <td>{prospecto.status.name}</td>
                                    <td className="text-right">
                                        <button
                                            onClick={() => navigate(`/prospectos/${prospecto.id}`)}
                                            className="button muted-button"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    {/* <td className="text-left">
                  <button
                    onClick={() => handleDelete(prospecto.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7}>No Employees</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Prospectos
