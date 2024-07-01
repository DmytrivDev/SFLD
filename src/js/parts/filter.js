import NiceSelect2 from 'nice-select2';

export const filterFunc = () => {
  const isFilter = document.querySelector('.filtercont');
  let selector;

  if (isFilter) {
    document.addEventListener('facetwp-loaded', function () {
      const pager = document.querySelector('.facetwp-pager');

      if(pager) {
        const pagerCont = pager.closest('.pagination__cont');
        const chldCount = pager.children.length;

        if(chldCount > 0) {
          pagerCont.style.display = 'block';
        } else {
          pagerCont.style.display = 'none';
        }
      }


      if (!document.querySelector('.nice-select.facetwp-dropdown')) {
        const selector = document.querySelector('.facetwp-dropdown');
        const firstOption = selector.querySelector('option');
        const optionText = firstOption.textContent.trim();
        selector.setAttribute('placeholder', optionText);
        new NiceSelect2(selector, {
          searchable: false,
          searchtext: 'zoek',
          selectedtext: 'geselecteerd',
        });
      }
    });
  }

  const sortCtrl = document.querySelector('.newsSort');

  if (sortCtrl) {
    document.addEventListener('facetwp-loaded', function () {
      selector = document.querySelector('.filter__sort select');

      const valSt = selector.value;

      if (valSt !== '') {
        sortCtrl.classList.add('sorted');
      } else {
        sortCtrl.classList.remove('sorted');
      }
    });

    sortCtrl.addEventListener('click', e => {
      e.preventDefault;

      const val = selector.value;

      if (val === '') {
        selector.value = '_';
      } else {
        selector.value = '';
      }

      FWP.refresh();
    });
  }

  function changeSel(val) {
    if (val === '') {
      sortCtrl.classList.remove('sorted');
    } else {
      sortCtrl.classList.add('sorted');
    }
  }

  if (selector) {
    const startVal = selector.value;

    changeSel(startVal);
  }
};
