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
  { x: 0.08, y: 0.3,  baseSize: 0.18, hue: 270 }, // large purple/black circle
  { x: 0.1,  y: 0.44, baseSize: 0.08, hue: 0   }, // red circle
  { x: 0.08, y: 0.78, baseSize: 0.07, hue: 45  }, // yellow circle
  { x: 0.5,  y: 0.28, baseSize: 0.03, hue: 0   }, // small red dot
  { x: 0.72, y: 0.48, baseSize: 0.1,  hue: 210 }, // blue circle right
  { x: 0.5,  y: 0.85, baseSize: 0.05, hue: 210 }, // small blue circle bottom
  { x: 0.8,  y: 0.82, baseSize: 0.09, hue: 270 }, // grey/purple circle
];

function preloadAudio() {
  // Load music file - replace with your actual file name
  music = loadSound('music.mp3');
}

function setupAudio() {
  colorMode(HSB, 360, 100, 100, 100);

  // FFT smoothing 0.8 = smooth response
  fft = new p5.FFT(0.8);

  // Amplitude for overall volume
  amplitude = new p5.Amplitude();
}

function drawAudio() {
  // Analyse frequency spectrum
  fft.analyze();

  // Get energy in different frequency bands (0-255)
  let bass   = fft.getEnergy("bass")   / 255;
  let treble = fft.getEnergy("treble") / 255;

  // Get overall volume level (0-1)
  let vol = amplitude.getLevel();

  // Draw each circle
  for (let i = 0; i < audioCircles.length; i++) {
    let c = audioCircles[i];

    // Convert normalised position to actual canvas pixels
    let x = c.x * width;
    let y = c.y * height;

    // Large circles (index 0-2) respond to bass
    // Small circles (index 3-6) respond to treble
    let expansion = (i < 3) ? bass * 0.06 : treble * 0.03;
    let size = (c.baseSize + expansion) * min(width, height);

    // Colour shifts warmer (toward red) when loud
    // Colour shifts cooler (toward original) when quiet
    let hueShift = map(bass, 0, 1, 0, 30);
    let sat = map(vol, 0, 1, 60, 100);
    let bri = map(vol, 0, 1, 75, 100);

    push();
    noStroke();
    fill((c.hue + hueShift) % 360, sat, bri, 90);
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
