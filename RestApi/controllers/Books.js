const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllBooks = (req, res, next) => {
    conn.query("SELECT * FROM Books", function (err, data, fields) {
      if(err) return next(new AppError(err))
      
      res.status(200).json(data);
    });
   };

exports.createBooks = async(req, res, next) => {
    
    console.log("create Books")
    try{
    console.log(req.body)
    
    const values = [req.body.Title, req.body.ISBN, req.body.Genre, req.body.Price, req.body.PublicationYear, req.body.PublisherID, req.body.AuthorsID ];
    conn.query(
      "INSERT INTO Books (Title, ISBN, Genre, Price, PublicationYear, PublisherID, AuthorsID ) VALUES(?)",
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "successfully added into the database!",
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
exports.getBooks = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the databse with that id found", 404));
    }
    conn.query(
      "SELECT * FROM Books WHERE BooksID = ?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        
        res.status(200).json(data);
      }
    );
   };
exports.updateBooks = (req, res, next) => {
    console.log("update Books")
    console.log(req.body)
    if (!req.params.id) {
      return next(new AppError("No item in the databse with that BooksID found", 404));
    }
    let { Title , ISBN , Genre  ,Price ,PublicationYear ,PublisherID , AuthorsID}= req.body;
   
    // console.log("update")
   conn.query(
      "UPDATE Books SET Title=? , ISBN=? , Genre=?  ,Price=? ,PublicationYear=? ,PublisherID=? , AuthorsID=?  WHERE BooksID=?" ,[ Title , ISBN , Genre  ,Price ,PublicationYear ,PublisherID , AuthorsID,req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "successfully updated!",
        });
      }
    );
  };

exports.deleteBooks = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No item in the databse with that BooksID found", 404));
    }
    conn.query(
      "DELETE FROM Books WHERE BooksID=?",
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

