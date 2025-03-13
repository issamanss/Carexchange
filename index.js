const express = require('express');
const { body,validationResult } = require('express-validator');
const app = express();
const cors=require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require("dotenv").config();
connectDB();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"views")))
//app.use(express.static(path.join(__dirname,"public")))
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const adminRouter = require('./routes/adminRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const otpRouter = require('./routes/otpRouter');

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/otp', otpRouter);

app.listen(process.env.port);