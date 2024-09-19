const express = require("express");
const router = express.Router();
const hoscontrollers = require("../controllers/hos-controller");
const hossignupSchema = require("../validators/hos-validator");

const validate = require("../middlewares/validate-middleware");




router.route("/hosregister").post(validate(hossignupSchema), hoscontrollers.hosregister);
router.route("/hossignin").post(hoscontrollers.hossignin);




module.exports = router;