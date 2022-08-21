import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Common/Header/Header";

import "./AuthenticationStyles.css";

const Authentication = () => {
	let navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullname, setFullname] = useState("");
	const [permission, setPermission] = useState("");

	return (
		<>
			<Header />
			<div className="authentication-content">
				<div className="authentication-wrapper">
					<form
						className="sign-in-opt"
						onSubmit={(e) => {
							e.preventDefault();
							localStorage.setItem("email", email);
							localStorage.setItem("password", password);
							localStorage.setItem(
								"fullname",
								email.split("@")[0]
							);
							localStorage.setItem("permission", "admin");
							navigate("/home");
						}}
					>
						<h3>Sign-In</h3>
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
						<input type="submit" value="Login" />
					</form>
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
		</>
	);
};

export default Authentication;
