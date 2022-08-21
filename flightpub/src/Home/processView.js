import React from "react";

import Tile from "../Common/Tile/Tile";

const processView = view => {
	switch (view) {
		case "account":
			return (
				<div>
					{/* // TODO(BryceTuppurainen): Add in account management controls */}
					<div className="single-col-grid">
						<div>
							<h3>Manage Account</h3>
							<p>
								This is the view where you would be able to
								manage your account
							</p>
						</div>
						<div>
							<input
								type="text"
								placeholder={localStorage.fullname}
							/>
							<input type="button" value="Save Changes" />
						</div>
						<div>
							<input
								type="text"
								placeholder={localStorage.email}
							/>
							<input type="button" value="Save Changes" />
						</div>
						<div>
							<input
								type="text"
								placeholder="Enter a new password..."
							/>
							<input type="button" value="Save Changes" />
						</div>
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
		case "history":
			return (
				<div className="tiles">
					<h3>{localStorage.fullname}'s Previous Bookings</h3>
					<Tile />
					<Tile />
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
