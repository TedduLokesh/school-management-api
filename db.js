const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rajam@1234",
    database: "schooldb",
});

//-----------------connect to MySQL----------------------
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }

    console.log("MySQL Connected Sucessfully");
});

module.exports = db;
