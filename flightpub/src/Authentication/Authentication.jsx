import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Common/Header/Header";

const Authentication = () => {
	let navigate = useNavigate();

	return (
		<>
			<Header />
			<p
				onClick={() => {
					localStorage.setItem("fullname", "FlightPub User");
					localStorage.setItem("email", "user.name@email.com");
					localStorage.setItem("password", "SuperStrongPassword1!");
					localStorage.setItem("permission", "1"); // i.e. a user
					navigate("/account");
				}}
			>
				!!! Click this magic link text to automagically log in (yes this
				is going to be fixed in future) !!!
			</p>
		</>
	);
};

export default Authentication;
