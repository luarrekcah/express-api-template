const express = require("express");
const { getAllItems, getItems } = require("../database");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.get("/getall", async (req, res) => {
  let data;
  //getall?path=path/to/loc
  try {
    data = await getAllItems({ path: req.query.path });
  } catch (error) {
    res.json(error);
  }
  res.json(data);
});

router.get("/get", async (req, res) => {
    let data;
    //get?path=path/to/loc
    try {
      data = await getItems({ path: req.query.path });
    } catch (error) {
      res.json(error);
    }
    res.json(data);
  });

module.exports = router;
