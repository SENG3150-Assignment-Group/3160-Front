import React from "react";
import { useState, useEffect } from "react";

import Header from "../Common/Header/Header";
import Tile from "../Common/Tile/Tile";

const Flights = () => {
	const [flightTiles, setFlightTiles] = useState(
		<div class="FlightTiles"></div>
	);

	let flights = [];

	const getFlights = async () => {
		setFlightTiles(
			<div className="FlightTiles">
				<Tile
					title="Example Title"
					src="./Images/Boeing737-Generic.jpg"
				>
					<p>
						This is the description of the tile, possibly the price
						and location
					</p>
					<p>
						And this will appear underneath that description in the
						same column, the tile scales automatically to compensate
						for this
					</p>
				</Tile>
			</div>
		);
		return;

		// TODO(BryceTuppurainen): Write a fetch in order to retrieve the flights from the database on startup

		const response = await fetch("/");
		const data = await response.json();
		flights = data;
		console.log(flights);
		setFlightTiles(
			<div class="FlightTiles">
				{flights.map(flight => (
					<Tile title="TODO():" image="TODO():"></Tile>
				))}
			</div>
		);
	};

	useEffect(() => {
		getFlights();
		// TODO(BryceTuppurainen): Add some event hooks in here so that on change of state of any information related to a flight search (or when the form is submitted) then make the request to get flights from the server
	}, []);

	// TODO(): Add any relevant functions in here for the management of the flight search page (authentication, suggested flights, etc.)

	// TODO(BryceTuppurainen): Implement the flight search criterion and display window

	return (
		<>
			<Header />
			<div>{flightTiles}</div>
		</>
	);
};

export default Flights;
