import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import "./Tarjetas.css";
import * as React from "react";
import Eliminar from "./Eliminar";
import Editar from "./Editar";

function Tarjetas(props) {
	const planta = props.planta;
	const eliminar = props.eliminar;
	const modificar = props.modificar;
	const cambiarActivo = props.cambiarActivo;
	const datoStorage = JSON.parse(localStorage.getItem("usuario_blomia"));
	const tieneAcceso = datoStorage ? true : false;

	/***  Dialog ***/
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className="col col-md-6 col-xl-4 mx-auto tarjeta">
			<div key={planta._id} id="" className="card text-white bg-primary mb-2">
				{tieneAcceso ? <Eliminar planta={planta} eliminar={eliminar} datoStorage={datoStorage} /> : ""}

				{/* <div> */}
				<div className="m-2">
					<img src={planta.Foto[0]} alt="" className="img-fluid card" />
				</div>
				<h3 id="" className="fw-bold">
					{planta.Nombre}
				</h3>
				{/* </div> */}
				<div>
					<p>Referencia:{planta.Referencia}</p>
					<p>Tamaño:{planta.Tamaño}</p>
					<p>Stock:{planta.Stock}</p>
					<p className={planta.Activo ? "btn btn-outline-danger" : "btn btn-outline-info"} onClick={handleClickOpen}>
						Activo: {planta.Activo ? "SI" : "NO"}
					</p>
					<div className="mb-3">
						<p>Cliente:</p>
						<select name="cliente" id="categorias" className="form-control text-center">
							<option value="-1">--Elige una opción--</option>
							<option value="0">Categoría 1: {planta.Precio[0] ? `${planta.Precio[0]} €` : "No tiene precio"}</option>
							<option value="1">Categoría 2: {planta.Precio[1] ? `${planta.Precio[1]} €` : "No tiene precio"}</option>
							<option value="2">Categoría 3: {planta.Precio[2] ? `${planta.Precio[2]} €` : "No tiene precio"}</option>
							<option value="3">Categoría 4: {planta.Precio[3] ? `${planta.Precio[3]} €` : "No tiene precio"}</option>
						</select>
					</div>
				</div>
				{tieneAcceso ? <Editar planta={planta} datoStorage={datoStorage} modificar={modificar} /> : ""}
			</div>

			<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{/* <p id="alertTitle">Confirme cambio de estado Activo de la planta</p> */}Desea cambiar de estado Activo de la planta</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">¿Esta seguro de que desea Cambiar el estado de {planta.Nombre}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} id="botones">
						No
					</Button>
					<Button
						onClick={() => {
							cambiarActivo(planta._id);
							handleClose();
						}}
						autoFocus
						id="botones"
					>
						Si
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Tarjetas;
