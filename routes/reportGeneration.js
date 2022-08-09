const router = require("express").Router();
const reportController = require("../controllers/report");

router
  .route("/")
  .get(reportController.createReport)
  .post(reportController.create);

module.exports = router;
