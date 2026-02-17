const homepage_view = document.getElementById("homepage_view");
const session_view = document.getElementById("session_view");
const story_title = document.getElementById("story_title");
const story_text = document.getElementById("story_editor");

const session_id = localStorage.getItem("sessionId");
const user_id = localStorage.getItem("userId");

// Populate genre dropdown on homepage
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

// Session creation
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
    console.error("Missing username, session name, or genre.");
    return;
  }

  try 
  {
    const createRes = await fetch("/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, genre })
    });

    if(createRes.status === 400)
    {
      console.error("Invalid session creation request:", createRes.status);
      return;
    }

    if(createRes.status === 409)
    {
      console.error("Session name already exists:", createRes.status);
      return;
    }

    if(!createRes.ok) 
    {
      console.error("Unexpected error:", createRes.status);
      return;
    }

    const createData = await createRes.json();
    console.log("Session created:", createData);

    const sessionId = createData.id;

    const joinRes = await fetch(`/sessions/${sessionId}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username})
    });

    if(joinRes.status === 400)
    {
      console.error("Missing username:", joinRes.status);
      return;
    }

    if(joinRes.status === 404)
    {
      console.error("Session join failed:", joinRes.status);
      return;
    }

    if(!joinRes.ok)
    {
      console.error("Unexpected error:", joinRes.status);
      return;
    }

    const joinData = await joinRes.json();

    localStorage.setItem("sessionId", joinData.sessionId);
    localStorage.setItem("userId", joinData.userId);
    localStorage.setItem("username", joinData.username);

    console.log("Joined session:", joinData);
    showSession(createData.name);
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

function showSession(sessionName) 
{
  homepage_view.hidden = true;
  session_view.hidden = false;
  story_title.textContent = sessionName;
}

function showSaveStatus(message, success = true, silent = false)
{
  if(silent)
  {
    return;
  }

  save_status.textContent = message;
  save_status.classList.add("visible");

  if(!success)
  {
    save_status.style.color = "red";
  }

  setTimeout(() => {
    save_status.classList.remove("visible");
  }, 1500);
}

// Checks if user exists & was in a session on page reload
async function checkStorageOnLoad()
{
  const sessionId = localStorage.getItem("sessionId");
  const userId = localStorage.getItem("userId");

  if(!sessionId || !userId)
  {
    showHome();
    return;
  }

  try
  {
    const res = await fetch(`/sessions/${sessionId}?userId=${userId}`);
    
    if(!res.ok)
    {
      localStorage.removeItem("sessionId");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      showHome();
      return;
    }

    const data = await res.json();

    showSession(data.name);
    story_text.value = data.story;
  }

  catch(err) 
  { 
    console.error("Network error:", err); 
    showHome(); 
  }
}

window.addEventListener("DOMContentLoaded", checkStorageOnLoad);
