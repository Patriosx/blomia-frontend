import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./pages/Header/Header.jsx";
import Formulario from "./pages/Formulario/Formulario.jsx";
import * as React from "react";
import Tarjetas from "./pages/Tarjetas/Tarjetas.jsx";
import Registrarse from "./pages/Registrarse/Registrarse.jsx";
import Login from "./pages/Login/Login.jsx";
import "./App.css";
import axios from "axios";
import MostrarTarjetas from "./pages/Tarjetas/MostrarTarjetas.jsx";

function App() {
	const BASE_URL = process.env.REACT_APP_BASE_URL;

	// Define en una variable booleana si el usuario tiene o no acceso
	const [tieneAcceso, setTieneAcceso] = useState(false);
	// define los datos del acceso del usuario (nombre,email,password)
	const [datos, setDatos] = useState({});
	// Obtiene el token del usuario si se ha logueado correctamente
	const [token, setToken] = useState();
	// Traemos desde el componente Login los datos del usuario enviados desde el servidor mediante esta función prop
	const gestionarAcceso = (dato) => {
		setDatos(dato); // datos del usuario: email, password y token
		setTieneAcceso(true); // La variable que indica que está logueado se pone a true
		setToken(dato.token); // Por si fuera necesario
		// Para que persista el token y no se borre al recargar la pagina lo guardamos en formato texto en el localstorage
		localStorage.setItem(
			"userData",
			JSON.stringify({
				idUsuario: dato.idUsuario,
				token: dato.token,
			})
		);
	};

	useEffect(() => {
		recuperaDatos();
	}, []);

	// ----------------------------Get Principal---------------------------------

	const [listaPlantas, setListaPlantas] = useState([]);

	const recuperaDatos = async () => {
		try {
			let respuesta = await fetch(BASE_URL);
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

		await fetch(BASE_URL, requestOptions)
			.then((response) => response.text())
			// .then((result) => console.log(result))
			.catch((error) => console.log("error", error));

		recuperaDatos();
	};

	// ----------------------------Get Eliminar---------------------------------

	const eliminarPlanta = async (_id) => {
		var requestOptions = {
			method: "DELETE",
			redirect: "follow",
		};

		await fetch(`${BASE_URL}/eliminar/` + _id, requestOptions)
			.then((response) => response.text())
			// .then((result) => console.log(result))
			.catch((error) => console.log("error", error));

		recuperaDatos();
	};

	// ----------------------------Funcion Modificar---------------------------------

	const modificarPlanta = async (planta, id) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

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
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		await fetch(`${BASE_URL}/modificar/${id}`, requestOptions)
			.then((response) => response.text())
			.catch((error) => console.log("error", error));

		recuperaDatos();
	};

	const cambiarActivo = async (id) => {
		try {
			const respuesta = await axios(`${BASE_URL}/activo/${id}`);
			console.log("Client: Activo cambiado");
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
				<Header />
				<main>
					<Switch>
						<Route exact path="/crear">
							<Formulario añadirPlanta={añadirPlanta} />
						</Route>

						<Route exact path="/mostrar">
							<div className="container">
								<div className="d-flex justify-content-center mb-4">
									<input type="text" name="busca" icon="search" id="" placeholder="Buscar planta..." onChange={(e) => searchItems(e.target.value)} className="form-control" />
								</div>
							</div>
							<MostrarTarjetas searchInput={searchInput} listaPlantas={listaPlantas.reverse()} filteredResults={filteredResults} eliminar={eliminarPlanta} modificar={modificarPlanta} cambiarActivo={cambiarActivo} />
						</Route>
					</Switch>
				</main>
			</Router>
		</div>
	);
}

export default App;
