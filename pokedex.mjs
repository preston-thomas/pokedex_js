// Load the readline library
// https://www.w3schools.com/java/java_try_catch.asp
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
    });
}

async function searchPoke(term) {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/${term}');
        const pokeJSON = response.json();
        printPoke(pokeJSON) // although it's not codded yet this function will print our Pokemon out neatly
    }
    catch (err) {
        console.error("An error has occured: ", err);
    }
    finally {
        run(); // call run to reprompt users 
    }
}
