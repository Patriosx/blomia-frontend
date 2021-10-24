import axios from "axios";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Formulario.css";
import "core-js";
import Foto from "./Foto";

function Formulario(props) {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const registrarPlanta = props.registrarPlanta;

	/***************************************** */
	//IMAGEN CLOUDINARY
	const [imageSelected, setImageSelected] = useState("");

	const [nuevaEntrada, setNuevaEntrada] = useState({
		Nombre: "",
		Referencia: "",
		Tamaño: "",
		Activo: false,
		Stock: "",
		Precio: "",
	});

	const [precios, setPrecios] = useState({
		cliente1: "",
		cliente2: "",
		cliente3: "",
		cliente4: "",
	});

	/**/
	const comprobarPlanta = async (e) => {
		e.preventDefault();
		//comprobamos que no exista esa referencia en la BD
		try {
			const response = await axios(`${BASE_URL}/plantas/comprobar/${nuevaEntrada.Referencia}`);
			console.log(response.data);
			let guardamos = response.data;

			if (guardamos) {
				// nuevaEntrada, imageSelected, precios
				registrarPlanta(nuevaEntrada, imageSelected, precios);
				limpiarForm();
			} else {
				console.log("Cliente: Esta referencia ya existe");
				toast.error("Ya existe una planta con esta referencia", {
					theme: "colored",
					autoClose: 5000,
				});
				document.getElementById("referencia").value = "";
			}
		} catch (error) {
			console.log("Error al comprobar");
			console.log(error);
		}
	};
	/***********************************************/

	/************************************************/
	const limpiarForm = () => {
		document.querySelector("form").reset();
		// setImageSelected("");

		setNuevaEntrada({ Nombre: "", Referencia: "", Tamaño: "", Stock: "", Activo: false, Precio: "" });
		setPrecios("");
	};
	const handleInput = (event) => {
		setNuevaEntrada({
			...nuevaEntrada,
			[event.target.name]: event.target.value,
		});
	};
	/*
	const handleActivo = (event) => {
		setNuevaEntrada({ ...nuevaEntrada, [event.target.name]: document.getElementById("checkbox").checked ? true : false });
	};
	*/
	const handlePrecios = (event) => {
		setPrecios({
			...precios,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div className="container">
			<div className="cuerpo">
				<form type="" onSubmit={comprobarPlanta} encType="multipart/form-data" className="formulario bg-success mb-3">
					<h2 className="tituloTarjeta" onClick={limpiarForm}>
						Crear Nueva Referencia
					</h2>

					{!imageSelected ? (
						<>
							<input
								accept="image/*"
								className="form-control foto"
								type="file"
								onChange={(e) => {
									setImageSelected(e.target.files[0]);
								}}
							/>
						</>
					) : (
						<>
							<Foto imgURL={URL.createObjectURL(imageSelected)} />
						</>
					)}
					<>
						<input type="text" placeholder="Nombre" className="form-control" onChange={handleInput} name="Nombre" />
						<input type="text" placeholder="Referencia" className="form-control" onChange={handleInput} id="referencia" name="Referencia" required />
						<input type="text" placeholder="Tamaño" className="form-control" onChange={handleInput} name="Tamaño" />
						<input type="number" placeholder="Stock" className="form-control" onChange={handleInput} name="Stock" />
						{/* <div>
							<label htmlFor="checkbox">
								Referencia Activa
								<input type="checkbox" id="checkbox" onChange={handleActivo} name="Activo" />
							</label>
						</div> */}
						{/* este input precio es de prueba--------------------------------------------------------------- */}

						<div className="">
							<h3>PRECIOS</h3>
							<div className="d-flex flex-wrap flex-sm-nowrap justify-content-center precios">
								<input type="number" step="0.01" className="form-control" placeholder="Cliente 1" aria-label="Username" onChange={handlePrecios} name="cliente1" />
								<input type="number" step="0.01" className="form-control" placeholder="Cliente 2" aria-label="Username" onChange={handlePrecios} name="cliente2" />
								<input type="number" step="0.01" className="form-control" placeholder="Cliente 3" aria-label="Username" onChange={handlePrecios} name="cliente3" />
								<input type="number" step="0.01" className="form-control" placeholder="Cliente 4" aria-label="Username" onChange={handlePrecios} name="cliente4" />
							</div>
						</div>

						<button type="submit" className="btn btn-success">
							ENVIAR
						</button>
					</>
				</form>

				<div>
					<ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
				</div>
			</div>
		</div>
	);
}

export default Formulario;
