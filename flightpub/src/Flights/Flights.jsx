import React from "react";
import { useState } from "react";

import Header from "../Common/Header/Header";
import Tile from "../Common/Tile/Tile";

// HACK: For now we're just hardcoding the flights locally
import dummyFlightData from "./dummy-flights.json";
import locations from "./locations.json";

import "./FlightsStyles.css";
import { useEffect } from "react";

const Flights = () => {
	// TODO(BryceTuppurainen): Allow this value to be changed and allow the user to continue scrolling after reaching the end of the list
	const MAX_TILES = 50;
	const MAX_PRICE = 10000;
	const MIN_PRICE = 0;
	const MAX_STOPS = 7;

	const [flights, setFlights] = useState({});
	const [flightTiles, setFlightTiles] = useState();

	const [departureAutofill, setDepartureAutofill] = useState(<></>);
	const [destinationAutofill, setDestinationAutofill] = useState(<></>);

	const [sortOrder, setSortOrder] = useState("popularity");

	const [departure, setDeparture] = useState("");
	const [destination, setDestination] = useState("");

	const [minPrice, setMinPrice] = useState(MIN_PRICE);
	const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
	const [maxStops, setMaxStops] = useState(0);
	const [departureTime, setDepartureTime] = useState([]);
	const [latestDepartureTime, setLatestDepartureTime] = useState([]);

	// TODO(BryceTuppurainen): Add all flight search criterion here

	useEffect(() => {
		fetchFlights();
	}, []);

	useEffect(() => {
		updateFlightTiles();
	}, [flights]);

	/**
	 * This function is responsible for displaying the flight tiles based on the current version of the flights state
	 */
	const updateFlightTiles = () => {
		let tiles = [];
		let keys = Object.keys(flights);
		let idx = 0;
		for (let code in flights) {
			if (idx > MAX_TILES) {
				return;
			}

			tiles.push(flightTile(keys[idx], flights[code]));

			idx++;
		}
		setFlightTiles(<div className="flight-tiles">{tiles}</div>);
	};

	const updateDepartureAutofill = (input) => {
		setDepartureAutofill(<div></div>);
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

	const updateDestinationAutofill = (input) => {
		setDestinationAutofill(<div></div>);
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

	/**
	 * Helper function that returns a flight tile from a flight object
	 */
	const flightTile = (code, flight) => {
		return (
			<Tile
				className="flight"
				title={flight.departure + " - " + flight.destination}
				src={"/Images/" + flight.plane + ".jpg"}
				href={"/flight/?q=" + code}
			>
				<h4>
					{code} - {flight.airline}
				</h4>
				<h4>${flight.price} (AUD)</h4>
				<p>
					This flight leaves from {flight.departure} on {flight.date}{" "}
					at {formatTime(flight.time)}. This is a {flight.duration}
					-hour flight, and will be arriving at {
						flight.destination
					}{" "}
					at {formatTime(flight.time, flight.duration)}
				</p>
			</Tile>
		);
	};

	/**
	 * Helper function to perform hour addition on 24-hr time strings  and convert 24-hr time to 12-hr
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

	/**
	 * This function is responsible for the retrieval of all flights from the server matching the query
	 */
	const fetchFlights = async () => {
		// TODO(BryceTuppurainen): For now we're just hardcoding the flights locally, this filtering would be handled by the API NOT HERE

		console.log("Fetching flights");
		console.log(dummyFlightData);

		setFlights({ "Bryce's Test Data": "Dummy Data..." });

		console.log(flights);

		let tempFlights = {};

		if (departure !== "" && destination !== "") {
			for (let code in dummyFlightData) {
				if (
					dummyFlightData[code].departure === departure &&
					dummyFlightData[code].destination === destination
				) {
					tempFlights[code] = dummyFlightData[code];
				}
			}
		} else if (departure !== "") {
			for (let code in dummyFlightData) {
				if (dummyFlightData[code].departure === departure) {
					tempFlights[code] = dummyFlightData[code];
				}
			}
		}
		console.log(tempFlights);
		setFlights(tempFlights);
	};

	return (
		<>
			<Header />

			<form
				className="query-criterion"
				onSubmit={(e) => {
					e.preventDefault();
					fetchFlights();
				}}
			>
				<div>
					<img src="/Images/gps-teardrop.png" alt="GPS Teardrop" />
					<div className="autofill-wrapper">
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
				<div id="swap-circle-wrapper">
					<img src="/Images/swap-circle.jpg" alt="Cycle Icon" />
				</div>
				<div>
					<img src="/Images/gps-teardrop.png" alt="GPS Teardrop" />
					<div className="autofill-wrapper">
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
				<div>
					<input type="date" />
				</div>
				<input type="submit" value="Search" id="search-button"></input>
			</form>

			<div id="content-wrapper">
				<form className="minor-search-criterion">
					<details>
						<summary>Sort By</summary>

						<select
							value={sortOrder}
							onChange={(e) => {
								setSortOrder(e.target.value);
							}}
						>
							<option>Sort by Popularity</option>
							<option>Sort by Price (Lowest-Highest)</option>
							<option>Sort by Price (Highest-Lowest)</option>
							<option>Sort by Departure Date</option>
						</select>
					</details>

					<details>
						<summary>One Way?</summary>
						<select>
							<option>One Way</option>
							<option>Return</option>
						</select>
					</details>

					<details>
						<summary>Maximum Stops</summary>
						<input
							type="number"
							min={0}
							max={MAX_STOPS}
							placeholder="0"
							value={maxStops}
							onChange={(e) => {
								if (e.target.value > MAX_STOPS) {
									e.target.value = MAX_STOPS;
								} else if (e.target.value < 0) {
									e.target.value = 0;
								}
								setMaxStops(e.target.value);
							}}
						/>
					</details>

					<details>
						<summary>Price Range</summary>
						<div>
							<label htmlFor="minimum-price">min: </label>
							<input
								type="range"
								min={MIN_PRICE}
								max={maxPrice}
								placeholder={MIN_PRICE}
								onChange={(e) => {
									setMinPrice(e.target.value);
								}}
								step="10"
							/>
						</div>
						<div>
							<label htmlFor="maximum-price">max: </label>
							<input
								type="range"
								min={minPrice}
								max={MAX_PRICE}
								placeholder={MAX_PRICE}
								onChange={(e) => {
									setMaxPrice(e.target.value);
								}}
								step="10"
							/>
						</div>
						<p id="price-range">
							<input
								type="number"
								value={minPrice}
								onChange={(e) => {
									setMinPrice(e.target.value);
								}}
							/>{" "}
							-{" "}
							<input
								type="number"
								value={maxPrice}
								onChange={(e) => {
									setMaxPrice(e.target.value);
								}}
							/>{" "}
							($AUD)
						</p>
					</details>

					<details>
						<summary>Flexible Date Search</summary>
						<label htmlFor="latest-departure-date">
							Latest Departure Date
						</label>
						<input type="date" name="latest-departure-date" />

						<label htmlFor="return-date">Return Date</label>
						<input type="date" name="return-date" />

						<label htmlFor="latest-return-date">
							Latest Return Date
						</label>
						<input type="date" name="latest-return-date" />
					</details>

					<details>
						<summary>Airline</summary>
						<select>
							<option>No Preference</option>
							<option>Jetstar</option>
							<option>Qantas</option>
							{/* // TODO(BryceTuppurainen): Update this to instead use a list of options that you can import from another file */}
						</select>
					</details>

					<details>
						<summary>Class</summary>
						<select>
							<option>No Preference</option>
							<option>First Class</option>
							<option>Business Class</option>
							<option>Premium Economy Class</option>
							<option>Economy Class</option>
							{/* // TODO(BryceTuppurainen): Update this to instead use a list of options that you can import from another file */}
						</select>
					</details>

					<details>
						<summary>Time of Flight</summary>
						<select>
							<option>No Preference</option>
							<option>Early (Before 6am)</option>
							<option>Morning (6am-12pm)</option>
							<option>Afternoon (12pm-6pm)</option>
							<option>Late (After 6pm)</option>
						</select>
					</details>
				</form>
				{flightTiles}
			</div>
		</>
	);
};

export default Flights;
