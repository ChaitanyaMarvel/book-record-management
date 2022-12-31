const express = require("express");
// const {append} = require("express/lib/response");
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: public
 * Parameters: none
 */

router.get("/",(req,res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});

/**
 * Route:  /:id
 * Method: GET
 * Description: Get single user by id
 * Access: public
 * Parameters: id
 */

router.get("/:id", (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: public
 * Parameters: none
 */

router.post("/", (req,res) => {
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
    const user = users.find((each) => each.id === id);
    if(user){
        return res.status(404).json({
            success: false,
            message: "User already exist",
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });
    return res.status(200).json({
        success: true,
        message: "New user added successfully",
        data: users,
    });
});

/**
 * Route:  /{id}
 * Method: PUT
 * Description: update the user by id
 * Access: public
 * Parameters: id
 */

router.put("/:id", (req,res) => {
    const {id} = req.params;
    const {data} = req.body;
    const user = users.find((each) => each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    const updatedUser = users.map((each) => {
        if(each.id === id){
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: updatedUser
    });

});

/**
 * Route:  /{id}
 * Method: DELETE
 * Description: delete the user by id
 * Access: public
 * Parameters: id
 */

router.delete("/:id", (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    const index = users.indexOf(user);
    users.splice(index,1);
    return res.status(200).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: subscription-details
 * Access: public
 * Parameters: id
 */

router.get("/subscription-details/:id", (req,res) => {
    const {id} = req.params;

    const user = users.find((each) => each.id === id);
    if(!user)
        return res.status(404).json({success: false, message: "User not found"});

    const getDateInDays = (data = "") => {
        let date;
        if(data === "")
            date = new Date();
        else
            date = new Date(data);
        let days = Math.floor(date / (1000*60*60*24));
        return days;
    };

    const subscriptionType = (date) => {
        if(user.subscriptionType == "Basic")
            date = date + 90;
        else if(user.subscriptionType == "standard")
            date = date + 180;
        else if(user.subscriptionType == "premium")
            date = date + 365;
        return date;
    };

    // subscription calc here
    //Jan 1, 1970
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate)

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysleftForExpiration: 
            subscriptionExpiration <= currentDate
                ? 0
                : subscriptionExpiration - currentDate,
        fine:
            returnDate < currentDate
                ? subscriptionExpiration <= currentDate
                    ? 200
                    : 100
                :0,
    };
    return res.status(200).json({success: true, data: data});
});

//default export
module.exports = router;