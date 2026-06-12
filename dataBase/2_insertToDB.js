const fs = require("fs");
const conDB = require("./ConnectToDB"); // ודאי שזהו הנתיב הנכון לקובץ החיבור שלך

async function insertShelters() {
    try {
        // קריאת הקובץ שנוצר בשלב הקודם
        const shelters = JSON.parse(
            fs.readFileSync("./FinalSheltersData.json", "utf8")
        );

        console.log(`מתחיל להכניס ${shelters.length} מיגוניות למסד הנתונים...`);

        for (const shelter of shelters) {
            // שימוש ב-|| כדי לתת ערך ברירת מחדל במידה ותא מסוים באקסל נשאר ריק
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
                    shelter.shelterName || 'shelter',
                    shelter.address,
                    shelter.latitude,
                    shelter.longitude,
                    shelter.type || 'מיגונית',
                    shelter.createdByUserId || null, // אם אין יוצר, יהיה NULL
                    shelter.status || 'pending',
                    shelter.likesCount || 0
                ]
            );

            console.log(`✅ הוזן בהצלחה: ${shelter.address}`);
        }

        console.log("🎉 כל המיגוניות הוכנסו למסד הנתונים בהצלחה!");
        process.exit(0); // סיום ריצת הסקריפט

    } catch (error) {
        console.error("❌ שגיאה בהכנסת נתונים:", error.message);
        process.exit(1);
    }
}

insertShelters();