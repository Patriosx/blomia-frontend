import axios from "axios";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Formulario.css";
import "core-js";
import { Image } from "cloudinary-react";
// const cloudinary = require("cloudinary").v2;

function Formulario(props) {
	const añadirPlanta = props.añadirPlanta;

	const [error, setError] = useState("");

	const [Foto, setFoto] = useState("");
	const [Nombre, setNombre] = useState("");
	const [Referencia, setReferencia] = useState("");
	const [Tamaño, setTamaño] = useState("");
	const [Stock, setStock] = useState("");
	const [Activo, setActivo] = useState("");
	const [Tipo, setTipo] = useState("");
	const [Precio, setPrecio] = useState("");

	// ----------------------------Funcion Submit---------------------------------

	const submitForm = (e) => {
		e.preventDefault();
		uploadImage();
	};

	const success = () => {
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
	};
	/***************************************** */
	//IMAGEN CLOUDINARY
	const [imageSelected, setImageSelected] = useState("");
	// const [imageUploaded, setImageUploaded] = useState("");
	const cloud_name = "blomia";
	let imgURL = "";
	let uploadPreset = "aj6y3r0q";

	const uploadImage = async () => {
		if (!imageSelected) return alert("Selecciona una imagen");

		const formData = new FormData();
		formData.append("file", imageSelected);
		//nombre del preset de cloudinary: settings > uploads > Upload presets: xh2y2hm1
		formData.append("upload_preset", uploadPreset);

		const URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
		await axios
			.post(URL, formData)
			.then((response) => {
				// console.log("response", response);
				if (response.status === 200) alert("Imagen subida correctamente");
				imgURL = response.data.secure_url;
			})
			.then(() => {
				setFoto(imgURL);
				document.querySelector(".form-control").value = null;
				console.log("Foto", Foto);
			})
			.catch((e) => {
				console.log(e);
			});

		console.log(imgURL);
	};

	return (
		<div className="container">
			<div className="cuerpo">
				<form type="" encType="multipart/form-data" className="formulario bg-success mb-3">
					<h2 className="tituloTarjeta">Crear Nueva Referencia</h2>

					{!Foto ? (
						<>
							<input
								className="form-control"
								type="file"
								onChange={(e) => {
									setImageSelected(e.target.files[0]);
								}}
							/>
							<button className="btn btn-warning" onClick={uploadImage}>
								Upload
							</button>
						</>
					) : (
						<>
							<a href={Foto} target="_blank">
								foto
							</a>
							<Foto imgURL={Foto} />
						</>
					)}
					<>
						<input type="text" placeholder="Nombre" required className="form-control" />
						<input type="text" placeholder="Referencia" required className="form-control" />
						<input type="text" placeholder="Tamaño" required className="form-control" />
						<input type="number" placeholder="Stock" required className="form-control" />
						<label for="CheckBox">Marcar si la referencia esta Activa</label>
						<input type="checkbox" placeholder="Activo" id="checkbox" />
						{/* este input precio es de prueba--------------------------------------------------------------- */}
						<input type="text" placeholder="Tipo" required className="form-control" />
						<input type="number" placeholder="Precio" step="0.01" required className="form-control" />

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
