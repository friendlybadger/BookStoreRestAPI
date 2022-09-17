const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllAuthors = (req, res, next) => {
    conn.query("SELECT * FROM Authors", function (err, data, fields) {
      if(err) return next(new AppError(err))
      
      res.status(200).json(data);
    });
   };

exports.createAuthors = async(req, res, next) => {
    try{
    console.log("create Authors")
    console.log(req.body)
    const values = [req.body.FirstName, req.body.LastName ];
    conn.query(
      "INSERT INTO Authors (FirstName,LastName ) VALUES(?)",
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
exports.getAuthors = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the database with that id found", 404));
    }
    conn.query(
      "SELECT * FROM Authors WHERE AuthorsID = ?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        
        res.status(200).json(data);
      }
    );
   };
exports.updateAuthors = (req, res, next) => {
    console.log("update Authors")
    console.log(req.body)
    if (!req.params.id) {
      return next(new AppError("No item in the database with that AuthorsID found", 404));
    }
    let { FirstName,LastName}= req.body;
   
    conn.query(
      "UPDATE Authors SET FirstName=?,LastName=?  WHERE AuthorsID=?" ,[ FirstName,LastName, req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "successfully updated!",
        });
      }
    );
  };

exports.deleteAuthors = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the database with that AuthorsID found", 404));
    }
    conn.query(
      "DELETE FROM Authors WHERE AuthorsID=?",
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

