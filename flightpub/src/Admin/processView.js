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
		case "agent":
			return (
				<h3>{localStorage.fullname}'s Agent Info</h3>
			);
		case "staff":
			return (
				<h3>{localStorage.fullname}'s Staff Info</h3>
			);
		default:
			// Assume 'admin'
			return (
				<h3>All Flightpub Members</h3>
			);
	}
};

export default processView;
