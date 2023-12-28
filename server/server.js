const express = require("express");
const routes = require("./Routes/book.route")
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongodb = require('./Config/connection')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req,res)=>{
    res.send('Hello World!')
})
// database connection
mongodb();

//api
app.use("/api/books",routes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
