function setup() {
  createCanvas(900, 600);

  angleMode(RADIANS);
}

function draw() {
  background(245, 238, 215);

  // Draw different layers of the composition
  drawStaticShapes();
  drawPulsingCircles();
  drawAppearingLines();
  drawRotatingArcs();
  drawAppearingGrid();
}

// Draw basic static geometric shapes
// These shapes help establish the visual style of the original abstract artwork
function drawStaticShapes() {
  noStroke();

  fill(230, 180, 40);
  triangle(560, 250, 690, 340, 490, 360);

  fill(40, 140, 190);
  circle(680, 210, 60);

  fill(220, 60, 55);
  circle(430, 160, 25);

  fill(120, 90, 170);
  circle(700, 470, 50);
}

// Use time to make circles gently grow and shrink
// This creates a subtle pulsing effect
function drawPulsingCircles() {
  let pulse = sin(frameCount * 0.05) * 12;

  noStroke();

  fill(20);
  circle(140, 120, 150 + pulse);

  fill(120, 60, 150);
  circle(140, 120, 75 + pulse * 0.5);

  fill(240, 200, 50);
  circle(120, 450, 70 + pulse * 0.7);

  fill(40, 150, 200);
  circle(360, 520, 60 + pulse * 0.6);
}

// Draw lines that appear gradually over time
// Each line has a different start and end frame
function drawAppearingLines() {
  stroke(20);
  strokeWeight(3);

  drawLineAppear(180, 410, 520, 120, 30, 90);
  drawLineAppear(280, 380, 760, 330, 80, 140);
  drawLineAppear(420, 500, 850, 130, 130, 190);
  drawLineAppear(520, 100, 640, 500, 180, 240);
  drawLineAppear(120, 320, 450, 360, 230, 290);
  drawLineAppear(650, 80, 840, 520, 280, 340);

  strokeWeight(1.5);
  drawLineAppear(300, 160, 500, 90, 330, 390);
  drawLineAppear(500, 420, 760, 460, 380, 440);
}

// Helper function for drawing a line progressively
// map() turns frameCount into a progress value from 0 to 1
// lerp() uses that progress value to calculate the current end point
function drawLineAppear(x1, y1, x2, y2, startFrame, endFrame) {
  let amount = map(frameCount, startFrame, endFrame, 0, 1);
  amount = constrain(amount, 0, 1);

  let currentX = lerp(x1, x2, amount);
  let currentY = lerp(y1, y2, amount);

  line(x1, y1, currentX, currentY);
}

// Rotate arc elements over time
// push() and pop() keep the rotation from affecting other shapes
function drawRotatingArcs() {
  noFill();
  stroke(30);
  strokeWeight(3);

  push();
  translate(470, 220);
  rotate(frameCount * 0.01);
  arc(0, 0, 180, 180, 0, PI);
  arc(0, 0, 120, 120, PI, TWO_PI);
  pop();

  push();
  translate(610, 360);
  rotate(frameCount * -0.008);
  stroke(180, 50, 50);
  arc(0, 0, 130, 130, 0, PI);
  pop();
}

// Make a small grid appear after a delay
// The grid fades in using alpha transparency
function drawAppearingGrid() {
  if (frameCount < 220) {
    return;
  }

  let alphaValue = map(frameCount, 220, 300, 0, 255);
  alphaValue = constrain(alphaValue, 0, 255);

  stroke(20, alphaValue);
  strokeWeight(2);

  let startX = 730;
  let startY = 120;
  let spacing = 25;

  // Draw vertical and horizontal grid lines
  for (let i = 0; i < 5; i++) {
    line(startX + i * spacing, startY, startX + i * spacing, startY + 100);
    line(startX, startY + i * spacing, startX + 100, startY + i * spacing);
  }
}