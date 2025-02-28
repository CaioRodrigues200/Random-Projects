// Import image from assets folder
import tankImageSrc from './assets/lula-rato-ladrao.png';

const tankImage = new Image();

tankImage.onload = () => {
    
}

tankImage.src = tankImageSrc

export default {
    // Get the angle from the tank to mouse using trigonometry
    update: ({ progress , state}) => {
        state.tank.rotation = Math.atan2(
            state.mouse.x - state.tank.x,
            -(state.mouse.y - state.tank.y),
        );
    },
    draw: ({ ctx, state }) => {
        ctx.save();
        ctx.translate(
            state.tank.x,
            state.tank.y,
        );
        ctx.rotate(state.tank.rotation);

        ctx.drawImage(
            // Drawing the image and putting the center of the image on the origin
            tankImage,
            -tankImage.width / 2,
            -tankImage.height / 2,
        )

        ctx.restore();
    }
}