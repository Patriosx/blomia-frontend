import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Tarjetas.css";

const Editar = (props) => {
	const planta = props.planta;
	const modificar = props.modificar;
	const [open2, setOpen2] = React.useState(false);

	const handleClickOpen2 = () => {
		setOpen2(true);
	};

	const handleClose2 = () => {
		setOpen2(false);
	};
	const gestorEdit = (e) => {
		e.preventDefault();

		const modificaPlanta = {
			Foto: planta.Foto,
			Nombre: planta.Nombre,
			Referencia: planta.Referencia,
			Tamaño: planta.Tamaño,
			Stock: planta.Stock,
			Activo: planta.Activo,
			Precio: planta.Precio,
		};
	};
	return (
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
						<form encType="multipart/form-data" className="form">
							<label for="">Seleccione imagen de planta</label>
							<input type="file" id="" accept="image/*" className="form-control" />
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
	);
};

export default Editar;
