import React from "react";

import { useNavigate } from "react-router-dom";

import "./TileStyles.css";

const Tile = props => {
	let navigate = useNavigate();

	return (
		<div
			className="Tile"
			onClick={() => {
				navigate(props.href);
			}}
		>
			<div>
				<h3>{props.title}</h3>
				{props.children}
			</div>
			<img src={props.src} alt={props.title} />
		</div>
	);
};

export default Tile;
