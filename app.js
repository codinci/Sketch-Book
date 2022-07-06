//setting up global variables
const toolboxWidth = document.querySelector('section.toolbox').offsetWidth;
let canvas = null;
let brushSelector = null;
let bgColor = '#fbf8f3';
let paintColor = '#000000';
let ifRainbowColor = false;
let opacity = 220;
let brushSize = 1;

function setup() {
    setupToolBox();
    //set up the canvas
    canvas = createCanvas(windowWidth - toolboxWidth, windowHeight);
    canvas.parent(select('section.canvas'));
    background(bgColor);
}

function setPaintColor() {
    //set the color of the stroke and fill
    let newColor;
    if(ifRainbowColor) {
        const hue = (frameCount * 2) % 360;

        //set the color
        newColor = color(`hsba(${hue}, 100%, 100%, 0.6)`);
    } else {
        newColor = paintColor;
    }
    newColor.setAlpha(opacity);
    //set the stroke and fill color
    stroke(newColor);
    fill(newColor);
}

function draw() {
    //check if mouse button is pressed and mouse is hovering over the canvas
    if(mouseIsPressed && mouseX <= windowWidth - toolboxWidth) {
        //set the paint color
        setPaintColor();

        //draw on the canvas with the selected painting tool function
        window[selectedTool]();
    }
}

//functionality for adding in toolbox items
function setupToolBox() {
    //select the paint style tools in the Styles category
    const paintStyles = select('section.toolbox div.styles-tools');
    setupBrushSelector(paintStyles);
    setupPaintColorPicker(paintStyles);
    setupRainbowColorButton(paintStyles);
    setupOpacitySlider(paintStyles);
    setupBrushSizeSlider(paintStyles);

    //set up canvas tools in the Canvas category
    const canvasTools = select('section.toolbox div.canvas-tools');
    setupSaveButton(canvasTools);
    setupResetButton(canvasTools);

    //set up background style tools in the Background category
    const backgroundStyles = select('section.toolbox div.background-tools');
    setupBgColorPicker(backgroundStyles);
}

//functionality for making labels of individual tool items
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
        'hatching',
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

//setup background color picker
function setupBgColorPicker(parentTag) {
    const bgColorPicker = setupColorPicker(bgColor, parentTag, 'Background color', function() {
        bgColor =bgColorPicker.color();
        resetCanvas();
    });
}

function setupPaintColorPicker(parentTag) {
    const paintColorPicker = setupColorPicker(paintColor, parentTag, 'Paint Color', function () {
        paintColor = paintColorPicker.color();
        ifRainbowColor = false;
    });
    paintColor = paintColorPicker.color();
}

//setup rainbow color as fill fr the paintbrush selected
function setupRainbowColorButton(parentTag) {
    setupButton('Rainbow color', parentTag, function() {
        ifRainbowColor = !ifRainbowColor;
    })
}

//helper function that sets up a slider
function setupSlider(min, max, initialValue, step, text, parentTag, onInput) {
    const slider = createSlider(min, max, initialValue, step);
    makeLabel(slider, parentTag, text);
    slider.input(onInput);
    return slider;
}

function setupOpacitySlider(parentTag) {
    const opacitySlider = setupSlider(0, 255, opacity, 1, 'Opacity', parentTag, function () {
        opacity = opacitySlider.value();
    });
}

function setupBrushSizeSlider(parentTag) {
    const brushSizeSlider = setupSlider(1, 16, brushSize, 0.1, 'Brush Size', parentTag, function () {
        brushSize = brushSizeSlider.value();
    });
}

//keyboard functionality
function keyPressed () {
    if(keyCode === BACKSPACE) {
        resetCanvas();
    } else if(key === 's') {
        saveFile();
    } else if(key === 'r') {
        ifRainbowColor = !ifRainbowColor;
    }
}