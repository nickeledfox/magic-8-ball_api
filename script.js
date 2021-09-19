'use strict';

let question = encodeURIComponent('?');

//APIs
let DELEGATOR_API = 'https://8ball.delegator.com/magic/JSON/' + question;
const ADVICE_API = 'https://api.adviceslip.com/advice';

// FLAGS
let isReqInProgress = false;

// Ball params
const ball = document.getElementById('ball');
const triangle = document.querySelector('.ball__triangle');
const ballAnswer = document.getElementById('answer');
const input = document.getElementById('input');

const buttons = document.querySelectorAll('button');
const button = document.getElementById('button');
const btn = document.getElementById('btn');

const shakeSound = new Audio('shake.mp3');

const checkRequest = (value) => {
  isReqInProgress = value;
};

const buttonState = (disabling) => {
  if (disabling) {
    buttons.forEach((button) => {
      button.setAttribute('disabled', 'disabled');
    });
  } else {
    buttons.forEach((button) => {
      button.removeAttribute('disabled');
    });
  }
};

const cleanInput = () => {
  shakeSound.pause();
  setTimeout(() => {
    ballAnswer.innerHTML = '';
    input.value = '';
    checkRequest(false);
    buttonState(false);
  }, 2700);
};

const showAnswer = () => {
  setTimeout(() => {
    ball.classList.remove('shake__ball');

    cleanInput();
    setTimeout(() => {
      triangle.classList.remove('show');
    }, 1990);
  }, 3700);
};

const fetchAnswer = () => {
  shakeSound.play();
  checkRequest(true);
  buttonState(true);
  ball.classList.add('shake__ball');

  setTimeout(() => {
    triangle.classList.add('show');
  }, 1200);
  setTimeout(() => {
    fetch(DELEGATOR_API)
      .then((response) => response.json())
      .then((data) => (ballAnswer.innerHTML = `${data.magic.answer}`));
  }, 2000);
  showAnswer();
};

const getAdvice = () => {
  checkRequest(true);
  buttonState(true);
  ball.classList.add('shake__ball');
  shakeSound.play();

  setTimeout(() => {
    fetch(ADVICE_API)
      .then((response) => response.json())
      .then((data) => (ballAnswer.innerHTML = `${data.slip.advice}`));
  }, 2000);
  showAnswer();
};

const showError = () => {
  ballAnswer.innerHTML = 'Ask question!';

  setTimeout(() => {
    ballAnswer.innerHTML = '';
  }, 2000);
};

const getAnswer = () => {
  if (isReqInProgress) return;
  if (!input.value) return showError();
  fetchAnswer();
};

const handleKeyEnter = (e) => {
  if (e.keyCode === 13) {
    getAnswer();
  }
};

const askBall = () => {
  button.addEventListener('click', getAnswer);
  btn.addEventListener('click', getAdvice);
};

askBall();
