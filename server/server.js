const express = require("express");
const cors = require("cors");
const executeRoutes = require("./routes/execute");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/execute", executeRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
