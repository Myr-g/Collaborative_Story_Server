const express = require("express");
const { getGenres } = require("./genres");
const { createSession, getSessions } = require("./sessions");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Collaborative Story Server API is running");
});

app.get('/genres', (req, res) => {
    const genre_list = getGenres();
    res.status(200).json({genres: genre_list});
})

app.get('/sessions', (req, res) => {
    const sessions_list = getSessions();

    for(let i = 0; i < sessions_list.length; i++)
    {
        sessions_list[i] = {
            id: sessions_list[i].id,
            name: sessions_list[i].name,
            genre: sessions_list[i].genre,
            users: sessions_list[i].users.size,
            createdAt: sessions_list[i].createdAt
        }
    }

    res.status(200).json({sessions: sessions_list});
});

app.post('/sessions', (req, res) => {
    const {name, genre} = req.body;
    const genre_list = getGenres();
    let chosen_genre = null;

    if(!name)
    {
        res.sendStatus(400);
        return;
    }

    if(!genre)
    {
        res.sendStatus(400);
        return;
    }

    for(let i = 0; i < genre_list.length; i++)
    {
        if(genre.toLowerCase() == genre_list[i].name.toLowerCase())
        {
            chosen_genre = genre_list[i].name;
            break;
        }
    }

    if(chosen_genre === null)
    {
        res.sendStatus(400);
        return;
    }

    const session = createSession(name, chosen_genre);

    if(!session)
    {
        // Duplicate Session Name
        res.sendStatus(409);
        return;
    }

    res.status(201).json({
        id: session.id,
        name: session.name,
        genre: session.genre,
        createdAt: session.createdAt
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});