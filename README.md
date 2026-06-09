# Kandinsky Composition VIII – Interactive Reinterpretation

## Inspiration

Our project is inspired by **Wassily Kandinsky's Composition VIII (1923)**.

Kandinsky's work uses geometric shapes, circles, lines, arcs, and colour relationships to create rhythm and balance within a static composition. We were interested in exploring how these visual elements could become interactive through code.

Instead of reproducing the artwork exactly, we reinterpret it as a dynamic digital experience. Through animation, sound, randomness, and user interaction, the composition gradually changes over time while still preserving the visual language and structure of the original artwork.

### Original Artwork

![Composition VIII](https://upload.wikimedia.org/wikipedia/commons/0/08/Vassily_Kandinsky%2C_1923_-_Composition_8.jpg)

### Additional Inspiration

- Kandinsky's use of geometric abstraction
- Motion graphics and generative art
- Interactive p5.js artworks
- Audio-reactive visualisations

---

# Techniques

This project was developed using **p5.js** and combines four mechanics into one interactive artwork.

### Key Techniques Used

- `frameCount()` for time-based animation
- `lerp()` for smooth line growth and transitions
- `sin()` for cyclical motion and pulsing effects
- `noise()` (Perlin Noise) for smooth organic movement
- `random()` and `randomSeed()` for controlled randomness
- `p5.FFT()` for audio frequency analysis
- `mousePressed()`, `mouseDragged()` and keyboard input
- `push()`, `pop()`, `translate()` and `rotate()` for geometric transformations

### Team Design Decisions

Our team decided to maintain the recognisable structure of Kandinsky's Composition VIII while introducing movement and interaction.

Instead of dramatically altering the artwork, we focused on making the geometric elements feel alive through gradual animation, sound response, randomness, and user participation.

---

# Mechanic Ownership

## Audio Mechanic – Team Member A

The audio mechanic uses **p5.FFT** to analyse frequency information from a sound file.

Different frequency bands influence the behaviour of visual elements such as circles and shapes. As the audio changes, the composition responds dynamically, creating a visual representation of sound.

---


## Time-Based Mechanic – Wanni Xiang

The time mechanic gradually builds the composition over time using `frameCount()`.

Lines appear progressively using `lerp()`, geometric elements rotate using `rotate()`, and subtle motion is created through `sin()` and `noise()`. A low-saturation colour palette was used to maintain a vintage Kandinsky-inspired appearance.

The purpose of this mechanic is to create a sense of growth and development, allowing the composition to slowly reveal itself rather than appearing all at once.

---

# AI Acknowledgement

This project used **ChatGPT** to assist with:

- Understanding p5.js functions and syntax
- Debugging code
- Improving code structure and modularity
- Writing comments and documentation
- Refining animation techniques

All AI-generated suggestions were reviewed, modified, and integrated by team members before implementation.

Example code comment:


---

# External References

## p5.js Reference

https://p5js.org/reference/

Used throughout the project to learn and implement p5.js functions.

---

## p5.Sound Library

https://p5js.org/reference/p5.sound/

Used for loading and analysing audio data.

---

## p5.FFT Documentation

https://p5js.org/reference/p5.sound/p5.FFT/

Used to implement the audio-reactive mechanic.

---

## Perlin Noise Documentation

https://p5js.org/reference/p5/noise/

Used to create smooth organic movement within the randomness and time mechanics.

Example code comment:

```javascript
// Perlin noise technique adapted from:
// https://p5js.org/reference/p5/noise/
```

---

# Interaction Instructions

## How to Experience the Work

1. Open the project in a web browser.
2. Press the Space bar to start the audio.
3. Watch the composition gradually develop over time.
4. Move and drag the mouse to interact with visual elements.
5. Observe how sound, time, randomness, and user input influence one another.

Because the project uses randomness and Perlin Noise, every experience will be slightly different.

---

# Team Members

| Team Member | Mechanic |
<<<<<<< HEAD
|---|---|
| Yixin Liu | Audio |
| Wanni Xiang | Time-based |
| Zihan Jiang | Perlin noise and randomness |
| Ruiqi Xu | User input |

---

### 🎵 Audio: Yixin Liu
This audio interactive module actualizes Wassily Kandinsky's synesthetic theory that geometric shapes and colors possess inherent sonic characteristics, reanimating his static work *Composition VIII* into a sound-responsive animated piece.

Developed with the `p5.sound` library, this system uses **p5.FFT frequency analysis** and amplitude detection to parse real-time audio data. The original classical piano audio file downloaded from Tunetank is renamed to `music.mp3` for simplified file referencing, which is loaded and read by the program. Audio signals are split into bass, midrange, and treble frequency bands, each mapped to exclusive circular visual elements on the canvas:
1. The prominent large circle in the upper-left corner (black outer body, purple inner circle, diffused red outer glow) reacts to bass frequency energy and overall volume. Its diameter expands and contracts with bass intensity, while the range and opacity of the red outer halo strengthen alongside rising bass power.
2. Five segmented colorful annular rings distributed across the canvas are assigned to different frequency ranges:
   - Red-orange segmented circle responds to bass frequencies
   - Yellow and pale light-blue segmented circles are driven by mid-range audio energy
   - Blue and grey-toned segmented circles follow treble frequency changes
The ring width, color saturation and brightness of each segmented circle dynamically scale up and down based on the energy level of its corresponding frequency band.

Users can press the **Spacebar** to play or pause the piano audio track to manually control the whole visual rhythm. When the piano melody is loud and energetic, all circular shapes swell in size with highly saturated bright colors; during soft, quiet passages of the piano piece, elements shrink and colors fade gently, letting the entire abstract composition breathe and flow synchronously with the cadence of classical piano music.

## References
#### References
- [p5.FFT Official Documentation](https://p5js.org/reference/p5.sound/p5.FFT/)
- [p5.sound Full Library Reference](https://p5js.org/reference/p5.sound/p5.sound/)
- [p5.Amplitude Reference](https://p5js.org/reference/p5.sound/p5.Amplitude/)
- Kandinsky's synesthesia and art theory: [Wassily Kandinsky - Music and Colour](https://www.wassilykandinsky.net/music.php)
- Original Artwork Reference: *Composition VIII*, 1923, Wassily Kandinsky
- Audio Source: Classical piano track originally named `tunetank-piano-classical-music-347514` from Tunetank, renamed locally to `music.mp3` for project use


##  Time-based Mechanic

My mechanic focuses on time-based animation inspired by the geometric structure of Kandinsky’s Composition VIII. I use frameCount, lerp(), and map() to gradually draw lines across the canvas, creating a sense of visual construction over time. Subtle colour transitions and Perlin noise are used to add gentle movement and variation, making the composition feel more organic. Rotating arc elements are also animated using rotate(), translate(), push(), and pop(), helping the artwork slowly evolve rather than appear all at once. This mechanic demonstrates how time can be used to reveal and transform visual elements.

### Time-based References

- [p5.js frameCount Reference](https://p5js.org/reference/p5/frameCount/) — Official p5.js documentation for tracking time by counting frames. Useful for making shapes appear in stages over time.
- [p5.js sin() Reference](https://p5js.org/reference/p5/sin/) — Official p5.js documentation for sine wave motion. Useful for creating gentle pulsing effects for circles.
- [p5.js rotate() Reference](https://p5js.org/reference/p5/rotate/) — Official p5.js documentation for rotating the coordinate system. Useful for rotating arcs or abstract shape groups.
- [p5.js arc() Reference](https://p5js.org/reference/p5/arc/) — Official p5.js documentation for drawing arcs. Useful for recreating curved line elements from the original artwork.
- [p5.js line() Reference](https://p5js.org/reference/p5/line/) — Official p5.js documentation for drawing straight lines. Useful for creating diagonal structures and connection lines.


## 🌊 Perlin noise and randomness: Zihan Jiang

For the Perlin Noise and Randomness mechanic, I focused on preserving the composition of Kandinsky’s *Composition VIII* while introducing subtle generative behaviour. Random values are used to regenerate the colours of the grid elements, creating controlled variation within the original structure. Perlin noise drives the length and movement of the diagonal bar elements, producing smooth and organic changes over time. I also refined the large circular form using gradient transitions and softer colours to better reflect the vintage and painterly qualities of the original artwork. The overall animation is intentionally restrained to maintain the visual balance of the composition.

### References
- [Refik Anadol Studio](https://dataland.art/blog/qualia)
- [teamlab Interactive Environment](https://www.teamlab.art/e/living_digital_space/)
- [p5.js noise() Reference](https://p5js.org/reference/p5/noise/)
- [p5.js random() Reference](https://p5js.org/reference/p5/random/)
- [p5.js lerp() Reference](https://p5js.org/reference/p5/lerp/)  
- Original artwork: *Composition VIII* (1923) by Wassily Kandinsky

## User Input Mechanic

The user input mechanic will allow viewers to interact with the abstract composition using the mouse or keyboard. For example, when the user clicks on the canvas, a new circle, line, or triangle can appear. Moving the mouse could also influence the direction, size, or colour of nearby shapes. This mechanic makes the viewer part of the composition process rather than only watching the artwork. It connects to the project vision because the final piece is not just a fixed image; it is a system that can change and respond. By adding simple user interaction, the abstract artwork becomes more playful and active, while still using basic geometric elements from the original image.

### User Input References

- [p5.js mouseX Reference](https://p5js.org/reference/p5/mouseX/) — Official p5.js documentation for tracking the mouse’s horizontal position.
- [p5.js mouseY Reference](https://p5js.org/reference/p5/mouseY/) — Official p5.js documentation for tracking the mouse’s vertical position.
- [p5.js mousePressed() Reference](https://p5js.org/reference/p5/mousePressed/) — Official p5.js documentation for detecting mouse clicks.
- [p5.js keyPressed() Reference](https://p5js.org/reference/p5/keyPressed/) — Official p5.js documentation for detecting keyboard input.

---

## Part 3: Putting It Together

All four mechanics will share the same canvas and visual language based on the original abstract artwork. The composition will be built from circles, lines, triangles, arcs, grids, and colour blocks. The time-based mechanic controls how shapes appear and move, the audio mechanic changes visual intensity, the randomness mechanic adds variation, and user input allows viewers to add or influence shapes. Together, these mechanics will turn a static abstract composition into a dynamic digital artwork.

---

## Final Concept Summary

This project reinterprets an abstract geometric artwork as a live animated composition. We will use simple p5.js shapes and beginner-friendly coding techniques to create movement, sound response, randomness, and interaction. The final work will keep the visual spirit of the original image while transforming it into a digital system that changes over time.
=======
|------------|----------|
| Yixin Liu | Audio Mechanic |
| Ruiqi Xu | User Input Mechanic |
| Zihan Jiang | Perlin Noise & Randomness Mechanic |
| Wanni Xiang | Time-Based Mechanic |
>>>>>>> f02c100b5882fbc1f8033330e12b3ed08851516d
