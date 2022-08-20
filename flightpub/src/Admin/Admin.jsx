import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Common/Header/Header";
import processView from "./processView";

import dummyUsers from "./dummy-users.json";

import "./AdminStyles.css";

const Admin = () => {
	let navigate = useNavigate();

	const [viewContent, setViewContent] = useState(<></>);
	const [view, setView] = useState("admin");
	const [users, setUsers] = useState([<></>]);
	const [fullnameSearch, setFullnameSearch] = useState("");
	// TODO(GeorgeDavis): Add further search criteria here

	useEffect(() => {
		setViewContent(
			<div>
				<p>{processView(view)}</p>
			</div>
		);
	}, [view]);
	
	useEffect(() => {
		fetchUsers();
	});

	const fetchUsers = async () => {
		// const response = await fetch("/api/users");
		// const body = await response.json();
		// setUsers(body);

		const response = dummyUsers.filter(user => {
			return user.fullname.toLowerCase().includes(fullnameSearch.toLowerCase());
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
							navigate("/agent");
						}}
					>
						Agent
					</p>
					<p
						onClick={e => {
							navigate("/staff");
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
