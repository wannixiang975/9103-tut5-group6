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
| Name 1 | Audio |
| Wanni Xiang | Time-based |
| Name 3 | Perlin noise and randomness |
| Name 4 | User input |

---

## Time-based Mechanic

My time-based mechanic will control how the abstract composition appears and moves over time. Instead of showing all shapes at once, the circles, lines, triangles, and arcs will appear in stages using `frameCount`. Some large circles will gently pulse using `sin()`, while selected arcs will slowly rotate to create movement. This helps the artwork feel like it is being constructed live on the canvas. The mechanic is practical because it uses simple p5.js functions such as `circle()`, `line()`, `triangle()`, `arc()`, `frameCount`, `sin()`, and `rotate()`.

### Time-based References

- [p5.js frameCount Reference](https://p5js.org/reference/p5/frameCount/) — Official p5.js documentation for tracking time by counting frames. Useful for making shapes appear in stages over time.
- [p5.js sin() Reference](https://p5js.org/reference/p5/sin/) — Official p5.js documentation for sine wave motion. Useful for creating gentle pulsing effects for circles.
- [p5.js rotate() Reference](https://p5js.org/reference/p5/rotate/) — Official p5.js documentation for rotating the coordinate system. Useful for rotating arcs or abstract shape groups.
- [p5.js arc() Reference](https://p5js.org/reference/p5/arc/) — Official p5.js documentation for drawing arcs. Useful for recreating curved line elements from the original artwork.
- [p5.js line() Reference](https://p5js.org/reference/p5/line/) — Official p5.js documentation for drawing straight lines. Useful for creating diagonal structures and connection lines.

---

## Part 3: Putting It Together

All four mechanics will share the same canvas and visual language based on the original abstract artwork. The composition will be built from circles, lines, triangles, arcs, grids, and colour blocks. The time-based mechanic controls how shapes appear and move, the audio mechanic changes visual intensity, the randomness mechanic adds variation, and user input allows viewers to add or influence shapes. Together, these mechanics will turn a static abstract composition into a dynamic digital artwork.

---

## Final Concept Summary

This project reinterprets an abstract geometric artwork as a live animated composition. We will use simple p5.js shapes and beginner-friendly coding techniques to create movement, sound response, randomness, and interaction. The final work will keep the visual spirit of the original image while transforming it into a digital system that changes over time.
