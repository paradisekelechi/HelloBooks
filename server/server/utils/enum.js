let accountType = {
    SILVER: 1,
    GOLD: 2,
    PLATINIUM: 3,
    properties: {
        1: {
            name:'silver',
            value: 1,
            code: 'S'
        },
        2: {
            name:'gold',
            value: 2,
            code: 'G'
        },
        3: {
            name:'platinium',
            value: 3,
            code: 'P'
        },
    }
}

let userType = {
    CLIENT: 1,
    ADMIN: 2,
    properties: {
        1: {
            name: 'client',
            value: 1,
            code: 'c'
        },
        2: {
            name: 'admin',
            value: 2,
            code: 'a'
        }
    }
}



// let val = accountType.GOLD;
// console.log(accountType.properties[val].name);