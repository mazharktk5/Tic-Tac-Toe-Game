let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let messageContainer = document.querySelector(".win-message");
let winMessage = document.querySelector("#msg");

let turnO = true;
let moves = 0; 

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    moves = 0;
    enabledBoxes();
    messageContainer.classList.add("hide");
    boxes.forEach(box => {
        box.innerText = "";
        box.removeAttribute("data-hover");
    });
}

const updateHover = () => {
    boxes.forEach(box => {
        if (box.innerText === "") {
            box.setAttribute("data-hover", turnO ? "O" : "X");
        } else {
            box.removeAttribute("data-hover");
        }
    });
}

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { 
            if (turnO) {
                box.innerText = "O";
            } else {
                box.innerText = "X";
            }
            turnO = !turnO; 
            moves++;
            box.disabled = true;
            checkWinner();
            if (moves === 9) {
                checkDraw();
            }
            updateHover();
        }
    });
    box.addEventListener("mouseover", updateHover);
});

const disabledBoxes = () => {
    boxes.forEach(box => box.disabled = true);
}

const enabledBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
    });
}

const showWinner = (winner) => {
    winMessage.innerText = `Congratulations! Winner is ${winner}`;
    messageContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value !== "" && pos1Value === pos2Value && pos2Value === pos3Value) {
            showWinner(pos1Value);
            return true; 
        }
    }
    return false; 
};

const checkDraw = () => {
    if (moves === 9) { 
        if (!checkWinner()) { 
            winMessage.innerText = "It's a draw!";
            messageContainer.classList.remove("hide");
            disabledBoxes();
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Initialize hover text on page load
updateHover();
