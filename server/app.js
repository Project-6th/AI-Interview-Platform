const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");
var cors = require("cors");
const cookieParser = require('cookie-parser')

const companyRoutes = require('./routes/companyRoutes')
const questionRoutes = require('./routes/questionRoutes')
const jobRoutes = require('./routes/jobRoutes')
const applicantRoutes = require('./routes/applicantRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express();
app.use(cookieParser())
dotenv.config({ path: "./config/config.env" });
connectDB();



app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.set("views", path.join(__dirname, "../views"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use('/company',companyRoutes)
app.use('/question',questionRoutes)
app.use('/jobs',jobRoutes)
app.use('/applicant',applicantRoutes)
app.use('/admin',adminRoutes)


var PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});