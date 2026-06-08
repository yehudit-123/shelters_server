const conDB = require("../dataBase/ConnectToDB");

async function getAllUsers() {

    const [rows] = await conDB.promise().query(
        "SELECT * FROM users"
    );

    return rows;
}

async function login(userName, passwordHash) {

    const [rows] = await conDB.promise().query(
        `
        SELECT u.*
        FROM users u
        INNER JOIN passwords p ON u.userId = p.userId
        WHERE u.userName = ? AND p.passwordHash = ?
        LIMIT 1
        `,
        [userName, passwordHash]
    );

    return rows;
}

module.exports={
    getAllUsers,
    login

};