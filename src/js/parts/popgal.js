import Splide from '@splidejs/splide';

export const popGal = () => {
  const gallery = document.querySelectorAll(
    '.gallery__carousell, .gallpage__gellery'
  );

  gallery?.forEach(el => {
    el.addEventListener('click', evt => {
      evt.preventDefault();

      const target = evt.target;
      const isInner = target.classList.contains('gallery__inner');

      if (isInner) {
        const gall = evt.currentTarget;
        const item = target.closest('.splide__slide');
        const slideIndex = item.dataset.index;

        createGallery(gall, slideIndex);
        document.querySelector('body').classList.add('overhide');
      }
    });
  });
};

const popgall = document.querySelector('.popgal__container');
const thumbGall = popgall.querySelector('.thumbnailSlider');
const thumbGallList = thumbGall.querySelector('.splide__list');
const mainbGall = popgall.querySelector('.productSlider');
const mainGallList = mainbGall.querySelector('.splide__list');

const options = {
  type: 'fade',
  perPage: 1,
  gap: '.25em',
  pagination: false,
};

const thumbnailOptions = {
  type: 'slide',
  perPage: 0,
  wheel: false,
  releaseWheel: false,
  gap: '.75em',
  height: '100%',
  fixedHeight: '7.75rem',
  pagination: false,
  isNavigation: true,
  rewind: true,
  focus: 0,
  arrows: false,
  direction: 'ttb',
  breakpoints: {
    980: {
      gap: '0.5em',
      fixedHeight: '6rem',
    },
    780: {
      type: 'loop',
      perPage: 6,
      direction: 'ltr',
      height: 'inherit',
      fixedWidth: '8rem',
      fixedHeight: '8rem',
      focus: 'center',
    },
  },
};

function createGallery(gall, index) {
  const slides = gall.querySelectorAll(
    '.splide__slide:not(.splide__slide--clone)'
  );
  let mainSlides = '';
  let thumbSlides = '';

  slides.forEach(el => {
    const inner = el.querySelector('.gallery__inner');
    const img = inner.dataset.img;
    const full = inner.dataset.full;
    const desc = inner.dataset.desc;

    mainSlides += `<li data-desc="${desc}" class="splide__slide">
        <img src="${full}" class="contain" alt="" />
      </li>`;

    thumbSlides += `<li class="splide__slide">
      <img src="${img}" class="cover" alt="" />
    </li>`;
  });

  thumbGallList.innerHTML = thumbSlides;
  mainGallList.innerHTML = mainSlides;

  options.start = index;

  const main = new Splide(mainbGall, options);

  main.on('moved', () => {
    updateSlideNumber(main, mainbGall);
  });

  const thumbnails = new Splide(thumbGall, thumbnailOptions);

  main.sync(thumbnails);
  main.mount();
  thumbnails.mount();

  updateSlideNumber(main, mainbGall);

  setTimeout(() => {
    popgall.classList.add('opened');
  }, 100);
}

const desccont = document.querySelector('.popfall__desc');
const down = document.querySelector('.galdown');

function updateSlideNumber(slide, el) {
  const currentIndex = slide.index + 1;
  const totalSlides = slide.length;
  const spanElements = el.querySelectorAll('.index-page');

  spanElements.forEach(spanElement => {
    spanElement.textContent = `${currentIndex}/${totalSlides}`;
  });

  setTimeout(() => {
    const desc = el.querySelector('.splide__slide.is-active').dataset.desc;
    const src = el.querySelector('.splide__slide.is-active img').src;
    desccont.innerHTML = desc;
    down.href = src;
  }, 100);

  const closeGal = document.querySelectorAll('.closeGal');

  closeGal?.forEach(el => {
    el.addEventListener('click', evt => {
      evt.preventDefault();

      document.querySelector('body').classList.remove('overhide');
      document.querySelector('.popgal__container').classList.remove('opened');
    });
  });
}
