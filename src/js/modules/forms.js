const forms = (state) => {

  function bindForms(formSelector, inputSelector, nameSelector, phoneSelector) {
    const form = document.querySelectorAll(formSelector),
          input = document.querySelectorAll(inputSelector),
          nameInput = document.querySelectorAll(nameSelector),
          phoneInput = document.querySelectorAll(phoneSelector),
          windowModal = document.querySelectorAll('[data-modal]');
    
    nameInput.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/\d/, '')
      })
    })

    phoneInput.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/, '');
      })
    })

    const message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с вами свяжемся!',
      failure: 'Что-то пошло не так...'
    }

    form.forEach(item => {
      item.addEventListener('submit', (event) => {
        event.preventDefault();

        const statusMessage = document.createElement('div');
              statusMessage.classList.add('status');
              item.appendChild(statusMessage);

        statusMessage.textContent = message.loading;

        const formData = new FormData(item);

        if(item.getAttribute('data-calc') === 'state') {
          for (let key in state) {
            formData.append(key, state[key]);
          }
        }

        const data = JSON.stringify(Object.fromEntries(formData.entries()));

        postData(data)
          .then(res => {
            console.log(res);
            statusMessage.textContent = message.success;
          })
          .catch(() => {
            statusMessage.textContent = message.failure;
          })
          .finally(() => {
            input.forEach(item => {
              item.value = '';
            });

            state = {
              form: 1,
              width: "",
              height: "",
              type: 'tree',
              profile: ""
            };

            setTimeout(() => {
              statusMessage.remove();
              windowModal.forEach(item => {
                item.style.display = 'none'
                document.body.style.overflow = ''
                document.body.style.marginRight = '0px'
              });
            }, 3000);     
          })
      });
    });
  }

  const postData = async (data) => {
    const url = 'http://localhost:3000/requests';

    const res = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json'
      }
    });
    
    return await res.json();
  }

  bindForms('form', 'input', 'input[name="user_name"]', 'input[name="user_phone"]');

}

export default forms;