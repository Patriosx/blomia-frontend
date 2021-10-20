import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmarDialog = (props) => {
	// const [open, setOpen] = React.useState(false);
	const setOpen = props.setOpen;
	const open = props.open;
	const titulo = props.titulo;
	const contenido = props.contenido;
	const funcion = props.funcion;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
			<DialogContent>
				<DialogContentText id="">
					{/* <p id="alert">¿Esta seguro de que desea eliminar {planta.Referencia}?</p> */}
					{contenido}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} id="botones">
					No
				</Button>
				<Button onClick={(handleClose, funcion)} autoFocus id="botones">
					Si
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmarDialog;
