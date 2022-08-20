import React from "react";

const processView = view => {
	switch (view) {
		case "sign-up":
			return (
				<div className="authentication-content">
					<div className="authentication-wrapper">
						<form
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
							<h3>Sign-Up</h3>
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
							<input type="submit" value="Create Account" />
						</form>
					</div>
				</div>
			);
		default:
			// Assume "admin"
			return (
				<h3>All Flightpub Members</h3>
			);
	}
};

export default processView;
