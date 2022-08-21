const fs = require("fs");

/**
 * @returns Integer up to max from zero (both inclusive)
 */
const random = (max) => {
	return Math.round(Math.random() * max);
};

const getRandomAirline = () => {
	const airlines = [
		"American Airlines",
		"Air Canada",
		"Air France",
		"Air India",
		"Air Mexico",
		"Aerolineas Argentinas",
		"Finnair",
		"British Airways",
		"Air China",
		"China Airlines",
		"Continental Airlines",
		"Cathay Pacific Airways",
		"Virgin Blue",
		"Delta Air Lines",
		"Aer Lingus",
		"Qatar Airways",
		"Iberia",
		"Japan Airlines",
		"Jetstar Airlines",
		"Korean Airlines",
		"KLM-Royal Dutch Airlines",
		"Lufthansa",
		"El Al Israel Airlines",
		"Malaysia Airlines",
		"Egyptair",
		"Mexicana de Aviacion",
		"North American Airlines",
		"Northwest Airlines",
		"Air New Zealand",
		"Austrian Airlines",
		"Philippine Airlines",
		"Qantas Airways",
		"Emirates Airlines",
		"Royal Jordanian",
		"South African",
		"SAS-Scandinavian Airlines",
		"Singapore Airlines",
		"Aeroflot",
		"Thai Airways",
		"Turkish Airlines",
		"Trans World Airlines",
		"United Airlines",
		"Aeropostal Alas de Venezuela",
		"Virgin Atlantic Airways",
	];
	return airlines[random(airlines.length - 1)];
};

const getRandomCode = (airline) => {
	const airlineCodes = {
		"American Airlines": "AA",
		"Air Canada": "AC",
		"Air France": "AF",
		"Air India": "AI",
		"Air Mexico": "AM",
		"Aerolineas Argentinas": "AAT",
		Finnair: "FA",
		"British Airways": "BA",
		"Air China": "CI",
		"China Airlines": "CA",
		"Continental Airlines": "CNA",
		"Cathay Pacific Airways": "CPA",
		"Virgin Blue": "VB",
		"Delta Air Lines": "DAL",
		"Aer Lingus": "AL",
		"Qatar Airways": "QA",
		Iberia: "IBR",
		"Japan Airlines": "JA",
		"Jetstar Airlines": "JSA",
		"Korean Airlines": "KA",
		"KLM-Royal Dutch Airlines": "KLM",
		Lufthansa: "LHA",
		"El Al Israel Airlines": "IA",
		"Malaysia Airlines": "MHA",
		Egyptair: "EA",
		"Mexicana de Aviacion": "MAV",
		"North American Airlines": "NAA",
		"Northwest Airlines": "NWA",
		"Air New Zealand": "ANZ",
		"Austrian Airlines": "AUS",
		"Philippine Airlines": "PHA",
		"Qantas Airways": "QHA",
		"Emirates Airlines": "EMA",
		"Royal Jordanian": "RJ",
		"South African": "SAA",
		"SAS-Scandinavian Airlines": "SAS",
		"Singapore Airlines": "SAA",
		Aeroflot: "AFL",
		"Thai Airways": "TA",
		"Turkish Airlines": "TKA",
		"Trans World Airlines": "TWA",
		"United Airlines": "UA",
		"Aeropostal Alas de Venezuela": "AAV",
		"Virgin Atlantic Airways": "VAA",
	};

	return (
		airlineCodes[airline].toString() +
		random(9999).toString().padEnd(4, "0")
	);
};

const getRandomDate = () => {
	return (
		random(2) +
		2022 +
		"-" +
		(random(11) + 1).toString().padStart(2, "0") +
		"-" +
		(random(27) + 1).toString().padStart(2, "0")
	);
};

const getRandomTwentyFourHourTime = () => {
	return (random(22) + 1).toString().padStart(2, "0") + "00";
};

const getRandomLocation = (illegalLocation) => {
	let locations = [
		"Adelaide",
		"Amsterdam",
		"Atlanta",
		"Bangkok",
		"Brisbane",
		"Canberra",
		"Cairns",
		"Doha",
		"Darwin",
		"Dubai",
		"Rome",
		"Rio De Janeiro",
		"Hobart",
		"Helsinki",
		"Hong Kong",
		"Honolulu",
		"New York",
		"Johannesburg",
		"Kuala Lumpur",
		"Los Angeles",
		"London",
		"Madrid",
		"Melbourne",
		"Miami",
		"Munich",
		"Tokyo",
		"Gold Coast",
		"Chicago",
		"Paris",
		"Perth",
		"San Francisco",
		"Singapore",
		"Sydney",
		"Vienna",
		"Toronto",
	];

	locations = locations.filter((location) => location !== illegalLocation);

	return locations[random(locations.length - 1)];
};

const getRandomPlane = () => {
	// TODO(): Add more planes...
	return "Boeing737";
};

const generateFlightsJSON = (numberOfFlights) => {
	let flights = {};

	let codes = [];

	for (let i = 0; i < numberOfFlights; i++) {
		const airline = getRandomAirline();
		let code = getRandomCode(airline);
		while (codes.includes(code)) {
			code = getRandomCode(airline);
		}
		codes.push(code);
		const date = getRandomDate();
		const time = getRandomTwentyFourHourTime();
		const departure = getRandomLocation();
		const destination = getRandomLocation(departure);
		const plane = getRandomPlane();
		const duration = (random(11) + 1).toString();
		const seats = random(99) + 1;
		const price = random(9899) + 101;

		const flight = {
			date,
			time,
			departure,
			destination,
			airline,
			plane,
			duration,
			seats,
			price,
		};
		flights[code] = flight;
	}

	return flights;
};

// Saves the flights to a JSON file.
const saveFlights = (flights) => {
	const json = JSON.stringify(flights);
	fs.writeFileSync("./dummy-flights.json", json);
};

if (!process.argv[2]) {
	saveFlights(generateFlightsJSON(100));
} else {
	saveFlights(generateFlightsJSON(process.argv[2]));
}
