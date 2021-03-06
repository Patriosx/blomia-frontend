import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import Eliminar from "./Eliminar";
import { useState } from "react";
import Editar from "./Editar";

function Tarjetas(props) {
	const planta = props.planta;
	const eliminar = props.eliminar;
	const modificar = props.modificar;
	const cambiarActivo = props.cambiarActivo;
	const cambiarStock = props.cambiarStock;

	const datoStorage = JSON.parse(localStorage.getItem("usuario_blomia"));
	const tieneAcceso = datoStorage ? true : false;
	const [nuevoStock, setNuevoStock] = useState("");
	/***  Dialog ***/
	const [open, setOpen] = useState(false);

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false);
	};
	const handleNuevoStock = (event) => {
		setNuevoStock(event.target.value);
	};

	return (
		<div className="col col-md-6 col-xl-4 mx-auto tarjeta">
			<div key={planta._id} id="" className="card text-white bg-primary mb-2">
				{tieneAcceso ? <Eliminar planta={planta} eliminar={eliminar} datoStorage={datoStorage} /> : ""}

				<div className="m-2">
					<img src={planta.Foto[0]} alt="" className="img-fluid card" />
				</div>
				<h3 id="" className="fw-bold">
					{planta.Nombre ? planta.Nombre : "-"}
				</h3>
				<div>
					<p>Referencia: {planta.Referencia}</p>
					<p>Tamaño: {planta.Tamaño}</p>
					<div className=" mb-3 ">
						<span className="input-group-text d-flex justify-content-center" id="basic-addon1">
							Stock: {planta.Stock}
							<div className="btn-group my-auto cambiarStock ">
								<input type="number" className="form-control ms-2 stock" placeholder="Nuevo stock" aria-describedby="basic-addon2" onChange={handleNuevoStock} name="nuevoStock" required />
								<button
									className="btn btn-outline-primary"
									type="button"
									id="button-addon2"
									onClick={() => {
										!document.querySelector(".stock").value ? alert("Necesita rellenar el campo") : cambiarStock(nuevoStock, planta._id);
									}}
								>
									cambiar
								</button>
							</div>
						</span>
					</div>
					{/* <p>Stock: {planta.Stock}</p> */}
					{/* Activo */}
					{/* <p className={planta.Activo ? "btn btn-outline-danger" : "btn btn-outline-info"} onClick={handleClickOpen}>
						Activo: {planta.Activo ? "SI" : "NO"}
					</p> */}
					{/* Precios. SOLO PARA ADMINISTRADOR */}
					{tieneAcceso ? (
						<>
							<hr />
							<div className="mb-3">
								<select name="cliente" id="categorias" className="form-control text-center">
									<option value="-1">--Lista de precios--</option>
									<option value="0">Categoría 1: {planta.Precio[0] ? `${planta.Precio[0]} €` : "No tiene precio"}</option>
									<option value="1">Categoría 2: {planta.Precio[1] ? `${planta.Precio[1]} €` : "No tiene precio"}</option>
									<option value="2">Categoría 3: {planta.Precio[2] ? `${planta.Precio[2]} €` : "No tiene precio"}</option>
									<option value="3">Categoría 4: {planta.Precio[3] ? `${planta.Precio[3]} €` : "No tiene precio"}</option>
								</select>
							</div>
							<Editar planta={planta} datoStorage={datoStorage} modificar={modificar} />
						</>
					) : (
						""
					)}
				</div>
			</div>

			<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">Desea cambiar de estado Activo de la planta</DialogTitle>
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
