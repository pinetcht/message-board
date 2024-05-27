
require("dotenv").config();

const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc } = require("firebase/firestore");

const cors = require("cors");
app.use(cors());

