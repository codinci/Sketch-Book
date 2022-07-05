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

    //set up canvas tools in the Canvas category
    const canvasTools = select('section.toolbox div.canvas-tools');
    setupSaveButton(canvasTools);
    setupResetButton(canvasTools);

    //set up background style tools in the Background category
    const backgroundStyles = select('section.toolbox div.background-tools');
    setupBgColorPicker(backgroundStyles);
}

function makeLabel(tag, parentTag, text) {
    const label = createElement('label', text);
    label.parent(parentTag);
    tag.parent(label);
}

function setupBrushSelector(parentTag) {
    //create the brush selector as a <select> tag
    brushSelector = createSelect();
    //make a label for the menu
    makeLabel(brushSelector, parentTag, 'Paintbrush Style');

    //make an array of all paintbrush names
    const brushes = [
        'pen',
        'marker',
        'beads',
        'rainbowBeads',
        'wiggle',
        'toothPick',
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

//button helper function
function setupButton(text, parentTag, onClick) {
    const button = createButton(text);
    button.parent(parentTag);
    button.mousePressed(onClick);
    return button;
}

function saveFile() {
    saveCanvas('painting', 'png');
}

function setupSaveButton(parentTag) {
    setupButton('Save', parentTag, saveFile);
}

function resetCanvas() {
    resizeCanvas(windowWidth - toolboxWidth, windowHeight);
    background(bgColor);
}

function setupResetButton(parentTag) {
    setupButton('Reset', parentTag, resetCanvas);
}

function setupColorPicker(initialColor, parentTag, text, onChange) {
    const colorPicker = createColorPicker(initialColor);
    makeLabel(colorPicker, parentTag, text);
    colorPicker.changed(onChange);
    return colorPicker;
}

function setupBgColorPicker(parentTag) {
    const bgColorPicker = setupColorPicker(bgColor, parentTag, 'Background color', function() {
        bgColor =bgColorPicker.color();
        resetCanvas();
    });
}