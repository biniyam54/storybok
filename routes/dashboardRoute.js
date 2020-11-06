const { dashboard } = require("../controllers/dashboardController");
const { ensureAuth } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/").get(ensureAuth, dashboard);

module.exports = router;
