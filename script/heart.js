document.addEventListener('DOMContentLoaded', function() {
 const heartButton = document.getElementById('heart-button')
const heartIcon = heartButton.querySelector('svg')
let isHeartGreen = false
if (heartButton && heartIcon) {
heartButton.addEventListener('click', function() {
if (!isHeartGreen) {
heartIcon.classList.add('heart-green')
isHeartGreen = true;
} else {
heartIcon.classList.remove('heart-green')
isHeartGreen = false
}
})
}
})

document.addEventListener('DOMContentLoaded', function() {
const shuffleButton = document.getElementById('shuffleButton')
const shuffleSvg = shuffleButton.querySelector('svg')
shuffleButton.addEventListener('click', function() {
if (shuffleSvg.style.fill === 'green') {
shuffleSvg.style.fill = ''
} else 
{
shuffleSvg.style.fill = 'green'
 }
  })
})