import React from "react";
import { useState, useEffect } from "react";

import Header from "../Common/Header";

const Flights = () => {
	const [flights, setFlights] = useState({
		flights: []
	});

	useEffect(() => {
		// TODO(BryceTuppurainen): Write a fetch in order to retrieve the flights from the database on startup
	}, []);

	// TODO(): Add any relevant functions in here for the management of the flight search page (authentication, suggested flights, etc.)

	// TODO(BryceTuppurainen): Implement the flight search criterion and display window

	return (
		<>
			<Header />
		</>
	);
};

export default Flights;
