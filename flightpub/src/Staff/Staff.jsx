import React, { useEffect } from "react";
import { useState } from "react";

import Header from "../Common/Header/Header";

import dummyAirports from "./dummy-airports.json";

import "./StaffStyles.css";


const Staff = () => {
	const [airports, setAirports] = useState([<></>]);
	const [airportSearch, setAirportSearch] = useState("");
	const [restrictionPeriodSearch, setRestrictionPeriodSearch] = useState("");
	
	useEffect(() => {
		fetchAirports();
	});

	const fetchAirports = async () => {
		const response = dummyAirports.filter(airport => {
			return  airport.airport.toLowerCase().includes(airportSearch.toLowerCase());
			//&& airport.restrictionPeriod.includes(restrictionPeriod);
		});

		let airportContent = [];

		response.forEach(airport => {
			airportContent.push(
				<div className="airport-item">
					<input type="text" placeholder={airport.airport} />
					<input type="text" placeholder={airport.restrictionPeriod} />
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
			<p>Number of matching airports: {airports.length}</p>
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
						<h3>Restriction Period</h3>
						<input
							type="text"
							value={restrictionPeriodSearch}
							onChange={e => {
								setRestrictionPeriodSearch(e.target.value);
							}}
						/>
					</div>
					<div>
						<h3></h3>
					</div>
				</div>
				{airports}
			</div>
		</div>
		</>
	);
};

export default Staff;
