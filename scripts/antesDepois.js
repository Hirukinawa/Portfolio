var aDStyle = document.createElement('style');

const ADcss = `
    #AD--page {
      align-items: center;
      position: relative;
    }

    .AD--container {
      position: relative;
      width: 800px;
      height: 571px;
      overflow: hidden;
      border: 2px black solid;
    }

    .AD--circulo {
      width: 45px;
      height: 45px;
      background: url('../assets/images/left-right.png') no-repeat center center, white;
      background-size: 80%;
      border-radius: 50%;
      border: .5rem #adadad solid;
    }

    .AD--divider {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 50%;
      height: 100%;
      top: 0;
      bottom: 0;
      width: .5rem;
      background-color: #adadad;
      cursor: ew-resize;
      z-index: 3;
    }

    .AD-divider img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .AD--image-container {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%;
      overflow: hidden;
    }

    .AD--left-image {
      left: 0;
    }

    .AD--right-image {
      right: 0;
    }

    .AD--left-image img, .AD--right-image img {
      width: auto;
      height: 100%;
      position: absolute;
      top: 0;
      overflow: hidden;
    }

    .AD--left-image img {
      left: 0;
      z-index: 2;
    }

    .AD--right-image img {
      right: 0;
      z-index: 1;
    }

    `;

if (aDStyle.styleSheet) {
  aDStyle.styleSheet.cssText = ADcss;
} else {
  aDStyle.appendChild(document.createTextNode(ADcss));
}

document.head.appendChild(aDStyle);

document.querySelectorAll('.AD--container').forEach(container => {
  const divider = container.querySelector('.AD--divider');
  const leftImageContainer = container.querySelector('.AD--left-image');
  const rightImageContainer = container.querySelector('.AD--right-image');

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
});

