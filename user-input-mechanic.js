// Handles all user interactions in the artwork
// Includes mouse trails, click effects and draggable elements
// Colors are chosen to match the overall visual style

class InputController {
  constructor() {
    this.trailParticles = [];
    this.ripples = [];
    
    // Settings for how often trail particles appear
    this.trailSpacing = 8;
    this.trailTimer = 0;
    
    // Main colors used for interaction effects
    // Chosen to blend with the artwork background
    this.trailColor = { h: 280, s: 65, b: 35 }; // Deep purple
    this.rippleColor = { h: 15, s: 85, b: 60 };  // Deep red-orange
    
    // Remember the last mouse position so the trail feels continuous
    this.prevMouseX = mouseX;
    this.prevMouseY = mouseY;

    // Interactive circles that can be moved around by the user
    this.draggableRings = [
      {
        id: 'main',
        x: 0.1 * width,
        y: 0.32 * height,
        baseSize: 0.2,
        type: 'main',
        hues: [275, 275, 275]
      },
      {
        id: 'seg1',
        x: 0.12 * width,
        y: 0.46 * height,
        baseSize: 0.09,
        type: 'segment',
        hues: [0, 15, 30]
      },
      {
        id: 'seg2',
        x: 0.09 * width,
        y: 0.78 * height,
        baseSize: 0.08,
        type: 'segment',
        hues: [45, 55, 35]
      },
      {
        id: 'seg3',
        x: 0.72 * width,
        y: 0.48 * height,
        baseSize: 0.11,
        type: 'segment',
        hues: [210, 230, 190]
      },
      {
        id: 'seg4',
        x: 0.5 * width,
        y: 0.85 * height,
        baseSize: 0.06,
        type: 'segment',
        hues: [200, 220, 180]
      },
      {
        id: 'seg5',
        x: 0.81 * width,
        y: 0.82 * height,
        baseSize: 0.1,
        type: 'segment',
        hues: [0, 0, 0]
      }
    ];

    this.draggingRing = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
  }
  
  update() {
    // Update all trail particles and remove old ones
    for (let i = this.trailParticles.length - 1; i >= 0; i--) {
      this.trailParticles[i].update();
      if (this.trailParticles[i].isAlive() === false) {
        this.trailParticles.splice(i, 1);
      }
    }
    
    // Update ripple animations and clean up finished effects
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      this.ripples[i].update();
      if (this.ripples[i].isFinished()) {
        this.ripples.splice(i, 1);
      }
    }
    
    // Add a new particle when the mouse moves enough distance
    this.trailTimer++;
    if (this.trailTimer >= this.trailSpacing) {
      let distance = dist(mouseX, mouseY, this.prevMouseX, this.prevMouseY);
      if (distance > 0) {
        this.trailParticles.push(
          new TrailParticle(
            mouseX,
            mouseY,
            this.trailColor.h,
            this.trailColor.s,
            this.trailColor.b
          )
        );
      }
      this.trailTimer = 0;
    }
    
