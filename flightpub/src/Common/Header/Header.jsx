import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import permission from "../Permission/Permission";

import "./HeaderStyles.css";

const Header = () => {
	const [opts, setOpts] = useState(<></>);

	useEffect(() => {
		switch (permission()) {
			case 4:
				setOpts(
					<div className="opts">
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
				setOpts(
					<div className="opts">
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
				setOpts(
					<div className="opts">
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
				setOpts(
					<div className="opts">
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
				setOpts(
					<div className="opts">
						<div></div>
						<div>
							<a href="/authentication">Sign In</a>
						</div>
						<div>
							<a href="/authentication">Sign Up</a>
						</div>
					</div>
				);
		}
	}, []);

	let navigate = useNavigate();

	return (
		<header>
			<div className="header-content">
				<div className="logo">
					<div>
						<img alt="FlightPub Logo" src="/favicon.ico" />
					</div>

					<div>
						<h1>Flight Pub</h1>
					</div>
				</div>

				<nav>
					<div>
						<a
							onClick={(e) => {
								localStorage.removeItem("departingFlight");
								navigate("/flights");
							}}
						>
							Flights
						</a>
					</div>

					<div>
						<a href="/destinations">Explore</a>
					</div>
				</nav>

				{opts}
			</div>
			<hr />
		</header>
	);
};

export default Header;
