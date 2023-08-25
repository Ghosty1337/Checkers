const board = document.querySelector(".board")
const cellColors = ["black", "white"]

function renderCell(cellColor, index) {
    if (cellColor == "black") {
    board.innerHTML += `
        <div class="cell ${cellColor}" id="${index}">
    
        </div> 
        `
    } else {
    board.innerHTML += `
        <div class="cell ${cellColor}">
    
        </div> 
        `
    }
}

function renderBoard() {
    let counter = 0
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            renderCell(cellColors[(i + j) % 2], counter)
            if (cellColors[(i + j) % 2] == "black") {
                counter++
            }
        }
    }
}

renderBoard()

const blackCells = document.querySelectorAll(".cell.black")

function renderBlackCheckers() {
    for (let i = 0; i < 12; i++) {
        blackCells[i].innerHTML += `
        <div class="checker black" id="${i}">
            <div class="checker__inner black" id="${i}">
    
            </div>
        </div>
        `
    }
}

function renderWhiteCheckers() {
    for (let i = 20; i < 32; i++) {
        blackCells[i].innerHTML += `
        <div class="checker white" id="${i}">
            <div class="checker__inner white" id="${i}">
    
            </div>
        </div>
        `
    }
}

renderBlackCheckers()
renderWhiteCheckers()

let activeChecker = {"id": null}
let freeSpots = []

function deleteNumber(numbers, numberToDelete) {
    const filteredNumbers = numbers.filter((number) => number !== numberToDelete);
    return filteredNumbers
}

function showFreeSpot(checker) {
    if (Number(blackCells[checker.id].id) <= 12) {
        freeSpots.push(Number(checker.id) + 3)
        freeSpots.push(Number(checker.id) + 4)
    } else {
        freeSpots.push(Number(checker.id) - 3)
        freeSpots.push(Number(checker.id) - 4)
    }
    for (let i = 0; i < freeSpots.length; i++) {
        let allChekers = document.querySelectorAll(".checker")
        for (let j of allChekers) {
            if (blackCells[freeSpots[i]].contains(j)) {
                freeSpots = deleteNumber(freeSpots, freeSpots[i])
            }
        }
        blackCells[freeSpots[i]].classList.add("green")
    }
}

function selectChecker(checker) {
    if (activeChecker.id != checker.id && !activeChecker.id) {
        activeChecker.id = checker.id
        blackCells[checker.id].classList.add("selected")
        showFreeSpot(checker)
    } else if (activeChecker.id == checker.id) {
        resetChecker(activeChecker)
    } else {
        resetChecker(activeChecker)
        selectChecker(checker)
    }
}

function resetChecker(checker) {
    blackCells[checker.id].classList.remove("selected")
    for (let i = 0; i < freeSpots.length; i++) {
        blackCells[freeSpots[i]].classList.remove("green")
    }
    freeSpots = []
    activeChecker.id = null
}

function pickLogic() {
    const checkers = document.querySelectorAll(".checker")
    checkers.forEach((checker) => {
        checker.onclick = () => {
            selectChecker(checker)
        }
    })
}

pickLogic()