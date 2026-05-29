# 9103-tut5-group6
# Quiz 9 – Final Project Pitch

## Project Title

**Dynamic Abstract Composition**

---

## Part 1: Project Direction

### Project Path

Our team has chosen to **reinterpret an existing artwork**.

### Existing Artwork

Our project is inspired by an abstract composition in the style of **Wassily Kandinsky**, using circles, lines, triangles, grids, arcs, and geometric arrangements.

### Project Vision

Our project will reinterpret this abstract composition as a dynamic visual system. The original artwork uses circles, lines, triangles, grids, and arcs to create rhythm, movement, and balance. Instead of copying the image exactly, we want to bring these visual elements to life through code. Circles can pulse, lines can appear one by one, arcs can rotate, and small shapes can respond to sound, randomness, time, and user input. Our goal is to make the artwork feel like it is being constructed live on the screen. This allows the audience to see how simple geometric elements can build a complex and energetic composition.

---

## Part 2: Mechanics

### Team Members and Mechanics

| Team Member | Mechanic |
|---|---|
| Yixin Liu | Audio |
| Wanni Xiang | Time-based |
| Zihan Jiang | Perlin noise and randomness |
| Ruiqi Xu | User input |

---
### 🎵 Audio: Yixin Liu

The audio mechanic uses p5.js's FFT (Fast Fourier Transform) analysis to read 
the volume and frequency content of a music track in real time, driving visual 
changes in the circles and rings inspired by Kandinsky's Composition VIII. 
Kandinsky believed that art and music were deeply connected — he described 
colours and shapes as having their own "sound". This mechanic brings that 
philosophy to life: each circle in the composition pulses and expands in size 
according to the bass frequencies of the music, while the colour of the rings 
shifts along the hue spectrum in response to the treble frequencies. When the 
music is loud and energetic, the circles grow and glow with vivid colour; during 
quieter moments, they contract and fade, breathing with the rhythm of the track. 
Users can press the spacebar to play or pause the music, directly controlling 
the energy and visual dynamism of the entire composition. This mechanic 
reinforces the core idea of the reinterpretation: that Kandinsky's geometric 
world is not static, but alive with sound and movement.

## References
#### References

- [p5.FFT Reference](https://p5js.org/reference/p5.sound/p5.FFT/) — Official p5.js FFT documentation
- [p5.sound Library](https://p5js.org/reference/p5.sound/) — Official p5.sound library reference
- [Kandinsky and the Spirituality of Colour](https://www.wassilykandinsky.net/music.php) — Kandinsky's theory on the connection between music and visual art
- Original artwork: *Composition VIII* (1923) by Wassily Kandinsky


##  Time-based Mechanic

My time-based mechanic will control how the abstract composition appears and moves over time. Instead of showing all shapes at once, the circles, lines, triangles, and arcs will appear in stages using `frameCount`. Some large circles will gently pulse using `sin()`, while selected arcs will slowly rotate to create movement. This helps the artwork feel like it is being constructed live on the canvas. The mechanic is practical because it uses simple p5.js functions such as `circle()`, `line()`, `triangle()`, `arc()`, `frameCount`, `sin()`, and `rotate()`.

### Time-based References

- [p5.js frameCount Reference](https://p5js.org/reference/p5/frameCount/) — Official p5.js documentation for tracking time by counting frames. Useful for making shapes appear in stages over time.
- [p5.js sin() Reference](https://p5js.org/reference/p5/sin/) — Official p5.js documentation for sine wave motion. Useful for creating gentle pulsing effects for circles.
- [p5.js rotate() Reference](https://p5js.org/reference/p5/rotate/) — Official p5.js documentation for rotating the coordinate system. Useful for rotating arcs or abstract shape groups.
- [p5.js arc() Reference](https://p5js.org/reference/p5/arc/) — Official p5.js documentation for drawing arcs. Useful for recreating curved line elements from the original artwork.
- [p5.js line() Reference](https://p5js.org/reference/p5/line/) — Official p5.js documentation for drawing straight lines. Useful for creating diagonal structures and connection lines.



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
