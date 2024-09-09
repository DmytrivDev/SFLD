import scrollToElement from 'scroll-to-element';
import copy from 'copy-text-to-clipboard';

import { headerFunc } from './parts/header.js';
import { mainCar } from './parts/main.js';
import { galCar } from './parts/gallery.js';
import { filterFunc } from './parts/filter.js';
import { embedFunc } from './parts/embed.js';
import { relatedCar } from './parts/related.js';
import { wwdFunc } from './parts/whatwedo.js';
import { teamFunc } from './parts/team.js';
import { progFunc } from './parts/program.js';
import { searchF } from './parts/search.js';
import { popGal } from './parts/popgal.js';
import { countryFunc } from './parts/countries.js';
import { pagination } from './parts/events.js';
import './parts/graphick.js';
import './parts/reviews.js';
import './parts/map.js';

headerFunc();
mainCar();
galCar();
filterFunc();
embedFunc();
relatedCar();
wwdFunc();
teamFunc();
progFunc();
searchF();
popGal();
countryFunc();
pagination();

const scrollUp = document.querySelector('.scrollUp');

scrollUp?.addEventListener('click', evt => {
  evt.preventDefault();

  scrollToElement('body', {
    offset: 0,
    duration: 1500,
  });
});

const copyBtn = document.querySelectorAll('.copy');
copyBtn?.forEach(el => {
  // Створюємо властивість для зберігання таймера в кожному елементі
  el.timer = null;

  el.addEventListener('click', evt => {
    evt.preventDefault();

    const trg = evt.currentTarget;
    const text = trg.dataset.copy;

    copy(text);

    // Додаємо клас 'copied' до елементу
    trg.classList.add('copied');

    // Якщо вже існує таймер, обнуляємо його
    if (trg.timer) {
      clearTimeout(trg.timer);
    }

    // Встановлюємо новий таймер для зняття класу через 2 секунди
    trg.timer = setTimeout(() => {
      trg.classList.remove('copied');
      trg.timer = null; // Очищаємо таймер після завершення
    }, 2000);
  });
});

const footerNav = document.querySelector('.footer__nav');

footerNav.addEventListener('mouseover', evt => {
  const target = evt.target.tagName === 'A';

  if (target) {
    footerNav.classList.add('hovered');
  }
});

footerNav.addEventListener('mouseout', evt => {
  const target = evt.target.tagName === 'A';

  if (target) {
    footerNav.classList.remove('hovered');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Знаходимо всі посилання всередині .header__list
  const links = document.querySelectorAll('.header__list a[href*="#"]');

  links.forEach(link => {
    // Додаємо обробник події click до кожного посилання
    link.addEventListener('click', evt => {
      evt.preventDefault(); // Відміна дії за замовчуванням
    });
  });
});
