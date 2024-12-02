import readline from "readline";
import fetch from "node-fetch"; 

// Setup readline to listen on the stdin stream
const rl = readline.createInterface(process.stdin, process.stdout);

function showMenu() {
    console.log("Pokemon Pokedex Menu: ");
    console.log("1: Search Pokemon");
    console.log("2: Search Item");
    console.log("3: Search Move");
    console.log("4: Exit");
}

function prompt(cb) {
    rl.question("Enter your command to search through the Pokedex: ", (response) => {
        cb(response); // The function will call the callback (CB) with the response/user input as the parameter 
    });
}

async function searchPoke(term) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${term}`);
        if (!response.ok) {
            throw new Error(`Pokemon does not exist.`);
        }
        const pokeJSON = await response.json();
        printPoke(pokeJSON);
    } catch (err) {
        console.error("An error has occurred while fetching the Pokemon: ", err);
    } finally {
        run(); // Call run to reprompt users 
    }
}

async function searchMove(term) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${term}`);
        if (!response.ok) {
            throw new Error(`Move does not exist.`);
        }
        const moveJSON = await response.json();
        printMove(moveJSON);
    } catch (err) {
        console.error("An error has occurred while fetching the Move: ", err);
    } finally {
        run();
    }
}

async function searchItem(term) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/item/${term}`);
        if (!response.ok) {
            throw new Error(`Item does not exist`);
        }
        const itemJSON = await response.json();
        printItem(itemJSON);
    } catch (err) {
        console.error("An error has occurred while fetching the Item: ", err);
    } finally {
        run();
    }
}

function printPoke(json) {
    console.log("-- Pokemon Information --");
    console.log(`Pokemon Name: ${json.name}`);
    console.log(`Pokemon Height: ${json.height}`);
    console.log(`Pokemon Weight: ${json.weight}`);
    console.log(`Pokemon Base Experience: ${json.base_experience}`);
    for (let i = 0; i < json.moves.length; i++) {
        console.log(`Move: ${json.moves[i].move.name}`);
    }
}

function printItem(json) {
    console.log("-- Item Information --");
    console.log(`Item Name: ${json.name}`);
    console.log(`Item Category: ${json.category.name}`);
    console.log(`Item Cost: ${json.cost}`);
    for (let i = 0; i < json.effect_entries.length; i++) {
        console.log(`Effect: ${json.effect_entries[i].effect}`);
    }
}

function printMove(json) {
    console.log("-- Move Information --");
    console.log(`Name: ${json.name}`);
    console.log(`Damage Class: ${json.damage_class.name}`);
    for (let i = 0; i < json.effect_entries.length; i++) {
        console.log(`Effect: ${json.effect_entries[i].effect}`);
    }
    console.log(`Power: ${json.power}`);
    console.log(`Accuracy: ${json.accuracy}`);
}

function run() {
    showMenu();
    rl.question("Please select an option to proceed: ", (answer) => {
        if (answer == 1) {
            prompt(searchPoke); // Pass the function reference to prompt
        } else if (answer == 2) {
            prompt(searchItem); // Pass the function reference to prompt
        } else if (answer == 3) {
            prompt(searchMove); // Pass the function reference to prompt
        } else if (answer == 4) {
            console.log(`Good luck, Pokemon trainer!`);
            rl.close();
        } else {
            console.log("Invalid choice. Please try again.");
            run();
        }
    });
}

run();