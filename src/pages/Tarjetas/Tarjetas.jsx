// import "./Tarjetas.css";
import * as React from "react";
import Borrar from "./Borrar";
import Editar from "./Editar";

function Tarjetas(props) {
	const planta = props.planta;
	const eliminar = props.eliminar;
	const modificar = props.modificar;

	return (
		<div className="col-md">
			<div key={planta._id} id="" className="card text-white bg-primary mb-2">
				<Borrar planta={planta} eliminar={eliminar} />
				<div>
					<div className="m-2">
						<img src={planta.Foto} alt="" className="img-fluid card" />
					</div>
					<h3 id="">{planta.Nombre}</h3>
				</div>
				<div>
					<p>Referencia:{planta.Referencia}</p>
					<p>Tamaño:{planta.Tamaño}</p>
					<p>Stock:{planta.Stock}</p>
					<p>Activo:{planta.Activo ? "SI" : "NO"}</p>
					<p>Cliente:</p>
					<select name="cliente" id="categorias" className="form-control text-center">
						<option value="-1">--Elige una opción--</option>
						<option value="0">Categoría 1: {planta.Precio[0] ? `${planta.Precio[0]} €` : "No tiene precio"}</option>
						<option value="1">Categoría 2: {planta.Precio[1] ? `${planta.Precio[1]} €` : "No tiene precio"}</option>
						<option value="2">Categoría 3: {planta.Precio[2] ? `${planta.Precio[2]} €` : "No tiene precio"}</option>
						<option value="3">Categoría 4: {planta.Precio[3] ? `${planta.Precio[3]} €` : "No tiene precio"}</option>
					</select>
				</div>
				<Editar plant={planta} modificar={modificar} />
			</div>
		</div>
	);
}

export default Tarjetas;
