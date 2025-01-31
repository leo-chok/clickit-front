// Init
refreshCounter();

//Functions
function refreshCounter() {
  fetch("https://clickit-back.vercel.app/")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("counter").textContent = data.data[0].count;
    });
}

// Au click du bouton
document.getElementById("button").addEventListener("click", () => {
  fetch("https://clickit-back.vercel.app/add")
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        refreshCounter();
      }
    });
});
