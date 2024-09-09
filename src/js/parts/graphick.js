import Splide from '@splidejs/splide';

const graphickRights = document.querySelectorAll('.graphick__right');

const triggerOffset = 150;

function animateValue(element, start, end, duration, step) {
  const range = end - start;
  const increment = range / (duration / 16.66); // 60 кадрів в секунду (~16.66 мс на кадр)
  let current = start;
  const stepValue = step === 0 ? 1 : step === 1 ? 0.1 : 0.01;

  const animate = () => {
    current += increment;
    // Обмеження значення за напрямком інкрементації
    if ((range > 0 && current >= end) || (range < 0 && current <= end)) {
      element.textContent = end.toFixed(step);
    } else {
      element.textContent = current.toFixed(step);
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
}

function animateWidth(line, startWidth, targetWidth, duration) {
  const increment = (targetWidth - startWidth) / (duration / 16.66);
  let currentWidth = startWidth;

  const animate = () => {
    currentWidth += increment;
    if (
      (increment > 0 && currentWidth >= targetWidth) ||
      (increment < 0 && currentWidth <= targetWidth)
    ) {
      line.style.width = `${targetWidth}%`;
    } else {
      line.style.width = `${currentWidth}%`;
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
}

function startAnimation(graphickRight) {
  const items = graphickRight.querySelectorAll('.graphick__item');

  items.forEach(item => {
    const line = item.querySelector('.graphick__line');
    const val = item.querySelector('.graphick__val');
    const targetWidth = parseFloat(item.dataset.width) || 0;
    const targetNum = parseFloat(item.dataset.num.replace(',', '.')) || 0;
    const step = parseInt(item.dataset.step) || 0;

    // Запуск анімації ширини лінії та значення
    animateWidth(line, 0, targetWidth, 1000);
    animateValue(val, 0, targetNum, 1000, step);
  });
}

function checkVisibility() {
  graphickRights?.forEach(graphickRight => {
    const rect = graphickRight.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - triggerOffset;

    if (isVisible && !graphickRight.classList.contains('animated')) {
      graphickRight.classList.add('animated');
      startAnimation(graphickRight);
    }
  });
}

if (graphickRights.length > 0) {
  window.addEventListener('scroll', checkVisibility);

  document.addEventListener('DOMContentLoaded', checkVisibility);
}

const carousell = document.querySelectorAll('.graphick__carousell');

if (carousell.length > 0) {
  const options = {
    type: 'loop',
    isNavigation: false,
    pagination: false,
    perPage: 4,
    perMove: 1,
    gap: '1rem',
    breakpoints: {
      960: {
        perPage: 3,
      },
      800: {
        perPage: 2,
      },
      600: {
        perPage: 1,
      },
    },
  };

  carousell.forEach(el => {
    new Splide(el, options).mount();
  });
}

const carousellInsight = document.querySelectorAll('.insight__carousell');

if (carousellInsight.length > 0) {
  const options = {
    type: 'slide',
    isNavigation: false,
    pagination: false,
    perPage: 3,
    perMove: 1,
    gap: '1.5rem',
    breakpoints: {
      960: {
        type: 'loop',
        perPage: 3,
      },
      800: {
        perPage: 2,
      },
      600: {
        perPage: 1,
      },
    },
  };

  carousellInsight.forEach(el => {
    new Splide(el, options).mount();
  });
}
