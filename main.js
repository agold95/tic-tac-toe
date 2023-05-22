"use strict";

const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };
    return {getSign};
}

const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setMarker= (index, sign) => {
        if (index > board.length) {
            return;
        }
        board[index] = sign;
    };

    const getMarker = (index) => {
        if (index > board.length) {
            return;
        }
        return board[index];
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return {
        setMarker,
        getMarker,
        resetBoard
    };
})();

const GameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let isOver = false;

    // double check this one
    const getPlayerSign = () => {
        if (round % 2 === 1) {
        return playerX.getSign();
        } else {
        return playerO.getSign();
        }
    };

    const checkWinner = (markerIndex) => {
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 5],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winCondition
        .filter((combo) => combo.includes(markerIndex))
        .some((possiblecombo) => possiblecombo.every(
            (index) => Gameboard.getMarker(index) === getPlayerSign())
        );
    };

    const getIsOver = () => {
     return isOver;   
    };

    const resetGame = () => {
        round = 1;
        isOver = false;
    };

    const playRound = (markerIndex) => {
        Gameboard.setMarker(markerIndex, getPlayerSign());
        if (checkWinner(markerIndex)) {
            DisplayController.setResult(getPlayerSign());
            isOver = true;
            return;
        }
        if (round === 9) {
            DisplayController.setResult("Tie");
            isOver = true;
            return;
        }
        round++;
        DisplayController.setMessage(`${getPlayerSign()}'s turn`);
    };
    return {
        getIsOver,
        resetGame,
        playRound
    };
})();

const DisplayController = (() => {
    const markerElements = document.querySelectorAll('.marker');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');

    markerElements.forEach((marker) => {
        marker.addEventListener('click', (e) => {
            if (GameController.getIsOver() || e.target.textContent !== "") {
                return;
            }
            GameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        });
    });

    restartButton.addEventListener('click', (e) => {
        Gameboard.resetBoard();
        GameController.resetGame();
        updateGameboard();
        setMessage("X's turn");
    });

    const updateGameboard = () => {
        for (let i = 0; i < markerElements.length; i++) {
            markerElements[i].textContent = Gameboard.getMarker(i);
        }
    };

    const setMessage = (message) => {
        messageElement.textContent = message;
    };

    const setResult = (winner) => {
        if (winner === "Tie") {
            setMessage("It's a Tie!");
        } else {
            setMessage(`${winner} has won!`);
        }
    };
    return {
        setResult,
        setMessage
    };
})();