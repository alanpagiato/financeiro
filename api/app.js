require("dotenv").config();
const port = process.env.PORT;

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Solve CORS
//app.use(cors({ credentials: true, origin: "http://localhost:"+process.env.PORT_FRONT }));
//app.use(cors({ credentials: true, origin: "https://3db2-187-36-114-85.sa.ngrok.io/" }));
app.use(cors({ origin: '*' }));

// routes
const router = require("./routes/Router.js")
app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port} - porta front: ${process.env.PORT_FRONT}`);
});