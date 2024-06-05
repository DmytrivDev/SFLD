import scrollToElement from 'scroll-to-element';

import { headerFunc } from './parts/header.js';
import { mainCar } from './parts/main.js';
import { galCar } from './parts/gallery.js';
import { filterFunc } from './parts/filter.js';
import { embedFunc } from './parts/embed.js';
import { relatedCar } from './parts/related.js';
import { wwdFunc } from './parts/whatwedo.js';
import { teamFunc } from './parts/team.js';

headerFunc();
mainCar();
galCar();
filterFunc();
embedFunc();
relatedCar();
wwdFunc();
teamFunc();

const scrollUp = document.querySelector('.scrollUp');

scrollUp?.addEventListener('click', evt => {
  evt.preventDefault();

  scrollToElement('body', {
    offset: 0,
    duration: 1500
});
});
