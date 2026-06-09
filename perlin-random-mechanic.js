// perlin-random-mechanic.js
// Mechanic: Perlin Noise + Randomness
//
// Randomness:
// - Creates random block colours, sizes, and pointer positions.
//
// Perlin Noise:
// - Smoothly changes block lengths.
// - Controls the breathing centre circle.
// - Controls dynamic outer rings.
// - Controls pointer length.


let perlinPalette = [];
let leftBlocks = [];
let rightBlocks = [];
let pointers = [];
let centreNoise;
let centreGradientSet;


// -------------------------
// Main functions
// -------------------------
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
  resetPerlinRandomMechanic();
  centreNoise = random(1000);
}

function drawPerlinRandomMechanic() {
  push();
  colorMode(RGB, 255, 255, 255, 255); // Add RGB to protect the mechanic.
  drawBlockGroup(leftBlocks, 245, 580, -55, -18, 28, 0.0035);
  drawBlockGroup(rightBlocks, 745, 145, -18, -28, 45, 0.0028);
  drawCentreSystem();
  pop();
}


// -------------------------
// Random data generation
// -------------------------
function resetPerlinRandomMechanic() {
  leftBlocks = createBlocks(11, 70, 120, 13, 18, 18);
  rightBlocks = createBlocks(8, 160, 260, 12, 17, 22);
  pointers = createPointers();
  centreGradientSet = random([
    ["#F1E5CC", "#8B6FA3", "#2A2A2A"], // cream → purple → black
    ["#F1E5CC", "#B86A5E", "#2A2A2A"], // cream → red → black
    ["#F1E5CC", "#6E8FAF", "#2A2A2A"], // cream → blue → black
    ["#F1E5CC", "#7F9A72", "#2A2A2A"]  // cream → green → black
  ]);
}

function createBlocks(count, minW, maxW, minH, maxH, gap) {
  let blocks = [];
  for (let i = 0; i < count; i++) {
    blocks.push({
      x: random(-4, 4),
      y: i * gap,
      baseW: random(minW, maxW),
      h: random(minH, maxH),
      col: random(perlinPalette),
      // Each block has its own noise seed, so lengths animate independently.
      n: random(1000)
    });
  }
  return blocks;
}

function createPointers() {
  let pointerColours = ["#B86A5E", "#7F9A72", "#2A2A2A"];
  let newPointers = [];
  for (let i = 0; i < 3; i++) {
    newPointers.push({
      angle: random(TWO_PI),
      speed: random(0.0018, 0.0042),
      baseLength: random(105, 145),
      inner: random(16, 24),
      startW: random(8, 12),
      endW: random(22, 30),
      col: color(pointerColours[i]),
      n: random(1000)
    });
  }
  return newPointers;
}


// -------------------------
// Block groups
// -------------------------
function drawBlockGroup(blocks, x, y, angle, minShift, maxShift, speed) {
  push();
  translate(x, y);
  rotate(radians(angle));
  for (let b of blocks) {
    // Perlin Noise smoothly changes block length over time.
    let w = b.baseW + map(noise(b.n), 0, 1, minShift, maxShift);
    drawBlock(b.x, b.y, w, b.h, b.col);
    b.n += speed;
  }
  pop();
}

function drawBlock(x, y, w, h, col) {
  let c = color(col);
  c.setAlpha(210);
  noStroke();
  fill(c);
  rect(x, y, w, h);
}


// -------------------------
// Centre system
// -------------------------
function drawCentreSystem() {
  push();
  translate(620, 410);
  // Main breathing value controlling the centre system.
  let pulse = map(noise(centreNoise), 0, 1, -30, 70);
  drawTriangleBehindCentre(pulse);
  drawCentreGradient(pulse);
  drawOuterRings(pulse);
  drawPointers();
  centreNoise += 0.005;
  pop();
}

function drawTriangleBehindCentre(pulse) {
  let c = color("#E2D8C7");
  c.setAlpha(180);
  noStroke();
  fill(c);
  let offset = pulse * 0.15;
  triangle(
    -220 - offset, 120,
    60, -170 - offset,
    180 + offset, 90
  );
}

function drawCentreGradient(pulse) {
  noStroke();
  let size = 58 + pulse;
  // Layered circles create a soft radial gradient.
  for (let r = size; r > 0; r--) {
    let t = map(r, size, 0, 0, 1);
    let cream = color(centreGradientSet[0]);
    let accent = color(centreGradientSet[1]);
    let black = color(centreGradientSet[2]);
    let c;
    if (t < 0.6) {
      c = lerpColor(cream, accent, t / 0.6);
    } else {
      c = lerpColor(accent, black, (t - 0.6) / 0.4);
    }
    c.setAlpha(120);
    fill(c);
    ellipse(0, 0, r * 2, r * 2);
  }
}

function drawOuterRings(pulse) {
  noFill();
  strokeCap(ROUND);
  for (let i = 0; i < 7; i++) {
    let ringNoise = noise(centreNoise + i * 0.45);
    let ringSize =
      96 +
      i * 8 +
      pulse +
      map(ringNoise, 0, 1, -18, 25);
    let alpha = map(i, 0, 6, 190, 30);
    let weight = map(i, 0, 6, 5.5, 1);
    let c = color("#2A2A2A");
    c.setAlpha(alpha);
    stroke(c);
    strokeWeight(weight);
    ellipse(0, 0, ringSize, ringSize);
  }
  noStroke();
  fill("#2A2A2A");
  ellipse(0, 0, 18, 18);
}


// -------------------------
// Segmented rotating pointers
// -------------------------
function drawPointers() {
  for (let p of pointers) {
    // Pointer length is controlled by Perlin Noise while rotation uses independent speeds.
    let len = p.baseLength + map(noise(p.n), 0, 1, -25, 38);
    drawSegmentedPointer(p, len);
    p.angle += p.speed;
    p.n += 0.006;
  }
}

function drawSegmentedPointer(p, len) {
  push();
  rotate(p.angle);
  let segmentCount = 7;
  let gap = 1.2;
  let startX = p.inner;
  let availableLength = len;
  let segmentLength = availableLength / segmentCount - gap;

  for (let i = 0; i < segmentCount; i++) {
    let x = startX + i * (segmentLength + gap);
    let t = i / (segmentCount - 1);
    let c = getPointerSegmentColour(p, i, t);
    c.setAlpha(215);
    noStroke();
    fill(c);
    let segmentHeight = lerp(p.startW, p.endW, t);
    rect(
      x,
      -segmentHeight / 2,
      segmentLength,
      segmentHeight
    );
  }
  pop();
}

function getPointerSegmentColour(p, index, t) {
  let base = color(p.col);
  let cream = color("#F1E5CC");
  let black = color("#2A2A2A");
  if (index % 3 === 0) {
    return base;
  } else if (index % 3 === 1) {
    return lerpColor(base, cream, 0.45);
  } else {
    return lerpColor(base, black, 0.35);
  }
}


// -------------------------
// Interaction
// -------------------------
function perlinRandomMousePressed() {
  // Regenerate all random values.
  resetPerlinRandomMechanic();
}
