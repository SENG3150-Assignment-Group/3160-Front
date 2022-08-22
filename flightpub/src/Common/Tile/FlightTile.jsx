import React from "react";

import Tile from "./Tile";

/**
 * Helper function to perform hour addition on 24-hr time strings  and convert 24-hr time to 12-hr
 */
const formatTime = (time, additionalHours = 0) => {
	if (!time) {
		return;
	}
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

const FlightTile = (props) => {
	let flight = props.flight;

	return (
		<Tile
			className="flight"
			title={flight.departure + " - " + flight.destination}
			src={"/Images/" + flight.plane + ".jpg"}
			href={"/flight?q=" + flight.code}
		>
			<h4>
				{flight.code} - {flight.airline}
			</h4>
			<h4>${flight.price} (AUD)</h4>
			<p>
				This flight leaves from {flight.departure} on {flight.date} at{" "}
				{formatTime(flight.time)}. This is a {flight.duration}
				-hour flight, and will be arriving at {
					flight.destination
				} at {formatTime(flight.time, flight.duration)}
			</p>
		</Tile>
	);
};

export default FlightTile;
