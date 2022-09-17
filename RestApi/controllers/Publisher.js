const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllPublisher = (req, res, next) => {
    conn.query("SELECT * FROM Publisher", function (err, data, fields) {
      if(err) return next(new AppError(err))
      
      res.status(200).json(data);
    });
   };

exports.createPublisher = async(req, res, next) => {
    try{
    console.log("create Publisher")
    console.log(req.body)
    const values = [req.body.Name,req.body.Country, req.body.Address];
    conn.query(
      "INSERT INTO Publisher (Name,Country, Address ) VALUES(?)",
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "successfully added into the database!",
        });
      }
    );
    } 
    catch(err) {
    if(!err.statusCode){
        err.statusCode= 500;
    }
    next(err);
    }
   };
exports.getPublisher = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the database with that id found", 404));
    }
    conn.query(
      "SELECT * FROM Publisher WHERE PublisherID = ?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        
        res.status(200).json(data);
      }
    );
   };
exports.updatePublisher = (req, res, next) => {
    console.log("update Publisher")
    console.log(req.body)
    if (!req.params.id) {
      return next(new AppError("No item in the database with that PublisherID found", 404));
    }
    let { Name,Country, Address}= req.body;
   
    conn.query(
      "UPDATE Publisher SET Name=? ,Country=? , Address=?  WHERE PublisherID=?" ,[ Name,Country, Address, req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "successfully updated!",
        });
      }
    );
  };

exports.deletePublisher = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the database with that PublisherID found", 404));
    }
    conn.query(
      "DELETE FROM Publisher WHERE PublisherID=?",
      [req.params.id],
      function (err, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: " delete successfully!",
        });
      }
    );
   };

