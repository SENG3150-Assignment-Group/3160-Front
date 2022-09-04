import React from "react";

import { useNavigate } from "react-router-dom";

import "./TileStyles.css";

const Tile = (props) => {
	const navigate = useNavigate();

	let title = props.title;
	let href = props.href;
	let src = props.src;
	let children = props.children;
	let onClick = props.onClick;
	if (props.onClick === undefined) {
		onClick = () => {
			navigate(href);
		};
	}

	// HACK: Remove before submission - This is the WIP tile
	if (props.title === "" || props.title === undefined) {
		title = "Example Tile";
		href = ".";
		src = "./Images/WIP.jpg";
		children = (
			<>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Facere, quod? Dolor obcaecati exercitationem laudantium,
					rerum minima odit sapiente in rem officia corrupti error,
					distinctio nam repellendus harum ut ullam eligendi!
				</p>
			</>
		);
	}

	return (
		<div className="tile-content" onClick={onClick}>
			<div>
				<h3>{title}</h3>
				{children}
			</div>
			<div className="image-wrapper">
				<img src={src} alt={title} loading="lazy" />
			</div>
		</div>
	);
};

export default Tile;
