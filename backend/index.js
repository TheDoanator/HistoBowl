const express = require('express'); // Imports Express

const app = express(); // Creates web server app

app.listen(8000, () => {
  console.log("HistoBowl server is running on port 8000.") // Starts server on port 8000; logs if successful
});