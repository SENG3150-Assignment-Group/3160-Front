import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Common/Header/Header";

const Checkout = () => {
	const code = new URLSearchParams(window.location.search).get("q");
	const price = new URLSearchParams(window.location.search).get("price");
	const seats = new URLSearchParams(window.location.search).get("seats");

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
					<input type="text" placeholder="Name on Card" />
					<input type="text" placeholder="Card Number" />
					<input type="text" placeholder="Expiry Date" />
					<input type="text" placeholder="CVV" />
					<button type="submit">Book</button>
				</form>
			</div>
		</>
	);
};

export default Checkout;
