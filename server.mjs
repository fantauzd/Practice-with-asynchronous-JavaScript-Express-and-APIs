import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import asyncHandler from 'express-async-handler';

const PORT = process.env.PORT
const app = express();

app.use(express.static('public'));

// Note: Don't add or change anything above this line.
/* Add your code here */

// Middleware function to record every 10 random person requests
let counter = 0;
// Each request to /random-person increments the counter
app.use("/random-person", (req, res, next) => {
    counter += 1;
    // when the counter reaches a multiple of 10, it logs the counter
    if (counter % 10 === 0) {
        console.log(`Total requests for random person: ${counter}`);
    }
    next();
});

// Route Handler for Random Person requests
app.get("/random-person", async (req, res) => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    res.status(200).json(data)
});

// Error Handling Middleware for earlier rout handles
app.use((error, req, res, next) => {
    console.log(`Unhandled error ${error}. URL = ${req.originalUrl}, method = ${req.method}`);
    res.send('500 - Server Error');
});

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});