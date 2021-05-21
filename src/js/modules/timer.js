const timer = (deadline) => {

  function bindTime(date) {
    let days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds'),
        interval = setInterval(ubdateTime, 1000)

    ubdateTime();

    function addZero(number) {
      if(number >= 0 && number < 10) {
        return `0${number}`
      } else {
        return number
      }
    }

    function ubdateTime() {
      let timer = getTimeRemaining(date)
      days.innerHTML = addZero(timer.days),
      hours.innerHTML = addZero(timer.hours),
      minutes.innerHTML = addZero(timer.minutes),
      seconds.innerHTML = addZero(timer.seconds)
      if(timer.total <= 0) {
        clearInterval(interval)
      }
    }
    
    function getTimeRemaining(endtime) {
      let time = Date.parse(endtime) - Date.parse(new Date());
      return {
        total: time,
        days: Math.floor(time / (1000 * 60 * 60 * 24)),
        hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / 1000 / 60) % 60),
        seconds: Math.floor((time / 1000) % 60)
      }
    }
  }

  bindTime(deadline);

}

export default timer;