function setup() {
  createCanvas(900, 600);
  angleMode(RADIANS);

  // Setup functions from each mechanic file
  setupAudioMechanic();
  setupTimeMechanic();
  setupPerlinRandomMechanic();
  setupUserInputMechanic();
}

function draw() {
  background(245, 238, 215);

  // Draw each mechanic layer
  drawAudioMechanic();
  drawTimeMechanic();
  drawPerlinRandomMechanic();
  drawUserInputMechanic();
}