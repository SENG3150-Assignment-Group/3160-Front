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
	const [departingFlight] = useState(
		JSON.parse(localStorage.getItem("departingFlight"))
	);
	const [numberOfSeats, setNumberOfSeats] = useState(1);

	const navigate = useNavigate();

	const code = new URLSearchParams(window.location.search).get("q");

	useEffect(() => {
		setFlight(dummyFlightData[code]);
	}, [code]);

	if (permission() < 1) {
		return (
			<>
				<Header />
				<h3>
					<a href={`/authentication?redirect=booking?q=${code}`}>
						You need to be logged in to book this flight, click here
						to log-in
					</a>
				</h3>
			</>
		);
	} else if (departingFlight !== {}) {
		return (
			<>
				<Header />
				<div className="booking-contents">
					<div>
						<h3>{departingFlight.code}</h3>
						<h3>
							Departing Flight: {departingFlight.departure} -{" "}
							{departingFlight.destination}
						</h3>
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
							{departingFlight.duration} hours from take-off to
							landing
						</p>
						<p>
							There are {departingFlight.seats} seats currently
							available on this flight
						</p>
						<p>{departingFlight.plane}</p>
						<form>
							<input
								type="number"
								min="1"
								max={departingFlight.seats}
								value={numberOfSeats}
								onChange={(e) => {
									if (e.target.value < 1) {
										e.target.value = 1;
										alert(
											"You can't book less than 1 seat"
										);
									} else if (
										e.target.value > departingFlight.seats
									) {
										alert(
											`There are only ${departingFlight.seats} seats available on this plane`
										);
										e.target.value = departingFlight.seats;
									}
									setNumberOfSeats(e.target.value);
								}}
							/>
							<input
								type="button"
								value="Place Booking"
								onClick={(e) => {
									// TODO(BryceTuppurainen): What a hacky way to do this... Please, Please Rework this...
									navigate(
										`/checkout?q=${code}&price=${
											departingFlight.price *
											numberOfSeats
										}&seats=${numberOfSeats}`
									);
								}}
							/>
						</form>
					</div>

					<div>
						<h3>{code}</h3>
						<h3>
							Returning Flight: {flight.departure} -{" "}
							{flight.destination}
						</h3>
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
								type="number"
								min="1"
								max={flight.seats}
								value={numberOfSeats}
								onChange={(e) => {
									if (e.target.value < 1) {
										e.target.value = 1;
										alert(
											"You can't book less than 1 seat"
										);
									} else if (e.target.value > flight.seats) {
										alert(
											`There are only ${flight.seats} seats available on this plane`
										);
										e.target.value = flight.seats;
									}
									setNumberOfSeats(e.target.value);
								}}
							/>
							<input
								type="button"
								value="Place Booking"
								onClick={(e) => {
									// TODO(BryceTuppurainen): What a hacky way to do this... Please, Please Rework this...
									navigate(
										`/checkout?q=${code}&price=${
											flight.price * numberOfSeats
										}&seats=${numberOfSeats}`
									);
								}}
							/>
						</form>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<Header />
				<div className="booking-contents">
					<div>
						<h3>{code}</h3>
						<h3>
							{flight.departure} - {flight.destination}
						</h3>
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
								type="number"
								min="1"
								max={flight.seats}
								value={numberOfSeats}
								onChange={(e) => {
									if (e.target.value < 1) {
										e.target.value = 1;
										alert(
											"You can't book less than 1 seat"
										);
									} else if (e.target.value > flight.seats) {
										alert(
											`There are only ${flight.seats} seats available on this plane`
										);
										e.target.value = flight.seats;
									}
									setNumberOfSeats(e.target.value);
								}}
							/>
							<input
								type="button"
								value="Place Booking"
								onClick={(e) => {
									// TODO(BryceTuppurainen): What a hacky way to do this... Please, Please Rework this...
									navigate(
										`/checkout?q=${code}&price=${
											flight.price * numberOfSeats
										}&seats=${numberOfSeats}`
									);
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
