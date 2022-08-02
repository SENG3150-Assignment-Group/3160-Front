import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Flights from "./Flights/Flights";

// TODO(BryceTuppurainen): Implement all of the original pages
// import Flight from "./Flight";
// import Destinations from "./Destinations";
// import Destination from "./Destination";
// import Help from "./Help";
// import SignIn from "./SignIn";
// import SignUp from "./SignUp";
// import Account from "./Account";
// import Booking from "./Booking";
// import Checkout from "./Checkout";
// import Group from "./Group";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Flights />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
