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
        "tango"
    ],

    randomWord: function() {
        //pick random word from word bank
        var i = Math.floor(Math.random() * (gameEnv.bank.length));
        var wd = this.bank[i];
        this.bank.splice(i, 1);
        return wd
    },

    toArray: function(string) {
        var temp = [];
        for(var i = 0; i < string.length; i++) {
            temp.push(string[i])
        }
        return temp;
    },

    arrayToString: function(array) {
        var temp = "";
        for(var i = 0; i < array.length; i++) {
            temp += array[i]
        }
        return temp;
    },

    checkWord: function(character) {
        var condition = true;
        var gotIt = false;
        this.currentW = this.toArray(this.currentW);
        this.hiddenW = this.toArray(this.hiddenW);
        while(condition) {
            var i = this.currentW.indexOf(character);
            if(i > -1) {
                this.currentW[i] = "_";
                this.hiddenW[i] = character;
                gotIt = true;
                this.sCount++;
            }
            else if (i < 0 && gotIt === true ) {
                break;
            }
            else {
                this.lCount++;
                break
            }
        }
        this.currentW = this.arrayToString(this.currentW);
        this.hiddenW = this.arrayToString(this.hiddenW);
        this.word.text(this.hiddenW);
    },

    startGame: function () {
        //setup new game environment
        this.sCount = 0;
        this.lCount = 0;
        this.currentW = gameEnv.randomWord();
        this.active = true;
        this.hiddenW = "";
        for (var i = 0; i < gameEnv.currentW.length; i++) {
            this.hiddenW += "_";
        }
        guillotine.canvas.reset();
        instructions.text("Guess a letter");
        this.word.text(this.hiddenW);
        console.log(gameEnv.currentW);
    }
};

canvas = oCanvas.create({
    canvas: "#canvas",
    fps: 60
});

var guillotine = {
    //draw all body parts separately

    head: function() {
        return this.canvas.display.ellipse({
        x: this.canvas.width / 2,
        y: this.canvas.height * (.25),
        radius_x: this.canvas.width / 12,
        radius_y: this.canvas.height / 12,
        stroke: "2px black"
    })},
    body: function() {
        return this.canvas.display.line({
        start: {
            x: this.canvas.width / 2,
            y: this.canvas.height * (.25) + this.canvas.height / 12
        },
        end: {
            x: this.canvas.width/2,
            y: this.canvas.height * .70
        },
        stroke: "3px black",
        cap: "flat"
    })},
    LArm: function() {
        return this.canvas.display.line({
        start: {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2 * .80
        },
        end: {
            x: this.canvas.width/2 - this.canvas.width/5,
            y: this.canvas.height *.50
        },
        cap: "flat",
        stroke: "2px black"
    })},
    RArm: function() {
        return this.canvas.display.line({
        start: {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2 * .80
        },
        end: {
            x: this.canvas.width/2 + this.canvas.width/5,
            y: this.canvas.height *.50
        },
        cap: "flat",
        stroke: "2px black"
    })},
    LLeg: function() {
        return this.canvas.display.line({
        start: {
            x: this.canvas.width/2,
            y: this.canvas.height * .70
        },
        end: {
            x: this.canvas.width/2 * .75,
            y: this.canvas.height * .95
        },
        cap: "flat",
        stroke: "3px black"
    })},
    RLeg: function() {
        return this.canvas.display.line({
        start: {
            x: this.canvas.width/2,
            y: this.canvas.height * .70
        },
        end: {
            x: this.canvas.width/2 * 1.25,
            y: this.canvas.height * .95
        },
        cap: "flat",
        stroke: "3px black"
    })},
    drawList: [
        this.head,
        this.body,
        this.LArm,
        this.RArm,
        this.LLeg,
        this.RLeg
    ],
    drawNext: function (count) {
        this.canvas.addChild(this.drawList[count]);
    }
};
//declare jQuery objects

var instructions = $("#instructions");
var listener1 = $(document);
//start the magic
listener1.ready(main());

function main() {
    if(gameEnv.active === false) {
        instructions.text("Press any key to begin");
    }
    listener1.on("keypress", function(){
        gameEnv.startGame();
        listener1.off()
    });
}


// canvas.addChild(man.head);
// canvas.addChild(man.body);
// canvas.addChild(man.LArm);
// canvas.addChild(man.RArm);
// canvas.addChild(man.LLeg);
// canvas.addChild(man.RLeg);
