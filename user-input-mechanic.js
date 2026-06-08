class InputController {
  constructor() {
    // Current noise push, will be shared with the graphics teammate
    this.noiseStrength = 0.02;         
    
    // Target noise push used for smooth transitions
    this.targetNoiseStrength = 0.02;   
    
    // Toggles the crazy hype mode via spacebar
    this.is演奏Mode = false;           
    
    // Global speed booster shared with the graphics teammate
    this.globalSpeedMultiplier = 1.0;  
    
    // Container for all the active click ripples on screen
    this.ripples = [];                 

    // Drag trail buffer for mouse dragging effects
    this.dragTrail = [];
    this.maxTrailLength = 72;
    this.isDragging = false;
    // Match the canvas background (see sketch.js: background(40,8,96))
    this.trailBaseColor = { hue: 40, saturation: 8, brightness: 96 };
    // Drag-to-move circle interaction
    this.selectedCircleIndex = null;
    this.selectionRadius = 60; // pixels

    // Click flash effects triggered on presses
    this.clickEffects = [];
    this.clickEffectHue = 190;

    // Gravity field parameters for artistic influence
    this.gravityIntensity = 0;         // How strong the gravity field is
    this.targetGravityIntensity = 0;   // Target for smooth transitions
    
    // Mouse influence radius (how far the field extends)
    this.gravityRadius = 300;          // Pixels from mouse center
    
    // Vibration effect intensity
    this.vibrationStrength = 0;
    
    // Track previous mouse position for velocity calculation
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;
  }

  update() {
    // Catch how fast the mouse is moving right now
    let mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
    
    // Map mouse speed to our target noise push
    this.targetNoiseStrength = map(mouseSpeed, 0, 50, 0.01, 0.12, true);
    
    // Gravity field responds to mouse speed - creates artistic influence zone
    this.targetGravityIntensity = map(mouseSpeed, 0, 40, 0, 1, true);
    
    // Smooth out the movement so it doesn't look choppy
    this.noiseStrength = lerp(this.noiseStrength, this.targetNoiseStrength, 0.1);
    this.gravityIntensity = lerp(this.gravityIntensity, this.targetGravityIntensity, 0.15);
    
    // Vibration effect adds tremolo-like quality to the gravity field
    this.vibrationStrength = sin(frameCount * 0.05) * mouseSpeed * 0.01;
    
    // Handle the hype mode behavior when spacebar is active
    if (this.is演奏Mode) {
      // Keep adding extra noise and rev up the speed multiplier to 3x
      this.noiseStrength += 0.04;
      this.globalSpeedMultiplier = lerp(this.globalSpeedMultiplier, 3.0, 0.05);
      // Amplify gravity field in performance mode
      this.gravityIntensity = min(this.gravityIntensity + 0.02, 1.5);
    } else {
      // Bring the speed multiplier back down to normal
      this.globalSpeedMultiplier = lerp(this.globalSpeedMultiplier, 1.0, 0.05);
    }

    // Clean up dead ripples by looping backwards through the array
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      this.ripples[i].update();
      
      // Toss out the ripple if it's completely faded
      if (this.ripples[i].isDead()) {
        this.ripples.splice(i, 1);
      }
    }

    // Update active drag trail points so they fade gracefully
    for (let i = this.dragTrail.length - 1; i >= 0; i--) {
      const point = this.dragTrail[i];
      point.alpha -= 2.5 + point.fadeSpeed;
      point.size += 0.08;
      if (point.alpha <= 0) {
        this.dragTrail.splice(i, 1);
      }
    }

    // Update click flash animations
    for (let i = this.clickEffects.length - 1; i >= 0; i--) {
      this.clickEffects[i].update();
      if (this.clickEffects[i].isDead()) {
        this.clickEffects.splice(i, 1);
      }
    }
    
    // Store current mouse position for next frame
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;
  }

  display() {
    // Visualize the gravity field as an invisible aura around cursor
    if (this.gravityIntensity > 0.01) {
      push();
      noFill();
      strokeWeight(1);
      
      // Draw the gravity field boundary
      let alpha = this.gravityIntensity * 30;
      stroke(210, 85, 80, alpha);
      ellipse(mouseX, mouseY, this.gravityRadius * 2);
      
      // Draw inner intensity indicator
      let innerRadius = this.gravityRadius * this.gravityIntensity;
      stroke(210, 85, 80, alpha * 1.5);
      ellipse(mouseX, mouseY, innerRadius * 2);
      pop();
    }
    
    // Draw the drag trail from current and recent cursor motion
    if (this.dragTrail.length > 0) {
      push();
      noFill();
      for (let point of this.dragTrail) {
        stroke(point.hue, point.saturation, point.brightness, point.alpha);
        strokeWeight(point.weight);
        ellipse(point.x, point.y, point.size);
      }
      pop();
    }

    // Draw active click flashes from recent presses
    for (let effect of this.clickEffects) {
      effect.display();
    }

    // Draw all the active ripples on top of everything else
    for (let ripple of this.ripples) {
      ripple.display();
    }

    // If a circle is selected, draw an outline to indicate selection
    if (this.selectedCircleIndex !== null && typeof audioCircles !== 'undefined') {
      const idx = this.selectedCircleIndex;
      if (audioCircles[idx]) {
        const cx = audioCircles[idx].x * width;
        const cy = audioCircles[idx].y * height;
        push();
        noFill();
        stroke(0, 0, 0, 60);
        strokeWeight(2.5);
        ellipse(cx, cy, this.selectionRadius * 2);
        pop();
      }
    }
  }

  handleMousePressed() {
    // Attempt to select a nearby audio circle for dragging
    this.selectedCircleIndex = null;
    if (typeof audioCircles !== 'undefined') {
      let minDist = Infinity;
      let minIdx = null;
      for (let i = 0; i < audioCircles.length; i++) {
        const c = audioCircles[i];
        const dx = mouseX - c.x * width;
        const dy = mouseY - c.y * height;
        const d = sqrt(dx * dx + dy * dy);
        if (d < minDist) {
          minDist = d;
          minIdx = i;
        }
      }
      if (minDist <= this.selectionRadius) {
        this.selectedCircleIndex = minIdx;
      }
    }

    // Spawn a new ripple right where the user clicked
    this.ripples.push(new Ripple(mouseX, mouseY));
    this.clickEffects.push(new ClickEffect(mouseX, mouseY, this.clickEffectHue));
  }

  handleMouseDragged() {
    this.isDragging = true;
    const speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    const point = {
      x: mouseX,
      y: mouseY,
      size: map(speed, 0, 50, 18, 34, true),
      // Use a lower alpha so the trail blends with the canvas
      alpha: 60,
      fadeSpeed: map(speed, 0, 50, 1.8, 4.5, true),
      weight: map(speed, 0, 50, 1.2, 3.2, true),
      hue: map(speed, 0, 50, this.trailBaseColor.hue - 20, this.trailBaseColor.hue + 20, true),
      saturation: this.trailBaseColor.saturation,
      brightness: this.trailBaseColor.brightness
    };

    this.dragTrail.push(point);
    if (this.dragTrail.length > this.maxTrailLength) {
      this.dragTrail.splice(0, this.dragTrail.length - this.maxTrailLength);
    }

    // If a circle was selected, update its normalized position to follow the mouse
    if (this.selectedCircleIndex !== null && typeof audioCircles !== 'undefined') {
      const idx = this.selectedCircleIndex;
      audioCircles[idx].x = constrain(mouseX / width, 0, 1);
      audioCircles[idx].y = constrain(mouseY / height, 0, 1);
    }
  }

  handleMouseReleased() {
    this.isDragging = false;
    // Release any selected audio circle
    this.selectedCircleIndex = null;
  }

  handleKeyPressed() {
    // Check if the user hit the spacebar
    if (key === ' ') {
      // Flip the toggle switch for hype mode
      this.is演奏Mode = !this.is演奏Mode; 
    }
  }
}

