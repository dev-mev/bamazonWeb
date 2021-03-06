const express = require("express");

const router = express.Router();

const product = require("../models/product.js");

router.get("/api/products", function (req, res) {
  product.selectAll(function (data) {
    res.json(data);
    console.table(data);
  });
});

router.post("/api/products", function (req, res) {
  product.insertOne([
    "product_name", "department_id", "price", "stock_quantity"
  ], [
    req.body.product_name, req.body.department_id, req.body.price, req.body.stock_quantity
  ], function (result) {
    // Send back the ID of the new product
    res.json({ id: result.insertOne });
  });
});

router.put("/api/products/:id", function (req, res) {
  product.updateOne(
    parseInt(req.body.quantityRequested),
    req.params.id, function (result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      console.log(result);
      res.json(result).status(200).end();
    }
  );
});

// Export routes for server.js to use.
module.exports = router;
