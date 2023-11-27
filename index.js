window.addEventListener('DOMContentLoaded', () => {
  const targetCanvas = document.querySelector('.targetCanvas');
  const pixelizationRange = document.querySelector('.pixelization');
  const context = targetCanvas.getContext('2d');
  const search = window.location.search.slice(1);
  const query = Object.fromEntries(search.split('&').map(entries => entries.split('=').map(string => decodeURIComponent(string))));
  const image = new Image();
  image.src = query.url;
  image.addEventListener('load', () => {

    function setPixelation(ratio) {
      const aspectRatio = image.height / image.width;
      const width = Math.min(image.width, window.innerWidth, 800);
      const height = width * aspectRatio;
      targetCanvas.width = width;
      targetCanvas.height = height;

      const scaledWidth = targetCanvas.width / ratio;
      const scaledHeight = targetCanvas.height / ratio;

      context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
      context.msImageSmoothingEnabled = false;
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;
      context.drawImage(targetCanvas, 0, 0, scaledWidth, scaledHeight, 0, 0, targetCanvas.width, targetCanvas.height);
    }

    let pixelationTarget = 100;
    let pixelation = 100;
    function render() {
      pixelation = Math.floor((pixelation * 3 + pixelationTarget) / 4);
      setPixelation(pixelation);

      requestAnimationFrame(render);
    }

    render();

    pixelizationRange.addEventListener('input', (event) => {
      pixelationTarget = Number(event.target.getAttribute('max')) + 1 - Number(event.target.value);
    });
  })
})