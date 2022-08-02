import React from "react";
import { useEffect, useState } from "react";

const Flights = () => {
	const [flights, setFlights] = useState([]);

	useEffect(() => {
		// TODO(BryceTuppurainen): Retrieve flight information
	}, []);

	return (
		<>
			<h1>Flights Search Placeholder</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
				inventore aperiam reprehenderit. Esse dicta quo aperiam officiis
				cupiditate perferendis vitae dolor eligendi deserunt fugit, odit
				eveniet, vero omnis? Cupiditate, veniam. Lorem ipsum dolor sit
				amet consectetur, adipisicing elit. Ipsum inventore aperiam
				reprehenderit. Esse dicta quo aperiam officiis cupiditate
				perferendis vitae dolor eligendi deserunt fugit, odit eveniet,
				vero omnis? Cupiditate, veniam. Lorem ipsum dolor sit amet
				consectetur, adipisicing elit. Ipsum inventore aperiam
				reprehenderit. Esse dicta quo aperiam officiis cupiditate
				perferendis vitae dolor eligendi deserunt fugit, odit eveniet,
				vero omnis? Cupiditate, veniam. Lorem ipsum dolor sit amet
				consectetur, adipisicing elit. Ipsum inventore aperiam
				reprehenderit. Esse dicta quo aperiam officiis cupiditate
				perferendis vitae dolor eligendi deserunt fugit, odit eveniet,
				vero omnis? Cupiditate, veniam.
			</p>
		</>
	);
};

export default Flights;
