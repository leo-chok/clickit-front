// Init
let topTen = [];
let sortListUsers = [];
let rank = "#";

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
      let dataUsers = data.listUsers;
      let listUsers = [];
      for (let i = 0; i < dataUsers.length; i++) {
        const element = dataUsers[i];
        listUsers.push(element);
      }

      sortListUsers = listUsers.sort(({ count: a }, { count: b }) => b - a);

      for (let j = 0; j < 10; j++) {
        topTen.push(sortListUsers[j]);
      }

      for (let x = 0; x < topTen.length; x++) {
        const user = topTen[x];
        document.getElementById("user").innerHTML += `
        <div>
      ${user.username}
      </div>
      `;
        document.getElementById("usercount").innerHTML += `
        <div>
      ${user.count}
      </div>
      `;
      }
      document.getElementById("rank").textContent = rank;
      document.getElementById("people").textContent = listUsers.length;
    });
}

// Au click du bouton
document.getElementById("button").addEventListener("click", () => {
  fetch("https://clickit-back.vercel.app/add")
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        refreshCounter();

        // Si username rentré !

        let username = document.getElementById("usernameTextField").value;

        if (username) {
          fetch(`https://clickit-back.vercel.app/users/add/${username}`)
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                rank =
                  sortListUsers.findIndex((x) => x.username == username) + 1;
                eraseTable();
                refreshTable();
              }
            });
        }
      }
    });
});
