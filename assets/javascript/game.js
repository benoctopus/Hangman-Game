
// I designed this game with simplicity at heart
//simplicity for the user I mean
//meanwhile, I'm over here crying
//enjoy

var gameEnv = {
    //declare game enviroment and properties as object
    word: $("#word"),
    wins: 0,
    losses: 0,
    sCount: 0,
    lCount: 0,
    active: false,
    winner: false,
    gameOver: false,
    guess: [],
    guessTxt: "",
    currentW: "",
    hiddenW: "",
    bank: [
        "saloon",
        "revolver",
        "flapper",
        "outlaw",
        "sheriff",
        "lawman",
        "frontier",
        "cowpoke",
        "mustang",
        "whiskey",
        "tango",
        "texas",
        "cowboy",
        "standoff",
        "britches",
        "drought",
        "justice",
        "lasso",
        "longhorn",
        "fortune",
        "marksman",
        "wrangler",
        "yonder",
        "yokel",
        "saddlebag",
        "surly",
        "prospector"


    ],
    parts: [
        //creates list to draw parts correlating with lcount status, see gameEnv.checkWord
        function() {
            canvas.addChild(man.base)
        },
        function() {
            canvas.addChild(man.vertical)
        },
        function() {
            canvas.addChild(man.top)
        },
        function() {
            canvas.addChild(man.noose)
        },
        function() {
            canvas.addChild(man.head)
        },
        function() {
            canvas.addChild(man.body)
        },
        function() {
            canvas.addChild(man.lArm)
        },
        function() {
            canvas.addChild(man.rArm)
        },
        function() {
            canvas.addChild(man.lLeg)
        },
        function() {
            canvas.addChild(man.rLeg)
        }
    ],

    randomWord: function () {
        //pick random word from word bank
        var i = Math.floor(Math.random() * (gameEnv.bank.length));
        var wd = this.bank[i];
        this.bank.splice(i, 1);
        return wd
    },

    stringToArray: function (string) {
        //takes string returns array
        var temp = [];
        for (var i = 0; i < string.length; i++) {
            temp.push(string[i])
        }
        return temp;
    },

    arrayToString: function (array) {
        //takes array, returns string
        var temp = "";
        for (var i = 0; i < array.length; i++) {
            temp += array[i]
        }
        return temp;
    },

    reboot: function(){
        // wait for a moment before restarting game
        listener1.ready(function(){
            var currentTime = new Date().getTime();
            while (currentTime + 600 >= new Date().getTime()) {
            }
            gameEnv.startGame()
        });
    },

    keyListener: function() {
        //checks win/loss status / grabs key and sends to check word
        if (this.lCount >= this.parts.length) {
            this.gameOver = true;
            listener1.off("keyup");
            this.losses += 1;
            lPost.text(this.losses);
            instructions.text("You Loose");
            this.reboot();
        }
        else if (this.sCount >= this.currentW.length) {
            this.gameOver = false;
            listener1.off("keyup");
            this.wins += 1;
            wPost.text(this.wins);
            instructions.text("You Win!");
            this.reboot();
        }
        else if (this.gameOver === false) {
            listener1.on("keyup", function(event) {
                e = event.key;
                listener1.off("keyup");
                gameEnv.checkWord(e)
            })
        }
    },

    updateGuess: function(key) {
        //update already guessed characters
        if (this.guess.indexOf(key) < 0) {
            this.guess.push(key);
            this.guessTxt = this.guessTxt + key + " ";
            play_again.text(this.guessTxt)
        }
    },

    checkWord: function (character) {
        //checks if character is in word then either increments success count or failure count
        if(this.gameOver === true) {
            return
        }
        console.log(character);
        var condition = true;
        var gotIt = false;
        this.currentW = this.stringToArray(this.currentW);
        this.hiddenW = this.stringToArray(this.hiddenW);
        while (condition) {
            var i = this.currentW.indexOf(character);
            if (i > -1 && this.gameOver === false) {
                this.currentW[i] = "_";
                this.hiddenW[i] = character;
                gotIt = true;
                this.sCount++;
            }
            else if (i < 0 && gotIt === true) {
                break;
            }
            else if (
                i < 0 && character === " "
                || character.length > 1
                || this.guess.indexOf(character) > -1
                || this.hiddenW.indexOf(character) >-1
            ) {
                // disallows special keys without penalty
                //disallows game to penalize player for pressing the same key twice
                gotIt = true;
                break
            }
            else if (i < 1 && this.gameOver === false) {
                if(this.lCount < this.parts.length) {
                    this.updateGuess(character);
                    this.parts[this.lCount]();
                    this.lCount++;
                    break
                }
            }
        }
        this.currentW = this.arrayToString(this.currentW);
        this.hiddenW = this.arrayToString(this.hiddenW);
        this.word.text(this.hiddenW);
        listener1.off("keyup");
        this.keyListener()
    },

    startGame: function () {
        //setup new game environment initial and on reboot
        while (typeof listener1.event !== "undefined") {
        //attempt to prevent keyup overflow events on reboot
        }
        play_again.text("     ");
        this.sCount = 0;
        this.lCount = 0;
        this.currentW = gameEnv.randomWord();
        this.active = true;
        this.hiddenW = "";
        for (var i = 0; i < gameEnv.currentW.length; i++) {
            this.hiddenW += "_";
        }
        canvas.reset();
        instructions.text("Guess a letter");
        this.guess.length = 0;
        this.guessTxt = "Failed: ";
        play_again.text("(Use Keyboard)");
        this.word.text(this.hiddenW);
        console.log(gameEnv.currentW);
        this.gameOver = false;
        this.keyListener()
    }
};

