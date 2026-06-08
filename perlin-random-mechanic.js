// perlin-random-mechanic.js
// Mechanic: Perlin Noise + Randomness
// This file controls the random strip grids and the radial Perlin speaker.

let perlinPalette = [];
let randomStrips = [];
let radialRays = [];

function setupPerlinRandomMechanic() {
  perlinPalette = [
    color("#B86A5E"),
    color("#D6A94E"),
    color("#6E8FAF"),
    color("#7F9A72"),
    color("#8B6FA3"),
    color("#A48B6A"),
    color("#D9C7A3"),
    color("#2A2A2A"),
    color("#F1E5CC")
  ];

  createRandomStrips();
  createRadialRays();
}

function drawPerlinRandomMechanic() {
  drawLeftRandomStrips();
  drawRightRandomStrips();
  drawRadialSpeaker();
}

// -------------------------
// Random strip grids
// -------------------------

function createRandomStrips() {
  randomStrips = [];

  for (let i = 0; i < 22; i++) {
    randomStrips.push({
      noiseOffset: random(1000),
      colour: random(perlinPalette),
      baseLength: random(100, 240),
      height: random(10, 18)
    });
  }
}

function drawLeftRandomStrips() {
  push();
  translate(260, 560);
  rotate(radians(-55));

  for (let i = 0; i < 10; i++) {
    let s = randomStrips[i];
    let len = s.baseLength + map(noise(s.noiseOffset), 0, 1, -25, 50);

    drawStraightStrip(0, i * 20, len, s.height, s.colour);
    s.noiseOffset += 0.003;
  }

  pop();
}

function drawRightRandomStrips() {
  push();
  translate(760, 150);
  rotate(radians(-18));

  for (let i = 10; i < 22; i++) {
    let s = randomStrips[i];
    let len = s.baseLength + map(noise(s.noiseOffset), 0, 1, -35, 65);

    drawStraightStrip(0, (i - 10) * 18, len, s.height, s.colour);
    s.noiseOffset += 0.003;
  }

  pop();
}

function drawStraightStrip(x, y, w, h, col) {
  let c = color(col);
  c.setAlpha(205);

  noStroke();
  fill(c);
  rect(x, y, w, h);
}

// -------------------------
// Radial Perlin speaker
// -------------------------

function createRadialRays() {
  radialRays = [];

  let rayColours = [
    color("#B86A5E"),
    color("#D6A94E"),
    color("#6E8FAF")
  ];

  for (let i = 0; i < 3; i++) {
    radialRays.push({
      angle: random(TWO_PI),
      colour: rayColours[i],
      noiseOffset: random(1000),
      baseLength: random(95, 145),
      startWidth: random(7, 12),
      endWidth: random(18, 28)
    });
  }
}

function drawRadialSpeaker() {
  push();
  translate(620, 420);
  rotate(radians(-18));

  drawSpeakerCircle();

  for (let r of radialRays) {
    drawRadialRay(r);
    r.noiseOffset += 0.008;
  }

  pop();
}

function drawSpeakerCircle() {
  noFill();

  strokeWeight(8);
  stroke("#2A2A2A");
  ellipse(0, 0, 110, 110);

  strokeWeight(5);
  stroke("#6E8FAF");
  arc(0, 0, 96, 96, radians(210), radians(320));

  stroke("#D6A94E");
  arc(0, 0, 96, 96, radians(120), radians(180));

  stroke("#F1E5CC");
  arc(0, 0, 96, 96, radians(20), radians(60));

  noStroke();
  fill("#F1E5CC");
  ellipse(0, 0, 70, 70);

  fill("#2A2A2A");
  ellipse(0, 0, 18, 18);
}

function drawRadialRay(ray) {
  let len = ray.baseLength + map(noise(ray.noiseOffset), 0, 1, -30, 60);

  let inner = 22;
  let outer = inner + len;

  push();
  rotate(ray.angle);

  let c = color(ray.colour);
  c.setAlpha(215);
  fill(c);
  noStroke();

  beginShape();
  vertex(inner, -ray.startWidth / 2);
  vertex(outer, -ray.endWidth / 2);
  vertex(outer, ray.endWidth / 2);
  vertex(inner, ray.startWidth / 2);
  endShape(CLOSE);

  pop();
}

// Optional interaction: click to regenerate random colours and ray positions
function perlinRandomMousePressed() {
  createRandomStrips();
  createRadialRays();
}
