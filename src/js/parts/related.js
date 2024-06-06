import Splide from '@splidejs/splide';

const carousell = document.querySelector('.related__carousell');

export const relatedCar = () => {
  if (carousell) {
    const blogItem = carousell.querySelector('.blogitem');
    
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
          autoWidth: false,
          perPage: 2,
        },
        600: {
          perPage: 1,
        },
      },
    };

    if(blogItem) {
      console.log('ddd')
      options.perPage = 2;
    }

    new Splide(carousell, options).mount();
  }
};
