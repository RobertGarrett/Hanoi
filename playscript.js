const Game = require('./game.js');

const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function completion(){
    reader.question("Play Again? y or n: ", ans => {
        if( ans === "y" )
            startGame();
        else
            reader.close();
    });
}

function startGame(){
    reader.question("Difficulty (1 <= n <= 10): ", (ans) => {
        let x = parseInt(ans, 10);
        if(x <= 10)
            new Game(x).run(reader, completion);
        else
            startGame();
    })
}

startGame();
