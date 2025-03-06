import assets from './assets/*.png';

export default ({ state, ready }) => {
  let loaded = 0;
  const images = [
    'tank',
    'gun',
  ]

  for (const imageFileBaseName of images) {
    const image = new Image();
    image.onload = function () {
      state.images[imageFileBaseName] = image;
      loaded++;
      if (loaded === images.length) {
        ready();   // Start the ready() function on index.js
      }
    }
    image.src = assets[imageFileBaseName]
  }
}