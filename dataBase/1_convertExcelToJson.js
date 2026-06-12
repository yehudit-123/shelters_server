const xlsx = require("xlsx");
const fs = require("fs");

// ודאי ששם קובץ האקסל כאן תואם לשם הקובץ האמיתי שלך
const EXCEL_FILE_PATH = "./SheltersList.xlsx"; 
const JSON_OUTPUT_PATH = "./FinalSheltersData.json";

function convert() {
  try {
    const workbook = xlsx.readFile(EXCEL_FILE_PATH);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // המרה למערך של אובייקטים
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    fs.writeFileSync(
      JSON_OUTPUT_PATH,
      JSON.stringify(jsonData, null, 2)
    );

    console.log(`✅ ההמרה הסתיימה בהצלחה! הומרו ${jsonData.length} רשומות.`);
    console.log(`הקובץ נשמר בשם: ${JSON_OUTPUT_PATH}`);
  } catch (error) {
    console.error("❌ שגיאה בהמרת הקובץ:", error.message);
  }
}

convert();