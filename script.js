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
    { name: "top-left", id: 1 },
    { name: "top-middle", id: 2 },
    { name: "top-right", id: 3 },
    { name: "middle-left", id: 4 },
    { name: "middle-middle", id: 5 },
    { name: "middle-right", id: 6 },
    { name: "bottom-left", id: 7 },
    { name: "bottom-middle", id: 8 },
    { name: "bottom-right", id: 9 },
  ],
};

const gameLogic = {
  setToken(cell) {
    let currentPlayer =
      players.p1.tokenCllct.length <= players.p2.tokenCllct.length
        ? players.p1
        : players.p2;

    if (
      players.p1.tokenCllct.includes(cell) ||
      players.p2.tokenCllct.includes(cell)
    ) {
      console.log(`${cell} already picked`);
      return;
    } else {
      console.log(`You picked ${cell}`);
      currentPlayer.tokenCllct.push(cell);
      console.log(
        `Your current token collecion is : ${currentPlayer.tokenCllct}`
      );
    }
  },

  playRound() {},

  checkWinner() {},
};
