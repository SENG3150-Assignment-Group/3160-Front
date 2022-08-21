import React, { useEffect } from "react";
import { useState } from "react";

import Header from "../Common/Header/Header";
import Forbidden from "../Common/Forbidden";
import processView from "./processView";

import "./HomeStyles.css";
import permission from "../Common/Permission/Permission";

const Home = () => {
	const [viewContent, setViewContent] = useState(<></>);
	const [view, setView] = useState("home");

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
				<div className="home">
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
							<p
								onClick={(e) => {
									setView("watchlist");
								}}
							>
								Watchlist
							</p>
							<p
								onClick={(e) => {
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
