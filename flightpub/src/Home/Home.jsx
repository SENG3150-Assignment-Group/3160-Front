import React, { useEffect } from "react";
import { useState } from "react";

import Header from "../Common/Header/Header";
import Forbidden from "../Common/Forbidden";
import processView from "./processView";

import "./HomeStyles.css";

const Home = () => {
	const [viewContent, setViewContent] = useState(<></>);
	const [view, setView] = useState("home");
	const [user, setUser] = useState({});

	useEffect(() => {
		setViewContent(
			<div>
				<p>{processView(view)}</p>
			</div>
		);
	}, [view]);

	useEffect(() => {
		setUser({ email: "", password: "", fullname: "" });
		if (
			localStorage.getItem("email") != null &&
			localStorage.getItem("email") !== ""
		) {
			// HACK: This should be implemented using a salted-hash password rather than plaintext
			setUser({
				email: localStorage.getItem("email"),
				fullname: localStorage.getItem("fullname")
			});
			if (localStorage.getItem("password") != null) {
				// TODO(BryceTuppurainen): Make the request to the server to validate the provided password
				const validatePassword = password => {
					return true;
				};
				if (validatePassword(localStorage.getItem("password"))) {
					localStorage.setItem("password", "");
					setUser({
						email: localStorage.getItem("email"),
						fullname: localStorage.getItem("fullname")
					});
				}
			}
		}
	}, []);

	return (
		<>
			{user.fullname === "" ? (
				<Forbidden />
			) : (
				// TODO(BryceTuppurainen): Add the account management page here
				<div className="home">
					<Header />
					<main>
						<section id="view-selector">
							<p
								onClick={e => {
									setView("home");
								}}
							>
								Home
							</p>
							<p
								onClick={e => {
									setView("account");
								}}
							>
								My Account
							</p>
							<p
								onClick={e => {
									setView("watchlist");
								}}
							>
								Watchlist
							</p>
							<p
								onClick={e => {
									setView("history");
								}}
							>
								Booking History
							</p>
						</section>
						<section id="view-content">{viewContent}</section>
					</main>
				</div>
			)}
		</>
	);
};

export default Home;
