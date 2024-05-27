import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [username, setUsername] = useState("enter username");
  const [message, setMessage] = useState("type your message");
  const [editedMessage, setEditedMessage] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [editPopup, setEditPopup] = useState(false);
  const [editPostIndex, setEditPostIndex] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/post");
    console.log("response", response.data);
    setAllPosts(response.data);
  };

  useEffect(() => {
    fetchData();
    console.log("all posts", allPosts);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: username,
      message: message,
    };

    const response = await axios.post("http://localhost:5000/post", body);
    console.log(response);

    fetchData();

    setUsername("");
    setMessage("");
  };

  const handleEdit = async (e, id, newMessage) => {

    try{

      console.log(
        "new message", newMessage
      )
      e.preventDefault();
      console.log("handle edit", id)
  
      const response = await axios.put(`http://localhost:5000/post/${id}`, {
        message: newMessage,
      });
      console.log(response);
      
    fetchData();
    setEditPopup(false);
    } catch(e) {
      console.error("update error", e)
    }
    
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();

    const response = await axios.delete(`http://localhost:5000/post/${id}`);
    console.log(response);

    fetchData();
  };

  return (
    <>
      <h1> Message Board App</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:&nbsp;</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="form"
        ></input>
        <br></br>
        <br></br>
        <label id="form">Message: &nbsp;</label>
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ height: "100px" }}
        ></textarea>
        <br></br>
        <button type="submit">submit</button>
      </form>

      {allPosts &&
        allPosts.map((post, index) => (
          <div key={index} className="postBox">
            <div>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setEditPopup(!editPopup);
                  console.log(editPopup);
                  setEditPostIndex(post.id);
                  console.log(post.id);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={(e) => handleDelete(e, post.id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>

            {editPopup && editPostIndex === post.id ? (
              <>
                <div>
                  <h2>Edit message</h2>
                  <form onSubmit={(e) => {handleEdit(e, editPostIndex, editedMessage)}}>
                    <h4>User: {post.username}</h4>
                    <label id="form">Message: &nbsp;</label>
                    <textarea
                      type="text"
                      defaultValue={post.message}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      style={{ height: "100px" }}
                    ></textarea>
                    <br></br>
                    <button type="submit">submit edited message</button>
                  </form>
                </div>
              </>
            ) : (
              <div>
                <h4>User: {post.username}</h4>
                <p>Message: {post.message}</p>
              </div>
            )}
          </div>
        ))}
    </>
  );
}

export default App;
