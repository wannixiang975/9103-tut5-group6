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
  }

  update() {
    // Catch how fast the mouse is moving right now
    let mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
    
    // Map mouse speed to our target noise push
    this.targetNoiseStrength = map(mouseSpeed, 0, 50, 0.01, 0.12, true);
    
    // Smooth out the movement so it doesn't look choppy
    this.noiseStrength = lerp(this.noiseStrength, this.targetNoiseStrength, 0.1);
    
    // Handle the hype mode behavior when spacebar is active
    if (this.is演奏Mode) {
      // Keep adding extra noise and rev up the speed multiplier to 3x
      this.noiseStrength += 0.04;
      this.globalSpeedMultiplier = lerp(this.globalSpeedMultiplier, 3.0, 0.05);
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
  }

  display() {
    // Draw all the active ripples on top of everything else
    for (let ripple of this.ripples) {
      ripple.display();
    }
  }

  handleMousePressed() {
    // Spawn a new ripple right where the user clicked
    this.ripples.push(new Ripple(mouseX, mouseY));
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
  }

  update() {
    // Make the ripple expand outwards
    this.r += 4.5;                      
    
    // Fade it out steadily over its lifespan
    this.alpha -= 100 / this.lifespan;  
  }

  display() {
    push();
    noFill();
    strokeWeight(2.5);
    
    // Using Kandinsky's iconic blue with dynamic alpha fading
    stroke(210, 85, 80, this.alpha); 
    ellipse(this.x, this.y, this.r * 2);
    pop();
  }

  isDead() {
    // Returns true when the ripple is completely invisible
    return this.alpha <= 0;
  }
}
