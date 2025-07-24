//Neded Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:invId", invController.buildByDetailId);

//intentional error
router.get("/cause-error", (req, res, next)=>{
    const err = new Error('Intentional Server Error for testing');
    err.status = 500;
    next(err);
});

module.exports = router;
