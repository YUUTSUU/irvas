const tabs = () => {

  function bindTabs(headerSelector, tabsSelector, contentSelector, activeSelector, display = 'block') {
    const header = document.querySelector(headerSelector),
          tabs = document.querySelectorAll(tabsSelector),
          contents = document.querySelectorAll(contentSelector);

    

    function hideByContent() {
      contents.forEach(item => {
        item.style.display = 'none'
        item.classList.remove('faded')
      })
      tabs.forEach(item => {
        item.classList.remove(activeSelector)
      })
    }

    function showByContent(i = 0) {
      contents[i].style.display = display
      contents[i].classList.add('faded')
      tabs[i].classList.add(activeSelector)
    }

    hideByContent()
    showByContent()

    header.addEventListener('click', (event) => {
      if(event.target && (event.target.classList.contains(tabsSelector.replace(/\./, "")) || event.target.parentNode.classList.contains(tabsSelector.replace(/\./, "")))) {
        tabs.forEach((item, i) => {
          if(event.target === item || event.target.parentNode === item) {
            hideByContent()
            showByContent(i)
          }
        });
      }
    });
  }

  bindTabs('.decoration_slider', '.decoration_tab', '.content', 'after_click')
  bindTabs('.glazing_slider', '.glazing_block', '.glazing_content', 'glazing_active')
  bindTabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block')

}

export default tabs;