import React from "react";
import { useEffect, useState } from "react";

import dummyFlightData from "../Flights/dummy-flights.json";

import Header from "../Common/Header/Header";

const Flight = () => {
	const [flight, setFlight] = useState({});

	const code = new URLSearchParams(window.location.search).get("q");

	useEffect(() => {
		fetchFlight();
	}, []);

	const fetchFlight = async () => {
		// TODO(BryceTuppurainen): Update this to instead use the API
		setFlight(dummyFlightData[code]);
	};

	return (
		<>
			<Header />
			<div className="flight-container">
				<p>{code}</p>
				<p>{flight.date}</p>
				<p>{flight.time}</p>
				<p>{flight.departure}</p>
				<p>{flight.destination}</p>
				<p>{flight.airline}</p>
				<p>{flight.plane}</p>
				<p>{flight.duration}</p>
				<p>{flight.seats}</p>
				<p>{flight.price}</p>
			</div>
		</>
	);
};

export default Flight;
