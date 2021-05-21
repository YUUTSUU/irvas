const modals = (state, calcScroll) => {

  function bindModal(openSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const open = document.querySelectorAll(openSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]'),
          windowModalOneValidate = document.querySelector('.popup_calc_content'),
          windowModalTwoValidate = document.querySelector('.popup_calc_profile_content'),
          scrollOffset = calcScroll();

    open.forEach(item => {
      item.addEventListener('click', (event) => {
        if(event.target) {
          event.preventDefault()
        }

        const message = 'Заполните все данные!'

        const statusMessage = document.createElement('div');
              statusMessage.classList.add('status');
              statusMessage.style.paddingTop = '10px';

        const statusMessageTimeout = setTimeout(() => statusMessage.remove(), 1000)

        if(event.target.classList.contains('popup_calc_button')) {
          if(!state.form || !state.width || !state.height) {
            windowModalOneValidate.appendChild(statusMessage);
            statusMessage.textContent = message;
            statusMessageTimeout;
            return
          }
        }

        if(event.target.classList.contains('popup_calc_profile_button')) {
          if(!state.type || !state.profile) {
            windowModalTwoValidate.appendChild(statusMessage);
            statusMessage.textContent = message;
            statusMessageTimeout;
            return
          }
        }
        
        windows.forEach(item => {
          item.style.display = 'none'
        });

        modal.style.display = 'block'      
        document.body.style.overflow = 'hidden'
        document.body.style.marginRight = `${scrollOffset}px`
      });
    })

    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none'
      });

      modal.style.display = 'none'
      document.body.style.overflow = ''
      document.body.style.marginRight = '0px'
    });

    modal.addEventListener('click', (event) => {
      if(event.target === modal && closeClickOverlay) {
        windows.forEach(item => {
          item.style.display = 'none'
        });

        modal.style.display = 'none'
        document.body.style.overflow = ''
        document.body.style.marginRight = '0px'
      }
    });

    document.addEventListener('keydown', (event) => {
      if(event.code === 'Escape') {
        windows.forEach(item => {
          item.style.display = 'none'
        });

        modal.style.display = 'none'
        document.body.style.overflow = ''
        document.body.style.marginRight = '0px'
      }
    });

    function showByModalTimer(selector, time) {
      setTimeout(() => {
        document.querySelector(selector).style.display = 'block'
        document.body.style.overflow = 'hidden'
        document.body.style.marginRight = `${scrollOffset}px`
      }, time)
    }
  
    function showByModalScroll() {
      if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        document.querySelector('.popup').style.display = 'block'
        document.body.style.overflow = 'hidden'
        document.body.style.marginRight = `${scrollOffset}px`
        window.removeEventListener('scroll', showByModalScroll)
      }
    }
    
    window.addEventListener('scroll', showByModalScroll);
    showByModalTimer('.popup', 2000);

  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close')
  bindModal('.phone_link', '.popup', '.popup .popup_close')
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close')
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false)
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false)
  
};

export default modals;
