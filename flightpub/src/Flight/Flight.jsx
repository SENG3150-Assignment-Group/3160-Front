import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import dummyFlightData from "../Flights/dummy-flights.json";

import Header from "../Common/Header/Header";

import "./FlightStyles.css";

const Flight = () => {
	const [flight, setFlight] = useState({});

	const code = new URLSearchParams(window.location.search).get("q");

	const navigate = useNavigate();

	useEffect(() => {
		fetchFlight();
	}, []);

	const fetchFlight = async () => {
		// TODO(BryceTuppurainen): Update this to instead use the API
		setFlight(dummyFlightData[code]);
	};

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

	return (
		<>
			<Header />
			<h3 id="flight-title">
				{code} - {flight.departure} to {flight.destination}
			</h3>
			<div className="flight-container">
				<div className="flight-information">
					<p>
						Departing on {flight.date} at {flight.time} and Arriving
						on {formatTime(flight.time, flight.duration)} on{" "}
						{flight.date}
					</p>
					<h3>{flight.airline}</h3>
					<p>
						This flight is approximately {flight.duration} hours
						from take-off to landing
					</p>
					<p>
						There are {flight.seats} seats currently available on
						this flight
					</p>
					<input
						type="button"
						value={`Book Now ($${flight.price} /seat)`}
						onClick={() => navigate(`/booking?q=${code}`)}
					/>
					<input type="button" value={`Add to Watchlist`} />
				</div>
				<div className="plane-information">
					<img
						src={`/Images/${flight.plane}.jpg`}
						alt={flight.aircraft}
					/>
					<p>{flight.plane}</p>
				</div>
			</div>
		</>
	);
};

export default Flight;
