import React from "react";

const processView = view => {
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
									localStorage.setItem("email", email);
									localStorage.setItem("password", password);
									localStorage.setItem("fullname", fullname);
									localStorage.setItem("permission", permission);
									navigate("/home");
								}}
							>
								<h3>New Package</h3>
								<input
									type="email"
									placeholder="Email"
									name="email"
									required
									onChange={(e) => setEmail(e.target.value)}
								/>
								<input
									type="password"
									placeholder="Password"
									name="password"
									required
									onChange={(e) => setPassword(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Please enter your full name..."
									name="password"
									required
									onChange={(e) => setFullname(e.target.value)}
								/>
								<div>
									<select
										name="permission"
										required
										onChange={(e) => {
											setPermission(e.target.value);
										}}
									>
										<option value="" default>
											Select a permission
										</option>
										<option value="admin">Admin</option>
										<option value="staff">Staff</option>
										<option value="agent">Agent</option>
										<option value="user">Customer</option>
									</select>
								</div>
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
