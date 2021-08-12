'use strict';

//API
const API_ENDPOINT = 'https://yesno.wtf/api';

// FLAGS
let isReqInProgress = false;

const ball = document.getElementById('ball');
const triangle = document.querySelector('.ball__triangle');
const ballAnswer = document.getElementById('answer');
const input = document.getElementById('input');
const button = document.getElementById('button');

const checkRequest = (value) => {
  isReqInProgress = value;
};

const buttonState = (disabling) => {
  if (disabling) {
    button.setAttribute('disabled', 'disabled');
  } else {
    button.removeAttribute('disabled');
  }
};

const cleanInput = () => {
  setTimeout(() => {
    ballAnswer.innerHTML = '';
    input.value = '';
    checkRequest(false);
    buttonState(false);
  }, 2000);
};

const showAnswer = (answer) => {
  setTimeout(() => {
    ballAnswer.innerHTML = `${answer}`;
    ball.classList.remove('shake__ball');

    cleanInput();
    setTimeout(() => {
      triangle.classList.remove('show');
    }, 1990);
  }, 2000);
};

const fetchAnswer = () => {
  checkRequest(true);
  buttonState(true);
  ball.classList.add('shake__ball');

  setTimeout(() => {
    triangle.classList.add('show');
  }, 1200);

  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((data) => showAnswer(data.answer));
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

button.addEventListener('click', getAnswer);
