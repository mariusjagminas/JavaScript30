if (isTouchScreenDevice()) disableOnTouchscreens();

function disableOnTouchscreens() {
  const projects = document.querySelectorAll(".touchscreen");
  projects.forEach(project => updateLink(project));
}

function updateLink(project) {
  project.removeAttribute("href");
  project.style.transform = "none";
  const div = document.createElement("div");
  div.classList = "not-available";
  div.innerHTML = ` <p class="not-available__text"> Not available on touchscreen devices </p>`;
  project.appendChild(div);
}

function isTouchScreenDevice() {
  return (
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch) ||
    navigator.maxTouchPoints > 0 ||
    window.navigator.msMaxTouchPoints > 0
  );
}
