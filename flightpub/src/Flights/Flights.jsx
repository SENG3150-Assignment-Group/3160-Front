import React from "react";
import { useState, useEffect } from "react";

import Header from "../Common/Header/Header";
import Tile from "../Common/Tile/Tile";

// HACK: For now we're just hardcoding the flights locally
import dummyFlightData from "./dummy-flights.json";

import "./FlightsStyles.css";

const Flights = () => {
	const [flightTiles, setFlightTiles] = useState(
		<div class="FlightTiles"></div>
	);

	const [departureSuggestions, setDepartureSuggestions] = useState(
		<div class="DepartureSuggestions"></div>
	);

	const getFlights = async () => {
		let flightContent = [];
		// const response = await fetch("/path-to-api-for-flights");
		// const data = await response.json();

		// HACK: For now we're just hardcoding the flights locally

		let flights = dummyFlightData;

		flights.forEach((flight) => {
			console.log(flight);
			flightContent.push(
				<Tile
					title={flight.departure + " - " + flight.destination}
					src={
						"/Images/" + flight.plane + ".jpg"
						// TODO(BryceTuppurainen): Can likely make this specific to airlines
					}
					href={"/flight/?q=" + flight.id}
				>
					<h4>{flight.id}</h4>
					<p>
						This is some example information about your flight that
						is going to get replaced
					</p>

					<p>
						This is some example information about your flight that
						is going to get replaced
					</p>
				</Tile>
			);
		});

		setFlightTiles(<div className="FlightTiles">{flightContent}</div>);
		return;

		// TODO(BryceTuppurainen): Write a fetch in order to retrieve the flights from the database on startup
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
			<form
				className="MajorSearchCriterion"
				onSubmit={(e) => {
					e.preventDefault();
					// TODO(): Implement search trigger here
				}}
			>
				<div>
					<img src="/Images/gps-teardrop.png" alt="GPS Teardrop" />
					<input
						type="text"
						placeholder="Leaving from..."
						name="departure"
					></input>
				</div>

				<img src="/Images/swap-circle.jpg" alt="Cycle Icon" />

				<div>
					<img src="/Images/gps-teardrop.png" alt="GPS Teardrop" />
					<input
						type="text"
						placeholder="Leaving from..."
						name="departure"
					></input>
				</div>

				<select>
					<option>Sort by Popularity</option>
					<option>Sort by Price (Lowest-Highest)</option>
					<option>Sort by Price (Highest-Lowest)</option>
					<option>Sort by Departure Date</option>
				</select>

				<input type="submit" value="Search" id="SearchButton"></input>
			</form>
			<div>{flightTiles}</div>
		</>
	);
};

export default Flights;
