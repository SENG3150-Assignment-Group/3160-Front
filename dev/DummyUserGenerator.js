const fs = require('fs');

const firstNames = [
    'John',
    'Jane',
    'Neil',
    'Nigel',
    'Jake',
    'Bryce',
    'Bryan',
    'George',
    'Anton',
    'Juliet',
    'Julia',
    'Julius',
    'Cameron',
    'Arthur'
]

const lastNames = [
    'Tuppurainen',
    'Capulet',
    'Davis',
    'Macbeth',
    'Graham',
    'Lyamin',
    'Byrne'
]

const permissions = [
    'admin',
    'agent',
    'staff',
    'user'
]

const random = (max) => {
    return Math.floor(Math.random() * max);
}

const generatePassword = (n) => {
    let password = '';
    for (let i = 0; i < n; i++) {
        password += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    return password;
}


const generateUsers = (numberOfUsers) => {

    let users = [];
    for (let i = 0; i < numberOfUsers; i++) {
        const firstName = firstNames[random(firstNames.length )]
        const lastName = lastNames[random(lastNames.length)]
        while (
            !users.find(user => user.fullname ===  firstName + ' ' + lastName)
        ) {
            users.push({
                "fullname": firstName + ' ' + lastName,
                "email": firstName + '.' + lastName + '@gmail.com',
                "password": generatePassword(random(10) + 1),
                "permission": permissions[random(permissions.length)],
                "accountId": i
            });
        }
        // TODO(GeorgeDavis): Add more user data to this generator if relevant
    }
    return users;
}

const saveUsers = (users) => {
    const json = JSON.stringify(users);
    fs.writeFileSync("./dummy-users.json", json);
}

saveUsers(generateUsers(1000));