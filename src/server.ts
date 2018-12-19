import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
