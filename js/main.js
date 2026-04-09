/* Header */
const header = document.querySelector('header');

/* Hero Video */
const video = document.getElementById('heroVideo');
const muteBtn = document.getElementById('muteBtn');
const mutedSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
  <path d="M32.0833 14.5833L17.5 26.25H5.83331V43.75H17.5L32.0833 55.4166V14.5833Z" stroke="#3F1414" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M67.0833 26.25L49.5833 43.75" stroke="#3F1414" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M49.5833 26.25L67.0833 43.75" stroke="#3F1414" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `;
const unmutedSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
  <path d="M32.0833 14.5833L17.5 26.25H5.83331V43.75H17.5L32.0833 55.4167V14.5833Z" stroke="#3F1414" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M55.6208 14.3792C61.0888 19.8487 64.1604 27.2661 64.1604 35C64.1604 42.734 61.0888 50.1513 55.6208 55.6208M45.325 24.675C48.059 27.4098 49.5948 31.1185 49.5948 34.9854C49.5948 38.8524 48.059 42.5611 45.325 45.2958" stroke="#3F1414" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `;



/* Hero Video: Smooth Volume Transition */
let targetVolume = 0.5;
let currentVolume = 0.5;
function lerp(a, b, t) {
  return a + (b - a) * t;
}


/* Scroll Events */
window.addEventListener('scroll', () => {

    /* Header: Erscheinen nach bestimmten Scroll */
    if (window.scrollY > 950) { // Nach 950px scrollen
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }

    /* Hero Video: Leiser nach bestimmen Scroll */
    if (window.scrollY > 950) { // Nach 950px scrollen
        targetVolume = 0.2;
    } else {
        targetVolume = 0.5;
    }
});


/* Hero Video: Smooth Volume Transition */
function updateVolume() {
  // Lautstärke weich angleichen
  currentVolume = lerp(currentVolume, targetVolume, 0.02);
  heroVideo.volume = currentVolume;
  requestAnimationFrame(updateVolume);
}
updateVolume();


/* Hero Video: Mute Button */
muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;

    // Icon wechseln
    if (video.muted) {
        muteBtn.innerHTML = mutedSVG;
    } else {
        muteBtn.innerHTML = unmutedSVG;
    }
});