var canvas = oCanvas.create({
    //create oCanvas object for hanging man graphic
    canvas: "#canvas",
    fps: 60
});

man = {
    //draw all body parts seperately
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
    LArm: canvas.display.line({
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
    RArm: canvas.display.line({
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
    LLeg: canvas.display.line({
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
    RLeg: canvas.display.line({
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

$(document).ready(main());

function main() {
    console.log("press any key to start");
    $("body").on("keypress", startGame())

}

// canvas.addChild(man.head);
// canvas.addChild(man.body);
// canvas.addChild(man.LArm);
// canvas.addChild(man.RArm);
// canvas.addChild(man.LLeg);
// canvas.addChild(man.RLeg);
