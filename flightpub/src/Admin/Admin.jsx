import React from "react";
import { useEffect, useState } from "react";

import Header from "../Common/Header/Header";

import dummyUsers from "./dummy-users.json";

import "./AdminStyles.css";

const Admin = () => {
	const [users, setUsers] = useState([<></>]);
	const [fullnameSearch, setFullnameSearch] = useState("");
	// TODO(GeorgeDavis): Add further search criteria here

	useEffect(() => {
		fetchUsers();
	});

	const fetchUsers = async () => {
		// const response = await fetch("/api/users");
		// const body = await response.json();
		// setUsers(body);

		const response = dummyUsers.filter(user => {
			return user.fullname.includes(fullnameSearch);
		});

		let userContent = [];

		response.forEach(user => {
			userContent.push(
				<div className="user-item">
					<input type="text" placeholder={user.email} />
					<input type="text" placeholder={user.fullname} />
					<input type="text" placeholder={user.password} />
					<input type="text" placeholder={user.creditCard} />
					<div>
						<input type="button" value="View User" />
						<input type="button" value="Save Updated User" />
					</div>
				</div>
			);
		});

		setUsers(userContent);
	};

	return (
		<>
			<Header />
			<div className="admin-page">
				<h3>
					<a href="/staff">Staff</a>
				</h3>
				<h3>
					<a href="/agent">Travel Agent</a>
				</h3>

				<input type="button" value="Add User" />

				<p>Number of matching users: {users.length}</p>

				<div className="user-table">
					<div className="user-items">
						<div>
							<h3>Email</h3>
						</div>
						<div>
							<h3>Name</h3>
							<input
								type="text"
								value={fullnameSearch}
								onChange={e => {
									setFullnameSearch(e.target.value);
								}}
							/>
						</div>
						<h3>Password</h3>
						<h3>Credit Card</h3>
						<h3>Update User Details</h3>
					</div>
					{users}
				</div>
			</div>
		</>
	);
};

export default Admin;
