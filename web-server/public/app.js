fetch('/genres')
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById("genre_select");
    select.length = 1;

    data.genres.forEach(genre => {
      const option = document.createElement("option");
      option.value = genre.name;
      option.textContent = genre.name;
      select.appendChild(option);
    });
  });

const session_name = document.getElementById("session_name");
const selected_genre = document.getElementById("genre_select");
const create_button = document.getElementById("create_session");

create_button.addEventListener("click", async () => {
  const name = session_name.value.trim();
  const genre = selected_genre.value;

  if (!name || !genre) 
    {
    console.log("Missing session name or genre");
    return;
  }

  try 
  {
    const res = await fetch("/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, genre })
    });

    if(!res.ok) 
      {
      console.error("Failed to create session:", res.status);
      return;
    }

    const data = await res.json();
    console.log("Session created:", data);
  } 
  
  catch (err) 
  {
    console.error("Network error:", err);
  }
});
