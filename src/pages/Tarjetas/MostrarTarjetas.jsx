import React from "react";
import Tarjetas from "./Tarjetas";

const MostrarTarjetas = (props) => {
	const listaPlantas = props.listaPlantas;
	const eliminar = props.eliminar;
	const modificar = props.modificar;
	const searchInput = props.searchInput;
	const filteredResults = props.filteredResults;
	const cambiarActivo = props.cambiarActivo;

	return (
		<div className="container-fluid">
			{/* Busca las plantas: carga la busqueda o todas las plantasss */}
			{/* <div className="row tarjetas"> */}
			<div className="row row-cols-auto">
				{searchInput.length > 1
					? filteredResults.map((planta) => {
							return <Tarjetas key={planta._id} planta={planta} eliminar={eliminar} modificar={modificar} cambiarActivo={cambiarActivo} />;
					  })
					: listaPlantas.map((planta) => {
							return <Tarjetas key={planta._id} planta={planta} eliminar={eliminar} modificar={modificar} cambiarActivo={cambiarActivo} />;
					  })}
			</div>
		</div>
	);
};

export default MostrarTarjetas;
