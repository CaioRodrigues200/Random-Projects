const codeMap = {
  'w': 'up',
  's': 'down',
  'd': 'right',
  'a': 'left',
}

export default ({ state }) => {
  // Pressing the key down
  window.addEventListener('keydown', (event) => {
    state.input[codeMap[event.key]] = true;
  });

  // Release the key
  window.addEventListener('keyup', (event) => {
    state.input[codeMap[event.key]] = false;
  });

  // Mouse move
  window.addEventListener('mousemove', (event) => {
    state.mouse.x = event.clientX;
    state.mouse.y = event.clientY;
  });
}