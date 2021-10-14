import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Tarjetas.css";
const Borrar = (props) => {
	const planta = props.planta;
	const eliminar = props.eliminar;

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	// ----------------------------Gestor Borrar---------------------------------

	const borrarPlanta = () => {
		eliminar(planta._id);
	};

	return (
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
	);
};

export default Borrar;
