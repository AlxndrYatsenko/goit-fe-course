'use strict';

const watches = document.querySelector('.wrapper');

class Stopwatch {
  constructor({ watches }) {
    this.watches = watches;
    this.isActive = false;
    this.startTime = null;
    this.deltaTime = null;
    this.id = null;
    this.refs = {
      container: document.querySelector('.watches'),
      stopwatch: document.querySelector('.stopwatch'),
      timerContent: document.querySelector('.js-time'),
      startBtn: document.querySelector('.js-start'),
      lapBtn: document.querySelector('.js-take-lap'),
      resetBtn: document.querySelector('.js-reset'),
      listLaps: document.querySelector('.js-laps'),
    };
    this.createStopwatch();
  }

  createStopwatch() {
    this.refs.container = document.createElement('section');
    this.refs.container.classList.add('watches');

    this.refs.stopwatch = document.createElement('div');
    this.refs.stopwatch.classList.add('stopwatch');

    this.refs.timerContent = document.createElement('p');
    this.refs.timerContent.classList.add('stopwatch');
    this.refs.timerContent.classList.add('clockface');
    this.refs.timerContent.classList.add('js-time');
    this.refs.timerContent.textContent = '00:00.0';

    this.refs.startBtn = document.createElement('button');
    this.refs.startBtn.classList.add('timer-btn');
    this.refs.startBtn.classList.add('js-start');
    this.refs.startBtn.textContent = 'Start';
    this.refs.startBtn.addEventListener(
      'click',
      this.handleStartTimer.bind(this),
    );

    this.refs.resetBtn = document.createElement('button');
    this.refs.resetBtn.classList.add('timer-btn');
    this.refs.resetBtn.classList.add('js-reset');
    this.refs.resetBtn.textContent = 'Reset';
    this.refs.resetBtn.addEventListener(
      'click',
      this.hadleResetTimer.bind(this),
    );

    this.refs.lapBtn = document.createElement('button');
    this.refs.lapBtn.classList.add('timer-btn');
    this.refs.lapBtn.classList.add('js-take-lap');
    this.refs.lapBtn.textContent = 'Lap';
    this.refs.lapBtn.addEventListener('click', this.hadleLapTimer.bind(this));

    this.refs.stopwatch.append(
      this.refs.timerContent,
      this.refs.startBtn,
      this.refs.lapBtn,
      this.refs.resetBtn,
    );

    this.refs.listLaps = document.createElement('ul');
    this.refs.listLaps.classList.add('laps');
    this.refs.listLaps.classList.add('js-laps');

    this.refs.container.append(this.refs.stopwatch, this.refs.listLaps);
    this.watches.append(this.refs.container);
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
    this.refs.timerContent.textContent = this.getFormattedTime(time);
  }

  getFormattedTime(time) {
    let date = new Date();
    date.setTime(time);
    let minutes = date.getMinutes();
    minutes = (minutes < 10 ? '0' : '') + minutes;
    let seconds = date.getSeconds();
    seconds = (seconds < 10 ? '0' : '') + seconds;
    const mseconds = date
      .getMilliseconds()
      .toString()
      .slice(0, 1);
    return `${minutes}:${seconds}.${mseconds}`;
  }

  setActiveBtn(target) {
    if (target.classList.contains('active')) return;
    this.refs.startBtn.classList.remove('active');
    this.refs.resetBtn.classList.remove('active');
    target.classList.add('active');
  }

  handleStartTimer({ target }) {
    if (!this.isActive) {
      this.setActiveBtn(target);
      this.startTimer(target);
      this.refs.startBtn.textContent = 'Pause';
    } else {
      this.pauseTimer(target);
      this.refs.startBtn.textContent = 'Continue';
    }
  }

  hadleResetTimer({ target }) {
    clearInterval(this.id);
    this.isActive = false;
    this.setActiveBtn(target);
    this.deltaTime = 0;
    this.updateClockface(this.deltaTime);
    this.refs.startBtn.textContent = 'Start';
    this.refs.listLaps.innerHTML = null;
    this.startTime = null;
  }

  hadleLapTimer() {
    if (!this.isActive) return;
    const item = document.createElement('li');
    item.textContent = this.refs.timerContent.textContent;
    this.refs.listLaps.append(item);
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
