const express = require("express");
const { getGenres } = require("./genres");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Collaborative Story Server API is running");
});

app.get('/genres', (req, res) => {
    const genre_list = getGenres();
    res.json({genres: genre_list});
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});