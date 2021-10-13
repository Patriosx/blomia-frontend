import Tarjetas from "../Tarjetas/Tarjetas.jsx";
import './Busqueda.css';
import { useState, useEffect, useRef } from 'react';
// import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Busqueda(props) {
  const lista = props.listaPlantas;
  const eliminar = props.eliminar;
  const modificar = props.modificar;
  
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  
  const [Foto, setFoto] = useState("");
  const [Nombre, setNombre] = useState("");
  const [Referencia, setReferencia] = useState("");
  const [Tamaño, setTamaño] = useState("");
  const [Stock, setStock] = useState("");
  const [Activo, setActivo] = useState(false);
  const [Tipo, setTipo] = useState("");
  const [Precio, setPrecio] = useState("");
  

  const handleClickOpen = () => {
  setOpen(true);
  };
  
  const handleClose = () => {
  setOpen(false);
  };
  
  
  const handleClickOpen2 = () => {
  setOpen2(true);
  };
    
  const handleClose2 = () => {
  setOpen2(false);
  };
  
  // ----------------------------Gestor Borrar---------------------------------
  
  const borrarPlanta = () => {
  eliminar(lista._id);
  };
  
  // ----------------------------Gestor Editar---------------------------------
  
  const gestorEdit = (e) => {
  e.preventDefault();
  setError(false);
  if (
  Foto.trim() === ""||
  Nombre.trim() === ""||
  Referencia.trim() === ""||
  Tamaño.trim() === ""||
  Stock.trim() === ""||
  Activo.trim() === ""||
  Tipo.trim() === ""||
  Precio.trim() === ""
  ) {
  setError(true);
  return;
  }
  
  const modificaPlanta = {
  id: lista._id,
  Foto: lista.Foto,
  Nombre: lista.Nombre,
  Referencia: lista.Referencia,
  Tamaño: lista.Tamaño,
  Stock: lista.Stock,
  Activo: lista.Activo,
  Tipo: lista.Tipo,
  Precio: lista.Precio,
  }
  
  modificar(modificaPlanta);
  
  setFoto("");
  setNombre("");
  setReferencia("");
  setTamaño("");
  setStock("");
  setActivo(false);
  setTipo("");
  setPrecio("");

  };

  const gestorFoto = (event) => {
    setFoto(event.target.value);
  };
  const gestorNombre = (event) => {
    setNombre(event.target.value);
  };
  const gestorReferencia = (event) => {
    setReferencia(event.target.value);
  };
  const gestorTamaño = (event) => {
    setTamaño(event.target.value);
  };
  const gestorStock = (event) => {
    setStock(event.target.value);
  };
  const gestorActivo = (event) => {
    setActivo(event.target.value);
  };
  const gestorTipo = (event) => {
    setTipo(event.target.value);
  };
  const gestorPrecio = (event) => {
    setPrecio(event.target.value);
  };

return (
<div className="juntar">
<div className="contenido">
<div className="card text-white bg-primary mb-3">
      <div key={lista._id} id="tarjeta">
        <div className="eliminar">
          <button type="submit" id="borrar" onClick={handleClickOpen} className="fas fa-times btn btn-danger"></button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              <p id="alertTitle">{"Confirme eliminacion de planta"}</p>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p id="alert">¿Esta seguro de que desea eliminar {lista.Referencia}?</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} id="botones">No</Button>
              <Button onClick={handleClose, borrarPlanta} autoFocus id="botones">
                Si
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <p>{lista.Foto}</p>
          <h5 id="nombre"><strong>{lista.Nombre}</strong></h5>
        </div>
        <p><strong>Referencia: </strong>{lista.Referencia}</p>
        <p><strong>Tamaño: </strong>{lista.Tamaño}</p>
        <p><strong>Stock: </strong>{lista.Stock}</p>
        <p><strong>Activo: </strong>{lista.Activo}</p>
        <p><strong>Tipo: </strong>{lista.Tipo}</p>
        <p><strong>Precio: </strong>{lista.Precio}</p>
      </div>
      <div id="gestoredit">
        {/* {error ? (<div className="divError">
          <p className="mensajeError">Debe completar todos los campos</p>
        </div>) : null} */}
        <div id="formularioedit">
          <button type="submit" id="editar" className="btn btn-warning" onClick={handleClickOpen2}>Editar Campos</button>
          <Dialog open={open2} onClose={handleClose2} aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              <p id="alertTitle">{"Confirme eliminacion de planta"}</p>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              <form key={lista._id} onSubmit={gestorEdit} encType="multipart/form-data" className="form">
            <label for="File">Seleccione imagen de planta</label>
            <input type="text" id="imageFile" accept="image/*" onChange={gestorFoto} Value={Foto} className="form-control" />
            <input type="text" placeholder="Nombre" onChange={gestorNombre} Value={Nombre} className="form-control" />
            <input type="text" placeholder="Referencia" onChange={gestorReferencia} Value={Referencia} className="form-control" />
            <input type="text" placeholder="Tamaño" onChange={gestorTamaño} Value={Tamaño} className="form-control" />
            <input type="number" placeholder="Stock" onChange={gestorStock} Value={Stock} className="form-control" />
            <label for="CheckBox">Marcar si la referencia esta Activa</label>
            <input type="checkbox" placeholder="Activo" id="checkbox" onChange={gestorActivo} Value={Activo}/>
            <input type="text" placeholder="Tipo" className="form-control" onChange={gestorTipo} Value={Tipo}/>
            <input type="number" placeholder="Precio" step="0.01" onChange={gestorPrecio} Value={Precio} className="form-control" />
            <div>
              <button onClick={handleClose2} className="btn btn-danger" id="botones">Cancelar</button>
              <button onClick={handleClose2} type="submit" className="btn btn-warning" autoFocus id="botones">Editar</button>
            </div>
            </form>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose2} id="botones">Cancelar</Button>
              <Button onClick={handleClose2, gestorEdit} type="submit" autoFocus id="botones">
            Editar
          </Button> */}
        </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
    </div>
</div>
)}

export default Busqueda;