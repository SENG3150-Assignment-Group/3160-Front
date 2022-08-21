import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Common/Header/Header";
import permission from "../Common/Permission/Permission";

import dummyFlightData from "../Flights/dummy-flights.json";

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

const Booking = () => {
	const [flight, setFlight] = useState({});

	const navigate = useNavigate();

	const code = new URLSearchParams(window.location.search).get("q");

	useEffect(() => {
		setFlight(dummyFlightData[code]);
	}, []);

	if (permission() < 1) {
		return (
			<>
				<Header />
				<h3>
					<a href="/authentication">
						You need to be logged in to book this flight, click here
						to log-in
					</a>
				</h3>
			</>
		);
	} else {
		return (
			<>
				<Header />
				<div className="booking-contents">
					<div>
						<h3>{code}</h3>
						<p>
							Departing on {flight.date} at {flight.time} and
							Arriving on{" "}
							{formatTime(flight.time, flight.duration)} on{" "}
							{flight.date}
						</p>
						<h3>{flight.airline}</h3>
						<p>
							This flight is approximately {flight.duration} hours
							from take-off to landing
						</p>
						<p>
							There are {flight.seats} seats currently available
							on this flight
						</p>
						<p>{flight.plane}</p>
						<form>
							<input
								type="button"
								value="Place Booking"
								onClick={(e) => {
									navigate("/checkout?q=");
								}}
							/>
						</form>
					</div>
				</div>
			</>
		);
	}
};

export default Booking;
