const express = require("express");
// const {users} = require("./data/users.json");

//import routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).json({
        message: "Server is up and running successfully"
    });
});

// http://localhost:8081/users/users
app.use("/users", usersRouter);
app.use("/books", booksRouter);


app.get("*",(req,res) => {
    res.status(504).json({
        message: "This route doesn't exist"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});
