const router = require("express").Router();
const { useFunc } = require("ajv/dist/compile/util");
// Import neccesary middlewares:
const { createNewProduct } = require("../../middlewares/products-midwares");
// Create new product:
router.post("/", createNewProduct, (req, res) => {
  if (req.productCreation["Status"] === 201) {
    res.status(201).json(req.productCreation)
  };
});
// Exports:
module.exports = router;