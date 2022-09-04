import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Common/Header/Header";

const Checkout = () => {
	const code = new URLSearchParams(window.location.search).get("q");
	const price = new URLSearchParams(window.location.search).get("price");
	const seats = new URLSearchParams(window.location.search).get("seats");

	const [creditname, setCreditname] = React.useState(localStorage.creditname);
	const [creditnumber, setCreditnumber] = React.useState(
		localStorage.creditnumber
	);
	const [expiration, setExpiration] = React.useState(localStorage.expiration);
	const [cvv, setCvv] = React.useState(localStorage.cvv);

	const navigate = useNavigate();

	const formatPrice = () => {
		return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
	};

	return (
		<>
			<Header />
			<div className="checkout-content">
				<p>
					Booking {seats} seats on flight {code}
				</p>
				<p>Total Cost (AUD): ${formatPrice(price)}</p>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						// HACK: This simply states that the seats are booked, remove this notice and make this more effective of a solution
						alert("Seats Booked!");
						localStorage.removeItem("departingFlight");
						navigate("/home?view=bookings");
						// TODO(BryceTuppurainen): Submit a booking to the server with the provided information
					}}
				>
					<p>Credit Card Details</p>
					<input
						type="text"
						placeholder="Name on Card"
						value={creditname}
						onChange={(e) => {
							setCreditname(e.target.value);
						}}
						pattern="[A-Za-z ]{1,32}"
						required
					/>
					<input
						type="text"
						placeholder="Card Number"
						value={creditnumber}
						onChange={(e) => {
							setCreditnumber(e.target.value);
						}}
						pattern="[0-9]{16}"
						required
					/>
					<input
						type="month"
						placeholder="Expiry Date"
						value={expiration}
						onChange={(e) => {
							setExpiration(e.target.value);
						}}
						required
					/>
					<input
						type="text"
						placeholder="CVV"
						value={cvv}
						onChange={(e) => {
							setCvv(e.target.value);
						}}
						pattern="[0-9]{3}"
						required
					/>
					<button type="submit">Book</button>
				</form>
			</div>
		</>
	);
};

export default Checkout;
