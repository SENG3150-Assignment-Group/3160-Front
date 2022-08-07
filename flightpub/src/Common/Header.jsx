import React from "react";
import { useNavigate } from "react-router-dom";

import "./HeaderStyles.css";

// TODO(BryceTuppurainen): Implement authentication

const isAuthenticated = true;

const Header = ({ page }) => {
	let navigate = useNavigate();

	return (
		<header>
			<div className="Header">
				<div className="Logo">
					<div>
						<img alt="FlightPub Logo" src="./favicon.ico" />
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

					<div>
						<a href="/group">Travel Groups</a>
					</div>
				</nav>

				{isAuthenticated ? (
					<div className="AuthenticationOptions">
						<div></div>
						<div>
							<a href="/account">My Account</a>
						</div>
						<div>
							<a
								onClick={() => {
									localStorage.setItem("email", "");
									localStorage.setItem("password", "");
									localStorage.setItem("fullname", "");
									navigate("/");
								}}
								href="."
							>
								Sign Out
							</a>
						</div>
					</div>
				) : (
					<div className="AuthenticationOptions">
						<div></div>
						<div>
							<a href="/authentication?q=sign-in">Sign In</a>
						</div>

						<div>
							<a href="/authentication?q=sign-up">Sign Up</a>
						</div>
					</div>
				)}
			</div>
			<hr />
		</header>
	);
};

export default Header;
