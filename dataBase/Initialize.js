const conDB = require("./ConnectToDB");
const { getCoordinates } = require("./services/geocodingService");
const sheltersAddresses = [
  "דדו 12 אופקים",
  "דדו 18 אופקים",
  "קיבוץ גלויות 36 אופקים",
  "רחבת אדר 10",
  "הרב קוק 12"
];
async function insertShelter(address) {

  const coords = await getCoordinates(address);

  if (!coords) {
      console.log("לא נמצא מיקום ל:", address);
      return;
  }

  const query = `
      INSERT INTO shelters
      (shelterName, address, latitude, longitude, type, status)
      VALUES (?, ?, ?, ?, ?, ?)
  `;

  await conDB.promise().query(query, [
      address,
      address,
      coords.lat,
      coords.lng,
      "shelter",
      "approved"
  ]);

  console.log("Inserted:", address);
}
async function runQuery(query) {
  return await conDB.promise().query(query);
}

async function initializeDB() {
  try {

    // ======================
    // 👤 USERS
    // ======================
    // await runQuery(`
    // INSERT INTO users(userName, email, phone, userRole)
    // VALUES
    // ('Yehudit', 'yehudit@gmail.com', '0523456789', 'admin'),
    // ('Hodaya', 'hodaya@gmail.com', '0549876543', 'admin'),
    // ('Moshe', 'moshe@gmail.com', '0531122334', 'user'),
    // ('Rachel', 'rachel@gmail.com', '0505566778', 'user'),
    // ('Maor', 'maor@gmail.com', '0582233445', 'user');
    // `);

    // console.log("users inserted");

    // ======================
    // 🔐 PASSWORDS
    // ======================
    // await runQuery(`
    //   INSERT INTO passwords (userId, passwordHash)
    //   VALUES
    //   (1,11111),
    //   (2,22222),
    //   (3,33333),
    //   (4,44444),
    //   (5,55555);
    // `);

    // console.log("passwords inserted");

    try {
      for (const address of sheltersAddresses) {
          await insertShelter(address);
      }

      console.log("DONE - all shelters inserted");
      process.exit();
  } catch (err) {
      console.error("Init error:", err);
  }

    // // ======================
    // // 🏠 SHELTERS
    // // ======================
    // await runQuery(`
    // INSERT INTO shelters
    // (shelterName, address, latitude, longitude, type, createdByUserId, status, likesCount)
    // VALUES

    // ('Central Shelter', '12 Herzl St, Ashkelon', 31.6688, 34.5743, 'shelter', NULL, 'approved', 15),
    // ('Kindergarten Shelter', '8 Olive St, Sderot', 31.5253, 34.5956, 'shelter', NULL, 'approved', 23),
    // ('South Community Center', '21 Negev St, Beer Sheva', 31.2520, 34.7915, 'community', 1, 'pending', 7),
    // ('Central Station Shelter', '5 Independence St, Ashdod', 31.8014, 34.6435, 'shelter', NULL, 'approved', 32),
    // ('Safe School Building', '14 Palmach St, Ofakim', 31.3141, 34.6202, 'community', 2, 'approved', 11),
    // ('Park Shelter', '3 Kalanit St, Netivot', 31.4231, 34.5892, 'shelter', NULL, 'approved', 18),
    // ('Emergency Community Center', '18 Jerusalem St, Kiryat Gat', 31.6100, 34.7642, 'community', 3, 'pending', 5),
    // ('Neighborhood Shelter', '7 Dekel St, Sderot', 31.5205, 34.5961, 'shelter', NULL, 'approved', 27),
    // ('Protected Community Hall', '11 Teena St, Netivot', 31.4212, 34.5880, 'community', 1, 'approved', 9),
    // ('Beach Shelter', '2 Sea St, Ashkelon', 31.6765, 34.5588, 'shelter', NULL, 'approved', 41);
    // `);

    // console.log("shelters inserted");

    // ======================
    // 💬 REVIEWS
    // // ======================
    // await runQuery(`
    // INSERT INTO reviews
    // (userId, shelterType, shelterId, content)
    // VALUES
    
    // (1, 'shelter', 1, 'Clean and organized shelter, very easy to reach during emergencies'),    
    // (2, 'shelter', 2, 'The place is small but gives a good sense of safety'),    
    // (3, 'community', 3, 'The community center was open and available during the emergency'),    
    // (4, 'shelter', 4, 'Excellent location near the central station'),    
    // (5, 'community', 5, 'There is plenty of space and the building is well maintained'),    
    // (1, 'shelter', 6, 'Very comfortable access to the shelter even at night'),    
    // (2, 'community', 7, 'Water and lighting were missing in the building'),    
    // (3, 'shelter', 8, 'The shelter is very close to residential buildings'),    
    // (4, 'community', 9, 'Safe and organized place with enough room for families'),    
    // (5, 'shelter', 10, 'Easy to find thanks to the clear signs'),    
    // (1, 'shelter', 2, 'Would be nice to add more benches inside'),    
    // (2, 'community', 5, 'The building is clean and well organized'),    
    // (3, 'shelter', 1, 'The place was a little crowded during the alarm'),    
    // (4, 'community', 3, 'The volunteers there were very helpful'),    
    // (5, 'shelter', 6, 'Quick and convenient access from the main sidewalk');
    // `);

    // console.log("reviews inserted");

    // // ======================
    // // ❤️ LIKES
    // // ======================
    // await runQuery(`
    // INSERT INTO likes
    // (userId, shelterType, shelterId)
    // VALUES
    
    // (1, 'shelter', 1),   
    // (2, 'shelter', 1),    
    // (3, 'community', 3),    
    // (4, 'shelter', 4),    
    // (5, 'community', 5),    
    // (1, 'shelter', 6),    
    // (2, 'community', 7),    
    // (3, 'shelter', 8),    
    // (4, 'community', 9),   
    // (5, 'shelter', 10),    
    // (1, 'shelter', 2),    
    // (2, 'community', 5),    
    // (3, 'shelter', 4),    
    // (4, 'shelter', 6),
    // (5, 'community', 3);
    // `);

    // console.log("likes inserted");

    console.log("ALL DATA INITIALIZED SUCCESSFULLY");

    await conDB.end();

  } catch (err) {
    console.error("Error initializing DB:", err);
  }
}


initializeDB();

module.exports = initializeDB;