class Ripple {
  constructor(x, y) {
    // Store the center coordinates of the ripple
    this.x = x;          
    this.y = y;          
    
    // Start with a small radius
    this.r = 10;         
    
    // Start at full opacity (cap is 100 in HSB)
    this.alpha = 100;    
    
    // How many frames the ripple stays alive
    this.lifespan = 35;  
    
    // Ripple color shifts based on click intensity
    this.hue = 210;      // Kandinsky's blue
    this.saturation = 85;
    
    // Harmonic layer - adds visual complexity
    this.harmonic = 1;
  }

  update() {
    // Make the ripple expand outwards with acceleration
    this.r += 4.5 + (sin(frameCount * 0.1) * 1.5);                      
    
    // Fade it out steadily over its lifespan
    this.alpha -= 100 / this.lifespan;
    
    // Color shifts cooler as ripple expands (artistic effect)
    this.hue = lerp(210, 240, 1 - this.alpha / 100);
  }

  display() {
    push();
    noFill();
    
    // Primary ripple - main wave
    strokeWeight(2.5);
    stroke(this.hue, this.saturation, 80, this.alpha); 
    ellipse(this.x, this.y, this.r * 2);
    
    // Harmonic ripple - creates chord-like visual effect
    if (this.alpha > 30) {
      strokeWeight(1.5);
      stroke(this.hue, this.saturation * 0.6, 80, this.alpha * 0.5);
      ellipse(this.x, this.y, this.r * 1.4);
    }
    
    // Secondary harmonic for richness
    if (this.alpha > 50) {
      strokeWeight(1);
      stroke(this.hue + 30, this.saturation * 0.4, 80, this.alpha * 0.3);
      ellipse(this.x, this.y, this.r * 0.7);
    }
    pop();
  }

  isDead() {
    // Returns true when the ripple is completely invisible
    return this.alpha <= 0;
  }
}

class ClickEffect {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.alpha = 100;
    this.hue = hue;
    this.saturation = 90;
    this.brightness = 100;
    this.lifespan = 24;
  }

  update() {
    this.r += 6.2;
    this.alpha -= 100 / this.lifespan;
  }

  display() {
    push();
    noFill();
    stroke(this.hue, this.saturation, this.brightness, this.alpha);
    strokeWeight(3);
    ellipse(this.x, this.y, this.r * 2);

    fill(this.hue, this.saturation, this.brightness, this.alpha * 0.25);
    noStroke();
    ellipse(this.x, this.y, this.r * 0.75);
    pop();
  }

  isDead() {
    return this.alpha <= 0;
  }
}
