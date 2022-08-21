import React, { useEffect } from "react";
import { useState } from "react";

import Header from "../Common/Header/Header";

import dummyAirportRestrictions from "./dummy-airport-restrictions.json";

import "./StaffStyles.css";


const Staff = () => {
	const [restrictions, setAirports] = useState([<></>]);
	const [airportSearch, setAirportSearch] = useState("");
	const [startSearch, setStartSearch] = useState("");
	const [endSearch, setEndSearch] = useState("");
	
	useEffect(() => {
		fetchAirports();
	});

	const fetchAirports = async () => {
		const response = dummyAirportRestrictions.filter(airport => {
			return  airport.airport.toLowerCase().includes(airportSearch.toLowerCase());
			//&& airport.restrictionPeriod.includes(restrictionPeriod);
		});

		let airportContent = [];

		response.forEach(airport => {
			airportContent.push(
				<div className="airport-item">
					<input type="text" placeholder={airport.airport} />
					<input type="text" placeholder={airport.start} />
					<input type="text" placeholder={airport.end} />
					<div>
						<input type="button" value="Update" />
					</div>
				</div>
			);
		});

		setAirports(airportContent);
	};

	return (
		<>
		<div className="staff">
			<Header />
			<p>Number of matching airports: {restrictions.length}</p>
			<div className="airport-table">
				<div className="airport-items">
					<div>
						<h3>Airport</h3>
						<input
							type="text"
							value={airportSearch}
							onChange={e => {
								setAirportSearch(e.target.value);
							}}
						/>
					</div>
					<div>
						<h3>Restriction Start</h3>
						<input
							type="text"
							value={startSearch}
							onChange={e => {
								setStartSearch(e.target.value);
							}}
						/>
					</div>
					<div>
						<h3>Restriction End</h3>
						<input
							type="text"
							value={endSearch}
							onChange={e => {
								setEndSearch(e.target.value);
							}}
						/>
					</div>
					<div>
						<h3></h3>
					</div>
				</div>
				{restrictions}
			</div>
		</div>
		</>
	);
};

export default Staff;
