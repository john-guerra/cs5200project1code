const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

sqlite3.verbose();

async function connect() {
  return open({
    filename: "./db/project1.db",
    driver: sqlite3.Database,
  });
}

async function getDistricts() {
  const db = await connect();
  //return await db.all("SELECT * FROM District");
  try{
    return await db.all("SELECT * FROM District");
  } finally {
    await db.close();
  }
}

async function getDistrictByID(districtId) {
  const db = await connect();
  const stmt = await db.prepare(`SELECT *
    FROM District
    WHERE
      districtId = :districtId
  `);
  stmt.bind({
    ":districtId": districtId,
  });
  return await stmt.get();

}

async function createDistrict(newDistrict) {
  const db = await connect();
  const stmt = await db.prepare(`INSERT INTO
    District(districtName)
    VALUES (:districtName)
  `);
  stmt.bind({
    ":districtName": newDistrict.districtName,
  });
  return await stmt.run();

}

/**
 * delete from district
 * @param districtToDelete
 * @returns {Promise<ISqlite.RunResult<sqlite3.Statement>>}
 */
async function deleteDistrict(districtToDelete) {
  const db = await connect();
  const stmt = await db.prepare(`DELETE FROM
    District
    WHERE districtId = :theIDToDelete
  `);
  stmt.bind({
    ":theIDToDelete": districtToDelete.districtId,
  });
  return await stmt.run();

}

/**
 * update district
 * @param districtToUpdate
 * @returns {Promise<ISqlite.RunResult<sqlite3.Statement>>}
 */
async function updateDistrict(districtToUpdate) {
  const db = await connect();
  const stmt = await db.prepare(`UPDATE District
        SET districtName = :districtNameToUpdate
        Where districtId = :districtIdToUpdate;
  `);
  stmt.bind({
    ":districtNameToUpdate": districtToUpdate.districtNewName,
    ":districtIdToUpdate": districtToUpdate.districtId,
  });
  return await stmt.run();

}
module.exports.getDistricts = getDistricts;
module.exports.createDistrict = createDistrict;
module.exports.deleteDistrict = deleteDistrict;
module.exports.getDistrictByID = getDistrictByID;
module.exports.updateDistrict = updateDistrict;
