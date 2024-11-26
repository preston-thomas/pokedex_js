// https://www.w3schools.com/java/java_try_catch.asp
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

const readline = require("readline");
const fetch = require("node-fetch")

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
        if (!response.ok) {
            throw new Error(`Pokemon does not exist`);
    }
        const pokeJSON = await response.json();
        printPoke(pokeJSON)
    }
    catch (err) {
        console.error("An error has occured: ", err);
    }
    finally {
        run(); // call run to reprompt users 
    }
}

function printPoke(json) {
    console.log('Pokemon Name: ${json.forms.name}');
    console.log('Pokemon Types: ${json.types.name}');
    console.log('Pokemon First Version Appearance: ${json.game_indices.version.name}');
    console.log('Pokemon Height: ${json.game_indices.height}');
    console.log('Pokemon Weight: ${json.weight}');
    // Need implementation of printing out the moveset of pokemon
    // same with types if i think we will need a for loop
}

async function searchItem(term) {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/item/${term}');
        if (!response.ok) {
            throw new Error(`Pokemon does not exist`);
        }
        const itemJSON = await response.json()
        printItem(itemJSON)
    } 
    catch (err) {
        console.error("An error has occured: ", err);
    }
    finally {
        run();
    }
}

function printItem(json) {
    console.log('Item Name: ${json.name}');
    console.log('Item Category: ${json.category.name}');
    console.log('Item Effect: ${json.effect_entries.effect}');
    console.log('Item Cost: ${json.cost}');
}