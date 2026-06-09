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
|------------|----------|
| Yixin Liu | Audio Mechanic |
| Ruiqi Xu | User Input Mechanic |
| Zihan Jiang | Perlin Noise & Randomness Mechanic |
| Wanni Xiang | Time-Based Mechanic |