# Perxist
Graphic


The second project for the course is open-ended. Projects must be completed individually. You can create any program you want using WebGL and JavaScript that showcases what has been learned in the class. In general, I would like these projects to include perspective projection, lighting, and texturing (which we will cover as our next topic). In some cases, I may allow programs that do not include all of these aspects if they are sufficiently complex in one particular aspect. Here are some suggested categories that the projects can be examples of:

•	Simulations: One example I have seen assigned in other Graphics classes involves roller coaster simulations. However, this also involves modeling curves, which we will not necessarily get to cover in class (time permitting, it will be our final topic). You could also implement a simulation of a scenario related to physics; for example, something that includes gravity or collisions.

•	3-D exploration: You could implement a virtual 3-D environment and let the user explore it.

•	Games: For example, you could implement a first-person perspective game (think Doom) or something not exactly first person but where you see your character (think Temple Run). Of course, I would not expect the game to be as complex as either of those.

•	Complex modeling: You could model a very complex structure, landscape, or object (or set of objects), and allow the user to view the image from different angles and under different lighting conditions.

•	Analysis: You could implement a single application using two or more different approaches (e.g., different shading techniques, putting code in a shader vs. the application, etc.). You could apply each approach to multiple cases involving images of varying complexities. I would expect the code to be reasonably complex, and you would need to perform a detailed analysis comparing the various methods to arrive at some sort of conclusion.

You are also welcome to think about projects that do not fall into any of these categories.

<!-- 
This sounds fine. If the user is just moving left and right, try to
incorporate perspective by having a background that is behind the
user. Of course you can incorporate lighting by placing point or
directional light sources wherever you choose and texture be applying
it to the scenery (what is below the character and/or  the
background). I'm more interested in what the game looks like than in
how you keep score, but it sounds like what you suggest should not be
too difficult to incorporate. I'm also interested in how you make the
controls user friendly.

If it seem to hard to efficiently generate the scenery procedurally in
real-time, I'm fine having you pre-compute it, but that can still be
procedural (as opposed to manual). That is, you can procedurally
pre-compute a lot of scenery, paths, etc. and have the program
randomly choose between the pre-computed paths, or something like
that. Maybe have discrete and-points of each sub-path, and know which
other existing paths can start at each end-point. (Just an idea - do
what you think is best, keeping plausibility in mind.)

> I want to recreate a game like a side-scrolling platformer in 3-D. It
> would be similar to temple run where the user is timing jumps or ducks. If
> I allow 3-D movement then it'd become more of like a flight simulator with
> dodging. The way I want to make this unique is by logging user interaction
> and keeping score based on how much they interact (the minimal interaction
> would be the highest score) which is something I don't think has been done
> before. I haven't decided if the terrain will be procedurally generated or
> pre generated.
-->
