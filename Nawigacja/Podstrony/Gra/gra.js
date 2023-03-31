document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("table");
  const allTd = document.getElementsByTagName("td");
  const X = document.getElementById("X");
  const O = document.getElementById("O");
  const onePlayerBtn = document.getElementById("one_player");
  const twoPlayersBtn = document.getElementById("two_players");
  const resetBtn = document.getElementById("reset");
  const playWith = document.getElementById("play_with");
  const choice = document.getElementById("you_choose");
  let helper = "O";
  let player = "";
  let winner = "";

 // Wybór trybu gry
  const switchToPlayer = function () {
    player =
      this.getAttribute("id") === "one_player" ? "computer_play" : "human_play";
    playWith.innerText = `Tryb ${this.innerText.toLowerCase()}`;
  };

  onePlayerBtn.addEventListener("click", switchToPlayer);
  twoPlayersBtn.addEventListener("click", switchToPlayer);

   // Wybor X lub 0
  const switchToXorO = function () {
    helper = this.getAttribute("id") === "X" ? "X" : "O";
    choice.innerText = `Wybrałeś ${helper}`;
    [X, O].forEach((el) => (el.style.display = "none"));
  };

  X.addEventListener("click", switchToXorO);
  O.addEventListener("click", switchToXorO);

  // Funkcja do resetowania (do)
  resetBtn.addEventListener("click", function () {
    location.reload();
  });

  // Funkcja gry
  table.addEventListener("click", function (e) {
    let field = e.target.closest("td").innerText;

    if (winner == true) {
      return;
    }

    if (helper === "X" && field == "") {
      e.target.closest("td").classList.add("red");
      e.target.closest("td").innerText = "X";
      wynik("X");
      wynik("O");
      if (player == "") {
        helper = "O";
      }
      if (player == "human_play") {
        helper = "O";
      }
      if (player == "computer_play") {
        computer_move();
      }
      wynik("X");
      wynik("O");
      return;
    }

    if (helper === "O" && field == "") {
      e.target.closest("td").classList.add("blue");
      e.target.closest("td").innerText = "O";
      wynik("O");
      wynik("X");
      if (player == "") {
        helper = "X";
      }
      if (player == "human_play") {
        helper = "X";
      }
      if (player == "computer_play") {
        computer_move();
      }
      wynik("O");
      wynik("X");
      return;
    }
  });

  // Zaprojektowanie prostego przeciwnika w postaci komputera
  function computer_move() {
    if (winner == true) {
      console.log("sprawdzamy");
      return;
    }
    if (document.querySelector("#statement").innerText.includes("Remis!")) {
      return;
    }
    let new_td = "";
    let new_td_tab = [];
    for (i = 0; i < allTd.length; i++) {
      if (allTd[i].innerText == "") {
        new_td = allTd[i];
        new_td_tab.push(new_td);
      }
    }
    let random_field = Math.floor(Math.random() * new_td_tab.length + 1);

    if (helper === "X") {
      new_td_tab[random_field - 1].innerText = "O";
      new_td_tab[random_field - 1].classList.add("blue");
    }
    if (helper === "O") {
      new_td_tab[random_field - 1].innerText = "X";
      new_td_tab[random_field - 1].classList.add("red");
    }
  }

  // Sprawdzanie wyniku gry
  function wygrana(C) {
    document.querySelector("#statement").innerText =
      "Wygrana!" + " \n Wygrał: " + C;
    winner = true;
    console.log("Brawo!");
  }

  function tie() {
    document.querySelector("#statement").innerText = "Remis!";
  }

  function wynik(C) {
    let all_td_tab = [];

    for (i = 0; i < allTd.length; i = i + 3) {
      if (
        allTd[i].innerText == C &&
        allTd[i + 1].innerText == C &&
        allTd[i + 2].innerText == C
      ) {
        wygrana(C);
      }
    }
    for (i = 0; i < 3; i = i + 1) {
      if (
        allTd[i].innerText == C &&
        allTd[i + 3].innerText == C &&
        allTd[i + 6].innerText == C
      ) {
        wygrana(C);
      }
    }
    if (
      allTd[0].innerText == C &&
      allTd[4].innerText == C &&
      allTd[8].innerText == C
    ) {
      wygrana(C);
    }
    if (
      allTd[2].innerText == C &&
      allTd[4].innerText == C &&
      allTd[6].innerText == C
    ) {
      wygrana(C);
    }
    for (i = 0; i < allTd.length; i = i + 1) {
      if (allTd[i].innerText != "") {
        all_td_tab.push(allTd[i]);
      }
    }
    if (all_td_tab.length == 9 && winner != true) {
      tie();
    }
  }
});
