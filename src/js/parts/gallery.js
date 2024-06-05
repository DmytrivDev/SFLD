import Splide from '@splidejs/splide';

const carousell = document.querySelector('.gallery__carousell');

export const galCar = () => {
  if (carousell) {
    const options = {
      type: 'loop',
      isNavigation: false,
      perPage: 4,
      perMove: 1,
      gap: '1.5rem',
      breakpoints: {
        960: {
          perPage: 1,
          arrows: false,
          pagination: false,
          gap: '0.75rem',
          fixedWidth: '9.75rem',
        },
      },
    };

    new Splide(carousell, options).mount();
  }
};
