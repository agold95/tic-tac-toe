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
            return
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
    }
})();