var canvas = oCanvas.create({
    //declare canvas object
    canvas: "#canvas",
    fps: 60
});

var man = {
    //all parts of man drawing declared
    base: canvas.display.line({
        start: {
            x: 0,
            y: canvas.height
        },
        end: {
            x: canvas.width/4,
            y: canvas.height
        },
        stroke: "3px black",
        cap: "flat"
    }),
    vertical: canvas.display.line({
        start: {
            x: canvas.width/8,
            y: 0
        },
        end: {
            x: canvas.width/8,
            y: canvas.height
        },
        stroke: "3px black",
        cap: "flat"
    }),
    top: canvas.display.line({
        start: {
            x: canvas.width/8,
            y: 0
        },
        end: {
            x: canvas.width/2,
            y: 0
        },
        stroke: "3px black",
        cap: "flat"
    }),
    noose: canvas.display.line({
        start: {
            x: canvas.width/2,
            y: 0
        },
        end: {
            x: canvas.width/2,
            y: canvas.height * .25 - canvas.height/12
        },
        stroke: "3px black",
        cap: "flat"
    }),
    head: canvas.display.ellipse({
        x: canvas.width / 2,
        y: canvas.height * (.25),
        radius_x: canvas.width / 12,
        radius_y: canvas.height / 12,
        stroke: "2px black"
    }),
    body: canvas.display.line({
        start: {
            x: canvas.width / 2,
            y: canvas.height * (.25) + canvas.height / 12
        },
        end: {
            x: canvas.width/2,
            y: canvas.height * .70
        },
        stroke: "3px black",
        cap: "flat"
    }),
    lArm: canvas.display.line({
        start: {
            x: canvas.width / 2,
            y: canvas.height / 2 * .80
        },
        end: {
            x: canvas.width/2 - canvas.width/5,
            y: canvas.height *.50
        },
        cap: "flat",
        stroke: "2px black"
    }),
    rArm: canvas.display.line({
        start: {
            x: canvas.width / 2,
            y: canvas.height / 2 * .80
        },
        end: {
            x: canvas.width/2 + canvas.width/5,
            y: canvas.height *.50
        },
        cap: "flat",
        stroke: "2px black"
    }),
    lLeg: canvas.display.line({
        start: {
            x: canvas.width/2,
            y: canvas.height * .70
        },
        end: {
            x: canvas.width/2 * .75,
            y: canvas.height * .95
        },
        cap: "flat",
        stroke: "3px black"
    }),
    rLeg: canvas.display.line({
        start: {
            x: canvas.width/2,
            y: canvas.height * .70
        },
        end: {
            x: canvas.width/2 * 1.25,
            y: canvas.height * .95
        },
        cap: "flat",
        stroke: "3px black"
    })
};

function main() {
    //set game in motion after
    if(gameEnv.active === false) {
        instructions.text("Press space bar to begin");
    }
    listener1.on("keyup", function(event){
        var e = event.key;
        if (e === " ") {
            console.log(e);
            listener1.off("keyup");
            gameEnv.startGame();
        }
    });
}

//declare jQuery objects
//start the magic
if (gameEnv.active === false) {
    var instructions = $("#instructions");
    var play_again = $("#replay");
    var wPost = $("#left");
    var lPost = $("#right");
    play_again.text("   ");
    var listener1 = $(document);
    listener1.ready(main());
}
