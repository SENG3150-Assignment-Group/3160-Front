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

	let flights = [];
	let flightContent = [];

	const airlineCodeToName = airlineCode => {
		switch (airlineCode) {
			case "EXPFLT":
				return "Example-Flight";
			case "QF":
				return "Qantas";
			default:
				return airlineCode;
		}
	};

	const locationCodeToName = locationCode => {
		switch (locationCode) {
			// TODO(): This needs to be updated to reflect the actual locations
			case "SYD":
				return "Sydney";
			case "BRI":
				return "Brisbane";
			default:
				return locationCode;
		}
	};

	const getFlights = async () => {
		// const response = await fetch("/path-to-api-for-flights");
		// const data = await response.json();

		// HACK: For now we're just hardcoding the flights locally

		flights = dummyFlightData;

		flights.forEach(flight => {
			console.log(flight);
			flightContent.push(
				<Tile
					title={
						airlineCodeToName(flight.airlineCode) +
						":	" +
						locationCodeToName(flight.departureCode) +
						" - " +
						locationCodeToName(flight.destinationCode)
					}
					src={
						"/Images/" + flight.planeCode + ".jpg"
						// TODO(BryceTuppurainen): Can likely make this specific to airlines
					}
					href={"/flight/?q=" + flight.flightCode}
				>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Porro pariatur fuga officiis, quo eaque beatae enim
						omnis dolorem voluptate ducimus eius rem nobis quos
						voluptas totam molestias ex culpa sunt.
					</p>

					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Velit repellat corporis enim recusandae, odit dolore
						doloribus sit officiis repudiandae expedita amet
						mollitia officia voluptatibus ratione dignissimos earum
						obcaecati eos error?
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
				onSubmit={e => {
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
