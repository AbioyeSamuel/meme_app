import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

import path from 'path';

const app = express();

dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended : true}));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get('/', (req, res) => {
    res.send('APP IS RUNNING');
});

// https://www.mongodb.com/cloud/atlas to host database on cloud

// Production script
app.use(express.static('./client/build'));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT =  process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

// How I love to set my app PORT listening
// app.listen(PORT, function(req, res){
//     console.log("Server is running on PORT 5000");
// })

