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


document.querySelector('.program__list')?.addEventListener('click', function(event) {
  // Знаходимо найближчий батьківський елемент <a>, якщо клік був всередині нього
  const anchor = event.target.closest('a');

  // Перевіряємо, чи існує такий елемент
  if (anchor) {
      const href = anchor.getAttribute('href');
      const target = anchor.getAttribute('target');

      // Якщо вказано target="_blank", відкриваємо посилання у новій вкладці
      if (target === '_blank') {
          window.open(href, '_blank');
      } else {
          // В іншому випадку здійснюємо перехід на сторінку
          window.location.href = href;
      }
  }
});

