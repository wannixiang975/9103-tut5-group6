// audio-mechanic.js
// Audio Mechanic by Yixin Liu
// Uses p5.js FFT to analyse music frequency and volume,
// driving visual changes in the circles of Kandinsky's Composition VIII

let fft;
let music;
let isPlaying = false;
let amplitude;

// Circle data based on Kandinsky's Composition VIII
// x, y are normalised (0-1), baseSize is proportion of canvas
let audioCircles = [
  { x: 0.08, y: 0.28, baseSize: 0.18, hue: 270, sat: 60, bri: 20 }, // large purple/black
  { x: 0.11, y: 0.44, baseSize: 0.08, hue: 0,   sat: 90, bri: 70 }, // red circle
  { x: 0.08, y: 0.76, baseSize: 0.07, hue: 45,  sat: 90, bri: 90 }, // yellow circle
  { x: 0.5,  y: 0.27, baseSize: 0.03, hue: 0,   sat: 90, bri: 70 }, // small red dot
  { x: 0.72, y: 0.47, baseSize: 0.1,  hue: 210, sat: 80, bri: 80 }, // blue circle right
  { x: 0.5,  y: 0.84, baseSize: 0.05, hue: 210, sat: 80, bri: 80 }, // small blue bottom
  { x: 0.8,  y: 0.81, baseSize: 0.09, hue: 0,   sat: 0,  bri: 60 }, // grey circle
];

function preloadAudio() {
  music = loadSound('music.mp3');
}

function setupAudio() {
  // FFT smoothing 0.8 = smooth response
  fft = new p5.FFT(0.8);
  amplitude = new p5.Amplitude();
}

function drawAudio() {
  // Analyse frequency spectrum
  fft.analyze();

  // Get energy in different frequency bands (0-255)
  let bass    = fft.getEnergy("bass")    / 255;
  let mid     = fft.getEnergy("mid")     / 255;
  let treble  = fft.getEnergy("treble")  / 255;

  // Get overall volume level (0-1)
  let vol = amplitude.getLevel();

  // Map volume to a stronger effect
  // minimum 0, maximum amplified by 3
  let volAmp = constrain(vol * 3, 0, 1);

  for (let i = 0; i < audioCircles.length; i++) {
    let c = audioCircles[i];

    let x = c.x * width;
    let y = c.y * height;

    // All circles respond to overall volume
    // Large circles expand more, small circles expand less
    let expansion = map(volAmp, 0, 1, 0, c.baseSize * 0.5);
    let size = (c.baseSize + expansion) * min(width, height);

    // Bass drives the large left circles extra
    if (i < 3) {
      size += bass * 0.05 * min(width, height);
    }

    // Mid frequency drives the middle circles
    if (i === 3 || i === 5) {
      size += mid * 0.03 * min(width, height);
    }

    // Treble drives the right circles
    if (i === 4 || i === 6) {
      size += treble * 0.04 * min(width, height);
    }

    // Colour gets more saturated and bright when loud
    let satBoost = map(volAmp, 0, 1, 0, 20);
    let briBoost = map(volAmp, 0, 1, 0, 15);

    push();
    noStroke();
    fill(
      c.hue,
      constrain(c.sat + satBoost, 0, 100),
      constrain(c.bri + briBoost, 0, 100),
      90
    );
    ellipse(x, y, size, size);
    pop();
  }
}

function audioKeyPressed() {
  // Spacebar to play/pause music
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

