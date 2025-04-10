const express  = require("express");
const cors = require("cors");
const {data} = require("./db")

const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req, res)=>res.json(data));

app.listen(3000,()=>
    console.log("Sevidor corriendo en http://localhost:3000"))

