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
      tokenCllct: [],
    },

    p2: {
      name: "Player Two",
      token: "O",
      tokenCllct: [],
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

  const gameLogic = {
    currentPlayer: null,
    challenger: null,
    winningState: false,

    setCurrentPlayer() {
      this.currentPlayer =
        players.p1.tokenCllct.length <= players.p2.tokenCllct.length
          ? players.p1
          : players.p2;

      this.challenger =
        players.p1.tokenCllct.length <= players.p2.tokenCllct.length
          ? players.p2
          : players.p1;
    },

    pushTokenToCllct(cell) {
      if (
        players.p1.tokenCllct.includes(cell) ||
        players.p2.tokenCllct.includes(cell)
      ) {
        return;
      } else {
        this.currentPlayer.tokenCllct.push(cell);
      }
    },

    getPlayerToken() {
      let token = this.currentPlayer.token;
      return token;
    },

    checkWinner(a, b) {
      for (let i = 0; i < a.length; i++) {
        if (a[i].every((num) => b.includes(num))) {
          this.winningState = true;
          return;
        }
      }
    },

    resetGame() {
      players.p1.tokenCllct = [];
      players.p2.tokenCllct = [];
      this.winningState = false;
    },

    tieGame() {
      if (players.p1.tokenCllct.length === 5 && !this.winningState) {
        messages.tieGame();
      }
    },
  };

  const messages = {
    initialMessage() {
      DOM.stateMessage.textContent = `${players.p1.name} turn`;
    },

    gameWin() {
      DOM.stateMessage.textContent = `${gameLogic.currentPlayer.name} won the game.`;
    },

    playerTurn() {
      DOM.stateMessage.textContent = `${gameLogic.currentPlayer.name} has played. ${gameLogic.challenger.name} is up.`;
    },

    tieGame() {
      DOM.stateMessage.textContent = `It's a tie!`;
    },
  };

  const appendGrid = () => {
    for (let i = 0; i < 9; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "cell");
      div.setAttribute("id", gameBoard.cells[i].id);
      DOM.gridContainer.appendChild(div);
    }
  };

  const restartGame = () => {
    gameLogic.resetGame();
    DOM.gridContainer.textContent = "";
    appendGrid();
    messages.initialMessage();
  };

  const attemptPlay = (event) => {
    if (event.target.textContent !== "") return;

    if (event.target.matches(".cell")) {
      const targetID = +event.target.id;
      gameLogic.pushTokenToCllct(targetID);
      event.target.textContent = gameLogic.getPlayerToken();
      gameLogic.checkWinner(
        gameBoard.winningCombination,
        gameLogic.currentPlayer.tokenCllct
      );

      gameLogic.winningState ? messages.gameWin() : messages.playerTurn();
    }
  };

  const gameFlow = (event) => {
    gameLogic.setCurrentPlayer();

    if (gameLogic.winningState) {
      restartGame();
      return;
    }

    attemptPlay(event);
    gameLogic.tieGame();
  };

  const setupEventListener = () => {
    DOM.restartButton.addEventListener("click", () => {
      restartGame();
    });

    DOM.gridContainer.addEventListener("click", (event) => {
      gameFlow(event);
    });

    DOM.openModal.addEventListener("click", () => {
      DOM.modal.showModal();
    });

    DOM.formInput.addEventListener("submit", (event) => {
      event.preventDefault();
      players.updateName();
      DOM.modal.close();
      restartGame();
    });
  };

  return {
    init: () => {
      appendGrid(), setupEventListener();
    },
  };
})();

document.addEventListener("DOMContentLoaded", gameApp.init);

//
