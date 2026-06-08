// sketch.js
// Main file - connects all mechanics together
// Kandinsky Composition VIII - Interactive Reinterpretation

function preload() {
  preloadAudio();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  setupAudio();
}

function draw() {
  // Kandinsky's cream/off-white background
  background(40, 8, 96);

  // Draw audio mechanic (circles)
  drawAudio();
}

function keyPressed() {
  audioKeyPressed();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
