import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Home from "./Home/Home";
import Authentication from "./Authentication/Authentication";
import Booking from "./Booking/Booking";
import Checkout from "./Checkout/Checkout";
import Destination from "./Destination/Destination";
import Destinations from "./Destinations/Destinations";
import Flight from "./Flight/Flight";
import Flights from "./Flights/Flights";
import Group from "./Group/Group";
import Help from "./Help/Help";
import Admin from "./Admin/Admin";
import Agent from "./Agent/Agent";
import Staff from "./Staff/Staff";
import NotFound from "./Common/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Flights />} />
				<Route path="/home" element={<Home />} />
				<Route path="/authentication" element={<Authentication />} />
				<Route path="/booking" element={<Booking />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/destination" element={<Destination />} />
				<Route path="/destinations" element={<Destinations />} />
				<Route path="/flight" element={<Flight />} />
				<Route path="/flights" element={<Flights />} />
				<Route path="/group" element={<Group />} />
				<Route path="/help" element={<Help />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/agent" element={<Agent />} />
				<Route path="/staff" element={<Staff />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
