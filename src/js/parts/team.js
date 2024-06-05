 export const teamFunc = () => {
    const teamMore = document.querySelector('.section__team .section__footer a');

    let isShowed = false;

    teamMore?.addEventListener('click', evt => {
        evt.preventDefault();

        const target = evt.currentTarget;
        const dataSt = target.dataset.st;
        const dataEd = target.dataset.ed;
        const list = document.querySelectorAll('.team__item');
        const spans = target.querySelectorAll('span span');

        spans?.forEach(el => {
            if(!isShowed) {
                el.innerHTML = dataEd;
            } else {
                el.innerHTML = dataSt;
            }
        })

        list?.forEach(el => {
            el.classList.toggle('showsd');
        });

        isShowed = !isShowed;
    })
 }