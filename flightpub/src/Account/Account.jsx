import React, { useEffect } from "react";
import { useState } from "react";

import Header from "../Common/Header/Header";
import Forbidden from "../Common/Forbidden";

const Account = () => {
	const [user, setUser] = useState({});

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
				<>
					<Header />
					<h3>Hi {user.fullname}!</h3>
				</>
			)}
		</>
	);
};

export default Account;
