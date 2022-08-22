import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import airlines from "./airlines.json";

const AirlineOptions = () => {
	const [airlineTiles, setAirlineTiles] = useState([]);

	useEffect(() => {
		let options = [];

		for (let airline of airlines) {
			options.push(
				<option key={airline} value={airline}>
					{airline}
				</option>
			);
		}

		setAirlineTiles(<>{options}</>);
	}, []);

	return <>{airlineTiles}</>;
};

export default AirlineOptions;
