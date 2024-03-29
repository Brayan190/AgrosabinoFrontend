import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { newProspecto } from '../../services/Services';
import { useForm } from 'react-hook-form';

const ProspectoForm = () => {
  const navigate = useNavigate()
  const [documents, setdocuments] = useState([
    {
      name: '',
      file: ''
    }
  ])
  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm();
  // const [form, setForm] = useState({
  //   nombre: "",
  //   primerApellido: "",
  //   segundoApellido: "",
  //   calle: "",
  //   numero: 0,
  //   colonia: "",
  //   codigoPostal: "",
  //   telefono: "",
  //   rfc: "",
  //   documents: [
  //     {
  //       name: '',
  //       file: ''
  //     }
  //   ]
  // })

  const close = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "warning",
      title: "Se perdera todo lo capturado"
    });

    navigate('/')
  }

  const handleAddDocument = () => {
    setdocuments([...documents, { name: '', file: '' }]);
  };

  const handleDocumentNameChange = (e, index) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].name = e.target.value;
    setdocuments(updatedDocuments);
  };

  const handleFileInputChange = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileBase64 = reader.result
        .replace('data:', '')
        .replace(/^.+,/, '');
      const updatedDocuments = [...documents];
      updatedDocuments[index].file = fileBase64;
      setdocuments(updatedDocuments);
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    // e.preventDefault()

    console.log("form=====>", {...data, documents})
    await newProspecto({...data, documents})
      .then(async (response) => {
        console.log(response)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "se ha agregado correctamente",
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

  return (
    <div className="small-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nombre">Nombre <span style={{ color: 'red' }}>*</span></label>
        <input type="text" {...register("nombre", { required: true })} />
        {errors.nombre && <span className="error-message">Este campo es requerido</span>}

        <label htmlFor="primerApellido">Primer Apellido <span style={{ color: 'red' }}>*</span></label>
        <input type="text" {...register("primerApellido", { required: true })} />
        {errors.primerApellido && <span className="error-message">Este campo es requerido</span>}

        <label htmlFor="segundoApellido">Segundo Apellido </label>
        <input type="text" {...register("segundoApellido")} />
        {errors.segundoApellido && <span className="error-message">Este campo es requerido</span>}

        <label htmlFor="calle">Calle <span style={{ color: 'red' }}>*</span></label>
        <input type="text" {...register("calle", { required: true })} />
        {errors.calle && <span className="error-message">Este campo es requerido</span>}

        <label htmlFor="numero">Numero <span style={{ color: 'red' }}>*</span></label>
        <input type="number" {...register("numero", { required: true })} />
        {errors.numero && <span className="error-message">Este campo es requerido</span>}

        <label htmlFor="colonia">Colonia <span style={{ color: 'red' }}>*</span></label>
        <input type="text" {...register("colonia", { required: true })} />
        {errors.colonia && <span className="error-message">Este campo es requerido</span>}

        <label htmlFor="codigoPostal">Codigo Postal <span style={{ color: 'red' }}>*</span></label>
        <input type="text" {...register("codigoPostal", { required: true })} />
        {errors.codigoPostal && <span className="error-message">Este campo es requerido</span>}

        <label htmlFor="telefono">Telefono <span style={{ color: 'red' }}>*</span></label>
        <input type="text" {...register("telefono", { required: true })} />
        {errors.telefono && <span className="error-message">Este campo es requerido</span>}
        
        <label htmlFor="rfc">RFC <span style={{ color: 'red' }}>*</span></label>
        <input type="text" {...register("rfc", { required: true })} />
        {errors.rfc && <span className="error-message">Este campo es requerido</span>}
   
        <label htmlFor="documents">Documentos<span style={{ color: 'red' }}>*</span></label>
        {documents.map((document, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Nombre del documento"
              value={document.name}
              onChange={(e) => handleDocumentNameChange(e, index)}
            />
            <input
              type="file"
              style={{ marginBottom: 10 }}
              onChange={(e) => handleFileInputChange(e, index)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddDocument}>+</button>
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Agregar" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Salir"
            onClick={() => close()}
          />
        </div>
      </form>
    </div>
  );
}

export default ProspectoForm

{/* <form onSubmit={(e) => handleSubmit(e)}>
<h1>Prospecto</h1>

<label htmlFor="nombre">Nombre <span style={{ color: 'red' }}>*</span></label>
<input
  id="nombre"
  type="text"
  name="nombre"
  value={form.nombre}
  onChange={e => setForm({ ...form, nombre: e.target.value })}

/>

<label htmlFor="primerApellido">Primer Apellido <span style={{ color: 'red' }}>*</span></label>
<input
  id="primerApellido"
  type="text"
  name="primerApellido"
  value={form.primerApellido}
  onChange={e => setForm({ ...form, primerApellido: e.target.value })}
/>
<label htmlFor="segundoApellido">Segundo Apellido </label>
<input
  id="segundoApellido"
  type="text"
  name="segundoApellido"
  value={form.segundoApellido}
  onChange={e => setForm({ ...form, segundoApellido: e.target.value })}
/>
<label htmlFor="calle">Calle <span style={{ color: 'red' }}>*</span></label>
<input
  id="calle"
  type="text"
  name="calle"
  value={form.calle}
  onChange={e => setForm({ ...form, calle: e.target.value })}
/>
<label htmlFor="numero">Numero <span style={{ color: 'red' }}>*</span></label>
<input
  id="numero"
  type="number"
  name="numero"
  value={form.numero}
  onChange={e => setForm({ ...form, numero: e.target.value })}
/>
<label htmlFor="colonia">colonia <span style={{ color: 'red' }}>*</span></label>
<input
  id="colonia"
  type="text"
  name="colonia"
  value={form.colonia}
  onChange={e => setForm({ ...form, colonia: e.target.value })}
/>
<label htmlFor="codigoPostal">Codigo Postal <span style={{ color: 'red' }}>*</span></label>
<input
  id="codigoPostal"
  type="text"
  name="codigoPostal"
  value={form.codigoPostal}
  onChange={e => setForm({ ...form, codigoPostal: e.target.value })}
/>
<label htmlFor="telefono">Telefono <span style={{ color: 'red' }}>*</span></label>
<input
  id="telefono"
  type="text"
  name="telefono"
  value={form.telefono}
  onChange={e => setForm({ ...form, telefono: e.target.value })}
/>
<label htmlFor="rfc">RFC <span style={{ color: 'red' }}>*</span></label>
<input
  id="rfc"
  type="text"
  name="rfc"
  value={form.rfc}
  onChange={e => setForm({ ...form, rfc: e.target.value })}
/>
<label htmlFor="rfc">Documentos<span style={{ color: 'red' }}>*</span></label>
{documents.map((document, index) => (
  <div key={index}>
    <input
      type="text"
      placeholder="Nombre del documento"
      value={document.name}
      onChange={(e) => handleDocumentNameChange(e, index)}
    />
    <input
      type="file"
      style={{ marginBottom: 10 }}
      onChange={(e) => handleFileInputChange(e, index)}
    />
  </div>
))}
<button onClick={handleAddDocument}>+</button>
<div style={{ marginTop: '30px' }}>
  <input type="submit" value="Agregar" />
  <input
    style={{ marginLeft: '12px' }}
    className="muted-button"
    type="button"
    value="Salir"
    onClick={() => close()}
  />
</div>
</form> */}