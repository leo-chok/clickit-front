// Init
let topTen = [];
let sortListUsers = [];
let rank = `#`;
let listUsers = [];

refreshCounter();
refreshTable();
// setInterval(refreshCounter, 5000);
// setInterval(refreshTable, 5000);
//Functions
function refreshCounter() {
  fetch("https://clickit-back.vercel.app/")
    .then((response) => response.json())
    .then((data) => {
      console.log("refreshCounter");
      document.getElementById("counter").textContent = data.data[0].count;
    });
}

function eraseTable() {
  document.getElementById("user").innerHTML = "";
  document.getElementById("usercount").innerHTML = "";
  topTen = [];
}

function refreshTable() {
  fetch("https://clickit-back.vercel.app/users")
    .then((response) => response.json())
    .then((data) => {
      eraseTable();

      let dataUsers = data.listUsers;
      let listUsers = [];
      let numberOfUsers = listUsers.length;

      for (let i = 0; i < dataUsers.length; i++) {
        const user = dataUsers[i];
        listUsers.push(user);
      }

      // Trie de la liste Users par nbre de clics
      sortListUsers = listUsers.sort(({ count: a }, { count: b }) => b - a);

      // Ajout des 10 premiers dans le tableau Top 10
      for (let j = 0; j < 10; j++) {
        topTen.push(sortListUsers[j]);
      }

      // Création du tableau Top 10
      for (let x = 0; x < topTen.length; x++) {
        const user = topTen[x];
        document.getElementById(
          "user"
        ).innerHTML += `<div>${user.username}</div>`;
        document.getElementById(
          "usercount"
        ).innerHTML += `<div>${user.count}</div>`;
      }

      // Création du rank sur le nombre d'users complet.
    });
  document.getElementById("rank").textContent = rank;
  document.getElementById("people").textContent = numberOfUsers;
}

// Au click du bouton
document.getElementById("button").addEventListener("click", () => {
  fetch("https://clickit-back.vercel.app/add")
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        refreshCounter();

        // Si username rentré !

        let username = document
          .getElementById("usernameTextField")
          .value.toLowerCase();

        if (username) {
          fetch(`https://clickit-back.vercel.app/users/add/${username}`)
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                rank =
                  sortListUsers.findIndex((x) => x.username === username) + 1;
                document.getElementById("rank").textContent = rank;
                refreshTable();
              }
            });
        }
      }
    });
});
