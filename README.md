# book-record-management

this is an application called book record management/API

## Endpoints

## /users
POST: Create an ne user
GET: Get all user's details

## /USERS/{id}
GET: get the user details by id
PUT: update the user details
DELETE: Delete user by their id (check if the user still has an issued book &&Bis there any fine to be collected from the user)

## /users/subscription-details/{id}
GET: get user subscription details
1. Dta of subscription
2. Valid till ??
3. Find if any ??

## /books
GET: get all books
POST: Add a new book

## /boooks/{id}
GET: get a book by id
PUT: Update a book by id
DELETE: delete the book

## /books/issued
GET: Get all issued books here

## books/issued/withFine
GET: Get all issued books with fine

## subscription types
Basic (3 month)
Standard (6 months)
Premium (12 months)

if user misses to return book in time he must pay fine of Rs. 50/-

if user misses to return book in time and the user's subscription also expires he/she must pay fine of Rs. 150/-
d