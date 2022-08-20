import React from "react";
import { useEffect, useState } from "react";

import Header from "../Common/Header/Header";

import dummyUsers from "./dummy-users.json";

import "./AdminStyles.css";

const Admin = () => {
	const [viewContent, setViewContent] = useState(<></>);
	const [view, setView] = useState("admin");
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
					<input type="text" placeholder={user.accountId} />
					<input type="text" placeholder={user.fullname} />
					<input type="text" placeholder={user.email} />
					<input type="text" placeholder={user.password} />
					<input type="text" placeholder={user.permission} />
					<input type="text" placeholder={user.creditCard} />
				</div>
			);
		});

		setUsers(userContent);
	};

	return (
		<>
		<div className="admin">
			<Header />
			<main>
				<section id="view-selector">
					<p
						onClick={e => {
							setView("admin");
						}}
					>
						Admin
					</p>
					<p
						onClick={e => {
							setView("sign-up");
						}}
					>
						Add User
					</p>
					<p
						onClick={e => {
							setView("agent");
						}}
					>
						Agent
					</p>
					<p
						onClick={e => {
							setView("staff");
						}}
					>
						Staff
					</p>
				</section>
				<section id="view-content">{viewContent}</section>
			</main>

			<p>Number of matching users: {users.length}</p>

			<div className="user-table">
				<div className="user-items">
					<div>
						<h3>Account ID</h3>
						<input
							type="text"
						/>
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
					<div>
						<h3>Email</h3>
						<input
							type="text"
						/>
					</div>
					<div>
						<h3>Password</h3>
						<input
							type="text"
						/>
					</div>
					<div>
						<h3>Account Type</h3>
						<input
							type="text"
						/>
					</div>
					<div>
						<h3>Credit Card</h3>
						<input
							type="text"
						/>
					</div>
					<h3>Credit Card</h3>
					<h3>User</h3>
				</div>
				{users}
			</div>
		</div>
		</>
	);
};

export default Admin;
