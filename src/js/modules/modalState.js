const modalState = (state) => {
  
  function bindModalState(selector, event, props) {
    const data = document.querySelectorAll(selector)
    
    data.forEach((item, i) => {
      if(item.getAttribute('id') === 'width' || item.getAttribute('id') === 'height') {
        item.addEventListener('input', () => {
          item.value = item.value.replace(/\D/, '');
        })
      }

      item.addEventListener(event, () => {
        switch(item.nodeName) {
          case 'SPAN':
            state[props] = i + 1;
            break;
          case 'INPUT':
            if(item.classList.contains('checkbox')) {
              i === 0 ? state[props] = 'Холодное' : state[props] = 'Теплое'
              data.forEach((box, j) => {
                box.checked = false;
                if(i === j) {
                  box.checked = true;
                }
              })
            } else {
              state[props] = item.value
            }
            break;
          case 'SELECT':
            state[props] = item.value
        }
        console.log(state)
      })
    })

  }

  bindModalState('.balcon_icons_img', 'click', 'form')
  bindModalState('#width', 'input', 'width')
  bindModalState('#height', 'input', 'height')
  bindModalState('#view_type', 'change', 'type')
  bindModalState('.checkbox', 'change', 'profile')

}

export default modalState;