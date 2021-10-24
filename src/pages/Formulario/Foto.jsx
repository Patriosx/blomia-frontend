import React from "react";

const Foto = ({ imgURL }) => {
	if (imgURL) {
		return (
			<div className="">
				<img src={imgURL} alt="Foto de la planta" className="img-fluid card" />
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default Foto;
