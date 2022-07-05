//setting up global variables
const toolboxWidth = document.querySelector('section.toolbox').offsetWidth;
let canvas = null;
let brushSelector = null;
let bgColor = '#fbf8f3';

function setup() {
    //create the brush selector as a <select> tag
    brushSelector = createSelect();
    //select the styles category in the toolbox
    const paintStyles = select('section.toolbox div.styles-tools');
    // put the brush selector dropdown menu inside of the Styles container
    brushSelector.parent(paintStyles);

    //make an array of all paintbrush names
    const brushes = [
        'pen',
        'marker',
        'beads',
        'rainbowBeads',
        'wiggle',
        'toothpick',
        'fountainPen',
        'splatter',
        'sprayPaint'
    ];

    //add in all of the paintbrush function names as menu options
    brushes.forEach(function (brush){
        brushSelector.option(brush);
    });

    //set in initial value of the currently selected paintbrush
    selectedTool = brushSelector.value();

    //update the selected paintbrush if the user picks a different menu option
    brushSelector.changed(function () {
        selectedTool = brushSelector.value();
    });

    //set up the canvas
    canvas = createCanvas(windowWidth - toolboxWidth, windowHeight);
    canvas.parent(select('section.canvas'));
    background(bgColor);
}

function draw() {
    //check if mouse button is pressed and mouse is hovering over the canvas
    if(mouseIsPressed && mouseX <= windowWidth - toolboxWidth) {
        //draw on the canvas with the selected painting tool function
        window[selectedTool]();
    }
}