

document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const resetBtn = document.querySelector("#reset");
    const newGameBtn = document.querySelector("#new");
    const settingsBtn = document.querySelector("#settings");
    const applySettingsBtn = document.querySelector("#applySettings");
    const closeSettingsBtn = document.querySelector("#closeSettings");
    const resetWinsBtn = document.querySelector("#resetWins");
    const messageContainer = document.querySelector(".win-message");
    const winMessage = document.querySelector("#msg");
    const settingsBox = document.querySelector("#settingsBox");
    const bgColorInput = document.querySelector("#bgColor");
    const boxColorInput = document.querySelector("#boxColor"); 
    const playerXInput = document.querySelector("#playerX");
    const playerOInput = document.querySelector("#playerO");
    const playerXNameDisplay = document.querySelector("#playerXName");
    const playerONameDisplay = document.querySelector("#playerOName");
    const historyList = document.querySelector("#historyList");

    let xWins = 0;
    let oWins = 0;
    let draws = 0;
    let turnO = true;
    let moves = 0;
    let playerXName = "Player X";
    let playerOName = "Player O";

    const winPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const resetGame = () => {
        turnO = true;
        moves = 0;
        messageContainer.classList.add("hide");
        boxes.forEach(box => {
            box.innerText = "";
            box.removeAttribute("data-hover");
            box.disabled = false;
        });
        resetBtn.disabled = true;
        newGameBtn.disabled = false;
        updateHover();
    };

    const updateHover = () => {
        boxes.forEach(box => {
            if (box.innerText === "") {
                box.dataset.hover = turnO ? "O" : "X";
            } else {
                box.removeAttribute("data-hover");
            }
        });
    };

    const checkWin = (currentPlayer) => {
        return winPattern.some(pattern => {
            return pattern.every(index => {
                return boxes[index].innerText === currentPlayer;
            });
        });
    };

    const handleWin = (currentPlayer) => {
        messageContainer.classList.remove("hide");
        const winnerName = currentPlayer === "X" ? playerXName : playerOName;
        winMessage.innerText = `${winnerName} wins!`;
        historyList.insertAdjacentHTML('beforeend', `<li>${winnerName} wins</li>`);
        currentPlayer === "X" ? xWins++ : oWins++;
        updateScoreboard();
        disableBoxes();
    };

    const handleDraw = () => {
        messageContainer.classList.remove("hide");
        winMessage.innerText = "It's a draw!";
        historyList.insertAdjacentHTML('beforeend', `<li>Draw</li>`);
        draws++;
        updateScoreboard();
        disableBoxes();
    };

    const disableBoxes = () => {
        boxes.forEach(box => box.disabled = true);
    };

    const updateScoreboard = () => {
        playerXNameDisplay.innerHTML = `${playerXName} Wins: <span id="xWins">${xWins}</span>`;
        playerONameDisplay.innerHTML = `${playerOName} Wins: <span id="oWins">${oWins}</span>`;
        document.querySelector("#draws").innerText = draws;
    };

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            box.innerText = turnO ? "O" : "X";
            box.removeAttribute("data-hover");
            moves++;
            resetBtn.disabled = false;

            if (checkWin(box.innerText)) {
                handleWin(box.innerText);
            } else if (moves === 9) {
                handleDraw();
            } else {
                turnO = !turnO;
                updateHover();
            }
        });
    });

    resetBtn.addEventListener("click", resetGame);
    newGameBtn.addEventListener("click", resetGame);
    settingsBtn.addEventListener("click", () => settingsBox.classList.remove("hide"));
    closeSettingsBtn.addEventListener("click", () => settingsBox.classList.add("hide"));
    applySettingsBtn.addEventListener("click", () => {
        document.body.style.backgroundColor = bgColorInput.value;
        boxes.forEach(box => box.style.backgroundColor = boxColorInput.value); 
        settingsBox.classList.add("hide");
    });

    resetWinsBtn.addEventListener("click", () => {
        xWins = 0;
        oWins = 0;
        draws = 0;
        historyList.innerHTML = "";
        updateScoreboard();
    });

    playerXInput.addEventListener("input", () => {
        playerXName = playerXInput.value;
        playerXNameDisplay.innerHTML = `${playerXName} Wins: <span id="xWins">${xWins}</span>`;
    });

    playerOInput.addEventListener("input", () => {
        playerOName = playerOInput.value;
        playerONameDisplay.innerHTML = `${playerOName} Wins: <span id="oWins">${oWins}</span>`;
    });

    resetGame();
});


  

  
