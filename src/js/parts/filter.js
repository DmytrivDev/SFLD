import NiceSelect2 from 'nice-select2';

export const filterFunc = () => {
  const isFilter = document.querySelector('.filtercont');
  let selector;

  if (isFilter) {

    ////////////////Temp
    new NiceSelect2(document.querySelector('.facetwp-dropdown'), {
      searchable: false,
      searchtext: 'zoek',
      selectedtext: 'geselecteerd',
    });
    ////////////////Temp

    document.addEventListener('facetwp-loaded', function () {
      if (!document.querySelector('.nice-select.facetwp-dropdown')) {
        new NiceSelect2(document.querySelector('.facetwp-dropdown'), {
          searchable: false,
          searchtext: 'zoek',
          selectedtext: 'geselecteerd',
        });
      }
    });
  }

  const sortCtrl = document.querySelector('.filter__sortctrl');

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
