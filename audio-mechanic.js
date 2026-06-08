// audio-mechanic.js
// Audio Mechanic by Yixin Liu
// Concentric circles with gradient colours driven by FFT audio analysis

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
}

function drawAudio() {
  fft.analyze();

  let bass   = fft.getEnergy("bass")   / 255;
  let mid    = fft.getEnergy("mid")    / 255;
  let treble = fft.getEnergy("treble") / 255;
  let vol    = constrain(amplitude.getLevel() * 3, 0, 1);

  // Circle centres based on Kandinsky's Composition VIII
  let centres = [
    { x: 0.08, y: 0.28, maxSize: 0.35, energy: bass   }, // large left circle
    { x: 0.11, y: 0.44, maxSize: 0.15, energy: bass   }, // red circle
    { x: 0.08, y: 0.76, maxSize: 0.13, energy: mid    }, // yellow circle
    { x: 0.72, y: 0.47, maxSize: 0.18, energy: treble }, // blue circle right
    { x: 0.5,  y: 0.84, maxSize: 0.10, energy: mid    }, // small blue bottom
    { x: 0.8,  y: 0.81, maxSize: 0.16, energy: treble }, // grey circle
  ];

  for (let c of centres) {
    let cx = c.x * width;
    let cy = c.y * height;
    let maxR = (c.maxSize + c.energy * 0.1) * min(width, height);

    // Draw concentric circles from outside to inside
    // Each ring has a different hue creating a gradient effect
    let numRings = 12;
    for (let r = numRings; r > 0; r--) {
      let ratio = r / numRings;
      let ringSize = maxR * ratio;

      // Hue shifts from cool to warm as energy increases
      // Outside rings: cool blue/purple
      // Inside rings: warm red/orange/yellow
      let hue = map(ratio, 0, 1, 
        map(c.energy, 0, 1, 240, 180), // outer hue
        map(c.energy, 0, 1, 30, 60)    // inner hue
      );

      let sat = map(ratio, 1, 0, 
        map(vol, 0, 1, 40, 90),  // outer saturation
        map(vol, 0, 1, 60, 100)  // inner saturation
      );

      let bri = map(ratio, 1, 0,
        map(vol, 0, 1, 60, 85),  // outer brightness
        map(vol, 0, 1, 80, 100)  // inner brightness
      );

      push();
      noStroke();
      fill(hue % 360, sat, bri, 85);
      ellipse(cx, cy, ringSize, ringSize);
      pop();
    }
  }
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


