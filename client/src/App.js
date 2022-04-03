import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");

  const addPassword = () => {
    axios.post("http://localhost:3001/", {
      title: title,
      password: password,
    });
  };
  const showPasswords=()=>{
    
  }
  return (
    <div className="app">
      <div className="addingPassword">
        <h2>Add Password</h2>
        <input
          type="text"
          placeholder="Website"
          className="addingInput"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          className="addingInput"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button className="addingInput" onClick={addPassword}>
          Add
        </button>
        <button className="readPasswords" onClick={showPasswords}>Show All Passwords</button>
      </div>
    </div>
  );
}

export default App;
