const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: public
 * Parameters: none
 */

router.get("/",(req,res) => {
    res.status(200).json({success: true,data: books});
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by id
 * Access: public
 * Parameters: id
 */

router.get("/:id",(req,res) => {
    const {id} = req.params;

    const book = books.find((each) => each.id === id);
    if(!book)
        return res.status(404).json({success: false,message: "Route not found"});
    return res.status(200).json({success:true, data: book});
});

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all the books which are issued
 * Access: public
 * Parameters: none
 */

router.get("/issued/by-user",(req,res) => {
    const issuedBooks = users.filter((each) => {
        if(each.issuedBook)
            return books.find((book) => book.id === each.issuedBook);
    });
    
    if(issuedBooks.length === 0)
        return res.status(404).json({success: false, message: "No book has been issued"});
    return res.status(200).json({success: true, data: issuedBooks});
});

/**
 * Route: /books
 * Method: POST
 * Description: Add new book
 * Access: public
 * Parameters: none
 */

router.post("/",(req,res) => {
    const {data} = req.body;
    if(!data)
        return res.status(404).json({success: false, message: "No data was provided"});
    
    const book = books.find((each) => each.id === data.id);
    if(book)
        return res.status(404).json({success: false, message: "Book already exist with same ID"});

    const allBooks = [...books,data];
    return res.status(200).json({success: true, message:"New book added successfully", data: allBooks});
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book by id
 * Access: public
 * Parameters: id
 */

router.put("/:id", (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each) => each.id === id);
    if(!book)
        return res.status(404).json({success: false, message: "Book not found"});
    
    const UpdatedData = books.map((each) => {
        if(each.id == id)
            return {...each, ...data};
        return each;
    });
    return res.status(200).json({success: true, data: UpdatedData});
});



module.exports = router;