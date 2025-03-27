document.addEventListener('DOMContentLoaded', function() {
    const heartButton = document.getElementById('heart-button');
    const heartIcon = heartButton.querySelector('svg');
    let isHeartGreen = false;

    if (heartButton && heartIcon) {
      heartButton.addEventListener('click', function() {
        if (!isHeartGreen) {
          heartIcon.classList.add('heart-green');
          isHeartGreen = true;
        } else {
          heartIcon.classList.remove('heart-green');
          isHeartGreen = false;
        }
      });
    }
  });