import React, { useEffect } from "react";
import { useState } from "react";

import Header from "../Common/Header/Header";
import processView from "./processView";

import dummyUsers from "./dummy-users.json";

import "./AgentStyles.css";

const Agent = () => {
	const [viewContent, setViewContent] = useState(<></>);
	const [view, setView] = useState("admin");
	const [users, setUsers] = useState([<></>]);
	const [fullnameSearch, setFullnameSearch] = useState("");
	const [emailSearch, setEmailSearch] = useState("");
	const [wishlistSearch, setWishlistSearch] = useState("");
	//const [accountIdSearch, setAccountIdSearch] = useState("");
	
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
			//return user.fullname.includes(fullnameSearch);
			return user.fullname.toLowerCase().includes(fullnameSearch.toLowerCase()) &&
				   user.email.toLowerCase().includes(emailSearch.toLowerCase());
		});

		let userContent = [];

		response.forEach(user => {
			userContent.push(
				<div className="user-item">
					<input type="text" placeholder={user.accountId} />
					<input type="text" placeholder={user.fullname} />
					<input type="text" placeholder={user.email} />
					<input type="text" placeholder={user.wishlist} />
				</div>
			);
		});

		setUsers(userContent);
	};

	return (
		<>
		<div className="agent">
			<Header />
			<main>
				<section id="view-selector">
					<p
						onClick={e => {
							setView("find-user");
						}}
					>
						Find User
					</p>
					<p
						onClick={e => {
							setView("create-package");
						}}
					>
						Create Package
					</p>
				</section>
				<section id="view-content">{viewContent}</section>
			</main>

			<p>Number of matching users: {users.length}</p>

			<div className="user-table">
				<div className="user-items">
					<div>
						<h3>Account ID</h3>
						{/* <input
							// type="text"
							// value={accountIdSearch}
							// onChange={e => {
							// 	setAccountIdSearch(e.target.value);
							// }}
						/> */}
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
							value={emailSearch}
							onChange={e => {
								setEmailSearch(e.target.value);
							}}
						/>
					</div>
					<div>
						<h3>Wishlist</h3>
						<input
							type="text"
							value={wishlistSearch}
							onChange={e => {
								setWishlistSearch(e.target.value);
							}}
						/>
					</div>
				</div>
				{users}
			</div>
		</div>
		</>
	);
};

export default Agent;
