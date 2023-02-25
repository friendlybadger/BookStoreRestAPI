const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use( router);
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Orgin','*');
    res.setHeader('Access-Control-Allow-Orgin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('preflightContinue',' false');
    
    
    next();

});

app.all("*", (req, res, next) => {
 next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
 console.log(`server running on port ${PORT}:http://localhost:${PORT}`);
});

module.exports = app;
