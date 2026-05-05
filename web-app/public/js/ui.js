const themeToggle = document.getElementById("theme_toggle");

const themeLabel = document.getElementById("theme_label");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeLabel.textContent = theme === "light" ? "Light" : "Dark";
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme || "light");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
});