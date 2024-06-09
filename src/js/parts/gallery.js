import Splide from '@splidejs/splide';
import Accordion from 'accordion-js';

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


  const accordeon = document.querySelectorAll('.gallpage__list');

    if(accordeon) {
      const accOptions = {
        duration: 300,
      }

      accordeon.forEach(el => {
        new Accordion(el, accOptions);
      })
    }
};
