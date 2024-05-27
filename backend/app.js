
require("dotenv").config();

const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } = require("firebase/firestore");

const cors = require("cors");
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// add post
app.post("/post", async (req, res) => {
    try {
        const username = req.body.username;
        const message = req.body.message;

        const docRef = await addDoc(collection(db, "post"), {
            username: username,
            message: message
        });
        res.status(200).json({message: `Successfully added post to firebase with id: ${docRef.id}`});
    } catch(e) {
        res.status(400).json({error: `Error adding post with ${e.message} error`})
    }

})

// add post
app.get("/post", async (req, res) => {
    try {
        let ret = [];
        const docRef = await getDocs(collection(db, "post"));

        docRef.forEach((doc) => {
            ret.push({
                id: doc.id,
                ...doc.data()
            })
        })

        res.status(200).json(ret);
    } catch(e) {
        res.status(400).json({error: `Error fetching post with ${e.message} error`})
    }

})

// update post
app.put("/post/:id", async (req, res) => {
    try {

        const id = req.params.id;
        const newMessage = req.body.message;
        
        await updateDoc(doc(db, "post", id), {
            message: newMessage,
        });
        
        res.status(200).json({ message: "edit post success" });
    } catch(e) {
        res.status(400).json({error: `Error fetching post with ${e.message} error`})
    }

})


// delete post
app.delete("/post/:id", async (req, res) => {
    try {

        const id = req.params.id;

        await deleteDoc(doc(db, "post", id));
        
        res.status(200).json({ message: "Delete post success" });
    } catch(e) {
        res.status(400).json({error: `Error fetching post with ${e.message} error`})
    }

})
