'use strict';

const watches = document.querySelector('.wrapper');

class Stopwatch {
  constructor({
    watches
  }) {
    this.watches = watches;
    this.createStopwatch();
    this.isActive = false;
    this.startTime = null;
    this.deltaTime = null;
    this.id = null;
  }

  createStopwatch() {
    const section = document.createElement('section')
    section.classList.add('watches')

    const div = document.createElement('div')
    div.classList.add('stopwatch')

    const p = document.createElement('p');
    p.classList.add('clockface')
    p.classList.add('js-time')
    p.textContent = '00:00.0'

    const startBtn = document.createElement('button');
    startBtn.classList.add('timer-btn')
    startBtn.classList.add('js-start')
    startBtn.textContent = 'Start'
    startBtn.addEventListener('click', this.handleStartTimer.bind(this));

    const resetBtn = document.createElement('button');
    resetBtn.classList.add('timer-btn')
    resetBtn.classList.add('js-reset')
    resetBtn.textContent = 'Reset'
    resetBtn.addEventListener('click', this.hadleResetTimer.bind(this));

    const lapBtn = document.createElement('button');
    lapBtn.classList.add('timer-btn')
    lapBtn.classList.add('js-take-lap')
    lapBtn.textContent = 'Lap'
    lapBtn.addEventListener('click', this.hadleLapTimer.bind(this));

    div.append(p, startBtn, lapBtn, resetBtn)

    const list = document.createElement('ul');
    list.classList.add('laps')
    list.classList.add('js-laps')

    section.append(div, list)
    this.watches.append(section)

    this.watch = this.watches.querySelector('.stopwatch');
    this.startBtn = this.watches.querySelector('.js-start');
    this.lapBtn = this.watches.querySelector('.js-take-lap');
    this.resetBtn = this.watches.querySelector('.js-reset');
    this.listLaps = this.watches.querySelector('.js-laps');
    this.timerContent = this.watches.querySelector('.js-time');
  }

  startTimer() {
    if (this.isActive) return;
    this.isActive = true;
    this.startTime = Date.now() - this.deltaTime;
    this.id = setInterval(() => {
      const currentTime = Date.now();
      this.deltaTime = currentTime - this.startTime;
      this.updateClockface(this.deltaTime);
    }, 100);
  }

  pauseTimer() {
    clearInterval(this.id);
    this.isActive = false;
  }

  updateClockface(time) {
    this.timerContent.textContent = this.getFormattedTime(time);
  }

  getFormattedTime(time) {
    let date = new Date();
    date.setTime(time);
    let minutes = date.getMinutes();
    minutes = (minutes < 10 ? '0' : '') + minutes;
    let seconds = date.getSeconds();
    seconds = (seconds < 10 ? '0' : '') + seconds;
    const mseconds = date.getMilliseconds().toString().slice(0, 1);
    return `${minutes}:${seconds}.${mseconds}`;
  }

  setActiveBtn(target) {
    if (target.classList.contains('active')) return;
    this.startBtn.classList.remove('active');
    this.resetBtn.classList.remove('active');
    target.classList.add('active');

  }

  handleStartTimer({
    target
  }) {
    if (!this.isActive) {
      this.setActiveBtn(target);
      this.startTimer(target);
      this.startBtn.textContent = 'Pause';
    } else {
      this.pauseTimer(target);
      this.startBtn.textContent = 'Continue';
    }
  }

  hadleResetTimer({
    target
  }) {
    clearInterval(this.id);
    this.isActive = false;
    this.setActiveBtn(target);
    this.deltaTime = 0;
    this.updateClockface(this.deltaTime);
    this.startBtn.textContent = 'Start';
    this.listLaps.innerHTML = null;
    this.startTime = null;
  }

  hadleLapTimer() {
    if (!this.isActive) return;
    const item = document.createElement('li');
    item.textContent = this.timerContent.textContent;
    this.listLaps.append(item);
  }
}

const Timer1 = new Stopwatch({
  watches: watches,
});

const Timer2 = new Stopwatch({
  watches: watches,
});

const Timer3 = new Stopwatch({
  watches: watches,
});
