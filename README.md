# Ecosystem Simulation

This is a small experimental project created using JavaScript and the p5.js library to simulate a simple ecosystem.  
The simulation includes plants, animals, and explosive elements with basic rules and interactions.

## Ecosystem Elements

- **Green (Grass)** — multiplies every 8 ticks.  
- **Yellow (Grass Eater)** — multiplies every 13 ticks, eats grass and trees, dies if next to a bear.  
- **Red (Super Grass Eater)** — multiplies every 12 ticks, hunts grass eaters, moves on empty spaces, dies if next to a bear.  
- **Brown (Bear)** — plants trees, eats grass, can die under certain conditions.  
- **Blue (Tree)** — multiplies every 15 ticks, dies if touched twice by grass eaters.  
- **Black (Bomb)** — explodes destroying itself and all adjacent cells, limited quantity and non-renewable.

## How to Run

1. Open the `index.html` file in a web browser.  
2. Enjoy the simulation of the ecosystem with its dynamic interactions.

## Notes

This project is experimental and a bit rough around the edges.  
It serves as a learning exercise in JavaScript, p5.js, and modeling ecosystems with simple rules.

