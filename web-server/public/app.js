fetch('/genres')
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById("genre_select");

    data.genres.forEach(genre => {
      const option = document.createElement("option");
      option.value = genre.name;
      option.textContent = genre.name;
      select.appendChild(option);
    });
  })
