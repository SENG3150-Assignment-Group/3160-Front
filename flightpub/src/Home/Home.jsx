import React, { useEffect } from "react";
import { useState } from "react";

import Header from "../Common/Header/Header";
import Forbidden from "../Common/Forbidden";
import permission from "../Common/Permission/Permission";
import processView from "./processView";

import "./HomeStyles.css";

const Home = () => {
	const [viewContent, setViewContent] = useState(<></>);
	const [view, setView] = useState("home");

	let requestedView = new URLSearchParams(window.location.search).get("view");

	useEffect(() => {
		if (requestedView) {
			setView(requestedView);
		}
	}, []);

	useEffect(() => {
		setViewContent(
			<div>
				<p>{processView(view)}</p>
			</div>
		);
	}, [view]);

	return (
		<>
			{permission() < 1 ? (
				<Forbidden />
			) : (
				<div className="home-content">
					<Header />
					<main>
						<section id="view-selector">
							<p
								onClick={(e) => {
									setView("home");
								}}
							>
								Home
							</p>
							<p
								onClick={(e) => {
									setView("account");
								}}
							>
								My Account
							</p>
							{/* 
							// TODO(BryceTuppurainen): Currently unimplemented feature
							<p
								onClick={(e) => {
									setView("watchlist");
								}}
							>
								Watchlist
							</p> */}
							<p
								onClick={(e) => {
									setView("bookings");
								}}
							>
								Bookings
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
