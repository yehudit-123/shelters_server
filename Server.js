const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", require("./routs/UserRouts"));
app.use("/shelters", require("./routs/ShelterRoutes"));
// app.use("/reviews", require("./API/reviewsRoutes"));
// app.use("/likes", require("./API/likesRoutes"));

app.get("/", (req, res) => {
  return res.status(200).json("server is running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});