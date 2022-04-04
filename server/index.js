const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require("mysql2");
const cors = require("cors");
const { encrypt, decrypt } = require("./EncryptionHandler");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pranavtri@00",
  database: "passwordmanager",
});

app.post("/addPassword", (req, res) => {
  const { title, password } = req.body;
  const hashedPassword = encrypt(password);
  db.query(
    "INSERT INTO passwords (title, password,iv) VALUES (?, ?,?)",
    [title, hashedPassword.encryptedPassword, hashedPassword.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/show", (res, req) => {
  db.query("SELECT * FROM passwords", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptPassword", (req, res) => {
  res.send(decrypt(req.body));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
