const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const http = require('http');
const server = http.createServer(app);

//Start the server Microsoft Azure
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req,res)=> {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Server Status</title>
            <style>
                body { background: #0a0a0a; color: #2ecc71; display: flex; 
                       justify-content: center; align-items: center; height: 100vh; margin: 0; 
                       font-family: sans-serif; }
                .card { border: 1px solid #2ecc71; padding: 2rem; border-radius: 15px; text-align: center; 
                        box-shadow: 0 0 20px rgba(46, 204, 113, 0.2); }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>● Server is Running</h1>
                <p>Express Backend Active on Port ${PORT}</p>
            </div>
        </body>
        </html>
    `);
});

//Connection to MongoDB
mongoose 
    .connect("mongodb+srv://brcl:kokeyko2004@expressnodedb.tqlsoul.mongodb.net/", {
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); //Exit if database connection fails
    });

//Middleware
app.use(cors());
app.use(express.json());

//Import API folder
const submitTalentForm = require('./API/submit')

//Use API
app.use("/submit", submitTalentForm);

