import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./Tarjetas.css";
import axios from "axios";

const Editar = (props) => {
	const planta = props.planta;
	const modificar = props.modificar;
	const token = props.datoStorage.token;

	const [imageSelected, setImageSelected] = useState("");
	const [open2, setOpen2] = useState(false);
	// console.log("planta editar", planta);

	const [plantaModificada, setPlantaModificada] = useState({
		Foto: "",
		Nombre: "",
		Referencia: "",
		Tamaño: "",
		Stock: "",
		Precio: "",
	});
	const [preciosModificados, setPreciosModificados] = useState({
		cliente1: "",
		cliente2: "",
		cliente3: "",
		cliente4: "",
	});

	const handleInputModificados = (event) => {
		setPlantaModificada({
			...plantaModificada,
			[event.target.name]: event.target.value,
		});
	};
	const handlePreciosModificados = (event) => {
		setPreciosModificados({
			...preciosModificados,
			[event.target.name]: event.target.value,
		});
	};
	const handleClickOpen2 = () => {
		setOpen2(true);
	};
	const handleClose2 = () => {
		setOpen2(false);
	};

	let imgURL = "";
	let publicID = "";
	const uploadImage = async (imageSelected) => {
		const formData = new FormData();
		formData.append("file", imageSelected);
		//nombre del preset de cloudinary: settings > uploads > Upload presets: xh2y2hm1
		formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
		const URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
		await axios
			.post(URL, formData)
			.then((response) => {
				imgURL = response.data.secure_url;
				publicID = response.data.public_id;
			})
			.catch((e) => {
				console.log(e);
			});
	};
	const eliminarFoto = async (fotoID) => {
		try {
			await axios(`${process.env.REACT_APP_BASE_URL}/plantas/actualizarFoto/${fotoID}`);
		} catch (error) {
			console.log(error);
			console.log("No se pudo eliminar la foto de clodinary");
		}
	};
	/**/
	const fotoViejaID = planta.Foto[1];
	const comprobarPlanta = async (e) => {
		e.preventDefault();
		//comprobamos que no exista esa referencia en la BD
		if (plantaModificada.Referencia) {
			await axios(`${process.env.REACT_APP_BASE_URL}/plantas/comprobar/${plantaModificada.Referencia}`).catch((err) => {
				console.log(err);
				console.log("Ya existe esta referencia");
				alert("Ya existe esta referencia");
			});
		}

		try {
			//si tiene foto la eliminamos antes de cambiarla
			if (fotoViejaID) eliminarFoto(fotoViejaID);
			//Subimos la nueva imagen a cloudinary
			await uploadImage(imageSelected);
			// console.log("foto nueva", publicID);
			// console.log("fotovieja", fotoViejaID);
		} catch (error) {
			console.log(error);
		}

		const nuevaPlanta = {
			Nombre: plantaModificada.Nombre ? plantaModificada.Nombre : planta.Nombre,
			Referencia: plantaModificada.Referencia ? plantaModificada.Referencia : planta.Referencia,
			Tamaño: plantaModificada.Tamaño ? plantaModificada.Tamaño : planta.Tamaño,
			Stock: plantaModificada.Stock ? plantaModificada.Stock : planta.Stock,
			Precio: [preciosModificados.cliente1 ? preciosModificados.cliente1 : planta.Precio[0], preciosModificados.cliente2 ? preciosModificados.cliente2 : planta.Precio[1], preciosModificados.cliente3 ? preciosModificados.cliente3 : planta.Precio[2], preciosModificados.cliente4 ? preciosModificados.cliente4 : planta.Precio[3]],
			Foto: imageSelected ? [imgURL, publicID] : planta.Foto,
		};
		/**/

		modificar(nuevaPlanta, planta._id, token);

		// toast.error("Ya existe una planta con esta referencia", {
		// 	theme: "colored",
		// 	autoClose: 5000,
		// });
	};
	/***********************************************/
	return (
		<div id="editarPlanta">
			<button
				id="btnEditar"
				className="btn btn-warning mb-3"
				onClick={() => {
					handleClickOpen2();
					// console.log("planta editar", planta);
				}}
			>
				Editar Campos
			</button>
			<Dialog open={open2} onClose={handleClose2} id="" fullWidth>
				<DialogTitle id="alert-dialog-title" className="text-center">
					Editar Referencia
				</DialogTitle>
				<DialogContent>
					<form onSubmit={comprobarPlanta} encType="multipart/form-data" className="formEditar ">
						<h5 className="text-center">Nuevos datos de la planta</h5>
						<input
							accept="image/*"
							className="form-control foto"
							type="file"
							onChange={(e) => {
								setImageSelected(e.target.files[0]);
							}}
						/>
						<div className="datos">
							<input type="text" placeholder="Nombre" className="form-control" onChange={handleInputModificados} name="Nombre" />
							<input type="text" placeholder="Referencia" className="form-control" onChange={handleInputModificados} name="Referencia" />
							<input type="text" placeholder="Tamaño" className="form-control" onChange={handleInputModificados} name="Tamaño" />
							<input type="number" placeholder="Stock" className="form-control" onChange={handleInputModificados} name="Stock" />
						</div>

						{/* INPUT PRECIOS */}
						<div className="">
							<h5 className="text-center">Precios</h5>
							<input type="number" step="0.01" className="form-control" placeholder="Cliente 1" onChange={handlePreciosModificados} name="cliente1" />
							<input type="number" step="0.01" className="form-control" placeholder="Cliente 2" onChange={handlePreciosModificados} name="cliente2" />
							<input type="number" step="0.01" className="form-control" placeholder="Cliente 3" onChange={handlePreciosModificados} name="cliente3" />
							<input type="number" step="0.01" className="form-control" placeholder="Cliente 4" onChange={handlePreciosModificados} name="cliente4" />
						</div>
						{/* BOTONES */}
						<div className="d-flex justify-content-center">
							<div onClick={handleClose2} className="btn btn-danger" id="botones">
								Cancelar
							</div>
							<button onClick={handleClose2} type="submit" className="btn btn-warning" id="botones">
								Editar
							</button>
						</div>
					</form>
				</DialogContent>
				<DialogActions>
					{/* <Button onClick={handleClose2} id="botones">Cancelar</Button>
<Button onClick={handleClose2, gestorEdit} type="submit" autoFocus id="botones">
Editar
</Button> */}
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Editar;
