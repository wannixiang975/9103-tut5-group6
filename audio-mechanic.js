// audio-mechanic.js
// Audio Mechanic by Yixin Liu
// Concentric circles inspired by Kandinsky's Composition VIII
// Driven by p5.js FFT audio analysis

let fft;
let music;
let isPlaying = false;
let amplitude;

function preloadAudio() {
  music = loadSound('music.mp3');
}

function setupAudio() {
  fft = new p5.FFT(0.8);
  amplitude = new p5.Amplitude();
  // Bind spectrum and volume analyzer to the loaded audio file
  fft.setInput(music);
  amplitude.setInput(music);
}

function drawAudio() {
  fft.analyze();

  let bass   = fft.getEnergy("bass")   / 255;
  let mid    = fft.getEnergy("mid")    / 255;
  let vol    = constrain(amplitude.getLevel() * 3, 0, 1);

  // Top-left main circle - responds to bass frequencies
  drawMainCircle(
    0.1 * width, 0.32 * height,
    (0.2 + bass * 0.08) * min(width, height),
    bass, vol
  );

  // Remaining segmented circles - all respond to bass frequencies
  drawSegmentCircle(
    0.12 * width, 0.46 * height,
    (0.09 + bass * 0.04) * min(width, height),
    [0, 15, 30], bass
  );

  drawSegmentCircle(
    0.09 * width, 0.78 * height,
    (0.08 + bass * 0.04) * min(width, height),
    [45, 55, 35], bass
  );

  drawSegmentCircle(
    0.72 * width, 0.48 * height,
    (0.11 + bass * 0.04) * min(width, height),
    [210, 230, 190], bass
  );

  drawSegmentCircle(
    0.5 * width, 0.85 * height,
    (0.06 + bass * 0.03) * min(width, height),
    [200, 220, 180], bass
  );

  drawSegmentCircle(
    0.81 * width, 0.82 * height,
    (0.1 + bass * 0.04) * min(width, height),
    [0, 0, 0], bass
  );
}

// Main circle renderer: black outer circle, purple inner circle, red outer glow
function drawMainCircle(cx, cy, size, energy, vol) {
  // Red outer glow effect
  push();
  noStroke();
  for (let r = size * 1.3; r > size * 0.9; r -= size * 0.02) {
    let alpha = map(r, size * 0.9, size * 1.3, 60, 0);
    let glowSize = map(energy, 0, 1, 1.0, 1.4);
    fill(0, 80, 70, alpha * (1 + energy));
    ellipse(cx, cy, r * glowSize, r * glowSize);
  }
  pop();

  // Black main circle body
  push();
  noStroke();
  fill(0, 0, 15, 95);
  ellipse(cx, cy, size, size);
  pop();

  // Pulsing purple inner circle reacting to volume
  push();
  noStroke();
  let innerSize = size * map(energy, 0, 1, 0.45, 0.55);
  fill(275, 50, 55, 90);
  ellipse(cx, cy, innerSize, innerSize);
  pop();
}

// Segmented colored annular ring renderer
function drawSegmentCircle(cx, cy, size, hues, energy) {
  let numSegments = 12;
  let angleStep = 360 / numSegments;

  // White base circle background
  push();
  noStroke();
  fill(0, 0, 95, 90);
  ellipse(cx, cy, size, size);
  pop();

  // Colored segmented outer ring
  push();
  let ringWidth = size * map(energy, 0, 1, 0.12, 0.22);
  let outerR = size / 2;
  let innerR = outerR - ringWidth;

  for (let i = 0; i < numSegments; i++) {
    let startAngle = i * angleStep - 90;
    let endAngle = startAngle + angleStep - 2;

    let hue = hues[i % hues.length];
    let sat = map(energy, 0, 1, 60, 95);
    let bri = map(energy, 0, 1, 70, 100);

    fill(hue, sat, bri, 90);
    noStroke();
    arc(cx, cy, size, size,
        radians(startAngle), radians(endAngle), PIE);
  }

  // White inner mask to form hollow ring shape
  fill(0, 0, 95, 95);
  ellipse(cx, cy, innerR * 2, innerR * 2);
  pop();

  // Small black center dot
  push();
  noStroke();
  fill(0, 0, 10, 90);
  ellipse(cx, cy, size * 0.15, size * 0.15);
  pop();
}

function audioKeyPressed() {
  if (key === ' ') {
    if (isPlaying) {
      music.pause();
      isPlaying = false;
    } else {
      music.play();
      isPlaying = true;
    }
  }
}

