import React from "react";

import { useNavigate } from "react-router-dom";

import "./TileStyles.css";

const Tile = props => {
	let navigate = useNavigate();

	let title = props.title;
	let href = props.href;
	let src = props.src;
	let children = props.children;

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
		<div
			className="Tile"
			onClick={() => {
				navigate(href);
			}}
		>
			<div>
				<h3>{title}</h3>
				{children}
			</div>
			<img src={src} alt={title} />
		</div>
	);
};

export default Tile;
