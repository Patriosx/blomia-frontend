import React from "react";
import "./login.css";
import foto from "./images/logo-blomia.png";
import { useState } from "react";

const Login = ({ gestionarAcceso }) => {
	const [login, setLogin] = useState({
		Nombre: "",
		Password: "",
	});
	const handleInputs = (event) => {
		setLogin({
			...login,
			[event.target.name]: event.target.value,
		});
	};
	const submitForm = async (event) => {
		event.preventDefault();
		gestionarAcceso(login);
	};

	return (
		<div className="container-fluid">
			<div className="login-wrap">
				<div className="login-html">
					<input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked />
					<label htmlFor="tab-1" className="tab">
						Inicio Sesión
					</label>
					<input id="tab-2" type="radio" name="tab" className="sign-up" />

					<label htmlFor="" className="tab entrar" onClick={() => (window.location.href = "/crear")}>
						ENTRAR
					</label>

					<div className="login-form">
						<div className="sign-in-htm">
							<form action="" onSubmit={submitForm}>
								<div className="group">
									<label htmlFor="user" className="label">
										Usuario
									</label>
									<input id="user" type="text" className="input" name="Nombre" onChange={handleInputs} required />
								</div>
								<div className="group">
									<label htmlFor="pass" className="label">
										Contraseña
									</label>
									<input id="pass" type="password" className="input" data-type="password" name="Password" onChange={handleInputs} required />
								</div>

								{/* <div className="group">
								<input id="check" type="checkbox" className="check" />
								<label htmlFor="check">
									<span className="icon"></span> Recuerda mis Datos
								</label>
							</div> */}

								<div className="group">
									<input type="submit" className="button" value="Iniciar Sesión" />
								</div>
								<div className="hr"></div>
								{/* <div className="foot-lnk">
								<a className="forgot-password" href="#forgot">
									Has olvidado tu contraseña?
								</a>
							</div> */}
								<div className="logo-blomia">
									<img id="logo" src={foto} alt="foto" />
								</div>
							</form>
						</div>
						{/* Fomulario crear usuario */}
						<div className="sign-up-htm">
							<div className="group">
								<label htmlFor="user-registro" className="label">
									Nombre de usuario
								</label>
								<input id="user-registro" type="text" className="input" />
							</div>
							<div className="group">
								<label htmlFor="pass-registro" className="label">
									Contraseña
								</label>
								<input id="pass-registro" type="password" className="input" data-type="password" />
							</div>
							<div className="group">
								<label htmlFor="pass-registro2" className="label">
									Repita Contraseña
								</label>
								<input id="pass-registro2" type="password" className="input" data-type="password" />
							</div>
							<div className="group">
								<label htmlFor="email-registro" className="label">
									Email
								</label>
								<input id="email-registro" type="email" className="input" />
							</div>
							<div className="group">
								<input type="submit" className="button" value="Sign Up" />
							</div>
							<div className="hr-1"></div>
							<div className="foot-lnk">
								<label id="already-member" htmlFor="tab-1">
									Ya estas registrado?
								</label>
							</div>
							<div className="logo-blomia-registro">
								<img id="logo-registro" src={foto} alt="foto" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
