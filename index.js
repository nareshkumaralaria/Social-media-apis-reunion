import "./config/database.js";
import app from "./config/app.js";
import "dotenv/config.js";
import { AuthenticateUser, Users, FollowById, UnfollowById, getUser, addNewPost, deletePostById, likePostById, unlikePostById, addComment, getPostById, getAllPost } from "./controllers/index.js";

const PORT = process.env.PORT || 9002;

app.post("/api/authenticate", Users);

app.post("/api/follow/:id", AuthenticateUser, FollowById)
app.post("/api/unfollow/:id", AuthenticateUser, UnfollowById)
app.get("/api/user", AuthenticateUser, getUser)

app.post("/api/posts", AuthenticateUser, addNewPost)
app.delete("/api/posts/:id", AuthenticateUser, deletePostById)
app.get("/api/posts/:id", AuthenticateUser, getPostById)
app.get("/api/all_posts", AuthenticateUser, getAllPost)

app.post("/api/like/:id", AuthenticateUser, likePostById)
app.post("/api/unlike/:id", AuthenticateUser, unlikePostById)

app.post("/api/comment/:id", AuthenticateUser, addComment)

app.get("/", (req, res) => {
    res.send("Welcome from Vercel");
})

app.listen(PORT, () => {
    console.log("We are running on port 9002");
});