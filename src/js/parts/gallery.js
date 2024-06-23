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
      let accOptions = {
        duration: 300,
      }

      let $index = 0;
      accordeon.forEach(el => {
        if($index === 0) {
          accOptions.openOnInit = [0];
        } else {
          delete accOptions.openOnInit;
        }
        new Accordion(el, accOptions);
        $index++;
      })
    }
};
