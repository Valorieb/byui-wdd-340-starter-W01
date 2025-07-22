const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build inventory by detail view
 * ************************** */

invCont.buildByDetailId = async function (req, res, next) {
  const invId = req.params.invId;
  const data = await invModel.getInventoryById(invId);

  if (!data) {
    return res.status(404).send("Vehicle not found.");
  }

  const detail = utilities.buildDetailHTML(data);
  let nav = await utilities.getNav();
  const name = `${data.inv_make} ${data.inv_model}`;

  res.render("./inventory/detail", {
    title: name,
    nav,
    detail,
  });
};



module.exports = invCont;
