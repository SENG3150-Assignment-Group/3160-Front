import React, { useState } from "react";

const processView = view => {

	const [accountId, setAccount] = useState();
	const [flightCode, setFlightCode] = useState();
	const [accommodation, setAccommodation] = useState();
	const [accommodationCost, setAccommodationCost] = useState();

	switch (view) {
		case "create-package":
			return (
				<div className="tiles">
					<h3>Create Package</h3>
					<div className="authentication-content">
						<div className="authentication-wrapper">
							<form
							// TODO (George Davis): change to package info
								className="sign-up-opt"
								onSubmit={(e) => {
									e.preventDefault();
									localStorage.setItem("accountId", accountId);
									localStorage.setItem("flightCode", flightCode);
									localStorage.setItem("accommodation", accommodation);
									localStorage.setItem("accommodationCost", accommodationCost);
									navigate("/home");
								}}
							>
								<h3>New Package</h3>
								<input
									type="text"
									placeholder="Account ID"
									name="accountId"
									required
									onChange={(e) => setAccount(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Flight Code"
									name="flightCode"
									required
									onChange={(e) => setFlightCode(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Accommodation Description"
									name="accommodation"
									required
									onChange={(e) => setAccommodation(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Accommodation Cost"
									name="accommodationCost"
									required
									onChange={(e) => setAccommodationCost(e.target.value)}
								/>
								<input type="submit" value="Create Package" />
							</form>
						</div>
					</div>
				</div>
			);
		default:
			// Assume "admin"
			return (
				<div className="tiles">
					<h3>All Flightpub Members</h3>
				</div>
			);
	}
};

export default processView;
