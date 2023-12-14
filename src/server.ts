import bodyParser from "body-parser";
import express from "express";
import {Request, Response, NextFunction} from "express";

import connectDB from "../config/database";
import song from "./routes/api/song";
import stats from "./routes/api/stats";


const app = express();

// Connect to MongoDB
connectDB();


// allow CORS on localhost
// var allowedOrigins = ['http://localhost:5173', 'http://localhost'];

var cors = require('cors');

var corsOptionsDelegate = function (_: any, callback: any) {
  callback(null, {origin: true}) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});



//check if api-key is valid
const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  if(req.header('X-ZEFUN-API-KEY') !== 'qwertasdf') return res.status(403).send("Invalid api key");

  next();
}

app.use(checkApiKey);
app.use("/api/song", song);
app.use("/api/stats", stats);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
