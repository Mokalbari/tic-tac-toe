TIC TAC TOE

Setup : grid 3\*3.
Grid est numérotée de 1 à 9 :
// 123
// 456
// 789

2 Joueurs : X et O
Joueur 1 = Player One + Token = X
Joueur 2 = Player Two + Token = O

Combinaisons gagnantes :
winningCombination : {
[1,2,3],
[4,5,6],
[7,8,9],
[1,4,7],
[2,5,8],
[3,6,9],
[1,5,9],
[3,5,7],
}

Logic :
Chaque joueur dispose d'une méthode : setToken(cell)
Chaque cell ne peut accueillir qu'un seul token.
Lorsque le joueur utilise sa méthode setToken, il ajoute l'ID de la grille à son array personnel.
A la fin de son tour, vérifier si le joueur a une des combinaisons gagnantes dans son array.
Lorsque joueur 1 || 2 a un array gagnant. Le jeu se termine.

Le joueur X commence.
// startGame()
// // setBoard () => array [1,2,3,4,5,6,7,8,9]
// // setPlayerArray() => Player one : [] / Player two : []

Le joueur X setToken(cell).
// playerOne.setToken(cell)

// // Vérifier que l'ID est disponible, si oui, mettre token()
// // checkAvailable()
// // // ID in Player1 || 2 ? "Already Taken" : setToken();

// // Copier l'ID dans l'array du player
// // fetchID()
// // player one = [1]

// // checkWinner()
// // Player 1 || 2 array === winningCombination ? endGame() : continue;

Les outils nécessaires :
Un objet joueur avec : nom, token, setToken(),
