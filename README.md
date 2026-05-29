## Time-based Mechanic – Wanni Xiang

My part focuses on the **time-based mechanic** of our abstract composition. I use time to control how different geometric elements appear and move on the canvas. Instead of showing the whole artwork at once, my code makes the composition build up gradually, so it feels like the abstract image is being generated live.

### What my mechanic does

My time-based mechanic includes three main effects:

1. **Lines gradually appear**

   * The diagonal lines are drawn from their starting points to their ending points over time.
   * This creates the feeling that the composition is being constructed step by step.

2. **Circles gently pulse**

   * Some circles slowly become larger and smaller.
   * This adds subtle movement and makes the static geometric shapes feel more alive.

3. **Arcs slowly rotate**

   * Some curved elements rotate over time.
   * This adds rhythm and motion to the abstract composition.

### How I implemented it in code

I used `frameCount` to track time in the sketch. Since `frameCount` increases every frame, it is useful for controlling when shapes appear and how they move.

For the lines, I used `map()` and `lerp()` to gradually draw each line. `map()` changes the current frame number into a progress value between 0 and 1. Then `lerp()` uses that progress value to calculate the current endpoint of the line. This makes the line grow smoothly instead of appearing immediately.

For the pulsing circles, I used `sin(frameCount * 0.05)`. The `sin()` function creates a smooth repeating value, so the circle size can slowly increase and decrease. This creates a breathing effect.

For the rotating arcs, I used `push()`, `translate()`, `rotate()`, and `pop()`. `translate()` moves the rotation point to the centre of the arc, and `rotate(frameCount * 0.01)` makes the arc slowly turn over time. `push()` and `pop()` keep this rotation from affecting other shapes.

### Coding techniques used

* `frameCount` – controls timing and animation progress
* `map()` – converts time into a useful range
* `lerp()` – creates gradual line drawing
* `sin()` – creates smooth pulsing movement
* `rotate()` – creates slow rotation
* `push()` and `pop()` – protect the drawing state
* `arc()`, `circle()`, `line()`, and `triangle()` – recreate geometric elements from the original artwork

### Why this mechanic fits the project

The original artwork uses many geometric shapes, lines, circles, arcs, and grids to create visual rhythm. My time-based mechanic keeps this visual language but adds motion. By making shapes appear, pulse, and rotate over time, the artwork becomes more dynamic while still staying close to the original abstract style.
