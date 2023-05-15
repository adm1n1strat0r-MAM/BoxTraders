const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");
const PORT = config.PORT;
require("./config/db");

const userRouting = require("./routers/userRouter");
const customerRouting = require("./routers/customer");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use([userRouting, customerRouting]);

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
