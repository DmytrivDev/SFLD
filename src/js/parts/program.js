import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

export const progFunc = () => {
    const accordeon = document.querySelectorAll('.program__list');

    if(accordeon) {
      const accOptions = {
        duration: 300,
      }

      accordeon.forEach(el => {
        new Accordion(el, accOptions);
      })
    }
}