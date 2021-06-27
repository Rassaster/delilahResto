const router = require("express").Router();
const { useFunc } = require("ajv/dist/compile/util");
// Requiring neccesary middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
const { createNewProduct } = require("../../middlewares/products-midwares");
// Requiring JSON schemas:
const { productSchema } = require("../../schema/schemas");
// Create new product:
router.post("/", validateJSONSchema(productSchema), createNewProduct, (req, res) => {
  if (req.productCreation["Status"] === 201) {
    res.status(201).json(req.productCreation)
  };
});
// Exports:
module.exports = router;