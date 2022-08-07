import React, { useEffect } from "react";
import { useState } from "react";

const Account = () => {
	const [user, setUser] = useState({});

	useEffect(() => {
		setUser({ email: "", password: "", fullname: "" });
		if (localStorage.getItem("email") != null) {
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
			{user.fullname == "" ? (
				<>
					<h1>403 - Forbidden</h1>
					<p>
						You must be logged in to use this page,{" "}
						<a href="/authentication?mode=login">
							please click here to log-in
						</a>
					</p>
				</>
			) : (
				// TODO(BryceTuppurainen): Add the account management page here
				<>
					<h1>FlightPub Account</h1>
					<h3>Hello {user.fullname}!</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Nihil atque iste deserunt consequatur, officiis
						repudiandae hic veniam voluptate. Omnis autem possimus
						consequuntur architecto quidem dolorem fugiat accusamus,
						nam nisi eaque!
					</p>
				</>
			)}
		</>
	);
};

export default Account;