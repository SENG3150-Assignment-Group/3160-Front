import React from "react";
import FlightTile from "../Common/Tile/FlightTile";

import dummyFlights from "../Flights/dummy-flights.json";

const ProcessView = (view) => {
	const flights = dummyFlights;

	const getBookings = () => {
		let bookingTiles = [];
		if (localStorage.bookings) {
			const bookings = JSON.parse(localStorage.bookings);
			console.log("Bookings: " + bookings);
			bookings.forEach((code) => {
				console.log(code);
				const flight = flights[code];
				flight["code"] = code;
				bookingTiles.push(<FlightTile flight={flight} />);
			});
		}
		return bookingTiles;
	};

	const getRandomTile = () => {
		const randomCode =
			Object.keys(flights)[
				Math.floor(Math.random() * Object.keys(flights).length)
			];
		const randomFlight = flights[randomCode];
		randomFlight["code"] = randomCode;
		return <FlightTile flight={randomFlight} />;
	};

	switch (view) {
		case "account":
			return (
				<div>
					{/* // TODO(BryceTuppurainen): Add in further account management controls */}
					<div className="tiles">
						<div>
							<h3>Manage Account</h3>
							<p>
								Edit and then save the fields below to update
								your account...
							</p>
						</div>
						<div>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									localStorage.setItem(
										"fullname",
										e.target.fullname.value
									);
									alert("Name Updated!");
								}}
							>
								<input
									name="fullname"
									type="text"
									placeholder={localStorage.fullname}
									required
								/>
								<input type="submit" value="Update" />
							</form>
						</div>
						<div>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									localStorage.setItem(
										"email",
										e.target.email.value
									);
									alert("Email Updated!");
								}}
							>
								<input
									type="text"
									placeholder={localStorage.email}
									name="email"
									required
								/>
								<input type="submit" value="Update" />
							</form>
						</div>
						<div>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									localStorage.setItem(
										"password",
										e.target.password.value
									);
									alert("Password Updated!");
								}}
							>
								<input
									type="password"
									placeholder="Enter a new password..."
									required
								/>
								<input type="submit" value="Update" />
							</form>
						</div>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								localStorage.setItem(
									"creditname",
									e.target.creditname.value
								);
								localStorage.setItem(
									"creditnumber",
									e.target.creditnumber.value
								);
								localStorage.setItem(
									"expiration",
									e.target.expiration.value
								);
								localStorage.setItem("cvv", e.target.cvv.value);
								alert("Credit Card Information Updated!");
							}}
						>
							<div>
								<p>Name on Credit Card</p>

								<input
									type="text"
									name="creditname"
									pattern="[a-zA-Z ]{0,32}"
									required
								/>
							</div>

							<div>
								<p>Credit Card Number</p>
								<input
									type="text"
									name="creditnumber"
									pattern="[0-9]{16}"
									required
								/>
							</div>

							<div>
								<p>Expiration</p>
								<input
									type="month"
									name="expiration"
									required
								/>
							</div>

							<div>
								<p>CVV</p>
								<input
									type="text"
									pattern="[0-9]{3}"
									name="cvv"
									required
								/>
							</div>
							<input type="submit" value="Update Credit Card" />
						</form>
					</div>
				</div>
			);
		case "watchlist":
			return (
				<div className="tiles">
					<h3>{localStorage.fullname}'s Watchlist</h3>
				</div>
			);
		case "bookings":
			return (
				<div className="tiles">
					<h3>{localStorage.fullname}'s Bookings</h3>
					{getBookings()}
				</div>
			);
		default:
			// Assume 'home'
			return (
				<div className="tiles">
					<h3>
						Our Latest Recommendations for {localStorage.fullname}
					</h3>
					{getRandomTile()}
					{getRandomTile()}
					{getRandomTile()}
				</div>
			);
	}
};

export default ProcessView;
