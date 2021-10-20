import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./Tarjetas.css";

const Editar = (props) => {
	const planta = props.planta;
	const modificar = props.modificar;
	const token = props.datoStorage.token;

	const [open2, setOpen2] = useState(false);
	// console.log("planta editar", planta);
	let imgURL = "";
	let publicID = "";

	const [plantaModificada, setPlantaModificada] = useState({
		Nombre: "",
		Referencia: "",
		Tamaño: "",
		Stock: "",
		Precio: "",
	});
	const [preciosModificados, setPreciosModificados] = useState({
		cliente1: "",
		cliente2: "",
		cliente3: "",
		cliente4: "",
	});

	const handleInputModificados = (event) => {
		setPlantaModificada({
			...plantaModificada,
			[event.target.name]: event.target.value,
		});
	};
	const handlePreciosModificados = (event) => {
		setPreciosModificados({
			...preciosModificados,
			[event.target.name]: event.target.value,
		});
	};
	const handleClickOpen2 = () => {
		setOpen2(true);
	};
	const handleClose2 = () => {
		setOpen2(false);
	};
	const submitEditar = (e) => {
		e.preventDefault();
		/**/
		const nuevaPlanta = {
			Nombre: plantaModificada.Nombre,
			Referencia: plantaModificada.Referencia,
			Tamaño: plantaModificada.Tamaño,
			Stock: plantaModificada.Stock,
			Precio: [preciosModificados.cliente1 ? preciosModificados.cliente1 : planta.Precio[0], preciosModificados.cliente2 ? preciosModificados.cliente2 : planta.Precio[1], preciosModificados.cliente3 ? preciosModificados.cliente3 : planta.Precio[2], preciosModificados.cliente4 ? preciosModificados.cliente4 : planta.Precio[3]],
			Foto: planta.Foto ? planta.Foto : [imgURL, publicID],
		};
		/**/
		modificar(nuevaPlanta, planta._id, token);
	};
	return (
		<div id="editarPlanta">
			<button
				id="btnEditar"
				className="btn btn-warning mb-3"
				onClick={() => {
					handleClickOpen2();
					console.log("planta editar", planta);
				}}
			>
				Editar Campos
			</button>
			<Dialog open={open2} onClose={handleClose2} id="" fullWidth>
				<DialogTitle id="alert-dialog-title" className="text-center">
					Editar Referencia
				</DialogTitle>
				<DialogContent>
					<form onSubmit={submitEditar} encType="multipart/form-data" className="form ">
						<label htmlFor="">Seleccione imagen de planta</label>
						{/* <input type="file" id="" accept="image/*" className="form-control" /> */}
						<div className="datos">
							<input type="text" placeholder="Nombre" className="form-control" onChange={handleInputModificados} name="Nombre" />
							<input type="text" placeholder="Referencia" className="form-control" onChange={handleInputModificados} name="Referencia" />
							<input type="text" placeholder="Tamaño" className="form-control" onChange={handleInputModificados} name="Tamaño" />
							<input type="number" placeholder="Stock" className="form-control" onChange={handleInputModificados} name="Stock" />
						</div>

						{/* INPUT PRECIOS */}
						<div className="">
							<h3 className="text-center">PRECIOS</h3>
							<input type="number" step="0.01" className="form-control" placeholder="Cliente 1" onChange={handlePreciosModificados} name="cliente1" />
							<input type="number" step="0.01" className="form-control" placeholder="Cliente 2" onChange={handlePreciosModificados} name="cliente2" />
							<input type="number" step="0.01" className="form-control" placeholder="Cliente 3" onChange={handlePreciosModificados} name="cliente3" />
							<input type="number" step="0.01" className="form-control" placeholder="Cliente 4" onChange={handlePreciosModificados} name="cliente4" />
						</div>
						{/* BOTONES */}
						<div>
							<div onClick={handleClose2} className="btn btn-danger" id="botones">
								Cancelar
							</div>
							<button onClick={handleClose2} type="submit" className="btn btn-warning" id="botones">
								Editar
							</button>
						</div>
					</form>
				</DialogContent>
				<DialogActions>
					{/* <Button onClick={handleClose2} id="botones">Cancelar</Button>
<Button onClick={handleClose2, gestorEdit} type="submit" autoFocus id="botones">
Editar
</Button> */}
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Editar;
