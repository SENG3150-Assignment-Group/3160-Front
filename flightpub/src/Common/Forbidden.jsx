import React from "react";

const Forbidden = () => {
	return (
		<>
			<h1>403 - Resource Access FORBIDDEN</h1>
			<p>
				<a href="/">
					You are not authenticated to view this page, please click
					here to return to the home page...
				</a>
			</p>
		</>
	);
};

export default Forbidden;
