import React from "react";

const Foto = ({ imgURL }) => {
	const styles = {
		width: "400px",
	};

	if (imgURL) {
		return (
			<div className="">
				<img src={imgURL} className="img-fluid card" />
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default Foto;