    this.prevMouseX = mouseX;
    this.prevMouseY = mouseY;
  }
  
  display() {
    // Render every trail particle currently on screen
    for (let particle of this.trailParticles) {
      particle.display();
    }
    
    // Draw all active ripple effects
    for (let ripple of this.ripples) {
      ripple.display();
    }
  }
  
  handleMousePressed() {
    let ring = this.findRingUnderMouse();
    if (ring) {
      this.draggingRing = ring;
      this.dragOffsetX = ring.x - mouseX;
      this.dragOffsetY = ring.y - mouseY;
      return;
    }

    // Show a ripple wherever the user clicks
    this.ripples.push(
      new Ripple(
        mouseX,
        mouseY,
        this.rippleColor.h,
        this.rippleColor.s,
        this.rippleColor.b
      )
    );
  }
  
  handleMouseDragged() {
    if (this.draggingRing) {
      this.draggingRing.x = mouseX + this.dragOffsetX;
      this.draggingRing.y = mouseY + this.dragOffsetY;
    }
  }
  
  handleMouseReleased() {
    this.draggingRing = null;
  }
  
  handleKeyPressed() {
    // Reserved for future keyboard interactions
  }
  
  findRingUnderMouse() {
    for (let i = this.draggableRings.length - 1; i >= 0; i--) {
      let ring = this.draggableRings[i];
      let size = this.getCurrentRingSize(ring, this.getCurrentBass());
      let radius = size / 2;
      if (dist(mouseX, mouseY, ring.x, ring.y) <= radius) {
        return ring;
      }
    }
    return null;
  }
   // Get current bass intensity from the music
  getCurrentBass() {
    if (typeof fft === 'undefined') {
      return 0;
    }
    return fft.getEnergy('bass') / 255;
  }
   // Scale circles according to the audio level
  getCurrentRingSize(ring, bass) {
    let minDim = min(width, height);
    if (ring.type === 'main') {
      return (ring.baseSize + bass * 0.08) * minDim;
    }
    return (ring.baseSize + bass * 0.04) * minDim;
  }
   // Draw all audio-reactive circles using their current positions
  drawAudio() {
    let bass = this.getCurrentBass();
    let vol = (typeof amplitude !== 'undefined') ? constrain(amplitude.getLevel() * 3, 0, 1) : 0;

    for (let ring of this.draggableRings) {
      let size = this.getCurrentRingSize(ring, bass);
      if (ring.type === 'main') {
        drawMainCircle(ring.x, ring.y, size, bass, vol);
      } else {
        drawSegmentCircle(ring.x, ring.y, size, ring.hues, bass);
      }
    }

    if (this.draggingRing) {
      push();
      noFill();
      stroke(0, 0, 0, 80);
      strokeWeight(2);
      ellipse(this.draggingRing.x, this.draggingRing.y, this.getCurrentRingSize(this.draggingRing, bass));
      pop();
    }
  }
}

// Small particles left behind the mouse movement
class TrailParticle {
  constructor(x, y, h, s, b) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.h = h;
    this.s = s;
    this.b = b;
    this.radius = random(3, 7);
    this.life = 255;
    this.maxLife = 255;
    this.friction = 0.92;
    this.gravity = 0.05;
  }
  
  update() {
    // Simple movement behaviour for a more organic look
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    
    // Gradually disappear over time
    this.life -= 8;
  }
  
  display() {
    push();
    noStroke();
    let alpha = map(this.life, 0, this.maxLife, 0, 80);
    fill(this.h, this.s, this.b, alpha);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
  
  isAlive() {
    return this.life > 0;
  }
}

// Ripple effect class
class Ripple {
  constructor(x, y, h, s, b) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.s = s;
    this.b = b;
    this.radius = 0;
    this.maxRadius = 80;
    this.expandSpeed = 2;
    this.life = 255;
    this.maxLife = 255;
    this.strokeWeight = 2;
  }

   // Increase ripple size and reduce visibility
  update() {
    this.radius += this.expandSpeed;
    this.life -= 6;
  }
  
   // Draw the ripple as a fading outline
  display() {
    push();
    let alpha = map(this.life, 0, this.maxLife, 0, 100);
    stroke(this.h, this.s, this.b, alpha);
    strokeWeight(this.strokeWeight);
    noFill();
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }

   // Remove the ripple once it becomes too large or invisible
  isFinished() {
    return this.radius > this.maxRadius || this.life <= 0;
  }
}

// Override the audio draw function so draggable rings can move with user input.
const originalDrawAudio = (typeof drawAudio === 'function') ? drawAudio : null;
function drawAudio() {
  if (typeof inputController !== 'undefined' && inputController) {
    inputController.drawAudio();
  } else if (originalDrawAudio) {
    originalDrawAudio();
  }
}
