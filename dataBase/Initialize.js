const fs = require("fs");
const conDB = require("./ConnectToDB");

async function insertShelters() {

    const shelters = JSON.parse(
        fs.readFileSync("./TelAvivsheltersCoordinates.json", "utf8")
    );

    for (const shelter of shelters) {

        await conDB.promise().query(
            `
            INSERT INTO shelters
            (
                shelterName,
                address,
                latitude,
                longitude,
                type,
                createdByUserId,
                status,
                likesCount
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                `מיגונית ${shelter.address}`,
                shelter.address,
                shelter.latitude,
                shelter.longitude,
                "migunit",
                1,
                "approved",
                0
            ]
        );

        console.log(`Inserted: ${shelter.address}`);
    }

    console.log("All shelters inserted!");
}

insertShelters();
// const conDB = require("./ConnectToDB");
// require("dotenv").config();
// const { getCoordinates } = require("../services/GeocodingService");

// const fs = require("fs");
// const conDB = require("./ConnectToDB");

// async function insertShelters() {

//     const shelters = JSON.parse(
//         fs.readFileSync("./sheltersCoordinates.json", "utf8")
//     );

//     for (const shelter of shelters) {

//         await conDB.promise().query(
//             `
//             INSERT INTO shelters
//             (address, latitude, longitude)
//             VALUES (?, ?, ?)
//             `,
//             [
//                 shelter.address,
//                 shelter.lat,
//                 shelter.lng
//             ]
//         );

//         console.log(`Inserted: ${shelter.address}`);
//     }

//     console.log("DONE");
// }

// insertShelters();

// async function runQuery(query) {
//   return await conDB.promise().query(query);
// }

// async function initializeDB() {
//   try {

//     // ======================
//     // 👤 USERS
//     // ======================
//     await runQuery(`
//     INSERT INTO users(userName, email, phone, userRole)
//     VALUES
//     ('Yehudit', 'yehudit@gmail.com', '0523456789', 'admin'),
//     ('Hodaya', 'hodaya@gmail.com', '0549876543', 'admin'),
//     ('Moshe', 'moshe@gmail.com', '0531122334', 'user'),
//     ('Rachel', 'rachel@gmail.com', '0505566778', 'user'),
//     ('Maor', 'maor@gmail.com', '0582233445', 'user');
//     `);

//     console.log("users inserted");

//     // ======================
//     // 🔐 PASSWORDS
//     // ======================
//     await runQuery(`
//       INSERT INTO passwords (userId, passwordHash)
//       VALUES
//       (1,11111),
//       (2,22222),
//       (3,33333),
//       (4,44444),
//       (5,55555);
//     `);

//     console.log("passwords inserted");


//     // // ======================
//     // // 🏠 SHELTERS
//     // // ======================
   
//   try {
//       for (const address of sheltersAddresses) {
//           await insertShelter(address);
//       }

//       console.log("DONE - all shelters inserted");
//       process.exit();
//   } catch (err) {
//       console.error("Init error:", err);
//   }


//     console.log("shelters inserted");

//   //   ======================
//   //   💬 REVIEWS
//     // ======================
//     await runQuery(`
//     INSERT INTO reviews
//     (userId, shelterType, shelterId, content)
//     VALUES
    
//     (1, 'shelter', 1, 'Clean and organized shelter, very easy to reach during emergencies'),    
//     (2, 'shelter', 2, 'The place is small but gives a good sense of safety'),    
//     (3, 'community', 3, 'The community center was open and available during the emergency'),    
//     (4, 'shelter', 4, 'Excellent location near the central station'),    
//     (5, 'community', 5, 'There is plenty of space and the building is well maintained'),    
//     (1, 'shelter', 6, 'Very comfortable access to the shelter even at night'),    
//     (2, 'community', 7, 'Water and lighting were missing in the building'),    
//     (3, 'shelter', 8, 'The shelter is very close to residential buildings'),    
//     (4, 'community', 9, 'Safe and organized place with enough room for families'),    
//     (5, 'shelter', 10, 'Easy to find thanks to the clear signs'),    
//     (1, 'shelter', 2, 'Would be nice to add more benches inside'),    
//     (2, 'community', 5, 'The building is clean and well organized'),    
//     (3, 'shelter', 1, 'The place was a little crowded during the alarm'),    
//     (4, 'community', 3, 'The volunteers there were very helpful'),    
//     (5, 'shelter', 6, 'Quick and convenient access from the main sidewalk');
//     `);

//     console.log("reviews inserted");

//     // // ======================
//     // // ❤️ LIKES
//     // // ======================
//     await runQuery(`
//     INSERT INTO likes
//     (userId, shelterType, shelterId)
//     VALUES
    
//     (1, 'shelter', 1),   
//     (2, 'shelter', 1),    
//     (3, 'community', 3),    
//     (4, 'shelter', 4),    
//     (5, 'community', 5),    
//     (1, 'shelter', 6),    
//     (2, 'community', 7),    
//     (3, 'shelter', 8),    
//     (4, 'community', 9),   
//     (5, 'shelter', 10),    
//     (1, 'shelter', 2),    
//     (2, 'community', 5),    
//     (3, 'shelter', 4),    
//     (4, 'shelter', 6),
//     (5, 'community', 3);
//     `);

//     console.log("likes inserted");

//     console.log("ALL DATA INITIALIZED SUCCESSFULLY");

//     await conDB.end();

//   } catch (err) {
//     console.error("Error initializing DB:", err);
//   }
// }


// // initializeDB();

// module.exports = initializeDB;