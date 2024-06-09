import Splide from '@splidejs/splide';
import Accordion from 'accordion-js';

const carousells = document.querySelectorAll('.country__carousell');

export const countryFunc = () => {
  const options = {
    type: 'slide',
    isNavigation: false,
    pagination: false,
    perPage: 1,
    perMove: 1,
    gap: '1.5rem',
  };

  carousells?.forEach(el => {
    new Splide(el, options).mount();
  });


  const accordeon = document.querySelector('.country__acc');

    if(accordeon) {
      const accOptions = {
        duration: 300,
        openOnInit: [0],
      }

      new Accordion(accordeon, accOptions);
    }
};
