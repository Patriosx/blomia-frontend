import React from "react";
import "./Tarjetas.css";
import ConfirmarDialog from "../Formulario/ConfirmarDialog";

const Borrar = (props) => {
	const planta = props.planta;
	const eliminar = props.eliminar;
	const token = props.datoStorage.token;
	const [open, setOpen] = React.useState(false);
	// ----------------------------Gestor Borrar---------------------------------

	const borrarPlanta = () => {
		//eliminar de la BD
		eliminar(planta._id, token);
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
