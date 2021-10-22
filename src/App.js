import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./pages/Header/Header.jsx";
import Formulario from "./pages/Formulario/Formulario.jsx";
import * as React from "react";
import Login from "./pages/Login/Login.jsx";
import "./App.css";
import axios from "axios";
import MostrarTarjetas from "./pages/Tarjetas/MostrarTarjetas.jsx";
import { ToastContainer, toast } from "react-toastify";

function App() {
	const BASE_URL = process.env.REACT_APP_BASE_URL;

	const gestionarAcceso = async (login) => {
		await axios
			.post(`${BASE_URL}/usuarios/login/`, login)
			.then((response) => response.data)
			.then((data) => {
				// Usuario logeado correctamente
				console.log("Usuario logeado", data);
				window.location.href = "/crear";
				// Para que persista el token y no se borre al recargar la pagina lo guardamos en formato texto en el localstorage
				localStorage.setItem(
					"usuario_blomia",
					JSON.stringify({
						// idUsuario: datos.ID,
						token: data.token,
					})
				);
			})
			.catch((err) => {
				console.log("Error al iniciar sesión");
				console.log(err);
				alert("Error al iniciar sesión");
				// toast.warn("Error al iniciar sesión", {
				// 	position: "bottom-left",
				// 	theme: "colored",
				// 	autoClose: 5000,
				// });
			});
	};

	useEffect(() => {
		recuperaDatos();
	}, []);

	// ----------------------------Get Principal---------------------------------

	const [listaPlantas, setListaPlantas] = useState([]);

	const recuperaDatos = async () => {
		try {
			let respuesta = await fetch(BASE_URL + "/plantas");
			let resultado = await respuesta.json();
			setListaPlantas(resultado.respuesta);
			// return(resultado.respuesta)
		} catch (error) {
			console.log(error);
		}
	};

	// ----------------------------Funcion Añadir---------------------------------

	const añadirPlanta = async (planta) => {
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify({
			Nombre: planta.Nombre,
			Referencia: planta.Referencia,
			Tamaño: planta.Tamaño,
			Stock: planta.Stock,
			Activo: planta.Activo,
			Precio: planta.Precio,
			Foto: planta.Foto,
		});

		// console.log("raw", raw);
		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		await fetch(BASE_URL + "/plantas", requestOptions)
			.then((response) => response.text())
			.catch((error) => console.log("error", error));

		recuperaDatos();
	};

	// ----------------------------Get Eliminar---------------------------------

	const eliminarPlanta = async (_id, token) => {
		// console.log(datosLog);
		var requestOptions = {
			method: "DELETE",
			redirect: "follow",
			headers: {
				Authorization: "Bearer " + token, // En los headers van 'Bearer ' + token recibido
			},
		};

		await fetch(`${BASE_URL}/plantas/eliminar/` + _id, requestOptions)
			.then((response) => response.text())
			.catch((error) => console.log("error", error));

		recuperaDatos();
	};

	// ----------------------------Funcion Modificar---------------------------------

	const modificarPlanta = async (planta, id, token) => {
		var raw = JSON.stringify({
			Foto: planta.Foto,
			Nombre: planta.Nombre,
			Referencia: planta.Referencia,
			Tamaño: planta.Tamaño,
			Stock: planta.Stock,
			Activo: planta.Activo,
			Precio: planta.Precio,
		});

		var requestOptions = {
			method: "PATCH",
			// headers: myHeaders,
			headers: new Headers({ "Content-Type": "application/json", Authorization: "Bearer " + token }),
			body: raw,
			redirect: "follow",
		};

		await fetch(`${BASE_URL}/plantas/modificar/${id}`, requestOptions)
			.then((response) => response.text())
			.catch((error) => console.log("error", error));

		recuperaDatos();
	};

	const cambiarActivo = async (id) => {
		try {
			await axios(`${BASE_URL}/plantas/activo/${id}`);
			console.log("Client: Activo cambiado");
		} catch (error) {
			console.log(error);
		}
		recuperaDatos();
	};

	const cambiarStock = async (nuevoStock, id) => {
		try {
			await axios.patch(`${BASE_URL}/plantas/stock/${id}`, { Stock: nuevoStock });
			console.log("Client: Stock actualizado");
		} catch (error) {
			console.log(error);
		}
		recuperaDatos();
	};

	//------------------------------------------Funcion Buscar 2.0------------------------------------------------------------------

	const [filteredResults, setFilteredResults] = useState([]);
	const [searchInput, setSearchInput] = useState("");

	const searchItems = (searchValue) => {
		setSearchInput(searchValue);
		if (searchInput !== "") {
			const filteredData = listaPlantas.filter((item) => {
				return Object.values(item).join("").toLowerCase().includes(searchInput.toLowerCase());
			});
			setFilteredResults(filteredData);
		} else {
			setFilteredResults(listaPlantas);
		}
	};

	// Cada vez que se recarga la pagina se renderiza el componente y se leen los datos
	/* useEffect(() => {
		const datosRecuperar = JSON.parse(localStorage.getItem("userData"));
		if (datosRecuperar && datosRecuperar.token) {
			setToken(datosRecuperar.token);
		}
		console.log(datosRecuperar);
	}, []); */

	return (
		<div className="App">
			<Router>
				<main className="mx-auto">
					<Switch>
						{/* <Header /> */}
						<Route exact path="/crear">
							<Header />
							<Formulario añadirPlanta={añadirPlanta} />
						</Route>
						<Route exact path="/mostrar">
							<Header />
							{/* Busqueda */}
							<div className="container">
								<div className="d-flex justify-content-center mb-4">
									<input type="text" name="busca" icon="search" id="" placeholder="Buscar planta..." onChange={(e) => searchItems(e.target.value)} className="form-control" />
								</div>
							</div>

							<MostrarTarjetas searchInput={searchInput} listaPlantas={listaPlantas.reverse()} filteredResults={filteredResults} eliminar={eliminarPlanta} modificar={modificarPlanta} cambiarActivo={cambiarActivo} cambiarStock={cambiarStock} />
						</Route>
						<Route exact path="/menu">
							<Header />
						</Route>
						<Route>
							<Login exact path="/" gestionarAcceso={gestionarAcceso} />
						</Route>
					</Switch>
				</main>
			</Router>
		</div>
	);
}

export default App;
