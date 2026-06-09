// audio-mechanic.js
// Audio Mechanic by Yixin Liu
// Concentric circles inspired by Kandinsky's Composition VIII
// Driven by p5.js FFT audio analysis

// 改名规避和组员变量冲突
let audioFft;
let audioMusic;
let audioIsPlaying = false;
let audioAmplitude;

function preloadAudio() {
  audioMusic = loadSound('music.mp3');
}

function setupAudio() {
  audioFft = new p5.FFT(0.8);
  audioAmplitude = new p5.Amplitude();
}

function drawAudio() {
  audioFft.analyze();

  let bass   = audioFft.getEnergy("bass")   / 255;
  let mid    = audioFft.getEnergy("mid")    / 255;
  let treble = audioFft.getEnergy("treble") / 255;
  let vol    = constrain(audioAmplitude.getLevel() * 3, 0, 1);

  // ---- Main large circle at top-left ----
  drawMainCircle(
    0.1 * width, 0.32 * height,
    (0.2 + bass * 0.08) * min(width, height),
    bass, vol
  );

  // ---- Segmented colorful rings ----
  drawSegmentCircle(
    0.12 * width, 0.46 * height,
    (0.09 + bass * 0.04) * min(width, height),
    [0, 15, 30], bass  // red-orange tones
  );

  drawSegmentCircle(
    0.09 * width, 0.78 * height,
    (0.08 + mid * 0.04) * min(width, height),
    [45, 55, 35], mid  // yellow tones
  );

  drawSegmentCircle(
    0.72 * width, 0.48 * height,
    (0.11 + treble * 0.04) * min(width, height),
    [210, 230, 190], treble  // blue tones
  );

  drawSegmentCircle(
    0.5 * width, 0.85 * height,
    (0.06 + mid * 0.03) * min(width, height),
    [200, 220, 180], mid  // pale blue tones
  );

  drawSegmentCircle(
    0.81 * width, 0.82 * height,
    (0.1 + treble * 0.04) * min(width, height),
    [0, 0, 0], treble  // grey tones
  );
}

// Draw main large circle: black body, purple inner, red glow
function drawMainCircle(cx, cy, size, energy, vol) {
  push();
  noStroke();
  for (let r = size * 1.3; r > size * 0.9; r -= size * 0.02) {
    let alpha = map(r, size * 0.9, size * 1.3, 60, 0);
    let glowSize = map(energy, 0, 1, 1.0, 1.4);
    fill(0, 80, 70, alpha * (1 + energy));
    ellipse(cx, cy, r * glowSize, r * glowSize);
  }
  pop();

  push();
  noStroke();
  fill(0, 0, 15, 95);
  ellipse(cx, cy, size, size);
  pop();

  push();
  noStroke();
  let innerSize = size * map(energy, 0, 1, 0.45, 0.55);
  fill(275, 50, 55, 90);
  ellipse(cx, cy, innerSize, innerSize);
  pop();
}

// Draw segmented colorful ring circles
function drawSegmentCircle(cx, cy, size, hues, energy) {
  let numSegments = 12;
  let angleStep = 360 / numSegments;

  push();
  noStroke();
  fill(0, 0, 95, 90);
  ellipse(cx, cy, size, size);
  pop();

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

  fill(0, 0, 95, 95);
  ellipse(cx, cy, innerR * 2, innerR * 2);
  pop();

  push();
  noStroke();
  fill(0, 0, 10, 90);
  ellipse(cx, cy, size * 0.15, size * 0.15);
  pop();
}

function audioKeyPressed() {
  if (key === ' ') {
    if (audioIsPlaying) {
      audioMusic.pause();
      audioIsPlaying = false;
    } else {
      audioMusic.play();
      audioIsPlaying = true;
    }
  }
}

