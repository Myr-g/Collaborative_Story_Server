const fs = require("fs");
const path = require("path");

const genre_list = [];
const delimiter ='|';

try 
{
    const filePath = path.join(__dirname, "genres.txt");
    const data = fs.readFileSync(filePath, "utf8");

    const lines = data.split(/\r?\n/);

    for (let line of lines) 
    {
        if (!line.trim())
        {
            continue;
        }

        let [name, ...prompt_array] = line.split(delimiter);

        name = name.trim()

        if (!name) 
        {
            throw new Error(`Malformed line: "${line}"`);
        }

        let prompt = prompt_array.join(delimiter).trim();

        if (!prompt) 
        {
            prompt = `You may begin writing a "${name}" story.`;
        }

        genre_list.push({
            name: name,
            prompt: prompt
        });
    }

    if(genre_list.length === 0)
    {
        throw new Error("genres.txt contains no valid genres.")
    }
} 

catch (err) 
{
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
}

function getGenres() 
{
    return genre_list.slice();
}

module.exports = { getGenres };