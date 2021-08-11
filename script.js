const API_ENDPOINT = 'https://yesno.wtf/api';

/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API +
 * 2. Output the API's response +
 * 3. Attach fetchAnswer to an event listener +
 * 4. Clear output after 3 seconds
 * 5. Optional: add loading/error states
 *
 */

const showAnswer = (answer) => {
  setTimeout(() => {
    document.getElementById('answer').innerHTML = `${answer}`;
    document.getElementById('ball').classList.remove('shake__ball');
  }, 1000);
};

const fetchAnswer = () => {
  document.getElementById('ball').classList.add('shake__ball');

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
