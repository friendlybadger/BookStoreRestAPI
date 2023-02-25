const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllCustomers = (req, res, next) => {
    conn.query("SELECT * FROM Customers", function (err, data, fields) {
      if(err) return next(new AppError(err))
      
      res.status(200).json(data);
    });
   };

exports.createCustomers = async(req, res, next) => {
    try{
    console.log("create Customers")
    console.log(req.body)
    const values = [req.body.FirstName,req.body.LastName,req.body.PhoneNumber, req.body.Address,req.body.Town,req.body.State,req.body.Postcode ];
    conn.query(
      "INSERT INTO Customers (FirstName, LastName, PhoneNumber, Address, Town, State, Postcode) VALUES(?)",
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
exports.getCustomers = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the database with that id found", 404));
    }
    conn.query(
      "SELECT * FROM Customers WHERE CustomersID = ?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        
        res.status(200).json(data);
      }
    );
   };
exports.updateCustomers = (req, res, next) => {
    console.log("update Customers")
    console.log(req.body)
    if (!req.params.id) {
      return next(new AppError("No item in the database with that CustomersID found", 404));
    }
    let { FirstName,LastName,PhoneNumber, Address,Town,State,Postcode }= req.body;
   
    conn.query(
      "UPDATE Customers SET FirstName=?,LastName=?,PhoneNumber=?, Address=?,Town=?,State=?,Postcode=?   WHERE CustomersID=?" ,[ FirstName,LastName,PhoneNumber, Address,Town,State,Postcode,  req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "successfully updated!",
        });
      }
    );
  };

exports.deleteCustomers = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the database with that CustomersID found", 404));
    }
    conn.query(
      "DELETE FROM Customers WHERE CustomersID=?",
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

