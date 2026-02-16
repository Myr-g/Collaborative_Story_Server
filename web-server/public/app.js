const homepage_view = document.getElementById("homepage_view");
const session_view = document.getElementById("session_view");
const story_title = document.getElementById("story_title");

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

const username_input = document.getElementById("username");
const session_name = document.getElementById("session_name");
const selected_genre = document.getElementById("genre_select");
const create_button = document.getElementById("create_session");

create_button.addEventListener("click", async () => {
  const username = username_input.value.trim();
  const name = session_name.value.trim();
  const genre = selected_genre.value;

  if(!username || !name || !genre) 
  {
    console.log("Missing username, session name, or genre.");
    return;
  }

  try 
  {
    const create_res = await fetch("/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, genre })
    });

    if(create_res.status === 400)
    {
      console.error("Invalid session creation request:", create_res.status);
      return;
    }

    if(create_res.status === 409)
    {
      console.error("Session name already exists:", create_res.status);
      return;
    }

    if(!create_res.ok) 
    {
      console.error("Unexpected error:", create_res.status);
      return;
    }

    const create_data = await create_res.json();
    console.log("Session created:", create_data);

    const session_id = create_data.id;

    const join_res = await fetch(`/sessions/${session_id}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username})
    });

    if(join_res.status === 400)
    {
      console.error("Missing username:", join_res.status);
      return;
    }

    if(join_res.status === 404)
    {
      console.error("Session join failed:", join_res.status);
      return;
    }

    if(!join_res.ok)
    {
      console.error("Unexpected error:", join_res.status);
      return;
    }

    const join_data = await join_res.json();

    localStorage.setItem("sessionId", join_data.sessionId);
    localStorage.setItem("userId", join_data.userId);
    localStorage.setItem("username", join_data.username);

    console.log("Joined session:", join_data);
    showSession(create_data.name);
  } 
  
  catch (err) 
  {
    console.error("Network error:", err);
  }
});

// UI Functions
function showHome() 
{
  homepage_view.hidden = false;
  session_view.hidden = true;
}

function showSession(session_name) 
{
  homepage_view.hidden = true;
  session_view.hidden = false;
  story_title.textContent = session_name;
}
