const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const PORT = config.PORT;
require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
