let express = require("express");
let router = express.Router();

const myDB = require("../db/airbnbSQLiteDB.js");

/*Get all district*/
router.get("/", async function (req, res) {
  console.log("Got request for /");
  const districts = await myDB.getDistricts();
  console.log("got districts", districts);
  // render the _index_ template with the fires attrib as the list of fires
  res.render("index", { districts: districts});
});

/* GET a single district. */
router.get("/districts/:districtId", async function (req, res) {
  console.log("Got district details");
  const districtId = req.params.districtId;
  console.log("got district details ", districtId);
  const district = await myDB.getDistrictByID(districtId);
  console.log("district created");
  res.render("districtDetails", {district: district});
});

/* POST create district. */
router.post("/districts/create", async function (req, res) {
  console.log("Got post create/district");
  const district = req.body;
  console.log("got create district", district);
  await myDB.createDistrict(district);
  console.log("District created");
  res.redirect("/");
});

/* POST delete fires. */
router.post("/districts/delete", async function (req, res) {
  console.log("Got post delete district");
  const district = req.body;
  console.log("got delete district", district);
  await myDB.deleteDistrict(district);
  console.log("District deleted");
  res.redirect("/");
});

/* Update districts. */
router.post("/districts/update", async function (req, res) {
  console.log("Got post update districts");
  const district = req.body;
  console.log("got update district", district);
  await myDB.updateDistrict(district);
  console.log("district updated");
  res.redirect("/");
});
module.exports = router;
