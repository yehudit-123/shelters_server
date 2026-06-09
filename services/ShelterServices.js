const conDB = require("../dataBase/ConnectToDB");

async function getAllShelters() {
    const [rows] = await conDB.promise().query(
        "SELECT * FROM shelters WHERE status='approved'"
    );

    return rows;
}
async function addShelter(data) {

    const query = `
    INSERT INTO shelters
    (
        shelterName,
        address,
        latitude,
        longitude,
        type,
        createdByUserId,
        status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        data.shelterName,
        data.address,
        data.latitude,
        data.longitude,
        data.type,
        data.createdByUserId,
        data.status
    ];

    return await conDB.promise().query(query, values);
}
module.exports = {
    getAllShelters,
    addShelter
};