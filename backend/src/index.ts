import express from "express";
import {Db, MongoClient} from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8080; // Default port to listen on.
let db: Db;

// Middleware.
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(bodyParser.urlencoded({extended: false}));

// ====================================================================
// Routes
// ====================================================================

// TODO: Implement a route handler that returns a list of all posts, ordered by date created.
app.get("/posts", async (req, res) => {
    res.send("TODO: GET /posts");
});

// TODO: Implement a route handler that creates a new post.
app.post("/posts", async (req, res) => {
    // res.send("TODO: POST /posts");
    const postBodyData = req.body;
    const collection = db.collection("posts");
    const newPost = {title: postBodyData.title, body: postBodyData.body, createdAt: new Date()};
    try {
        await collection.insertOne(newPost);
        return res.json(newPost);
    } catch (e) {
        return res.status(500).send();
    }
});

app.post("/posts", async (req, res) => {
    // res.send("TODO: POST /posts");
    const postBodyData = req.body;
    const collection = db.collection("posts");
    const newPost = {title: postBodyData.title, body: postBodyData.body, createdAt: new Date()};
    try {
        await collection.insertOne(newPost);
        return res.json(newPost);
    } catch (e) {
        return res.status(500).send();
    }
});

// TODO: Implement a route handler that gets a post associated with a given postID.
app.get("/posts/:postID", async (req, res) => {
    // res.send("TODO: GET /posts/{postID}");
    const postID = req.params.postID;
    const collection = db.collection("posts");
    try {
        const result = await collection.findOne({"_id": new ObjectId(postID)});
        return res.json(result);
    } catch (e) {
        return res.status(404).send(`no course found with id ${postID}`);
    }
});

// TODO: Implement a route handler that updates the post associated with a given postID.
app.patch("/posts/:postID", async (req, res) => {
    // res.send("TODO: PATCH /posts/{postID}");
    const postID = req.params.postID;
    const data = req.body;
    const collection = db.collection("posts");
    try {
        const result = await collection.updateOne({"_id": new ObjectId(postID)}, {$set: data});
        return res.json(result);
    } catch (e) {
        return res.status(404).send(`no course found with id ${postID}`);
    }
});

// TODO: Implement a route handler that deletes the post associated with a given postID.
app.delete("/posts/:postID", async (req, res) => {
    // res.send("TODO: DELETE /posts/{postID}");
    const postID = req.params.postID;
    const collection = db.collection("posts");
    try {
        const result = await collection.deleteOne({"_id": new ObjectId(postID)});
        return res.json(result);
    } catch (e) {
        return res.status(404).send(`no post found with id ${postID}`);
    }
});

// TODO: Implement a route handler that gets all the comments associated with a given postID.
app.get("/posts/:postID/comments", async (req, res) => {
    // res.send("TODO: GET /posts/{postID}/comments");
    const postID = req.params.postID;
    const collection = db.collection("comments");
    try {
        const result = await collection.find({"post": new ObjectId(postID)}).toArray();
        return res.json(result);
    } catch (e) {
        return res.status(404).send(`no comments for the post found with id ${postID}`);
    }
});

// TODO: Implement a route handler that gets adds a comment to the post with the given postID.
app.post("/posts/:postID/comments", async (req, res) => {
    // res.send("TODO: POST /posts/{postID}/comments");
    const postID = req.params.postID;
    const postBodyData = req.body;
    const collection = db.collection("comments");
    const newComment = {content: postBodyData.content, post: new ObjectId(postID), createdAt: new Date()};
    try {
        await collection.insertOne(newComment);
        return res.json(newComment);
    } catch (e) {
        return res.status(500).send();
    }
});

// TODO: Implement a route handler that gets a comment associated with the given commentID.
app.get("/posts/:postID/comments/:commentID", async (req, res) => {
    // res.send("TODO: GET /posts/{postID}/comments/{commentID}");
    const commentID = req.params.commentID;
    const collection = db.collection("comments");
    try {
        const result = await collection.findOne({"_id": new ObjectId(commentID)});
        return res.json(result);
    } catch (e) {
        return res.status(404).send(`no post found with id ${commentID}`);
    }
});

// TODO: Implement a route handler that updates a comment associated with the given commentID.
app.patch("/posts/:postID/comments/:commentID", async (req, res) => {
    // res.send("TODO: PATCH /posts/{postID}/comments");
    const commentID = req.params.commentID;
    const data = req.body;
    const collection = db.collection("comments");
    try {
        const result = await collection.updateOne({"_id": new ObjectId(commentID)}, {$set: data});
        return res.json(result);
    } catch (e) {
        return res.status(404).send(`no comment found with id ${commentID}`);
    }
});

// TODO: Implement a route handler that deletes a comment associated with the given commentID.
app.delete("/posts/:postID/comments/:commentID", async (req, res) => {
    // res.send("TODO: DELETE /posts/{postID}/comments");
    const commentID = req.params.commentID;
    const collection = db.collection("comments");
    try {
        const result = await collection.deleteOne({"_id": new ObjectId(commentID)});
        return res.json(result);
    } catch (e) {
        return res.status(404).send(`no comment found with id ${commentID}`);
    }
});


// TODO: add more endpoints here!

// Start the Express server.
function start() {
    const url = "mongodb+srv://eawuah:L0LB4wHzlasNfIkC@cluster0.jpqi9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    client.connect()
        .then(() => {
            console.log('Connected successfully to server');
            db = client.db("database");
            app.listen(port, () => {
                console.log(`server started at http://localhost:${port}`);
            });
        })
        .catch((err) => {
            console.log("error connecting to mongoDB!", err);
        });
}

start();


/*get collection (create variable)
in the try catch, do db operations 
crud
*/
