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

const handleOnScroll = e => {
    e.preventDefault(); 
  
    const list = document.getElementById("image-list");
    
    const scrollDelta = e.deltaY;
    
    const maxDelta = window.innerWidth * 3; 
    
    const percentage = (scrollDelta / maxDelta) * -100;
    
    const nextPercentageUnconstrained = parseFloat(list.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
    list.dataset.percentage = nextPercentage;
    list.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of list.getElementsByClassName("image")) {
      image.style.objectPosition = `${100 + nextPercentage}% center`;
    }
  
    list.dataset.prevPercentage = nextPercentage;
  };

window.addEventListener("wheel", handleOnScroll); 

window.addEventListener("mousedown", e => handleOnDown(e));
window.addEventListener("touchstart", e => handleOnDown(e.touches[0]));

window.addEventListener("mouseup", handleOnUp);
window.addEventListener("touchend", e => handleOnUp(e.touches[0]));

window.addEventListener("mousemove", e => handleOnMove(e));
window.addEventListener("touchmove", e => handleOnMove(e.touches[0]));

window.addEventListener("wheel", e => {
    e.preventDefault();
    handleOnScroll(e, true);
});
