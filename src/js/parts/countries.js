import Splide from '@splidejs/splide';
import Accordion from 'accordion-js';

const carousells = document.querySelectorAll('.country__carousell');
const maxOnPage = 8;
let accordeonMain;

export const countryFunc = () => {
  const options = {
    type: 'slide',
    isNavigation: false,
    pagination: false,
    perPage: 1,
    perMove: 1,
    gap: '1.5rem',
  };

  carousells?.forEach(el => {
    new Splide(el, options).mount();
  });

  const accordeon = document.querySelector('.country__acc');

  if (accordeon) {
    const accOptions = {
      duration: 300,
    };

    accordeonMain = new Accordion(accordeon, accOptions);
  }

  const searchInput = document.getElementById('searchcountry');

  if (searchInput) {
    searchInput.addEventListener('input', searchCountries);

    openFilteredCont();
  }

  const checkboxes = document.querySelectorAll('input[name="country"]');

  checkboxes?.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      handleCheckboxChange(checkboxes);
    });
  });

  const toggleFilterBtn = document.querySelectorAll('.toggleFilter');

  toggleFilterBtn?.forEach(el => {
    el.addEventListener('click', evt => {
      evt.preventDefault();

      document.querySelector('.country__left').classList.toggle('openedFilter');
      document.querySelector('body').classList.toggle('overhideMob');
    });
  });

  const filteredList = document.querySelectorAll('.country__activefilters');
  const clearBtn = document.querySelectorAll('.clearBtn');

  filteredList?.forEach(el => {
    el.addEventListener('click', evt => {
      removeOneFilter(evt);
    });
  });

  clearBtn?.forEach(el => {
    el.addEventListener('click', removeAllFilters);
  });

  if (filteredList) {
    window.addEventListener('resize', evt => {
      setTimeout(() => {
        handleCheckboxChange(checkboxes);
      }, 100);
    });

    screen.orientation.addEventListener('change', evt => {
      setTimeout(() => {
        handleCheckboxChange(checkboxes);
      }, 400);
    });
  }

  const moreItemsButton = document.querySelector('.countries__more');
  const countriesListAcc = document.querySelector('.country__acc');

  moreItemsButton?.addEventListener('click', evt => {
    evt.preventDefault();

    const target = evt.currentTarget;
    const st = target.dataset.st;
    const ed = target.dataset.ed;
    const spans = target.querySelectorAll('span span');

    countriesListAcc.classList.toggle('showAll');

    if (countriesListAcc.classList.contains('showAll')) {
      spans?.forEach(el => {
        el.innerHTML = ed;
      });
    } else {
      spans?.forEach(el => {
        el.innerHTML = st;
      });
    }
  });

  const sortBtn = document.querySelector('.countrySort');

  sortBtn?.addEventListener('click', evt => {
    evt.preventDefault();

    sortBtn.classList.toggle('sorted');

    const items = Array.from(countriesListAcc.children);

    items.reverse();
    countriesListAcc.innerHTML = '';

    let index = 1;

    items.forEach(item => {
      item.classList.remove('st');

      if (item.classList.contains('visible') && index < maxOnPage) {
        item.classList.add('st');

        index++;
      }

      countriesListAcc.appendChild(item);
    });
  });

  // Новий код для перевірки параметру `country` в URL
  const countryParam = getParameterByName('country');
  if (countryParam) {
    const formattedCountry = formatCountryName(countryParam);
    checkboxes?.forEach(checkbox => {
      if (checkbox.value === formattedCountry) {
        checkbox.checked = true;
      }
    });
    handleCheckboxChange(checkboxes);

    const accItem = document.querySelector(
      '.countryItemAcc[data-country="' + formattedCountry + '"]'
    );

    if (accItem) {
      const nodes = Array.from(document.querySelectorAll('.countryItemAcc'));
      const itemAccIndex = nodes.indexOf(accItem);

      accordeonMain?.open(itemAccIndex);
    } else {
      accordeonMain?.open(0);
    }
  } else {
    accordeonMain?.open(0);
  }
};

// Функція для отримання значення параметра з URL
function getParameterByName(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Функція для формату параметра URL до формату значення інпута
function formatCountryName(countryParam) {
  return countryParam
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function searchCountries(evt) {
  const word = evt.target.value.toLowerCase();
  const ctrsList = document.querySelector('.countries__list');
  const ctrs = ctrsList.querySelectorAll('.countries__item');

  ctrs.forEach(el => {
    const name = el.dataset.country.toLowerCase();

    if (name.includes(word)) {
      el.classList.remove('hide');
    } else {
      el.classList.add('hide');
    }
  });
}

const handleCheckboxChange = checkboxes => {
  const selectedValues = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedValues.push(checkbox.value);
    }
  });

  const uniqueArray = [...new Set(selectedValues)];
  filterCountry(uniqueArray);
};

