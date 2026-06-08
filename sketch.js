// sketch.js
// Main file - connects all mechanics together
// Kandinsky Composition VIII - Interactive Reinterpretation

let inputController;

function preload() {
  preloadAudio();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  setupAudio();
  setupPerlinRandomMechanic();
  setupTimeMechanic();
  inputController = new InputController();
}

function draw() {
  // Kandinsky's cream/off-white background
  background(40, 8, 96);

  if (inputController) {
    inputController.update();
    inputController.display();
  }
  
  drawPerlinRandomMechanic();
  drawTimeMechanic();
  // Draw audio mechanic (circles)
  drawAudio();
}

function keyPressed() {
  audioKeyPressed();
  if (inputController) {
    inputController.handleKeyPressed();
  }
}

function mousePressed() {
  if (inputController) {
    inputController.handleMousePressed();
  }
  perlinRandomMousePressed();
}

function mouseDragged() {
  if (inputController) {
    inputController.handleMouseDragged();
  }
}

function mouseReleased() {
  if (inputController) {
    inputController.handleMouseReleased();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
