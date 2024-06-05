import { toggle, up } from 'slide-element';

export const headerFunc = () => {
  const body = document.querySelector('body');
  const scrollUp = 'scroll-up';
  const scrollDown = 'scroll-down';
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    if (!header.classList.contains('stopProg')) {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        body.classList.remove(scrollUp);
        return;
      }

      if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
        body.classList.remove(scrollUp);
        body.classList.add(scrollDown);
      } else if (
        currentScroll < lastScroll &&
        body.classList.contains(scrollDown)
      ) {
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
      }
      lastScroll = currentScroll;
    } else {
      lastScroll = 0;
    }
  });

  const header = document.querySelector('.header');
  const navMenu = document.querySelector('.header__list');
  navMenu.addEventListener('mouseover', changeHeader);

  function changeHeader(e) {
    const width = window.innerWidth;

    if (width > 960) {
      if (!header.classList.contains('stopProg')) {
        const isFirst = e.target.closest('.menu-item-has-children');
        const hasClass = e.target.closest('.menu-item-has-children');
        const isSubA = e.target.closest('li').closest('.sub-menu');

        if (isFirst) {
          header.classList.add('hoveredHeader');
        }

        if (hasClass) {
          header.classList.add('fixedDubble');
        }

        if (isSubA) {
          e.target.closest('.sub-menu').classList.add('hovered');
        }

        e.target.onmouseout = function (event) {
          header.classList.remove('fixedDubble');
          header.classList.remove('hoveredHeader');
          body.classList.remove('bodyOverlay');
          if (e.target.closest('.sub-menu')) {
            e.target.closest('.sub-menu').classList.remove('hovered');
          }
        };
      }
    }
  }

  const hamburgerButton = document.querySelector('.header__navctrl');
  hamburgerButton.addEventListener('click', showNavBox);

  function showNavBox(e) {
    e.preventDefault();

    body.classList.toggle('overhideMob');
    body.classList.toggle('openedNav');
  }

  const parentItems = document.querySelectorAll(
    '.nav__content .menu-item-has-children'
  );

  parentItems.forEach(el => {
    el.addEventListener('click', openSubNav);
  });

  function openSubNav(evt) {
    let isItem = evt.target.classList.contains('menu-item-has-children');
    let target = evt.target;

    if (evt.target.closest('.header__lang')) {
      isItem = true;
      target = evt.currentTarget;
    }

    if (isItem) {
      const nav = evt.currentTarget.querySelector('.sub-menu');

      target.classList.toggle('opened');
      toggle(nav);
    }
  }
};
