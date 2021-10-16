import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Tarjetas.css";
// import { Cloudinary } from "cloudinary-core";
// var cloudinary = require("cloudinary").v2;

const Borrar = (props) => {
	const planta = props.planta;
	const eliminar = props.eliminar;
	const public_id = props.planta.Foto[1];
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	// ----------------------------Gestor Borrar---------------------------------

	const borrarPlanta = () => {
		//eliminar de la BD
		eliminar(planta._id);
		//eliminar de cloudinary
		// cloudinary.v2.uploader.destroy(public_id);
		/** *
		cloudinary.uploader.destroy(public_id, function (error, result) {
			console.log(result, error);
		});
		/**/
	};

	return (
		<div className="eliminar m-1">
			<button type="submit" id="borrar" onClick={handleClickOpen} className="btn btn-danger">
				🗑
			</button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">Confirme eliminacion de planta</DialogTitle>
				<DialogContent>
					<DialogContentText id="">
						{/* <p id="alert">¿Esta seguro de que desea eliminar {planta.Referencia}?</p> */}
						¿Esta seguro de que desea eliminar {planta.Nombre}?
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
