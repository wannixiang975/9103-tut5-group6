// Store line data
let timeLines = [];
let secondaryLines = [];

// Perlin noise animation offset
let noiseOffset = 0;

function setupTimeMechanic() {

  angleMode(RADIANS);

  randomSeed(10);

  // Main animated lines

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
      weight: 4
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
      weight: 5
    }

  ];

  secondaryLines = [

    {x1:0.28,y1:0.18,x2:0.55,y2:0.30},
    {x1:0.48,y1:0.12,x2:0.72,y2:0.35},
    {x1:0.55,y1:0.08,x2:0.67,y2:0.40},
    {x1:0.74,y1:0.12,x2:0.95,y2:0.32},
    {x1:0.80,y1:0.10,x2:0.90,y2:0.80},
    {x1:0.42,y1:0.92,x2:0.72,y2:0.55},
    {x1:0.52,y1:0.80,x2:0.75,y2:0.50},
    {x1:0.18,y1:0.85,x2:0.42,y2:0.65},
    {x1:0.22,y1:0.78,x2:0.50,y2:0.70}

  ];

}


function drawTimeMechanic() {

  drawAnimatedLines();

  drawSecondaryLines();

  drawKandinskyCurve();

  drawRotatingArcs();

  drawBottomArcs();

  drawGridElement();

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
      20 +
      sin(frameCount * 0.003 + i) * 8;

    let saturationValue =
      18 +
      sin(frameCount * 0.003 + i) * 5;

    let brightnessValue =
      35 +
      sin(frameCount * 0.005 + i) * 10;

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

function drawSecondaryLines() {

  stroke(25,10,30,45);

  strokeWeight(1);

  for(let l of secondaryLines){

    line(
      width*l.x1,
      height*l.y1,
      width*l.x2,
      height*l.y2
    );
  }
}

function drawKandinskyCurve() {

  noFill();

  stroke(55,55,25,80);

  strokeWeight(3);

  beginShape();

  for(let x=0; x<width*0.38; x+=8){

    let y =
      height*0.92 +
      sin(x*0.03) * 18 +
      noise(x*0.01 + frameCount*0.01) * 12;

    curveVertex(x,y);
  }

  endShape();
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

  push();

  translate(width*0.58,height*0.72);

  rotate(frameCount*0.002);

  stroke(35,15,35,60);

  arc(
    0,
    0,
    width*0.09,
    width*0.09,
    PI,
    TWO_PI
  );

  pop();
}

function drawBottomArcs() {

  noFill();

  stroke(35,20,35,60);

  strokeWeight(1.5);

  let positions = [

    width*0.50,
    width*0.58,
    width*0.66,
    width*0.74

  ];

  for(let x of positions){

    arc(
      x,
      height*0.72,
      width*0.08,
      width*0.08,
      PI,
      TWO_PI
    );
  }
}

function drawGridElement() {

  let startX = width * 0.82;
  let startY = height * 0.20;

  stroke(20,0,25,50);

  strokeWeight(1);

  let spacing = 18;

  for(let i=0;i<4;i++){

    line(
      startX + i*spacing,
      startY,
      startX + i*spacing,
      startY + spacing*4
    );

    line(
      startX,
      startY + i*spacing,
      startX + spacing*4,
      startY + i*spacing
    );
  }
}