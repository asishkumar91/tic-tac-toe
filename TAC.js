let Arr = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_']
];

let mode = prompt("Enter 1 for Multiplayer\nEnter 2 to Play vs Computer:");

const turner = document.querySelector(".turn");
const foot = document.querySelector(".footer");
const cells = document.querySelectorAll(".child");

let comp = true, activate = false;
let comp_ch = 'X', user_ch = '0';
let counter = 0;
let miscalleneous = '', row_m = 0, col_m = 0;

if(mode == 2){
    user_ch = prompt("Your Symbol");
    if (user_ch == 'X') comp_ch = '0';

    let first = prompt("Who will start at first?\n1 for Computer\n2 for User");
    if (first == 2) comp = false;
}
else{
    comp_ch = prompt("Choose User 1 Symbol");
    user_ch = prompt("Choose User 2 Symbol");

    if(user_ch == comp_ch){
        user_ch = prompt("Choose a different symbol for User 2");
    }

    let first = prompt("Who will start at first?\n1 for User 1\n2 for User 2");
    if (first == 2) comp = false;
}

// Computer turn logic
function playturn() {
    if (!comp) return; // wait for user


    let repeat = true;
    let row, col, val;

    while (repeat) {
        if (activate) {
            activate = false;
            if (miscalleneous == 'U') row_m = row_m - 2, col_m = col_m + 2;
            else if (miscalleneous == 'r') col_m = col_m + 2;
            else if (miscalleneous == 'd') row_m = row_m + 2;
            else row_m += 2, col_m += 2;

            row_m = (row_m + 3) % 3; // ensure 0..2
            col_m = (col_m + 3) % 3;
            val = row_m * 3 + col_m;
        } else {
            val = Math.floor(Math.random() * 9);
        }

        row = Math.floor(val / 3);
        col = val % 3;

        if (Arr[row][col] === '_') {
            Arr[row][col] = comp_ch;
            cells[val].textContent = comp_ch;
            repeat = false;
        }
    }

    counter++;
    let ch = Tic_Tac_Toe(Arr, row, col, comp_ch);
    if (chkwin(ch, comp_ch, mode)) return;
    else if (ch != 'N') {
        miscalleneous = ch;
        activate = true;
        row_m = row;
        col_m = col;
    }

    if (counter == 9) {
        foot.textContent = "Status: Match tied!";
        turner.textContent = "Game Over";
        return;
    }

    comp = false; // Now user turn
    turner.textContent = "Your turn!";
}


let current_char = comp_ch;
// User click handlers (Wait until user clicks)
document.addEventListener("DOMContentLoaded", () => {
    cells.forEach((cell, index) => { //runs once
        cell.dataset.index = index; // assign index if not already, each box knows its position now.
        cell.addEventListener("click", () => {
            if (mode == 2) if (comp) return; // ignore during computer's turn

            let val = Number(cell.dataset.index);
            let row = Math.floor(val / 3);
            let col = val % 3;

            if (Arr[row][col] !== '_') return;

            //multiplayer
            if (mode == 1) {
                if (comp) current_char = comp_ch;
                else current_char = user_ch;
            }
            else current_char = user_ch;

            Arr[row][col] = current_char;
            cell.textContent = current_char;
            counter++;

            let ch = Tic_Tac_Toe(Arr, row, col, current_char);
            if (chkwin(ch, current_char, mode)) return;

            if (counter == 9) {
                foot.textContent = "Status: Match tied!";
                turner.textContent = "Game Over";
                return;
            }


            comp = !(comp); // next computer turn

            if (mode == 1) {
                if (comp) turner.textContent = "User 1 's turn!";
                else turner.textContent = "User 2 's turn!";
            }
            else {
                turner.textContent = "Computer's turn!";
                setTimeout(playturn, 3000);
            }


        });
    });
})

// Start the game
if (mode == 2) playturn();

// Win detection functions
function chkwin(ch, current_char, mode) {
    if (ch == 't') {
        if (mode == 1) {
            if (current_char == user_ch) turner.textContent = "User 2 Won!";
            else turner.textContent = "User 1 Won!";
        } else {
            if (current_char == user_ch) turner.textContent = "You Won!";
            else turner.textContent = "Computer Won!";
        }
        foot.textContent = "Game Over";
        return true;
    }
    return false;
}

function Move(arr, row, col, count, element, ch) {
    if (count == 4) return 0;

    row = (row + 3) % 3;
    col = (col + 3) % 3;

    if (arr[row][col] != element) return 0;

    let val;
    if (ch == 'U') val = Move(arr, row - 1, col + 1, count + 1, element, 'U');
    else if (ch == 'r') val = Move(arr, row, col + 1, count + 1, element, 'r');
    else if (ch == 'd') val = Move(arr, row + 1, col, count + 1, element, 'd');
    else val = Move(arr, row + 1, col + 1, count + 1, element, 'D');

    return val + 1;
}

function Tic_Tac_Toe(arr, row, col, element) {
    let count = 1, val;
    let ch = 'N';
    let check = true;

    if (row == col) {
        val = Move(arr, row + 1, col + 1, count + 1, element, 'D');
        if (val == 2) return 't';
        else if (check && val == 1) { ch = 'D'; check = false; }
    }

    if (row - col == 2 || col - row == 2 || (row == col && row == 1)) {
        val = Move(arr, row - 1, col + 1, count + 1, element, 'U');
        if (val == 2) return 't';
        else if (check && val == 1) { ch = 'U'; check = false; }
    }

    val = Move(arr, row, col + 1, count + 1, element, 'r');
    if (val == 2) return 't';
    else if (check && val == 1) { ch = 'r'; check = false; }

    val = Move(arr, row + 1, col, count + 1, element, 'd');
    if (val == 2) return 't';
    else if (check && val == 1) { ch = 'd'; check = false; }

    return ch;
}
