import React from "react";

const processView = view => {
	switch (view) {
		case "sign-up":
			return (
				<div>
					<div className="single-col-grid">
						<div>
							<h3>Sign Up</h3>
							<p>
								This is the view where you would be able to
								create an account
							</p>
						</div>
						<div>
							<input
								type="text"
								placeholder="Firstname Lastname"
							/>
							<input type="button" value="Save Changes" />
						</div>
						<div>
							<input
								type="text"
								placeholder="firstname.lastname@email.com"
							/>
							<input type="button" value="Save Changes" />
						</div>
						<div>
							<input
								type="text"
								placeholder="password"
							/>
							<input type="button" value="Save Changes" />
						</div>
						<div>
							<input
								type="text"
								placeholder="admin | agent | staff | user"
							/>
							<input type="button" value="Save Changes" />
						</div>
						<div>
							{/* //TODO (George Davis) creditCardNumber: string - creditCardDate: Date - creditCardSecurity: string */}
							<input
								type="text"
								placeholder="credit card details"
							/>
							<input type="button" value="Save Changes" />
						</div>
					</div>
				</div>
			);
		case "agent":
			return (
				<h3>Agent Info</h3>
			);
		case "staff":
			return (
				<h3>Staff Info</h3>
			);
		default:
			// Assume 'admin'
			return (
				<h3>All Flightpub Members</h3>
				
			);
	}
};

export default processView;
