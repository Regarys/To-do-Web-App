const express = require("express");
const { Client } = require("pg");

const app = express();
const client = new Client({
    host : "localhost",
    port : 5432,
    user : "postgres",
    database : "to_do"
});

// Routing
app.use(express.static("public"));
// Express Json? To recheive json i think
app.use(express.json());

// Starting Server 
(async () =>{
    try {
        await client.connect();
        console.log("Connected to postgresql");
    }catch(err){
        console.error("Failed to connect :", err.message);
        process.exit(1);        
    }
})();

// Link 
app.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});

// Api To Showing Data
app.get("/api/showData", async (req,res) =>{
   try {
       const result = await client.query("SELECT * FROM to_do_data");

       console.log("Data found : ", result.rows);
       res.json(result.rows);
   }catch(err){
       console.error(err);
   }
});

// Api to Show Data by Date
app.get("/api/todos/date/:date", async (req, res) => {
    try {
        const { date } = req.params;
        const result = await client.query(
            "SELECT * FROM to_do_data WHERE DATE(created_at) = $1 ORDER BY created_at",
            [date]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Api to Add To-do
app.post("/api/todos", async(req, res) => {
    try{
        const {title} = req.body;

        const result = await client.query("INSERT INTO to_do_data (title) values ($1) RETURNING *", [title]);
        res.status(201).json(result.rows[0]);
    }catch (err){
        console.error(err);
        res.status(500).json({
            error : err.message
        });
    }
});

// Api to update to-do
app.put("/api/todos/:id", async(req,res)=> {
    try {
        const id = req.params.id;
        const { status } = req.body;

        const result = await client.query(
            `UPDATE to_do_data SET status = $1 WHERE id = $2 RETURNING *
            `,[status, id]
        );
        res.json(result.rows[0]);
    } catch (err){
        console.error(err);
        res.status(500).json({
            error: err.message
        })
    }
});

// Api to delete to-do
app.delete("/api/todos/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const result = await client.query(
            "DELETE FROM to_do_data WHERE id = $1 RETURNING *",
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

app.put("/api/todos/update/:id", async(req, res) =>{
    try {
        const { title } = req.body;
        const id = req.params.id;
        const result = await client.query(
            "UPDATE to_do_data SET title = $1 WHERE id = $2",
            [title, id]);
        res.json(result.rows[0]);
    }catch{
        console.error(err);
        res.status(500).json({
            error : err.message
        })
    }
});
