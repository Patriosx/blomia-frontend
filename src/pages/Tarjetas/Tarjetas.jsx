// import "./Tarjetas.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

function Tarjetas(props) {
	const planta = props.planta;
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
	const [Activo, setActivo] = useState("");
	const [Precio, setPrecio] = useState("");
	const [categoria, setCategoria] = useState("");
	// console.log(planta);

	const handleCategoria = () => {
		setCategoria(document.querySelector("select").value);
	};

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
		eliminar(planta._id);
	};

	// ----------------------------Gestor Editar---------------------------------

	const gestorEdit = (e) => {
		e.preventDefault();
		/*
		setError(false);
		if (Foto.trim() === "" || Nombre.trim() === "" || Referencia.trim() === "" || Tamaño.trim() === "" || Stock.trim() === "" || Activo.trim() === "" || Tipo.trim() === "" || Precio.trim() === "") {
			setError(true);
			return;
		}
*/
		const modificaPlanta = {
			id: planta._id,
			Foto: Foto,
			Nombre: Nombre,
			Referencia: Referencia,
			Tamaño: Tamaño,
			Stock: Stock,
			Activo: Activo,
			Precio: Precio,
		};
	};
	return (
		<div className="juntar">
			<div className="contenido">
				<div className="card text-white bg-primary mb-3">
					<div key={planta._id} id="" className="container">
						<div className="eliminar m-1">
							<button type="submit" id="borrar" onClick={handleClickOpen} className="fas fa-times btn btn-danger"></button>
							<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
								<DialogTitle id="alert-dialog-title">
									<p id="alertTitle">Confirme eliminacion de planta</p>
								</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										<p id="alert">¿Esta seguro de que desea eliminar {planta.Referencia}?</p>
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose} id="botones">
										No
									</Button>
									<Button onClick={(handleClose, borrarPlanta)} autoFocus id="botones">
										Si
									</Button>
								</DialogActions>
							</Dialog>
						</div>
						<div>
							<div>
								<img src={planta.Foto} alt="" className="img-fluid card" />
							</div>
							<h5 id="nombre">
								<strong>{planta.Nombre}</strong>
							</h5>
						</div>
						<p>
							<strong>Referencia: </strong>
							{planta.Referencia}
						</p>
						<p>
							<strong>Tamaño: </strong>
							{planta.Tamaño}
						</p>
						<p>
							<strong>Stock: </strong>
							{planta.Stock}
						</p>
						<p>
							<strong>Activo: </strong>
							{planta.Activo ? "SI" : "NO"}
						</p>
						<strong>Cliente: </strong>
						<select name="cliente" id="categorias" className="form-control text-center" onChange={handleCategoria}>
							<option value="-1">--Elige una opción--</option>
							<option value="0">Categoría 1: {planta.Precio[0] ? `${planta.Precio[0]} €` : "No tiene precio"}</option>
							<option value="1">Categoría 2: {planta.Precio[1] ? `${planta.Precio[1]} €` : "No tiene precio"}</option>
							<option value="2">Categoría 3: {planta.Precio[2] ? `${planta.Precio[2]} €` : "No tiene precio"}</option>
							<option value="3">Categoría 4: {planta.Precio[3] ? `${planta.Precio[3]} €` : "No tiene precio"}</option>
						</select>
					</div>
					<div id="gestoredit">
						{/* {error ? (<div className="divError">
      <p className="mensajeError">Debe completar todos los campos</p>
    </div>) : null} */}
						<div id="formularioedit">
							<button type="submit" id="editar" className="btn btn-warning" onClick={handleClickOpen2}>
								Editar Campos
							</button>
							<Dialog open={open2} onClose={handleClose2} aria-labelledby="alert-dialog-title" id="foredit" aria-describedby="alert-dialog-description">
								<DialogTitle id="alert-dialog-title">
									<p id="alertTitle">Editar Referencia</p>
								</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										<form key={planta._id} encType="multipart/form-data" className="form">
											<label for="File">Seleccione imagen de planta</label>
											<input type="text" id="imageFile" accept="image/*" className="form-control" />
											<input type="text" placeholder="Nombre" className="form-control" />
											<input type="text" placeholder="Referencia" className="form-control" />
											<input type="text" placeholder="Tamaño" className="form-control" />
											<input type="number" placeholder="Stock" className="form-control" />
											<label for="CheckBox">Marcar si la referencia esta Activa</label>
											<input type="checkbox" placeholder="Activo" id="checkbox" />
											<input type="number" placeholder="Precio" step="0.01" className="form-control" />
											<button onClick={handleClose2} className="btn btn-danger" id="botones">
												Cancelar
											</button>
											<button onClick={handleClose2} type="submit" className="btn btn-warning" autoFocus id="botones">
												Editar
											</button>
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
	);
}

export default Tarjetas;
