export const searchF = () => {
  const bodyS = document.querySelector('body .section__search');

  if (bodyS) {
    bodyS.addEventListener('input', evt => {
      const target = evt.target;
      const isInput = target.classList.contains('facetwp-search');

      if (isInput) {
        searchInput(target, bodyS);
      }
    });
  }
};

function searchInput(target, bodyS) {
  const val = target.value;
  const inputs = bodyS.querySelectorAll('.facetwp-search');

  changeQueryParams('s', val);

  inputs?.forEach(el => {
    el.value = val;
  });
}

function changeQueryParams(param, val) {
  const url = new URL(window.location);

  url.searchParams.set(param, val);

  window.history.replaceState({}, document.title, url);
}


document.addEventListener('facetwp-refresh', function () {
  const url = new URL(window.location);
  const par = url.searchParams.get('s');

  if (par) {
    document.querySelectorAll('.showSAfter')?.forEach(el => {
      el.style.display = 'block';
    });

    document.querySelector('.removeSAfter')?.remove();
  }
});