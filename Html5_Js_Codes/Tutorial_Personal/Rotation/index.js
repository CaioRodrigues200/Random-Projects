import Tank from './tank';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Expand the canvas to de width and heigth of the screen
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const state = {
    mouse: {
        x: 0,
        y: 0,
    },
    tank: {
        x: 200,
        y: 200,
        rotation: 0,
    }
};

// Listen to the mouse position and updates on the variavle mouse.x and mouse.y
window.addEventListener('mousemove', (event) =>  {
    state.mouse.x = event.clientX;
    state.mouse.y = event.clientY;
});

// Using built-in request animation frame method to loop as fast as possible withou using too many resources
function loop(timestamp) {
  const progress = timestamp - lastRender;

  Tank.update({ progress, state })

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  Tank.draw({ ctx, state });

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
let lastRender = 0;
window.requestAnimationFrame(loop);