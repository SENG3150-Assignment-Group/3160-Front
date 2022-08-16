import React from "react";
import { useState, useEffect } from "react";

import Header from "../Common/Header/Header";
import Tile from "../Common/Tile/Tile";

import locations from "./locations.json";

// HACK: For now we're just hardcoding the flights locally
import dummyFlightData from "./dummy-flights.json";

import "./FlightsStyles.css";

const Flights = () => {
	// TODO(BryceTuppurainen): Allow this value to be changed and allow the user to continue scrolling after reaching the end of the list
	const MAX_TILES = 50;
	const MAX_PRICE = 10000;
	const MIN_PRICE = 0;

	const [departure, setDeparture] = useState("");

	const [destination, setDestination] = useState("");

	const [sortOrder, setSortOrder] = useState("Popularity");

	const [flightTiles, setFlightTiles] = useState();

	const [departureAutofill, setDepartureAutofill] = useState(<></>);

	const [destinationAutofill, setDestinationAutofill] = useState(<></>);

	const [minorSearchCriterion, setMinorSearchCriterion] = useState(<></>);

	// TODO(BryceTuppurainen): Add all flight search criterion here:

	const [minimumPrice, setMinimumPrice] = useState(MIN_PRICE);

	const [maximumPrice, setMaximumPrice] = useState(MAX_PRICE);

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
					flight => flight.departure === departure
				);
			} else {
				flights = flights.filter(flight => {
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
			if (idx > MAX_TILES) {
				return;
			}
			flightContent.push(
				<Tile
					className="flight"
					title={flight.departure + " - " + flight.destination}
					src={
						"/Images/Boeing737.jpg"

						// TODO(BryceTuppurainen): Can likely make this specific to airlines - See below
						// "/Images/" + flight.plane + ".jpg"
					}
					href={"/flight/?q=" + flight.code}
				>
					<h4>
						{flight.code} - {flight.airline}
					</h4>
					<h4>${flight.price} (AUD)</h4>
					<p>
						This flight leaves from {flight.departure} on{" "}
						{flight.date} at {formatTime(flight.time)}. This is a{" "}
						{flight.duration}-hour flight, and will be arriving at{" "}
						{flight.destination} at{" "}
						{formatTime(flight.time, flight.duration)}
					</p>
				</Tile>
			);
		});

		if (flightContent.length === 0) {
			setMinorSearchCriterion(<></>);
		} else {
			setFlightTiles(<div className="FlightTiles">{flightContent}</div>);
			setMinorSearchCriterion(
				<form className="MinorSearchCriterion">
					<details>
						<summary>Price Range</summary>
						<div>
							<label htmlFor="minimum-price">min: </label>
							<input
								type="range"
								min={MIN_PRICE}
								max={maximumPrice}
								onChange={e => {
									setMinimumPrice(e.target.value);
								}}
								step="10"
							></input>
						</div>
						<div>
							<label htmlFor="maximum-price">max: </label>
							<input
								type="range"
								min={minimumPrice}
								max={MAX_PRICE}
								onChange={e => {
									setMaximumPrice(e.target.value);
								}}
								step="10"
							></input>
						</div>
						<p id="price-range">
							<input
								type="number"
								value={minimumPrice}
								onChange={e => {
									setMinimumPrice(e.target.value);
								}}
							/>{" "}
							-{" "}
							<input
								type="number"
								value={maximumPrice}
								onChange={e => {
									setMaximumPrice(e.target.value);
								}}
							/>{" "}
							($AUD)
						</p>
					</details>
				</form>
			);
		}
	};

	useEffect(() => {
		updateFlights();
		// TODO(BryceTuppurainen): Add some event hooks in here so that on change of state of any information related to a flight search (or when the form is submitted) then make the request to get flights from the server
	}, [minimumPrice, maximumPrice]);

	useEffect(() => {
		// TODO(BryceTuppurainen): Implement flight filtering with local selected preferences
		organiseFlights();
	}, [sortOrder]);

	const organiseFlights = () => {};

	const updateDepartureAutofill = input => {
		setDepartureAutofill(<div></div>);
		let matches = [];
		if (input === "") {
			return;
		}
		locations.forEach(location => {
			if (location.toLowerCase() === input.toLowerCase()) {
				return;
			}
			if (location.toLowerCase().startsWith(input.toLowerCase())) {
				if (location !== destination) {
					matches.push(
						<p
							className="autofill-item"
							onClick={() => {
								setDeparture(location);
								updateDepartureAutofill("");
							}}
						>
							{location}
						</p>
					);
				}
			}
		});
		setDepartureAutofill(<div className="autofill-content">{matches}</div>);
	};

	const updateDestinationAutofill = input => {
		setDestinationAutofill(<div></div>);
		let matches = [];
		if (input === "") {
			return;
		}
		locations.forEach(location => {
			if (location.toLowerCase() === input.toLowerCase()) {
				return;
			}
			if (location.toLowerCase().startsWith(input.toLowerCase())) {
				if (location !== departure) {
					matches.push(
						<p
							className="autofill-item"
							onClick={() => {
								setDestination(location);
								updateDestinationAutofill("");
							}}
						>
							{location}
						</p>
					);
				}
			}
		});
		setDestinationAutofill(
			<div className="autofill-content">{matches}</div>
		);
	};

	// TODO(): Add any relevant functions in here for the management of the flight search page (authentication, suggested flights, etc.)

	// TODO(BryceTuppurainen): Implement the flight search criterion and display window

	/**
	 * * Helper function to perform hour addition on 24-hr time strings  and convert 24-hr time to 12-hr *
	 */
	const formatTime = (time, additionalHours = 0) => {
		additionalHours = parseInt(additionalHours);
		let h = parseInt(time.substr(0, 2));
		let m = time.substr(2, 2);

		let am = h < 12;

		h += additionalHours;

		while (h > 12) {
			h -= 12;
			am = !am;
		}

		if (am) {
			return h + ":" + m + "am";
		}
		return h + ":" + m + "pm";
	};

	return (
		<>
			<Header />
			<form
				className="QueryCriteria"
				onSubmit={e => {
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
							onChange={e => {
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
							onChange={e => {
								setDestination(e.target.value);
								updateDestinationAutofill(e.target.value);
							}}
							value={destination}
						></input>
						{destinationAutofill}
					</div>
				</div>

				<select
					value={sortOrder}
					onChange={e => {
						setSortOrder(e.target.value);
					}}
				>
					<option>Sort by Popularity</option>
					<option>Sort by Price (Lowest-Highest)</option>
					<option>Sort by Price (Highest-Lowest)</option>
					<option>Sort by Departure Date</option>
				</select>

				<input type="submit" value="Search" id="SearchButton"></input>
			</form>
			<div id="ContentWrapper">
				{minorSearchCriterion}
				{flightTiles}
			</div>
		</>
	);
};

export default Flights;
