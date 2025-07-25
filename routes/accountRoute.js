const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get(
  "/registration",
  utilities.handleErrors(accountController.buildRegister)
);

// Process the login attempt
router.post(
  "/login",
  // (req, res) => {
  //   res.status(200).send('login process')
  // }
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.loginAccount)
);

// Process the registration data
router.post(
  "/registration",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;
