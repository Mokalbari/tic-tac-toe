const gameApp = (() => {
  const DOM = {
    gridContainer: document.querySelector(".grid-container"),
    stateMessage: document.querySelector("#state-msg"),
    restartButton: document.querySelector("#restart-game-btn"),
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
    winningState: false,

    setCurrentPlayer() {
      this.currentPlayer =
        players.p1.tokenCllct.length <= players.p2.tokenCllct.length
          ? players.p1
          : players.p2;

      this.notCurrentPlayer =
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
  };

  const messages = {
    initialMessage() {
      DOM.stateMessage.innerHTML = `Player One turn`;
    },

    gameWin() {
      DOM.stateMessage.innerHTML = `${gameLogic.currentPlayer.name} won the game.`;
    },

    playerTurn() {
      DOM.stateMessage.innerHTML = `${gameLogic.currentPlayer.name} has played. ${gameLogic.notCurrentPlayer.name} is up.`;
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
    DOM.restartButton.addEventListener("click", () => {
      gameLogic.resetGame();
      DOM.gridContainer.innerHTML = "";
      appendGrid();
      messages.initialMessage();
    });
  };

  const attemptPlay = (event) => {
    if (event.target.innerHTML !== "") return;

    const targetID = +event.target.id;
    gameLogic.pushTokenToCllct(targetID);
    event.target.innerHTML = gameLogic.getPlayerToken();
    gameLogic.checkWinner(
      gameBoard.winningCombination,
      gameLogic.currentPlayer.tokenCllct
    );

    gameLogic.winningState ? messages.gameWin() : messages.playerTurn();
  };

  const gameFlow = () => {
    DOM.gridContainer.addEventListener("click", (event) => {
      gameLogic.setCurrentPlayer();

      if (gameLogic.winningState) {
        restartGame();
        return;
      }

      attemptPlay(event);
    });
  };

  return {
    init: () => {
      appendGrid(), gameFlow(), restartGame();
    },
  };
})();

document.addEventListener("DOMContentLoaded", gameApp.init);

//
