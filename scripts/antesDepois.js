var aDStyle = document.createElement('style');

const ADcss = `
    #AD--page {
      align-items: center;
      position: relative;
      background-color: rebeccapurple;
    }

    .AD--container {
      position: relative;
      width: 800px;
      height: 571px;
      overflow: hidden;
      border: 2px black solid;
    }

    .AD--circulo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px #42f032 solid;
    }

    .AD--divider {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 50%;
      width: 2rem;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 2px;
      background-color: #42f032;
      cursor: ew-resize;
      z-index: 3;
    }

    .AD--image-container {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%;
      overflow: hidden;
    }

    .AD--left-image, .AD--right-image {
      position: absolute;
      background-repeat: no-repeat;
      background-size: auto 100%;
      overflow: hidden;
    }

    .AD--left-image {
      background-image: url();
      background-position: left left;
      z-index: 2;
      left: 0;
    }

    .AD--right-image {
      z-index: 1;
      background-image: url();
      background-position: top right;
      right: 0;
    }

    `;

if (aDStyle.styleSheet) {
  aDStyle.styleSheet.cssText = ADcss;
} else {
  aDStyle.appendChild(document.createTextNode(ADcss));
}

document.head.appendChild(aDStyle);

const divider = document.querySelector('.AD--divider');
const leftImageContainer = document.querySelector('.AD--left-image');
const rightImageContainer = document.querySelector('.AD--right-image');
const container = document.querySelector('.AD--container');

let isDragging = false;

function onMouseMove(e) {
  if (!isDragging) {
    const xPos = e.clientX - container.getBoundingClientRect().left;
    const containerWidth = container.offsetWidth;
    const dividerWidth = divider.offsetWidth;
    const newPosition = xPos - (dividerWidth / 2);
    const minPos = 0;
    const maxPos = containerWidth - dividerWidth;

    if (newPosition >= minPos && newPosition <= maxPos) {
      divider.style.left = newPosition + 'px';
      leftImageContainer.style.width = newPosition + 'px';
      rightImageContainer.style.width = containerWidth - newPosition + 'px';
    }
  }
}

function startDragging(e) {
  isDragging = true;
  container.classList.add('resizing');
  if (e.type === 'touchstart') {
    document.addEventListener('touchmove', moveDivider);
  }
}

function stopDragging() {
  isDragging = false;
  container.classList.remove('resizing');
  document.removeEventListener('touchmove', moveDivider);
}

function moveDivider(e) {
  const clientX = e.clientX || e.touches[0].clientX;
  const xPos = clientX - container.getBoundingClientRect().left;
  const containerWidth = container.offsetWidth;
  const dividerWidth = divider.offsetWidth;

  const newPosition = xPos - (dividerWidth / 2);
  const minPos = 0;
  const maxPos = containerWidth - dividerWidth;

  if (newPosition >= minPos && newPosition <= maxPos) {
    const percentage = (newPosition / containerWidth) * 100;
    divider.style.left = percentage + '%';
    leftImageContainer.style.width = percentage + '%';
    rightImageContainer.style.width = (100 - percentage) + '%';
  }
}


if (window.innerWidth < 800) {

  divider.addEventListener('touchstart', startDragging);

  document.addEventListener('touchend', stopDragging);

} else {

  container.addEventListener('mouseover', () => {
    container.addEventListener('mousemove', onMouseMove);
  });

  container.addEventListener('mouseout', () => {
    container.removeEventListener('mousemove', onMouseMove);
  });

  divider.addEventListener('mousedown', (e) => {
    isDragging = true;
    container.classList.add('resizing');
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    container.classList.remove('resizing');
  });

}
