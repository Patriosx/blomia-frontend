import React from "react";
import { NavLink } from "react-router-dom";
import ConfirmarDialog from "../Formulario/ConfirmarDialog";
// import "./Header.css";

const Header = () => {
	const datoStorage = JSON.parse(localStorage.getItem("usuario_blomia"));
	const [open, setOpen] = React.useState(false);
	const cerrarSesion = () => {
		localStorage.removeItem("usuario_blomia");
		window.location.href = "/";
	};
	// console.log(datoStorage);
	return (
		<div className="container-fluid mb-4 menu">
			<div className="btn-group">
				{!datoStorage ? (
					<NavLink className="btn btn-outline-success" to="/" exact activeClassName="active">
						<h3>Inicio</h3>
					</NavLink>
				) : (
					""
				)}

				<NavLink className="btn btn-outline-success" to="/crear" exact activeClassName="active">
					<h3>Registrar nueva planta</h3>
				</NavLink>
				<NavLink className="btn btn-outline-success" to="/mostrar" exact activeClassName="active">
					<h3>Mostrar plantas</h3>
				</NavLink>
				{datoStorage ? (
					<button
						className="btn btn-outline-success"
						onClick={() => {
							setOpen(true);
						}}
					>
						<h3>Cerrar sesión</h3>
					</button>
				) : (
					""
				)}
			</div>
			<ConfirmarDialog titulo="Confirmar cerrar sesión" contenido="¿Desea cerrar la sesión?" open={open} setOpen={setOpen} funcion={cerrarSesion} />
		</div>
	);
};

export default Header;
