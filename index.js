// Init
let topTen = [];
let sortListUsers = [];
let rank = "#";
let listUsers = [];
let username = '';

refreshCounter();
refreshTable();

//Functions
function refreshCounter() {
  fetch("https://clickit-back.vercel.app/")
    .then((response) => response.json())
    .then((data) => {
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
      listUsers = [];
      let dataUsers = data.listUsers;
      for (let i = 0; i < dataUsers.length; i++) {
        const user = dataUsers[i];
        listUsers.push(user);
      }
      console.log(listUsers.length)
      // Trie de la liste Users par nbre de clics
      sortListUsers = listUsers.sort(({ count: a }, { count: b }) => b - a);


      // Ajout des 10 premiers dans le tableau Top 10
      for (let j = 0; j < 10; j++) {
        topTen.push(sortListUsers[j]);
      }

      // Création du tableau Top 10
      for (let x = 0; x < topTen.length; x++) {
        const user = topTen[x];
        document.getElementById("user").innerHTML += `<div>${user.username}</div>`;
        document.getElementById("usercount").innerHTML += `<div>${user.count}</div>`;
      }

      // Création du rank sur le nombre d'users complet.
      document.getElementById("rank").textContent = `${rank}`;
      document.getElementById("people").textContent = `${listUsers.length}`;
    });
}

// Au click du bouton
document.getElementById("button").addEventListener("click", () => {
  username = document.getElementById("usernameTextField").value.toLowerCase();


  fetch("https://clickit-back.vercel.app/add")
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        refreshCounter();


        // Si username rentré !
        if (username) {
          fetch(`https://clickit-back.vercel.app/users/add/${username}`)
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                rank = sortListUsers.findIndex((x) => x.username === username) + 1;
                refreshTable();
              }
            });
        }
      }
    });
});
