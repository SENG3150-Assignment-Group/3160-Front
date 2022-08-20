import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import permission from "../Permission/Permission";

import "./HeaderStyles.css";

// TODO(BryceTuppurainen): Implement authentication

const Header = () => {
	const [authenticationOptions, setAuthenticationOptions] = useState(<></>);

	useEffect(() => {
		switch (permission()) {
			case 4:
				setAuthenticationOptions(
					<div className="AuthenticationOptions">
						<div>
							<a href="/admin">Admin</a>
						</div>
						<div>
							<a href="/home">Home</a>
						</div>
						<div>
							<a
								onClick={() => {
									localStorage.clear();
									navigate("/");
								}}
								href="."
							>
								Sign Out
							</a>
						</div>
					</div>
				);
				return;

			case 3:
				setAuthenticationOptions(
					<div className="AuthenticationOptions">
						<div>
							<a href="/agent">Agent</a>
						</div>
						<div>
							<a href="/home">Home</a>
						</div>
						<div>
							<a
								onClick={() => {
									localStorage.clear();
									navigate("/");
								}}
								href="."
							>
								Sign Out
							</a>
						</div>
					</div>
				);
				return;

			case 2:
				setAuthenticationOptions(
					<div className="AuthenticationOptions">
						<div>
							<a href="/staff">Staff Page</a>
						</div>
						<div>
							<a href="/home">Home</a>
						</div>
						<div>
							<a
								onClick={() => {
									localStorage.clear();
									navigate("/");
								}}
								href="."
							>
								Sign Out
							</a>
						</div>
					</div>
				);
				return;

			case 1:
				setAuthenticationOptions(
					<div className="AuthenticationOptions">
						<div></div>
						<div>
							<a href="/home">Home</a>
						</div>
						<div>
							<a
								onClick={() => {
									localStorage.clear();
									navigate("/");
								}}
								href="."
							>
								Sign Out
							</a>
						</div>
					</div>
				);
				return;

			default:
				setAuthenticationOptions(
					<div className="AuthenticationOptions">
						<div></div>
						<div>
							<a href="/authentication?q=sign-in">Sign In</a>
						</div>
						<div>
							<a href="/authentication?q=sign-up">Sign Up</a>
						</div>
					</div>
				);
		}
	}, []);

	let navigate = useNavigate();

	return (
		<header>
			<div className="Header">
				<div className="Logo">
					<div>
						<img alt="FlightPub Logo" src="/favicon.ico" />
					</div>

					<div>
						<h1>Flight Pub</h1>
					</div>
				</div>

				<nav>
					<div>
						<a href="/flights">Flights</a>
					</div>

					<div>
						<a href="/destinations">Explore</a>
					</div>
				</nav>

				{authenticationOptions}
			</div>
			<hr />
		</header>
	);
};

export default Header;
