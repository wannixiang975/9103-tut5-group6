// audio-mechanic.js
// Audio Mechanic by Yixin Liu
// Concentric circles inspired by Kandinsky's Composition VIII
// Driven by p5.js FFT and amplitude analysis

let fft;
let music;
let isPlaying = false;
let amplitude;

function preloadAudio() {
  music = loadSound("music.mp3");
}

function setupAudio() {
  fft = new p5.FFT(0.8, 1024);
  amplitude = new p5.Amplitude();

  // Important: connect FFT and amplitude to the loaded music file.
  fft.setInput(music);
  amplitude.setInput(music);
}

function drawAudio() {
  if (!music) return;

  fft.analyze();

  let bass = fft.getEnergy("bass") / 255;
  let mid = fft.getEnergy("mid") / 255;
  let vol = constrain(amplitude.getLevel() * 5, 0, 1);

  // Smooth combined audio value for visible movement.
  let audioLevel = constrain((bass * 0.7 + mid * 0.2 + vol * 0.8), 0, 1);

  drawMainCircle(
    0.1 * width,
    0.32 * height,
    (0.2 + audioLevel * 0.12) * min(width, height),
    audioLevel,
    vol
  );

  drawSegmentCircle(
    0.12 * width,
    0.46 * height,
    (0.09 + audioLevel * 0.05) * min(width, height),
    [0, 15, 30],
    audioLevel
  );

  drawSegmentCircle(
    0.09 * width,
    0.78 * height,
    (0.08 + bass * 0.05) * min(width, height),
    [45, 55, 35],
    bass
  );

  drawSegmentCircle(
    0.72 * width,
    0.48 * height,
    (0.11 + mid * 0.05) * min(width, height),
    [210, 230, 190],
    mid
  );

  drawSegmentCircle(
    0.5 * width,
    0.85 * height,
    (0.06 + vol * 0.04) * min(width, height),
    [200, 220, 180],
    vol
  );

  drawSegmentCircle(
    0.81 * width,
    0.82 * height,
    (0.1 + audioLevel * 0.05) * min(width, height),
    [0, 0, 0],
    audioLevel
  );
}

function drawMainCircle(cx, cy, size, energy, vol) {
  push();
  noStroke();

  for (let r = size * 1.35; r > size * 0.9; r -= size * 0.02) {
    let alpha = map(r, size * 0.9, size * 1.35, 65, 0);
    let glowSize = map(energy, 0, 1, 1.0, 1.45);

    fill(0, 80, 70, alpha);
    ellipse(cx, cy, r * glowSize, r * glowSize);
  }

  fill(0, 0, 15, 95);
  ellipse(cx, cy, size, size);

  let innerSize = size * map(vol, 0, 1, 0.42, 0.58);
  fill(275, 50, 55, 90);
  ellipse(cx, cy, innerSize, innerSize);

  pop();
}

function drawSegmentCircle(cx, cy, size, hues, energy) {
  let numSegments = 12;
  let angleStep = 360 / numSegments;

  push();
  noStroke();

  fill(0, 0, 95, 90);
  ellipse(cx, cy, size, size);

  let ringWidth = size * map(energy, 0, 1, 0.12, 0.24);
  let outerR = size / 2;
  let innerR = outerR - ringWidth;

  for (let i = 0; i < numSegments; i++) {
    let startAngle = i * angleStep - 90;
    let endAngle = startAngle + angleStep - 2;

    let hue = hues[i % hues.length];
    let sat = map(energy, 0, 1, 55, 95);
    let bri = map(energy, 0, 1, 65, 100);

    fill(hue, sat, bri, 90);
    arc(
      cx,
      cy,
      size,
      size,
      radians(startAngle),
      radians(endAngle),
      PIE
    );
  }

  fill(0, 0, 95, 95);
  ellipse(cx, cy, innerR * 2, innerR * 2);

  fill(0, 0, 10, 90);
  ellipse(cx, cy, size * 0.15, size * 0.15);

  pop();
}

function audioKeyPressed() {
  if (key === " ") {
    if (isPlaying) {
      music.pause();
      isPlaying = false;
    } else {
      userStartAudio();
      music.loop();
      isPlaying = true;
    }
  }
}