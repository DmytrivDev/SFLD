import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

const mainCarBlock = document.querySelector('.main__carousell');

export const mainCar = () => {
  if (mainCarBlock) {
    const options = {
      type: 'loop',
      isNavigation: true,
      perPage: 1,
      perMove: 1,
      gap: 0,
    };

    new Splide(mainCarBlock, options).mount();
  }
};
