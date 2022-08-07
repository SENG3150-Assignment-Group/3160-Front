import React from "react";
import { useState, useEffect } from "react";

const Flights = () => {
	const [flights, setFlights] = useState({ flights: [] });

	useEffect(() => {
		// TODO(BryceTuppurainen): Write a fetch in order to retrieve the flights from the database on startup
	}, []);

	// TODO(): Add any relevant functions in here for the management of the flight search page (authentication, suggested flights, etc.)

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
