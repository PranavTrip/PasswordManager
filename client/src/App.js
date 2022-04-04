import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/show").then((res) => {
      setPasswordList(res.data);
    });
  }, []);

  const addPassword = () => {
    axios.post("http://localhost:3001/addPassword", {
      title: title,
      password: password,
    });
  };

  const decryptPassword = (encryptedPassword) => {
    axios
      .post("http://localhost:3001/decryptPassword", {
        encryptedPassword: encryptedPassword.password,
        iv: encryptedPassword.iv,
      })
      .then((res) => {
        setPasswordList(
          passwordList.map((val) => {
            return val.id == encryptedPassword.id
              ? {
                  id: val.id,
                  title: val.title,
                  password: val.password,
                  iv: val.iv,
                }
              : val;
          })
        );
      });
  };

  const showPasswords = () => {};
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
        
      </div>

      <div className="showingPasswords">
        {passwordList.map((val, key) => {
          return (
            <div className="password">
              onClick=
              {() => {
                decryptPassword({
                  password: val.password,
                  iv: val.iv,
                  id: val.id,
                });
              }}
              key={key}
              <h3>{val.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
