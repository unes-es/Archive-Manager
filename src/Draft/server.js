const express = require("express");
const app = express();

//app.use(express.static("public/"));

app.get("/", (req, res) => {
  res.send("yaay");
  console.log("Yay");
});

app.listen(3000);
