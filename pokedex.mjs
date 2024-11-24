// Load the readline library
const readline = require("readline");

// Setup readline to listen on the stdin stream
const rl = readline.createInterface(process.stdin, process.stdout);
 
function showMenu() {
    console.log("Pokemon Pokedox Menu: ");
    console.log("1. Search Pokemon");
    console.log("2. Search Item");
    console.log("3. Search Move");
    console.log("4. Exit");
}

function prompt(cb) {
    rl.readline("Enter your command to search through the Pokedex: ", (response) => {
        cb(response) // the function will call the callback (CB) with the response/user input as the parameter 
    })
}
