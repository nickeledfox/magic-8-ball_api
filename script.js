'use strict';

const API_ENDPOINT = 'https://yesno.wtf/api';

const ball = document.getElementById('ball');
const ballAnswer = document.getElementById('answer');
const input = document.getElementById('input');

const cleanInput = () => {
  setTimeout(() => {
    ballAnswer.innerHTML = '';
    input.value = '';
  }, 1800);
};

const showAnswer = (answer) => {
  if (input.value != '') {
    setTimeout(() => {
      ballAnswer.innerHTML = `${answer}`;
      ball.classList.remove('shake__ball');
      cleanInput();
    }, 1000);
  } else {
    ballAnswer.innerHTML = 'Ask question!';
  }
};

const fetchAnswer = () => {
  ball.classList.add('shake__ball');

  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((data) => showAnswer(data.answer));
};

const handleKeyEnter = (e) => {
  if (e.keyCode === 13) {
    fetchAnswer();
  }
};

document.getElementById('button').addEventListener('click', () => {
  fetchAnswer();
});
