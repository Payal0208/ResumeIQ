require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


app.listen(process.env.PORT, () => {
  console.log("🚀 Server running on port", process.env.PORT);
});