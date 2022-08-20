const fs = require('fs');

const airports = [
    'Adelaide',
    'Amsterdam',
    'Atlanta',
    'Bangkok',
    'Brisbane',
    'Canberra',
    'Paris - Charles De Gaulle',
    'Cairns',
    'Doha',
    'Darwin',
    'Dubai',
    'Rome-Fiumicino'
]

const restrictionStart = [
    '21/8/22',
    '22/8/22',
    '23/8/22',
    '24/8/22',
    '25/8/22',
    '26/8/22',
    '27/8/22'
]

const restrictionEnd = [
    '21/10/22',
    '22/10/22',
    '23/10/22',
    '24/10/22',
    '25/10/22',
    '26/10/22',
    '27/10/22'
]

const generateAirports = (numberOfAirports) => {

    let airports = [];
    for (let i = 0; i < numberOfAirports; i++) {
        const restrictionStart = restrictionStarts[random(restrictionStarts.length )]
        const restrictionEnd = restrictionEnds[random(restrictionEnds.length)]
        while (
            !airports.find(airport => airport.restrictionStart ===  restrictionStart + ' ' + restrictionEnd)
        ) {
            airports.push({
                "airport": airport,
                "restrictionStart": restrictionStart + ' ' + restrictionEnd,
            });
        }
    }
    return airports;
}

const saveAirports = (airports) => {
    const json = JSON.stringify(airports);
    fs.writeFileSync("./dummy-airports.json", json);
}

saveAirports(generateAirports(1000));