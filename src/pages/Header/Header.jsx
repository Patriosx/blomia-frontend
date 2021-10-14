import React from "react";
import { NavLink } from "react-router-dom";
// import "./Header.css";

const Header = () => {
	return (
		<div className="container-fluid mb-4">
			<div className="btn-group">
				<NavLink className="btn btn-outline-success" to="/crear" exact activeClassName="active">
					<h3>Registrar nueva planta</h3>
				</NavLink>
				<NavLink className="btn btn-outline-success" to="/mostrar" exact activeClassName="active">
					<h3>Mostrar plantas</h3>
				</NavLink>
			</div>
		</div>
	);
};

export default Header;
