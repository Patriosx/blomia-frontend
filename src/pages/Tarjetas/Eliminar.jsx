import React from "react";
import "./Tarjetas.css";
import ConfirmarDialog from "../Formulario/ConfirmarDialog";

const Borrar = (props) => {
	const planta = props.planta;
	const eliminar = props.eliminar;
	const token = props.datoStorage.token;
	const public_id = props.planta.Foto[1];
	const [open, setOpen] = React.useState(false);
	// ----------------------------Gestor Borrar---------------------------------

	const borrarPlanta = () => {
		//eliminar de la BD
		eliminar(planta._id, token);
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
			<button type="submit" id="borrar" onClick={() => setOpen(true)} className="btn btn-danger">
				🗑
			</button>
			<ConfirmarDialog titulo="Confirmar eliminar planta" contenido="¿Desea eliminar la planta?" open={open} setOpen={setOpen} funcion={borrarPlanta} />
		</div>
	);
};

export default Borrar;
