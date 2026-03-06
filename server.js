require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

/* --------------------------Add SCHOOL API -------------------------------*/

app.post("/addSchool", (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: "All fields required" });
    }

    //------------------------simple validation-----------------------------
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({
            message: "Please provide name, address, latitude and longitude",
        });
    }
    const sql =
        "INSERT INTO schools(name,address,latitude,longitude) VALUES(?,?,?,?)";

    db.query(sql, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.log("Error inserting school:", err);
            return res.status(500).json({
                message: "Database error while adding school",
            });
        }

        res.json({
            message: "School added successfully",
            id: result.insertId,
        });
    });
});

/* -------------------------- LIST SCHOOLS API -----------------------*/

app.get("/listSchools", (req, res) => {
    //-----------------user location (default = Hyderabad)-----------------
    const latitude = req.query.latitude || 17.385;
    const longitude = req.query.longitude || 78.4867;

    const sql = "SELECT * FROM schools";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching schools:", err);
            return res.status(500).json({
                message: "Database error while fetching schools",
            });
        }

        //--------------calculate distance from user location----------------------
        const schools = results.map((school) => {
            const distance = Math.sqrt(
                Math.pow(latitude - school.latitude, 2) +
                Math.pow(longitude - school.longitude, 2),
            );

            return {
                ...school,
                distance,
            };
        });

        //sort by nearest school
        schools.sort((a, b) => a.distance - b.distance);

        res.json(schools);
    });
});

/* ----------------------Server------------------------*/

const PORT = 3000;
app.listen(3000, () => {
    console.log(`Server running on port${PORT}`);
});
