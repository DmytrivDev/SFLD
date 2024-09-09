import Splide from '@splidejs/splide';

const carousell = document.querySelectorAll('.review__carousell');

if (carousell.length > 0) {
  const options = {
    type: 'slide',
    isNavigation: false,
    pagination: false,
    perPage: 2,
    perMove: 1,
    gap: '1.5rem',
    breakpoints: {
      960: {
        type: 'loop',
        gap: '.5rem',
      },
      760: {
        perPage: 1,
      }
    },
  };

  carousell.forEach(el => {
    new Splide(el, options).mount();
  });
}