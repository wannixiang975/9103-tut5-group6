// Store line data
let timeLines = [];

// Perlin noise animation offset
let noiseOffset = 0;

function setupTimeMechanic() {

  angleMode(RADIANS);

  // Fixed random seed for consistent composition
  randomSeed(10);

  // Line objects
  timeLines = [

    {
      x1: 0.20,
      y1: 0.68,
      x2: 0.58,
      y2: 0.20,
      start: 0,
      end: 120,
      weight: 3
    },

    {
      x1: 0.31,
      y1: 0.63,
      x2: 0.84,
      y2: 0.55,
      start: 60,
      end: 180,
      weight: 3
    },

    {
      x1: 0.47,
      y1: 0.83,
      x2: 0.94,
      y2: 0.22,
      start: 120,
      end: 240,
      weight: 3
    },

    {
      x1: 0.58,
      y1: 0.17,
      x2: 0.71,
      y2: 0.82,
      start: 180,
      end: 300,
      weight: 2
    },

    {
      x1: 0.13,
      y1: 0.53,
      x2: 0.50,
      y2: 0.60,
      start: 240,
      end: 360,
      weight: 2
    },

    {
      x1: 0.72,
      y1: 0.13,
      x2: 0.93,
      y2: 0.87,
      start: 300,
      end: 420,
      weight: 2
    }

  ];
}

function drawTimeMechanic() {

  drawAnimatedLines();

  drawRotatingArcs();

  noiseOffset += 0.01;
}

function drawAnimatedLines() {

  for (let i = 0; i < timeLines.length; i++) {

    let l = timeLines[i];

    let progress = map(
      frameCount,
      l.start,
      l.end,
      0,
      1
    );

    progress = constrain(progress, 0, 1);

    let x1 = width * l.x1;
    let y1 = height * l.y1;

    let x2 = width * l.x2;
    let y2 = height * l.y2;

    let currentX = lerp(x1, x2, progress);
    let currentY = lerp(y1, y2, progress);

    // Perlin noise wobble
    let wobbleX = map(
      noise(noiseOffset + i),
      0,
      1,
      -10,
      10
    );

    let wobbleY = map(
      noise(noiseOffset + i + 100),
      0,
      1,
      -10,
      10
    );

    currentX += wobbleX;
    currentY += wobbleY;

    // Vintage low saturation colour palette
    let hueValue =
      25 +
      sin(frameCount * 0.01 + i) * 25;

    let saturationValue =
      30 +
      sin(frameCount * 0.008 + i) * 8;

    let brightnessValue =
      45 +
      sin(frameCount * 0.012 + i) * 10;

    stroke(
      hueValue,
      saturationValue,
      brightnessValue,
      80
    );

    strokeWeight(l.weight);

    line(
      x1,
      y1,
      currentX,
      currentY
    );
  }
}

function drawRotatingArcs() {

  noFill();

  strokeWeight(2);

  // Large arc

  push();

  translate(width * 0.52, height * 0.35);

  rotate(frameCount * 0.003);

  stroke(35, 20, 30, 70);

  arc(
    0,
    0,
    width * 0.18,
    width * 0.18,
    0,
    PI
  );

  arc(
    0,
    0,
    width * 0.12,
    width * 0.12,
    PI,
    TWO_PI
  );

  pop();

  // Small arc

  push();

  translate(width * 0.68, height * 0.60);

  rotate(frameCount * -0.002);

  stroke(5, 35, 45, 70);

  arc(
    0,
    0,
    width * 0.14,
    width * 0.14,
    0,
    PI
  );

  pop();
}