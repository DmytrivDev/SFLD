import Splide from '@splidejs/splide';

export const embedFunc = () => {
  const carousell = document.querySelectorAll('.gutenberg__carousell');

  const sliderOptions = {
    type: 'loop',
    perPage: 1,
    interval: 5000,
    rewindByDrag: true,
    perMove: 1,
    gap: 0,
    drag: true,
    pagination: false,
    rewind: false,
  };

  carousell?.forEach(el => {
    const splide = new Splide(el, sliderOptions).mount();
    updateSlideNumber(splide, el);
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

  /////////
  const videos = document.querySelectorAll('video');

  if (videos) {
    const videos = document.querySelectorAll('video');

    videos.forEach(el => {
      el.removeAttribute('controls');
    });

    window.addEventListener('click', playVideo);

    function playVideo(e) {
      const isVideo = e.target.classList.contains('wp-block-video');
      const isPlayed = e.target.classList.contains('played');

      if (isVideo && !isPlayed) {
        const video = e.target.querySelector('video');

        e.target.classList.add('played');
        video.setAttribute('controls', '');
        video.play();
      }
    }
  }
};
