import React from "react";
import { useEffect, useState } from "react";

import Header from "../Common/Header/Header";
import FlightTile from "../Common/Tile/FlightTile";

// HACK: For now we're just hardcoding the flights locally
import dummyFlightData from "./dummy-flights.json";

import locations from "./locations.json";
import AirlineOptions from "./AirlineOptions";

import "./FlightsStyles.css";

const Flights = () => {
	const MAX_PRICE = 10000;
	const MIN_PRICE = 0;
	const MAX_STOPS = 4;

	const [maxTiles, setMaxTiles] = useState(50);

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

	useEffect(() => {
		fetchFlights();
	}, []);

	useEffect(() => {
		updateFlightTiles();
	}, [
		maxTiles,
		flights,
		sortOrder,
		minPrice,
		maxPrice,
		maxStops,
		departureTime,
		latestDepartureTime,
	]);

	/**
	 * This function is responsible for displaying the flight tiles based on the current version of the flights state
	 */
	const updateFlightTiles = () => {
		// TODO(BryceTuppurainen): This is quite inefficient, we're running the full conversion to an array on the client side many times
		let flightsAsArray = [];

		for (let code in flights) {
			flightsAsArray.push({ ...flights[code], code });
		}

		let tiles = [];

		// TODO(BryceTuppurainen): Allow for the changing of sort criteria
		flightsAsArray
			.sort((a, b) => {
				return a.price - b.price;
			})
			.filter((flight) => {
				return flight.price >= minPrice && flight.price <= maxPrice;
			})
			.forEach((flight, idx) => {
				if (idx === maxTiles) {
					tiles.push(
						<div
							className="flight-extension"
							onClick={(e) => {
								setMaxTiles(maxTiles + 50);
							}}
						>
							View next 50 flights...
						</div>
					);
					return;
				} else if (idx > maxTiles) {
					return;
				}
				tiles.push(<FlightTile flight={flight} />);
			});
		setFlightTiles(<div className="tiles">{tiles}</div>);
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
							key={location}
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
	 * This function is responsible for the retrieval of all flights from the server matching the query
	 */
	const fetchFlights = async () => {
		// TODO(BryceTuppurainen): For now we're just hardcoding the flights locally, this filtering would be handled by the API NOT HERE

		console.log("Fetching flights");

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
		setFlights(tempFlights);
	};

	return (
		<>
			<Header />

			<form
				className="top-criteria"
				onSubmit={(e) => {
					e.preventDefault();
					fetchFlights();
					window.scrollTo(0, 0);
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
				<form className="left-criteria">
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

					<select>
						<option>One Way</option>
						<option>Return</option>
					</select>

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

					<select>
						<option>No Preference</option>
						<AirlineOptions />
					</select>

					<select>
						<option>No Preference</option>
						<option>First Class</option>
						<option>Business Class</option>
						<option>Premium Economy Class</option>
						<option>Economy Class</option>
					</select>

					<select>
						<option>No Preference</option>
						<option>Early (Before 6am)</option>
						<option>Morning (6am-12pm)</option>
						<option>Afternoon (12pm-6pm)</option>
						<option>Late (After 6pm)</option>
					</select>
				</form>
				{flightTiles}
			</div>
		</>
	);
};

export default Flights;
