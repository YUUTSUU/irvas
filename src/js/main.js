import './slider';
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import modalState from './modules/modalState';
import timer from './modules/timer';
import image from './modules/image';

window.addEventListener('DOMContentLoaded', () => {

  let state = {
    form: 1,
    width: "",
    height: "",
    type: 'tree',
    profile: ""
  };

  const deadline = '2021-06-30';

  const calcScroll = () => {
    const div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }

  modalState(state);
  modals(state, calcScroll);
  tabs();
  forms(state);
  timer(deadline);
  image(calcScroll);
});