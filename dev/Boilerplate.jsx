import React from "react";
import { useState, useEffect } from "react";

import Header from "../Common/Header/Header";

const Object = () => {
	const [state, setState] = useState({
		flights: [],
	});

	useEffect(() => {
		// RUN on instantiation
	}, []);

	return (
		<>
			<Header />
		</>
	);
};

export default Object;
