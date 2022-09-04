import React from "react";

import Tile from "../Common/Tile/Tile";

const processView = (view) => {
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
					<Tile />
				</div>
			);
		case "bookings":
			return (
				<div className="tiles">
					<h3>{localStorage.fullname}'s Bookings</h3>
					<Tile />
				</div>
			);
		default:
			// Assume 'home'
			return (
				<div className="tiles">
					<h3>Our Recommendations for {localStorage.fullname}</h3>
					<Tile />
					<Tile />
					<Tile />
				</div>
			);
	}
};

export default processView;
