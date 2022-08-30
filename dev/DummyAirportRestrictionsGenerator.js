const fs = require('fs');

const starts = [
    '21-08-2022',
    '22-08-2022',
    '23-08-2022',
    '24-08-2022',
    '25-08-2022',
    '26-08-2022',
    '27-08-2022'
]

const ends = [
    '21-10-2022',
    '22-10-2022',
    '23-10-2022',
    '24-10-2022',
    '25-10-2022',
    '26-10-2022',
    '27-10-2022'
]

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

const random = (max) => {
    return Math.floor(Math.random() * max);
}

const generateRestrictions = () => {

    let restrictions = [];
    for (let airport in airports) {
        if (random(2) !== 1) {
        restrictions.push({
            "airport": airports[airport]
        });
            continue;
        }
        const start = starts[random(starts.length)]
        const end = ends[random(ends.length)]
        
        restrictions.push({
            "start": start,
            "end": end,
            "airport": airports[airport]
        });
    }
    return restrictions;
}

const saveRestrictions = (airports) => {
    const json = JSON.stringify(airports);
    fs.writeFileSync("./dummy-airport-restrictions.json", json);
}

saveRestrictions(generateRestrictions(airports.length));