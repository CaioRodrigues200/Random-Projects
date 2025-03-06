const drawGun = ({ ctx, state }) => {
  ctx.save()      // Saves the current game state
  ctx.translate(  // Translates the canvas origin point to the specified position
    state.tank.x,
    state.tank.y,
  );
  ctx.rotate(state.tank.gunRotation);  // Rotate the canvas
  ctx.drawImage(                       // Draw the gun image and centers it to the origin point (set by "ctx.translate()")
    state.images.gun,
    -state.images.gun.width / 2,
    -state.images.gun.height / 2,
  );
  ctx.restore(); // Restore the canvas state before the ctx.save(). This undoes the ctx.translate and ctx.rotate transformations.
}

const drawBody = ({ ctx, state}) =>

export default {
  update: ({ progress, state }) => {

  },
  draw: ({ ctx, state }) => {

  }
}