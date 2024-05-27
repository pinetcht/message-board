import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("enter username");
  const [message, setMessage] = useState("type your message");
  const [allPosts, setAllPosts] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/post");
    console.log("response", response.data);
    setAllPosts(response.data);
  };

  useEffect(() => {
    fetchData();
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
        <label id="form">
          Message: &nbsp;
        </label>
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ height: "100px" }}
        ></textarea>
        <br></br>
        <button type="submit">submit</button>
      </form>

      
    </>
  );
}

export default App;
