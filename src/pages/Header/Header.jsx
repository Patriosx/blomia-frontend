import React from "react";
// import { Link, Redirect } from 'react-router-dom';
// import {Nav,Navbar} from "react-bootstrap";
// import * as React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import "./Header.css";

const Header = () => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// // Funcion para el logout de la Sesion
	// const logout = () =>{
	//     if(localStorage.getItem("userData").length <= 0){
	//         console.log("No tiene token de usuario no deberia estar aqui.");
	//     }else{
	//         localStorage.removeItem("userData");
	//         // return <Redirect to="/login"/>
	//     }
	// } implementar tambien en funcion de si esta logeado o no cambie el icono
	return (
		<div className="container-fluid">
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<a className="navbar-brand" href="#" id="logo">
					<strong>BLOMIA INVENTARIO</strong>
				</a>
				<div id="botonesUser">
					<button id="userSI" className="btn btn-info" onClick={handleClickOpen}>
						<i type="button" size="5" className="fas fa-user"></i>
					</button>
					<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
						<DialogTitle id="alert-dialog-title">
							<p id="alertTitle">{"Iniciar sesión"}</p>
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								<form encType="multipart/form-data" className="form">
									<br></br>
									<input type="text" placeholder="Nombre" className="form-control" />
									<input type="password" placeholder="Contraseña" className="form-control" />
								</form>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} id="botones">
								No
							</Button>
							<Button onClick={handleClose} autoFocus id="botones">
								Si
							</Button>
						</DialogActions>
					</Dialog>
					<button id="userNO" className="btn btn-info">
						<i type="button" size="5" className="far fa-user"></i>
					</button>
				</div>
			</nav>
		</div>
	);
};

export default Header;
