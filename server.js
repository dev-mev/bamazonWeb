const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

// Serve static content for the app from the "views" directory in the application directory.
app.use(express.static("views"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes and give the server access to them.
const routes = require("./controllers/bamazon_controller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
