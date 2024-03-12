const gameApp = (() => {
  const DOM = {
    gridContainer: document.querySelector(".grid-container"),
    stateMessage: document.querySelector("#state-msg"),
    restartButton: document.querySelector("#restart-game-btn"),
    openModal: document.querySelector("#open-modal"),
    modal: document.querySelector("#player-name-modal"),
    formInput: document.querySelector("#player-custom-name"),
  };

  const players = {
    p1: {
      name: "Player One",
      token: "X",
      tokenCollection: [],
    },

    p2: {
      name: "Player Two",
      token: "O",
      tokenCollection: [],
    },

    updateName() {
      this.p1.name = document.getElementById("p1-name").value;
      this.p2.name = document.getElementById("p2-name").value;
    },
  };

  const gameBoard = {
    winningCombination: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ],

    cells: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
    ],
  };

  const gameMechanics = {
    currentPlayer: null,
    challenger: null,
    winningState: false,

    setCurrentPlayer() {
      // As a turn-based-game, the current player is the one with the smallest tokenCollection.
      // In case of a tie, player 1 will be the one going.
      this.currentPlayer =
        players.p1.tokenCollection.length <= players.p2.tokenCollection.length
          ? players.p1
          : players.p2;

      this.challenger =
        players.p1.tokenCollection.length <= players.p2.tokenCollection.length
          ? players.p2
          : players.p1;
    },

    pushTokenToCollection(cell) {
      //Prevents duplicates before pushing a token which would break the game.
      if (
        players.p1.tokenCollection.includes(cell) ||
        players.p2.tokenCollection.includes(cell)
      ) {
        return;
      } else {
        this.currentPlayer.tokenCollection.push(cell);
      }
    },

    getPlayerToken() {
      //Stores the current token inside a variable for modularity
      let token = this.currentPlayer.token;
      return token;
    },

    checkWinner(a, b) {
      // a is the winningCombination, b is the currentPlayer tokenCollection.
      // The winning state will be true if a player has an array that matches the winningCombination.
      for (let i = 0; i < a.length; i++) {
        if (a[i].every((num) => b.includes(num))) {
          this.winningState = true;
          return;
        }
      }
    },

    resetGame() {
      players.p1.tokenCollection = [];
      players.p2.tokenCollection = [];
      this.winningState = false;
    },

    tieGame() {
      // As soon as p1 reaches 5 items inside his tokenCollection,
      // the game should end by a tie or a victory of p1
      if (players.p1.tokenCollection.length === 5 && !this.winningState) {
        messages.tieGame();
      }
    },
  };

  const messages = {
    initialMessage() {
      DOM.stateMessage.textContent = `${players.p1.name}'s turn. ${players.p1.name} will play "X". ${players.p2.name} will play "O"`;
    },

    gameWin() {
      DOM.stateMessage.textContent = `${gameMechanics.currentPlayer.name} won the game.`;
    },

    playerTurn() {
      DOM.stateMessage.textContent = `${gameMechanics.currentPlayer.name} has played. ${gameMechanics.challenger.name} is up.`;
    },

    tieGame() {
      DOM.stateMessage.textContent = `It's a tie!`;
    },
  };

  const gameUnfolding = {
    attemptPlay(event) {
      if (event.target.textContent !== "") return; //Prevents clicking multiple times on a cell and switching players.

      if (event.target.matches(".cell")) {
        //Prevents clicking in-between the cells and breaking the game.
        const targetID = +event.target.id;

        gameMechanics.pushTokenToCollection(targetID);
        event.target.textContent = gameMechanics.getPlayerToken();

        gameMechanics.checkWinner(
          gameBoard.winningCombination,
          gameMechanics.currentPlayer.tokenCollection
        );

        gameMechanics.winningState ? messages.gameWin() : messages.playerTurn();
      }
    },

    restartGame() {
      gameMechanics.resetGame();
      DOM.gridContainer.textContent = "";
      appendGrid();
      messages.initialMessage();
    },

    gameFlow(event) {
      //This sums up the entire game.
      gameMechanics.setCurrentPlayer();

      if (gameMechanics.winningState) {
        this.restartGame();
        return;
      }

      this.attemptPlay(event);
      gameMechanics.tieGame();
    },
  };

  const appendGrid = () => {
    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.setAttribute("class", "cell");
      div.setAttribute("id", gameBoard.cells[i].id);
      DOM.gridContainer.appendChild(div);
    }
  };

  const setupEventListener = () => {
    DOM.restartButton.addEventListener("click", () => {
      gameUnfolding.restartGame();
    });

    DOM.gridContainer.addEventListener("click", (event) => {
      gameUnfolding.gameFlow(event);
    });

    DOM.openModal.addEventListener("click", () => {
      DOM.modal.showModal();
    });

    DOM.formInput.addEventListener("submit", (event) => {
      // If a name is updated, to prevent switching turns between p1/p2
      // The game restarts
      // The form isn't link to a database. Only there for dynamic name changing.
      event.preventDefault();
      players.updateName();
      DOM.modal.close();
      gameUnfolding.restartGame();
    });
  };

  return {
    init: () => {
      appendGrid(), setupEventListener();
    },
  };
})();

document.addEventListener("DOMContentLoaded", gameApp.init);
