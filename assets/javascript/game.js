var gameEnv = {
    word: $("#word"),
    wins: 0,
    losses: 0,
    sCount: 0,
    lCount: 0,
    active: false,
    winner: false,
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
        "standoff"
    ],
    parts: [
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
        var temp = [];
        for (var i = 0; i < string.length; i++) {
            temp.push(string[i])
        }
        return temp;
    },

    arrayToString: function (array) {
        var temp = "";
        for (var i = 0; i < array.length; i++) {
            temp += array[i]
        }
        return temp;
    },

    keyListener: function() {
        //checks win/loss status / grabs key and sends to check word
        if (this.lCount >= this.parts.length) {
            listener2.off();
            this.losses += 1;
            lPost.text(this.losses);
            instructions.text("You Loose");
            play_again.text("press the space bar to try again");
            main()
        }
        else if (this.sCount >= this.currentW.length) {
            listener2.off();
            this.wins += 1;
            wPost.text(this.wins);
            instructions.text("You Win");
            play_again.text("press the space bar to play again");
            main()
        }
        else {
            listener2.on("keyup", function(event) {
                e = event.key;
                listener2.off();
                gameEnv.checkWord(e)
            })
        }
    },

    checkWord: function (character) {
        console.log(character);
        var condition = true;
        var gotIt = false;
        this.currentW = this.stringToArray(this.currentW);
        this.hiddenW = this.stringToArray(this.hiddenW);
        while (condition) {
            var i = this.currentW.indexOf(character);
            if (i > -1) {
                this.currentW[i] = "_";
                this.hiddenW[i] = character;
                gotIt = true;
                this.sCount++;
            }
            else if (i < 0 && gotIt === true) {
                break;
            }
            else if (i < 0 && character === " ") {
                gotIt = true;
                break
            }
            else {
                if(this.lCount < this.parts.length) {
                    this.parts[this.lCount]();
                    this.lCount++;
                    break
                }
            }
        }
        this.currentW = this.arrayToString(this.currentW);
        this.hiddenW = this.arrayToString(this.hiddenW);
        this.word.text(this.hiddenW);
        listener2.off();
        this.keyListener()
    },

    startGame: function () {
        //setup new game environment
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
        // canvas.addChild(man.head);
        // canvas.addChild(man.body);
        // canvas.addChild(man.lArm);
        // canvas.addChild(man.lLeg);
        // canvas.addChild(man.rArm);
        // canvas.addChild(man.rLeg);
        instructions.text("Guess a letter");
        play_again.text("(use letter keys)");
        this.word.text(this.hiddenW);
        console.log(gameEnv.currentW);
        this.keyListener()
    }
};

var canvas = oCanvas.create({
    canvas: "#canvas",
    fps: 60
});

var man = {
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
//declare jQuery objects
var instructions = $("#instructions");
var play_again = $("#replay");
var wPost = $("#left");
var lPost = $("#right");
play_again.text("   ");
var listener1 = $(document);
var listener2 = $(document);
//start the magic
listener1.ready(main());

function main() {
    if(gameEnv.active === false) {
        instructions.text("Press space bar to begin");
    }
    listener1.on("keypress", function(event){
        var e = event.key;
        if (e === " ") {
            console.log(e);
            listener1.off();
            gameEnv.startGame();
        }
    });
}

