import { Panzoom } from '@fancyapps/ui/dist/panzoom/panzoom.esm.js';
import '@fancyapps/ui/dist/panzoom/panzoom.css';

const container = document.getElementById('myPanzoom');

if (container) {
  const options = { bounce: false, rubberband: false, click: false };

  new Panzoom(container, options);

  document.querySelectorAll('.popup.countryPop').forEach(popup => {
    // Отримуємо значення data-country і data-name з попапу
    const country = popup.getAttribute('data-country');
    const name = popup.getAttribute('data-name');

    // Знаходимо всі елементи path в межах .map__content, що відповідають pop-up
    document
      .querySelectorAll(`.map__content path[data-country="${country}"]`)
      .forEach(path => {
        // Додаємо data-name з попапу до path і клас selected
        path.setAttribute('data-name', name);
        path.classList.add('selected');
      });
  });

  // Створення підказки
  const tooltip = document.createElement('div');
  const clickText = document.querySelector('.map__content').dataset.click;
  tooltip.classList.add('tooltip');
  document.body.appendChild(tooltip);

  // Отримання всіх країн з класом selected
  const selectedCountries = document.querySelectorAll('path.selected');

  // Функція для показу підказки
  function showTooltip(event) {
    const countryName = event.target.getAttribute('data-name');
    tooltip.innerHTML = `<span>${countryName}</span><span>${clickText}</span>`;
    tooltip.style.opacity = '1';
    positionTooltip(event);
  }

  // Функція для приховування підказки
  function hideTooltip() {
    tooltip.style.opacity = '0';
  }

  // Функція для позиціонування підказки біля курсора
  function positionTooltip(event) {
    tooltip.style.left = `${event.pageX}px`;
    tooltip.style.top = `${event.pageY}px`;
  }

  // Додавання обробників подій до кожної країни
  selectedCountries.forEach(country => {
    country?.addEventListener('mouseenter', showTooltip);
    country?.addEventListener('mousemove', positionTooltip);
    country?.addEventListener('mouseleave', hideTooltip);
  });

  // Додаємо обробник подій на всі елементи path з класом selected всередині .map__content
  document
    .querySelectorAll('.map__content path.selected, .countries__item')
    .forEach(path => {
      path?.addEventListener('click', () => {
        // Отримуємо значення data-country з path
        const country = path.getAttribute('data-country');

        // Знаходимо відповідний попап з таким же data-country
        const popup = document.querySelector(
          `.countryPop[data-country="${country}"]`
        );

        // Якщо такий попап знайдено, додаємо класи
        if (popup) {
          popup.classList.add('opened'); // Додаємо клас opened до попапу
          document.body.classList.add('overhide'); // Додаємо клас overHide до body
          document
            .querySelector('.map__selectcont.opened')
            ?.classList.remove('opened');
        }
      });
    });

  document.querySelector('.map__popups')?.addEventListener('click', evt => {
    const target = evt.target;

    if (
      target.classList.contains('popup__close') ||
      target.classList.contains('overlay')
    ) {
      target.closest('.countryPop').classList.remove('opened');
      document.body.classList.remove('overhide');
    }
  });

  document.querySelector('.map__selectctr')?.addEventListener('click', evt => {
    const cont = evt.target.closest('.map__selectcont');

    // Перевірка, чи є клік по .map__selectcont
    if (cont) {
      cont.classList.toggle('opened');
    }
  });

  // Додаємо обробник подій на клік по всьому документу
  document.addEventListener('click', evt => {
    const cont = document.querySelector('.map__selectcont');

    // Перевірка, чи клік був за межами .map__selectcont
    if (cont && !cont.contains(evt.target)) {
      cont.classList.remove('opened'); // Видаляємо клас opened
    }
  });
}
