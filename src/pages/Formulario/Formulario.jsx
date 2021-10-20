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
	const añadirPlanta = props.añadirPlanta;

	/***************************************** */
	//IMAGEN CLOUDINARY
	const [imageSelected, setImageSelected] = useState("");
	const cloud_name = process.env.REACT_APP_CLOUD_NAME;
	let imgURL = "";
	let publicID = "";
	const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

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

	const registrarPlanta = async (e) => {
		try {
			//Subimos la imagen a cloudinary
			await uploadImage();
		} catch (error) {
			console.log(error);
		}

		//creamos la nueva planta con toda la informacion
		const nuevaPlanta = {
			Nombre: nuevaEntrada.Nombre,
			Referencia: nuevaEntrada.Referencia,
			Tamaño: nuevaEntrada.Tamaño,
			Stock: nuevaEntrada.Stock,
			Activo: nuevaEntrada.Activo,
			Precio: [precios.cliente1, precios.cliente2, precios.cliente3, precios.cliente4],
			Foto: [imgURL, publicID],
		};
		// console.log("nuevaPlanta", nuevaPlanta);
		//se guarda la nueva planta la base de datos
		añadirPlanta(nuevaPlanta);
	};
	/**/
	const comprobarPlanta = async (e) => {
		e.preventDefault();
		//comprobamos que no exista esa referencia en la BD
		try {
			const response = await axios(`${BASE_URL}/plantas/comprobar/${nuevaEntrada.Referencia}`);
			// console.log(response.data);
			let guardamos = response.data;

			if (guardamos) {
				registrarPlanta();
				limpiarForm();
				toast.success("PLANTA CREADA CON EXITO", {
					theme: "colored",
					autoClose: 5000,
				});
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
		}
	};
	/***********************************************/

	const PROBANDO = () => {
		toast.warn("Probando", {
			theme: "colored",
			autoClose: 5000,
		});
		/*
		toast.success("PLANTA CREADA CON EXITO", {
			position: "top-center",
			type: "success",
			theme: "colored",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		*/
	};

	/************************************************/
	const limpiarForm = () => {
		document.querySelector("form").reset();
		setImageSelected("");
		setNuevaEntrada({ Nombre: "", Referencia: "", Tamaño: "", Stock: "", Activo: false, Precio: "" });
		setPrecios("");
	};
	const handleInput = (event) => {
		setNuevaEntrada({
			...nuevaEntrada,
			[event.target.name]: event.target.value,
		});
	};
	const handleActivo = (event) => {
		setNuevaEntrada({ ...nuevaEntrada, [event.target.name]: document.getElementById("checkbox").checked ? true : false });
	};
	const handlePrecios = (event) => {
		setPrecios({
			...precios,
			[event.target.name]: event.target.value,
		});
	};
	const uploadImage = async () => {
		if (!imageSelected)
			return toast.warn("Ya existe una planta con esta referencia.", {
				theme: "colored",
				autoClose: 5000,
			});
		// console.log("imageSelected", imageSelected);

		const formData = new FormData();
		formData.append("file", imageSelected);
		//nombre del preset de cloudinary: settings > uploads > Upload presets: xh2y2hm1
		formData.append("upload_preset", uploadPreset);
		const URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
		await axios
			.post(URL, formData)
			.then((response) => {
				console.log("response", response);
				// if (response.status === 200) alert("Imagen subida correctamente");
				imgURL = response.data.secure_url;
				publicID = response.data.public_id;
				document.querySelector(".form-control").value = null;
			})
			.catch((e) => {
				console.log(e);
			});
		// console.log(imgURL);
		// console.log(publicID);
	};

	return (
		<div className="container">
			<div className="cuerpo">
				{/* <button onClick={PROBANDO}>PROBANDO</button> */}
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
								required
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
						<input type="text" placeholder="Nombre" className="form-control" onChange={handleInput} name="Nombre" required />
						<input type="text" placeholder="Referencia" className="form-control" onChange={handleInput} id="referencia" name="Referencia" required />
						<input type="text" placeholder="Tamaño" className="form-control" onChange={handleInput} name="Tamaño" />
						<input type="number" placeholder="Stock" className="form-control" onChange={handleInput} name="Stock" />
						<div>
							<label htmlFor="checkbox">
								Referencia Activa
								<input type="checkbox" id="checkbox" onChange={handleActivo} name="Activo" />
							</label>
						</div>
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
