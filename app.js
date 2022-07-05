//setting up global variables
const toolboxWidth = document.querySelector('section.toolbox').offsetWidth;
let canvas = null;
let brushSelector = null;
let bgColor = '#fbf8f3';

function setup() {
    setupToolBox();
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

function setupToolBox() {
    //select the paint style tools in the Styles category
    const paintStyles = select('section.toolbox div.styles-tools');
    setupBrushSelector(paintStyles);
}

function setupBrushSelector(parentTag) {
    //create the brush selector as a <select> tag
    brushSelector = createSelect();
    // put the brush selector dropdown menu inside of the Styles container
    brushSelector.parent(parentTag);

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
}

