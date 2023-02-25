const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllOrderItem = (req, res, next) => {
    conn.query("SELECT * FROM OrderItem", function (err, data, fields) {
      if(err) return next(new AppError(err))
      
      res.status(200).json(data);
    });
   };

exports.createOrderItem = async(req, res, next) => {
    try{
    console.log("create OrderItem")
    console.log(req.body)
    const values = [req.body.BooksID ,req.body.OrdersID ,req.body.Price  ];
    conn.query(
      "INSERT INTO OrderItem (BooksID ,OrdersID ,Price ) VALUES(?)",
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
exports.getOrderItem = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the database with that id found", 404));
    }
    conn.query(
      "SELECT * FROM OrderItem WHERE OrderItemID = ?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        
        res.status(200).json(data);
      }
    );
   };
exports.updateOrderItem = (req, res, next) => {
    console.log("update OrderItem")
    console.log(req.body)
    if (!req.params.id) {
      return next(new AppError("No item in the database with that OrderItemID found", 404));
    }
    let { BooksID ,OrdersID ,Price  }= req.body;
   
    conn.query(
      "UPDATE OrderItem SET BooksID=? ,OrdersID=? ,Price=?    WHERE OrderItemID=?" ,[ BooksID ,OrdersID ,Price ,  req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "successfully updated!",
        });
      }
    );
  };

exports.deleteOrderItem = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the database with that OrderItemID found", 404));
    }
    conn.query(
      "DELETE FROM OrderItem WHERE OrderItemID=?",
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

