const image = (calcScroll) => {

  function bindImage(selector) {
    const worksWrapper = document.querySelector(selector),
          imagePopup = document.createElement('div'),
          bigImage = document.createElement('img'),
          imageItem = document.querySelectorAll('.preview'),
          scrollOffset = calcScroll();

    imagePopup.classList.add('popup_engineer')
    worksWrapper.appendChild(imagePopup)

    imagePopup.style.justifyContent = 'center'
    imagePopup.style.alignItems = 'center'
    imagePopup.style.display = 'none'
    document.body.style.overflow = ''

    imagePopup.appendChild(bigImage)
    bigImage.style.width = '700px'
    bigImage.style.height = '700px'

    worksWrapper.addEventListener('click', (event) => {
      event.preventDefault();

      if(event.target && event.target.classList.contains('preview')) {
        imageItem.forEach(item => {
          if(event.target === item) {
            const path = event.target.parentNode.getAttribute('href')
            imagePopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scrollOffset}px`
            bigImage.classList.add('faded')
            bigImage.setAttribute('src', path);
          }
        })
      }
    })

    imagePopup.addEventListener('click', (event) => {
      if(event.target === imagePopup) {
        imagePopup.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px'
        bigImage.classList.remove('faded')
      }
    });

    document.addEventListener('keydown', (event) => {
      if(event.code === 'Escape') {
        imagePopup.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px'
        bigImage.classList.remove('faded')
      }
    });
  }

  bindImage('.works');
  
}

export default image;