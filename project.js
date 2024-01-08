const list = document.getElementById("image-list");

const handleOnDown = e => {
    e.preventDefault();
    list.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
    list.dataset.mouseDownAt = "0";
    list.dataset.prevPercentage = list.dataset.percentage;
};

const handleOnMove = e => {
  if (list.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(list.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained = parseFloat(list.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  list.dataset.percentage = nextPercentage;

  list.style.transform = `translate(${nextPercentage}%, -50%)`;

  for (const image of list.getElementsByClassName("image")) {
      image.style.objectPosition = `${100 + nextPercentage}% center`;
  }
};

window.addEventListener("mousedown", e => handleOnDown(e));
window.addEventListener("touchstart", e => handleOnDown(e.touches[0]));

window.addEventListener("mouseup", handleOnUp);
window.addEventListener("touchend", e => handleOnUp(e.touches[0]));

window.addEventListener("mousemove", e => handleOnMove(e));
window.addEventListener("touchmove", e => handleOnMove(e.touches[0]));

// Add the scroll event listener
window.addEventListener('wheel', handleOnScroll);
