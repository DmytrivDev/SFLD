import Splide from '@splidejs/splide';

export const wwdFunc = () => {
  const carousell = document.querySelectorAll('.wwd__carousell');

  const sliderOptions = {
    type: 'loop',
    perPage: 1,
    interval: 5000,
    rewindByDrag: true,
    perMove: 1,
    gap: '.5rem',
    drag: true,
    pagination: false,
    rewind: false,
  };

  carousell?.forEach(el => {
    const splide = new Splide(el, sliderOptions).mount();

    splide.on('moved', () => {
      updateSlideNumber(splide, el);
    });
  });

  function updateSlideNumber(slide, el) {
    const currentIndex = slide.index + 1;
    const totalSlides = slide.length;
    const spanElements = el.querySelectorAll('.index-page');

    spanElements.forEach(spanElement => {
      spanElement.textContent = `${currentIndex}/${totalSlides}`;
    });
  }
};
