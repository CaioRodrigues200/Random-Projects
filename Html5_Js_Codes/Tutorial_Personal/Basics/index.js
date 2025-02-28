const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Expand the canvas to de width and heigth of the screen
ctx.canvas.width = window.innerWidth;
ctx.canvas.heigth = window.innerHeight;

const state = {
    box: {
        x: 0,
        y: 0,
    }
};

// Clear and Draw the context each iteration
const draw = ({ ctx }) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.heigth);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(state.box.x, 0, 100, 100); // Fill the rect at position x=box.x, y=0, with width=100 and height=100
};

// Update the box.x position, incrementing it each iteration
const update = ({ progress }) => {
    state.box.x++;
}

// Using built-in request animation frame method to loop as fast as possible withou using too many resources
function loop(timestamp) {
  const progress = timestamp - lastRender;

  update({ progress })

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  draw({ ctx });

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
let lastRender = 0;
window.requestAnimationFrame(loop);