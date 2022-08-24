import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import dummyFlightData from "../Flights/dummy-flights.json";

import Header from "../Common/Header/Header";

import "./FlightStyles.css";

const Flight = () => {
	const [flight, setFlight] = useState({});

	const code = new URLSearchParams(window.location.search).get("q");
	const departingFlight = JSON.parse(localStorage.getItem("departingFlight"));

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

	const formatDate = (date) => {
		let dateObject = new Date(date);
		return dateObject.toLocaleDateString();
	};

	return (
		<>
			<Header />
			{departingFlight ? (
				<h3 id="flight-title">
					{departingFlight.code} - {departingFlight.departure} to{" "}
					{departingFlight.destination} - (
					{formatDate(departingFlight.date)})
				</h3>
			) : (
				<></>
			)}
			<h3 id="flight-title">
				{code} - {flight.departure} to {flight.destination} - (
				{formatDate(flight.date)})
			</h3>
			<div className="flight-container">
				<div className="flight-information">
					{departingFlight ? (
						<>
							<p>
								Departing on {departingFlight.date} at{" "}
								{departingFlight.time} and Arriving on{" "}
								{formatTime(
									departingFlight.time,
									departingFlight.duration
								)}{" "}
								on {departingFlight.date}
							</p>

							<h3>{departingFlight.airline}</h3>
							<p>
								This flight is approximately{" "}
								{departingFlight.duration} hours from take-off
								to landing
							</p>
							<p>
								There are {departingFlight.seats} seats
								currently available on this flight
							</p>
							<hr />
						</>
					) : (
						// TODO(BryceTuppurainen): Add departing flight information
						<></>
					)}
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

					{localStorage.getItem("departingFlight") ? (
						<input
							type="button"
							value={`Book Now ($${
								flight.price + departingFlight.price
							} /seat)`}
							onClick={() => navigate(`/booking?q=${code}`)}
						/>
					) : (
						<input
							type="button"
							value={`Book Now ($${flight.price} /seat)`}
							onClick={() => navigate(`/booking?q=${code}`)}
						/>
					)}

					<input type="button" value="Add to Watchlist" />
					<input
						type="button"
						id="warning"
						value="Return to Search"
						onClick={() => {
							localStorage.removeItem("departingFlight");
							navigate(`/flights`);
						}}
					/>
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
