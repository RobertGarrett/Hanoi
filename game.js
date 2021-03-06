Array.prototype.last = function(){return this[this.length-1];}

class Game{
    constructor(difficulty = 3){
        this.difficulty = difficulty;
        this.towers = new Array(3).fill(0).map(e => new Array());
        for(var i = 0; i < difficulty; i++)
            this.towers[0].push(difficulty - i);
        console.log(this.towers);
    }
    run(reader, completion){
        this.promptMove(reader, (a, b) => {
            if(!this.move(a, b))
                console.log("Invalid Move!");

            if(!this.isWon())
                this.run(reader, completion);
            else{
                this.print();
                console.log("You Win!");
                completion()
            }
        });
    }
    promptMove(reader, callback){
        this.print();
        reader.question("Please enter a move (eg. 'from, to'): ", function(ans){
            const arr = ans.split(" ").map( e => parseInt(e, 10) );
            console.log(this);
            callback(arr[0], arr[1]);
        });
    }
    isValidMove(start, end){
        let from = this.towers[start], to = this.towers[end];
        return from.length > 0 && ( to.length === 0 || to.last() > from.last() );
    }
    move(start, end){
        if( this.isValidMove(start, end) ){
            this.towers[end].push(this.towers[start].pop());
            return true;
        }
        return false;
    }
    isWon(){
        return this.towers[1].length === this.difficulty ||
                this.towers[2].length === this.difficulty;
    }
    print(){
        console.log();
        for(var i = this.difficulty-1; i >= 0; i--){
            let line = "";
            for( var j = 0; j < 3; j++ ){
                const n = this.towers[j][i] || 0;
                const spaces = " ".repeat(this.difficulty - n);
                if(n !== 0){
                    const disk = `(${"[".repeat(n-1)}|${"]".repeat(n-1)})`;
                    line += `${spaces}${disk}${spaces}`;
                } else{
                    line += `${spaces}|${spaces}`;
                }
            }
            console.log(line);
        }
        console.log();
    }
}

module.exports = Game;
