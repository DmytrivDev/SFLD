import Splide from '@splidejs/splide';

const carousell = document.querySelector('.related__carousell');

export const relatedCar = () => {
  if (carousell) {
    const options = {
      type: 'slide',
      isNavigation: false,
      pagination: false,
      autoWidth: true,
      perPage: 3,
      perMove: 1,
      gap: '1.5rem',
      breakpoints: {
        960: {
          type: 'loop',
          autoWidth: false,
          perPage: 2,
        },
        600: {
          perPage: 1,
        },
      },
    };

    new Splide(carousell, options).mount();
  }
};
