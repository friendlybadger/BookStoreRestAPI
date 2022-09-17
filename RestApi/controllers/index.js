const AppError = require("../utils/appError");
const conn = require("../services/db");




exports.getAllUsers = (req, res, next) => {
    conn.query("SELECT * FROM users", function (err, data, fields) {
      if(err) return next(new AppError(err))
      
      res.status(200).json(data);
    });
   };

exports.createUser = async(req, res, next) => {
    
    console.log("create User")
    try{
        console.log(req.body)
    
    const values = [req.body.firstname,req.body.lastname, req.body.age ];
    
    conn.query(
      "INSERT INTO users (firstname, lastname,age) VALUES(?)",
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "successfully added into the database  !",
        });
        
      }
    );
} catch(err) {
    if(!err.statusCode){
        err.statusCode= 500;
    }
    next(err);
}
   };
exports.getUser = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the databse with that id found", 404));
    }
    conn.query(
      "SELECT * FROM users WHERE id = ?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        // res.status(200).json({
        //   status: "success",
        //   length: data?.length,
        //   data: data,
        // });
        res.status(200).json(data);
      }
    );
   };
exports.updateUser = (req, res, next) => {
    console.log(req.body)
    if (!req.params.id) {
      return next(new AppError("No item in the databse with that id found", 404));
    }
    let { firstname, lastname, age}= req.body;
    // let { firstnamedatabse, lastnamedatabse, agedatabse}= req.body;
    // console.log("firstname, lastname, age")
    // console.log(firstname, lastname, age)
    // console.log("slect statment")
    
    // conn.query(
    //   // "UPDATE users SET "+changesColoums+"  WHERE id=?" ,[ firstname,lastname,age,req.params.id],
    //   "SELECT * FROM users WHERE id = ?",[req.params.id],
    //   function (err, data, fields) {
    //     if (err) return next(new AppError(err, 500));
    //     // console.log("data")
    //     // console.log(data)
    //     // console.log(data[0].id)
    //     firstnamedatabse =data[0].firstname
    //     lastnamedatabse= data[0].lastname
    //     agedatabse= data[0].age
    //     console.log("database files")
    //     console.log(firstnamedatabse, lastnamedatabse, agedatabse)
    //     if (firstname== undefined){firstname=firstnamedatabse;}
    //     if (lastname== undefined){lastname=lastnamedatabse;}
    //     if (age== undefined){age=agedatabse;} 
    //   }
    // );
    
    // addd time out to fix update only one updating 1 field
    console.log("update")
    console.log(firstname, lastname, age)
    conn.query(
      // "UPDATE users SET "+changesColoums+"  WHERE id=?" ,[ firstname,lastname,age,req.params.id],
      "UPDATE users SET firstname=?,lastname=?,age=?  WHERE id=?" ,[ firstname,lastname,age,req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "successfully updated!",
        });
      }
    );
  
  
   };

  


exports.deleteUser = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the databse with that id found", 404));
    }
    conn.query(
      "DELETE FROM users WHERE id=?",
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

