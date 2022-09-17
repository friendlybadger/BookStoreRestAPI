const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllOrders = (req, res, next) => {
    conn.query("SELECT * FROM Orders", function (err, data, fields) {
      if(err) return next(new AppError(err))
      
      res.status(200).json(data);
    });
   };

exports.createOrders = async(req, res, next) => {
    try{
    console.log("create Orders")
    console.log(req.body)
    // let { OrderDate , Subtotal ,Shipping  ,Total ,CustomersID }= req.body;
    let values = [req.body.OrderDate , req.body.Subtotal ,req.body.Shipping  ,req.body.Total ,req.body.CustomersID ];
      // OrderDate=OrderDate+1
      // console.log(req.body.OrderDate)
    //  values= ""+OrderDate+","+ Subtotal+","+Shipping+","+Total+","+CustomersID+""
     console.log("values")
     console.log(values)
    conn.query(
      "INSERT INTO Orders (OrderDate , Subtotal ,Shipping  ,Total ,CustomersID) VALUES(?)",
      // [OrderDate, Subtotal, Shipping, Total, CustomersID],
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
exports.getOrders = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the database with that id found", 404));
    }
    conn.query(
      "SELECT * FROM Orders WHERE OrdersID = ?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        
        res.status(200).json(data);
      }
    );
   };
exports.updateOrders = (req, res, next) => {
    console.log("update Orders")
    console.log(req.body)
    if (!req.params.id) {
      return next(new AppError("No item in the database with that OrdersID found", 404));
    }
    let { OrderDate , Subtotal ,Shipping  ,Total ,CustomersID }= req.body;
    OrderDate=OrderDate+1
    console.log(OrderDate)
    conn.query(
      "UPDATE Orders SET OrderDate=?, Subtotal=?, Shipping=?, Total=?, CustomersID=?   WHERE OrdersID=?" ,[ OrderDate , Subtotal ,Shipping  ,Total ,CustomersID,  req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "successfully updated!",
        });
      }
    );
  };

exports.deleteOrders = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the database with that OrdersID found", 404));
    }
    conn.query(
      "DELETE FROM Orders WHERE OrdersID=?",
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

