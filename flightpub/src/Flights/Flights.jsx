import React from "react";
import { useState, useEffect } from "react";

import Header from "../Common/Header/Header";
import Tile from "../Common/Tile/Tile";

import locations from "./locations.json";

// HACK: For now we're just hardcoding the flights locally
import dummyFlightData from "./dummy-flights.json";

import "./FlightsStyles.css";

const Flights = () => {
	const [departure, setDeparture] = useState("");

	const [destination, setDestination] = useState("");

	const [sortOrder, setSortOrder] = useState("Popularity");

	const [flightTiles, setFlightTiles] = useState(
		<div class="FlightTiles"></div>
	);

	const [departureAutofill, setDepartureAutofill] = useState(<></>);

	const [destinationAutofill, setDestinationAutofill] = useState(<></>);

	/**
	 * * Request is an object with the search criterion of departure and destination *
	 */
	const updateFlights = async () => {
		if (departure === "") {
			setFlightTiles(<div className="FlightTiles"></div>);
			return;
		}

		let flightContent = [];

		// const response = await fetch("/path-to-api-for-flights");

		// const data = await response.json();

		// TODO(BryceTuppurainen): dummyFlightData is a dummy data set for testing purposes, should be a straight replace

		// HACK: For now we're just hardcoding the flights locally, this filtering would be handled by the API NOT HERE

		let flights = dummyFlightData;

		if (departure !== "") {
			if (destination === "") {
				flights = flights.filter(
					(flight) => flight.departure === departure
				);
			} else {
				flights = flights.filter((flight) => {
					return (
						flight.departure === departure &&
						flight.destination === destination
					);
				});
			}
		}

		// HACK: End of hack...

		flights.forEach((flight, idx) => {
			// HACK: This simply limits to this number of elements, this should be a const
			if (idx > 100) {
				return;
			}
			flightContent.push(
				<Tile
					className="flight"
					title={flight.departure + " - " + flight.destination}
					src={
						"/Images/Boeing737.jpg"

						// "/Images/" + flight.plane + ".jpg"
						// TODO(BryceTuppurainen): Can likely make this specific to airlines
					}
					href={"/flight/?q=" + flight.code}
				>
					<h4>
						{flight.code} - {flight.airline}
					</h4>
					<p>
						This flight leaves from {flight.departure} on{" "}
						{flight.date} at {flight.time}. This is a{" "}
						{flight.duration}-hour flight, and will be arriving at{" "}
						{flight.destination} on{" "}
						{flight.time + " " + flight.duration}
					</p>
				</Tile>
			);
		});

		setFlightTiles(<div className="FlightTiles">{flightContent}</div>);
	};

	useEffect(() => {
		updateFlights();
		// TODO(BryceTuppurainen): Add some event hooks in here so that on change of state of any information related to a flight search (or when the form is submitted) then make the request to get flights from the server
	}, []);

	useEffect(() => {
		// TODO(BryceTuppurainen): Implement flight filtering with local selected preferences
		organiseFlights();
	}, [sortOrder]);

	const organiseFlights = () => {};

	const updateDepartureAutofill = (input) => {
		setDepartureAutofill(<ul></ul>);
		let matches = [];
		if (input === "") {
			return;
		}
		locations.forEach((location) => {
			if (location.toLowerCase() === input.toLowerCase()) {
				return;
			}
			if (location.toLowerCase().startsWith(input.toLowerCase())) {
				if (location !== destination) {
					matches.push(
						<li
							className="Autofill"
							onClick={() => {
								setDeparture(location);
								updateDepartureAutofill("");
							}}
						>
							{location}
						</li>
					);
				}
			}
		});
		setDepartureAutofill(<ul>{matches}</ul>);
	};

	const updateDestinationAutofill = (input) => {
		setDestinationAutofill(<ul></ul>);
		let matches = [];
		if (input === "") {
			return;
		}
		locations.forEach((location) => {
			if (location.toLowerCase() === input.toLowerCase()) {
				return;
			}
			if (location.toLowerCase().startsWith(input.toLowerCase())) {
				if (location !== departure) {
					matches.push(
						<li
							className="Autofill"
							onClick={() => {
								setDestination(location);
								updateDestinationAutofill("");
							}}
						>
							{location}
						</li>
					);
				}
			}
		});
		setDestinationAutofill(<ul>{matches}</ul>);
	};

	// TODO(): Add any relevant functions in here for the management of the flight search page (authentication, suggested flights, etc.)

	// TODO(BryceTuppurainen): Implement the flight search criterion and display window

	/**
	 * Helper function to perform hour addition on 24-hour time strings
	 */
	const addHours = (time, hours) => {
		// TODO(BryceTuppurainen): Allow for 24-hour time and duration addition
	};

	return (
		<>
			<Header />
			<form
				className="QueryCriteria"
				onSubmit={(e) => {
					e.preventDefault();
					updateFlights();
				}}
			>
				<div>
					<img src="/Images/gps-teardrop.png" alt="GPS Teardrop" />
					<div className="AutofillWrapper">
						<input
							type="text"
							placeholder="Leaving from..."
							name="departure"
							onChange={(e) => {
								setDeparture(e.target.value);
								updateDepartureAutofill(e.target.value);
							}}
							value={departure}
						></input>
						{departureAutofill}
					</div>
				</div>

				<div id="SwapCircleWrapper">
					<img src="/Images/swap-circle.jpg" alt="Cycle Icon" />
				</div>

				<div>
					<img src="/Images/gps-teardrop.png" alt="GPS Teardrop" />
					<div className="AutofillWrapper">
						<input
							type="text"
							placeholder="Heading to..."
							name="destination"
							onChange={(e) => {
								setDestination(e.target.value);
								updateDestinationAutofill(e.target.value);
							}}
							value={destination}
						></input>
						{destinationAutofill}
					</div>
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
