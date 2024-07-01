import axios from 'axios';

export const pagination = () => {
  async function loadFutureEvents(page) {
    try {
      const formData = new FormData();
      const castomP = document.querySelector('.custom-pagination');
      const perPage = castomP.dataset.perpage ? castomP.dataset.perpage : 5;
      const isBig = castomP.dataset.isbig;
      formData.append('action', 'load_future_events');
      formData.append('page', page);
      formData.append('perpage', perPage);
      formData.append('isbig', isBig);

      const response = await axios.post('/wp-admin/admin-ajax.php', formData);

      if (response.data) {
        document.querySelector('.events__listpaste').innerHTML =
          response.data.posts;

        // Оновлюємо пагінацію
        document.querySelector('.custom-pagination').innerHTML =
          response.data.pagination;

        // Додаємо слухачів до нових елементів пагінації
        addPaginationListeners();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Додаємо слухачів подій для елементів пагінації
  function addPaginationListeners() {
    var paginationLinks = document.querySelectorAll('.page-numbers');
    paginationLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        const searchParams = new URLSearchParams(new URL(url).search);
        let page = searchParams.get('paged');
        if (!page) {
          page = url.match(/\/page\/(\d+)/)[1];
        }

        loadFutureEvents(page);
      });
    });
  }

  // Ініціалізуємо слухачі при завантаженні сторінки
  addPaginationListeners();
};

// Виклик функції для ініціалізації пагінації при завантаженні сторінки
document.addEventListener('DOMContentLoaded', pagination);
