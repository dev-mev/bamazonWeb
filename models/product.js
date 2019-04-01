// Import MySQL connection.
const connection = require("../config/connection");

function printQuestionMarks(num) {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  const arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (const key in ob) {
    let value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

const product = {
  selectAll: (cb) => {
    const queryString = `
    SELECT * FROM products
    LEFT JOIN departments
    ON products.department_id = departments.department_id
    `;
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: (cols, vals, cb) => {
    const queryString = `
      INSERT INTO products (${cols.toString()}) 
      VALUES (${printQuestionMarks(vals.length)})`;

    console.log(queryString);
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updateOne: (objColVals, condition, cb) => {
    const queryString = `
      UPDATE products
      SET ${objToSql(objColVals)}
      WHERE ${condition}`;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  getInvoice: (itemId, quantity) => {
    // TODO:
    // const quantityAfterPurchase = chosenItem.stock_quantity - parseInt(quantityRequested);
    // const totalProductSales = (chosenItem.price * parseInt(quantityRequested)) + chosenItem.product_sales;

    // if (chosenItem.stock_quantity >= quantityRequested) {
    //   console.log("We will ship your item '"
    //     + chosenItem.product_name + "' (quantity: "
    //     + quantityRequested + ") within three business days.");

    //   console.log("Your total is $" + chosenItem.price * parseInt(quantityRequested));
    // } else {
    //   console.log("Sorry, we only have " + chosenItem.stock_quantity + " available.");
    // }
  }
};

// Export the database functions for the controller (bamazon_controller.js).
module.exports = product;
