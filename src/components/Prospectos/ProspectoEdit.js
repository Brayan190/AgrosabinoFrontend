import React, { useEffect, useState } from 'react'
import { FILES_ENDPOINT, getProspecto, getStatuses, updateProspecto } from '../../services/Services';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProspectoEdit = (props) => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [prospecto, setProspecto] = useState()
  const [statuses, setStatuses] = useState()
  const [form, setForm] = useState({
    statusId: 1,
    observaciones: ""
  })

  async function fetchProspecto() {

    await getProspecto(id).then((result) => {
      // console.log(result)
      setProspecto(result.data)
      setForm({
        statusId: result.data.statusId,
        observaciones: result.data.observaciones !== null ? result.data.observaciones : ''
      })

    });

    await getStatuses().then((result) => {
      // const filterStatuses = result.data.filter((value) => value.id !== 1)
      setStatuses(result.data)

    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(form)
    await updateProspecto(form, id)
      .then(async (response) => {
        console.log(response)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "se ha actualizado correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/')
      })
      .catch((error) => {
        console.log("error en order", error)
        Swal.fire({ // Utiliza Swal.fire() en lugar de Swal()
          title: "¡Alerta!",
          icon: "warning",
          text: error.data,
        });
      });

  }

  useEffect(() => {
    fetchProspecto()
  }, [])

  return (
    <div style={{ margin: 20 }}>
      <header>
        <h1>Actualizar</h1>
      </header>

      {prospecto && <div className="small-container">
        <h4>Detalles del Prospecto</h4>
        <div >
          <p style={{ margin: '0' }}><strong>Nombre:</strong> {prospecto.nombre}</p>
          <p style={{ margin: '0' }}><strong>Primer Apellido:</strong> {prospecto.primerApellido}</p>
          <p style={{ margin: '0' }}><strong>Segundo Apellido:</strong> {prospecto.segundoApellido}</p>
          <p style={{ margin: '0' }}><strong>RFC:</strong> {prospecto.rfc}</p>
          <p style={{ margin: '0' }}><strong>Telefono:</strong> {prospecto.telefono}</p>
        </div>
        <h4>Dirección</h4>
        <div >
          <p style={{ margin: '0' }}><strong>Calle:</strong> {prospecto.calle}</p>
          <p style={{ margin: '0' }}><strong>Numero:</strong> {prospecto.numero}</p>
          <p style={{ margin: '0' }}><strong>Colonia:</strong> {prospecto.colonia}</p>
          <p style={{ margin: '0' }}><strong>Código Postal:</strong> {prospecto.codigoPostal}</p>
        </div>
        <h4>Documentos</h4>
        {prospecto.documents.map((document) => {
          return <a href={`${FILES_ENDPOINT}${document.file}`} target='_blank' rel='noopener noreferrer' >{document.name}</a>
        })}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div style={{ marginTop: '30px' }}>
            <label htmlFor="estatus">Estatus</label>
            <select id="estatus" onChange={(e) => setForm({ ...form, statusId: e.target.value })} value={form.statusId} >
              <option disabled selected value="">seleccione una opción</option>
              {/* <option key={1} value={2}>Authorizada</option>
              <option key={2} value={3}>Rechazada</option> */}
              {statuses && statuses.map((status) => {
                return <option key={status.id} value={status.id}>{status.name}</option>
              })}
            </select>

            {form.statusId == 3 && <div>
              <label htmlFor="observaciones">Observaciones</label>
              <textarea
                id="observaciones"
                type="text"
                name="observaciones"
                value={form.observaciones}
                onChange={e => setForm({ ...form, observaciones: e.target.value })}
                required={form.statusId == 3 ? true : false}
              />
            </div>}
            <input type="submit" value="Actualizar" disabled={form.statusId == 3 && form.observaciones == ''} />
            <input
              style={{ marginLeft: '12px' }}
              className="muted-button"
              type="button"
              value="Salir"
              onClick={() => navigate('/')}
            />
          </div>
        </form>
      </div>

      }
    </div>
  )
}

export default ProspectoEdit