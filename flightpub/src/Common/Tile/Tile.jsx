import React from "react";

import "./TileStyles.css";

const Tile = props => {
	return (
		<div className="Tile/Tile">
			<div>
				<h3>{props.title}</h3>
				{props.children}
			</div>
			<img src={props.image} alt={props.title} />
		</div>
	);
};

export default Tile;
