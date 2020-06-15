class CountdownTimer {
  constructor({ selector, targetDate, days, hours, mins, secs }) {
    this.mainDiv = document.querySelector(selector);
    this.refs = {
      daysRef: this.mainDiv.querySelector(`[${days}]`),
      hoursRef: this.mainDiv.querySelector(`[${hours}]`),
      minsRef: this.mainDiv.querySelector(`[${mins}]`),
      secsRef: this.mainDiv.querySelector(`[${secs}]`),
    };
    this.futureTime = targetDate;
  }
  startInt() {
    const intId = setInterval(() => {
      const currentTime = Date.now();
      const chanchedTime = this.futureTime - currentTime;
      if (currentTime > this.futureTime) {
        clearInterval(intId);
        this.runClock(0);
        return;
      }
      this.runClock(chanchedTime);
    }, 1000);
  }
  runClock(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    this.showTime(days, hours, mins, secs);
  }
  showTime(days, hours, mins, secs) {
    this.refs.daysRef.textContent = `${days}`;
    this.refs.hoursRef.textContent = `${hours}`;
    this.refs.minsRef.textContent = `${mins}`;
    this.refs.secsRef.textContent = `${secs}`;
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 16, 2020,'),
  days: 'data-value="days"',
  hours: 'data-value="hours"',
  mins: 'data-value="mins"',
  secs: 'data-value="secs"',
});

console.log(timer.refs.minsRef);
timer.startInt();

// /*
//  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
//  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
//  */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

// /*
//  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//  * остатка % и делим его на количество миллисекунд в одном часе
//  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//  */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// /*
//  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
//  */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

// /*
//  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//  * миллисекунд в одной секунде (1000)
//  */
// const secs = Math.floor((time % (1000 * 60)) / 1000);
