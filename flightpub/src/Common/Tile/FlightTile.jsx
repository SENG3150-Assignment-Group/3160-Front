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
	if (props.departing === "true") {
		return (
			<Tile
				className="flight"
				title={
					props.flight.departure + " - " + props.flight.destination
				}
				src={"/Images/" + props.flight.plane + ".jpg"}
				onClick={props.onClick}
			>
				<h4>
					{props.flight.code} - {props.flight.airline}
				</h4>
				<h4>${props.flight.price} (AUD)</h4>
				<p>
					This flight leaves from {props.flight.departure} on{" "}
					{props.flight.date} at {formatTime(props.flight.time)}. This
					is a {props.flight.duration}
					-hour flight, and will be arriving at{" "}
					{props.flight.destination} at{" "}
					{formatTime(props.flight.time, props.flight.duration)}
				</p>
			</Tile>
		);
	}

	return (
		<Tile
			className="flight"
			title={props.flight.departure + " - " + props.flight.destination}
			src={"/Images/" + props.flight.plane + ".jpg"}
			href={"/flight?q=" + props.flight.code}
		>
			<h4>
				{props.flight.code} - {props.flight.airline}
			</h4>
			<h4>${props.flight.price} (AUD)</h4>
			<p>
				This flight leaves from {props.flight.departure} on{" "}
				{props.flight.date} at {formatTime(props.flight.time)}. This is
				a {props.flight.duration}
				-hour flight, and will be arriving at {
					props.flight.destination
				}{" "}
				at {formatTime(props.flight.time, props.flight.duration)}
			</p>
		</Tile>
	);
};

export default FlightTile;