const filterCountry = array => {
  const clearBtns = document.querySelectorAll('.clearBtn');
  const filteredList = document.querySelectorAll('.country__activefilters');
  const countryItemsAcc = document.querySelectorAll('.countryItemAcc');
  const filteredListMob = document.querySelector('.mobCountriesList');
  const arrayLength = array.length;

  clearBtns?.forEach(el => {
    if (arrayLength === 0) {
      el.disabled = true;
      filteredListMob.classList.add('hidden');
    } else {
      el.disabled = false;
      filteredListMob.classList.remove('hidden');
    }
  });

  let filteredItems = '';

  array?.forEach(el => {
    const item = createFilteredItem(el);
    filteredItems += item;
  });

  let index = 0;

  if (array.length > 0) {
    countryItemsAcc?.forEach(el => {
      const country = el.dataset.country;

      el.classList.remove('st');
      el.classList.remove('visible');

      if (array.includes(country)) {
        el.classList.add('visible');

        if (index < maxOnPage) {
          el.classList.add('st');
        }

        index++;
      } else {
        el.classList.remove('visible');
      }
    });
  } else {
    countryItemsAcc?.forEach(el => {
      el.classList.remove('st');
      el.classList.add('visible');

      if (index < maxOnPage) {
        el.classList.add('st');
      }
      index++;
    });
  }

  const moreItemsButton = document.querySelector('.countries__more');
  if (index > maxOnPage) {
    moreItemsButton?.classList.add('visibleBtn');
  } else {
    moreItemsButton?.classList.remove('visibleBtn');
  }

  filteredList?.forEach(el => {
    el.innerHTML = filteredItems;

    countriesPaste(el);
  });
};

const createFilteredItem = arrEl => {
  return `<li>
          <button class="remFil" data-ctr="${arrEl}">
            <span>${arrEl}</span>
          </button>
        </li>`;
};

function countriesPaste(el) {
  const isBreack = checkLineBreaks(el);
  if (isBreack.isLineBreak) {
    const breakedItem = isBreack.breakedItem;

    breakedItem.insertAdjacentHTML(
      'beforebegin',
      `
        <li class="showMoreCtrsItem showItem">
          <button class="showMoreCtrs"></button>
        </li>
      `
    );

    el.insertAdjacentHTML(
      'beforeend',
      `
        <li class="showMoreCtrsItem hideItem">
          <button class="showMoreCtrs hide"></button>
        </li>
      `
    );

    const isBreackSec = checkLineBreaks(el);

    if (isBreackSec.breakedItem.classList.contains('showItem')) {
      el.querySelectorAll('.showItem')?.forEach(el => {
        el.remove();
      });

      isBreackSec.prevItem.insertAdjacentHTML(
        'beforebegin',
        `
          <li class="showMoreCtrsItem showItem">
            <button class="showMoreCtrs"></button>
          </li>
        `
      );
    }
  }
}

function checkLineBreaks(container) {
  const items = container.querySelectorAll('li');
  let previousTop = null;
  let isLineBreak = false;
  let breakedItem = '';
  let prevItem = '';

  items.forEach(item => {
    if (!isLineBreak && !item.classList.contains('showMoreCtrsItem')) {
      prevItem = item;
    }

    if (!item.classList.contains('hideItem')) {
      const itemTop = item.getBoundingClientRect().top;

      if (!isLineBreak && previousTop !== null && itemTop !== previousTop) {
        isLineBreak = true;
        breakedItem = item;
      }

      previousTop = itemTop;
    }
  });

  return { isLineBreak, breakedItem, prevItem };
}

const openFilteredCont = () => {
  const section = document.querySelector('.section__cointry');

  section.addEventListener('click', evt => {
    const target = evt.target;

    if (target.classList.contains('showMoreCtrs')) {
      const cpnt = target.closest('.filteredCont');
      const list = target.closest('.country__activefilters');

      cpnt.classList.toggle('openedFilter');

      list.querySelectorAll('.showMoreCtrsItem')?.forEach(el => {
        el.remove();
      });
      countriesPaste(list);
    }
  });
};

const removeOneFilter = evt => {
  evt.preventDefault();

  const target = evt.target;

  if (target.classList.contains('remFil')) {
    const data = target.dataset.ctr;

    const inputs = document.querySelectorAll('input[value="' + data + '"]');

    inputs?.forEach(el => {
      el.checked = false;
    });

    const checkboxes = document.querySelectorAll('input[name="country"]');
    handleCheckboxChange(checkboxes);
  }
};

const removeAllFilters = evt => {
  evt.preventDefault();

  const checkboxes = document.querySelectorAll('input[name="country"]');

  checkboxes?.forEach(el => {
    el.checked = false;
  });

  handleCheckboxChange(checkboxes);
};
