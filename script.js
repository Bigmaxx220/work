const SCORE_PER_QUESTION = 1;
const NUM_QUESTIONS = 50;
let multiplNumber = 0;
let currentQuestion = 1;
let currentScore = 0;
let totalScore = 0;

let intervalId;

function startTimer(timeLeft) {
  const timerDiv = document.getElementById('timer');
  const timerContainerDiv = document.getElementById('timer-container');
  const startTime=timeLeft;
  function tick() {
    //const minutes = Math.floor(timeLeft / 60);
    //const seconds = timeLeft % 60;
 let currentWidth = document.getElementById("timer").offsetWidth;
  let currentWidthContainer = document.getElementById("timer-container").offsetWidth; 
  currentWidth += Math.round(currentWidthContainer/startTime);
  timerDiv.style.width = currentWidth + 'px';
    console.log(timerDiv.style.width)
    //timerContainerDiv.innerHTML = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (timeLeft === 0) {
      clearInterval(intervalId);
      timerDiv.innerHTML = 'Time is up!';
      main();
    } else {
      timeLeft--;
    }
  }

  tick(); // выполняем первый раз, чтобы избежать задержки в секунду перед запуском setInterval

  if (!intervalId) {
    intervalId = setInterval(tick, 1000);
    return false;
  } else {
    return true;
  }
}

function resetTimer() {
  clearInterval(intervalId);
  timeLeft = 0.5 * 60;
 // timerDiv.innerHTML = `Time Left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;
  intervalId = null; // сбрасываем идентификатор интервала, чтобы можно было запустить таймер еще раз
 // timerDiv.style.width = 0 + 'px';
}

function startT(time) {
  const isStarted = startTimer(time);
  if (isStarted) {
    console.log('Timer is already started');
  } else {
    console.log('Timer started');
  }
}

function resetT() {
  resetTimer();
  console.log('Timer reset');
}

function playSound(sound) {
  var audio = new Audio(sound);
  audio.play();
}

function createMainSection() {
  const section = document.createElement("section");
  section.id = "main";
  section.innerHTML = `
    <h1>Математический тренажер</h1>
  <div id="score">
Выбери задание для тренировки
  </div>
    <div id="select"> 
      <button id="button" class="mult">Умножение</button>
      <button id="button" class="add" >Сложение</button>
      <button id="button" class="substr">Вычитание</button>
      
    </div>
  `;
  return section;
}


function createMultiplicationSection(param) {
  console.log("createMultiplicationSection -" + param);
  let header = "";
  let operation = "";
  switch (param) {
    case "*":
      header = "Тренажер таблицы умножения";
      break;
    case "+":
      header = "Тренажер сложения двузначных чисел";
      break;
    case "-":
      header = "Тренажер вычитания двузначных чисел";
      break;
    default:
    // выполняемый код, если не совпадает ни с одним из значений
  }
  const section = document.createElement("section");
  section.id = "main";
  section.innerHTML = `
    <h1>${header}</h1>
    <div id="score"></div>
    <div id="timer-container">
<div id="timer"></div>
</div>
    <div id="question"></div>
    <div id="answer">
      <input type="number" id="input-answer">   
    </div>
    <div id="result"></div>
    <div id="feedback"></div>
    <div id="buttons">
      <button id="check-button">Проверить</button>
      <button id="reset-button">Начать заново</button>
    </div>
    <div id="final-message"></div>
  `;
 
  return section;
}


function createMainMultiplicatinSection(param) {
  let header = "";
  let operation = "";
  let buttonAttribute = "";
  let buttonAttributeNext = "";
  let innerText1 = "";
  let innerText2 = "";
  switch (param) {
    case "*":
      buttonAttributeNext = "hidden";
      header = "Тренажер таблицы умножения";
      innerText1 = "Выбери число которое умножаем";
      break;
    case "+":
      buttonAttribute = "hidden";
      header = "Тренажер сложения двузначных чисел";
      innerText1 = "Давай приступим, нажми >>";
      innerText2 = "Чтобы вернуться к выбору, нажми <<";
      break;
    case "-":
      buttonAttribute = "hidden";
      header = "Тренажер вычитания двузначных чисел";
      innerText1 = "Давай приступим нажми >>";
      innerText2 = "Чтобы вернуться к выбору нажми <<";
      break;
    default:
    // выполняемый код, если не совпадает ни с одним из значений
  }
  const section = document.createElement("section");
  section.id = "main";
  section.innerHTML = `
    <h1>${header}</h1>
  <div id="score">
  <p>
${innerText1}
</p>
<p>
${innerText2}
</p>
  </div>
    <div id="select">
   
    <button id="button"><<</button>
      <button id="button" ${buttonAttribute}>2</button>
      <button id="button" ${buttonAttribute}>3</button>
      <button id="button" ${buttonAttribute}>4</button>
      <button id="button"${buttonAttribute} >5</button>
      <button id="button" ${buttonAttribute}>6</button>
      <button id="button" ${buttonAttribute}>7</button>
      <button id="button" ${buttonAttribute}>8</button>
      <button id="button" ${buttonAttribute}>9</button>
      <button id="button" ${buttonAttribute}>?</button>
      <button id="button" ${buttonAttributeNext}>>></button>
      
      
    </div>
  `;
  return section;
}

function removeSection(sec) {
  const section = document.querySelector(sec);
  if (section) {
    section.remove();
  }
}

function generateQuestion(param) {
  console.log("generateQuestion-" + param);
  let num2 = 0;
  let num1 = 0;
  switch (param) {
    case "*":
      num2 = Math.floor(Math.random() * 9) + 1;
      if (multiplNumber === 0) {
        num1 = Math.floor(Math.random() * 9) + 1;
        return `${num1} x ${num2}`;
      } else {
        num1 = multiplNumber;
        return `${num1} x ${num2}`;
      }
      break;
    case "+":
      num1 = Math.floor(Math.random() * 99) + 1;
      num2 = Math.floor(Math.random() * (100 - num1)) + 1;
      return `${num1} + ${num2}`;
      break;

    case "-":
      num1 = Math.floor(Math.random() * 99) + 1;
      num2 = Math.floor(Math.random() * (100 - num1)) + 1;
      return `${num1} - ${num2}`;
      break;
    default:
    // выполняемый код, если не совпадает ни с одним из значений
  }
}

function checkAnswer(question, answer, param) {
  let nums = 0;
  let correctAnswer = 0;
  switch (param) {
    case "*":
      nums = question.split(" x ");
      correctAnswer = parseInt(nums[0]) * parseInt(nums[1]);
      if (parseInt(answer) === correctAnswer) {
        playSound("yes.mp3");
        currentScore += SCORE_PER_QUESTION;
        document.getElementById("result").style.color = "black";
        return "Правильно - отлично!";
      } else {
        playSound("oi.mp3");
        document.getElementById("result").style.color = "#D81B60";
        return `Неправильно. Правильный ответ: ${correctAnswer}.`;
      }
      break;
    case "+":
      nums = question.split(" + ");
      correctAnswer = parseInt(nums[0]) + parseInt(nums[1]);
      if (parseInt(answer) === correctAnswer) {
        playSound("yes.mp3");
        currentScore += SCORE_PER_QUESTION;
        document.getElementById("result").style.color = "black";
        return "Правильно - отлично!";
      } else {
        playSound("oi.mp3");
        document.getElementById("result").style.color = "#D81B60";
        return `Неправильно. Правильный ответ: ${correctAnswer}.`;
      }
      break;
    case "-":
      nums = question.split(" - ");
      correctAnswer = parseInt(nums[0]) - parseInt(nums[1]);
      if (parseInt(answer) === correctAnswer) {
        playSound("yes.mp3");
        currentScore += SCORE_PER_QUESTION;
        document.getElementById("result").style.color = "black";
        return "Правильно - отлично!";
      } else {
        playSound("oi.mp3");
        document.getElementById("result").style.color = "#D81B60";
        return `Неправильно. Правильный ответ: ${correctAnswer}.`;
      }
      break;
    default:
    // выполняемый код, если не совпадает ни с одним из значений
  }
}

function updateScore() {
  document.getElementById(
    "score"
  ).innerHTML = `Вопрос ${currentQuestion}/${NUM_QUESTIONS}. Текущий счет: ${currentScore}`;
}

function updateQuestion(param) {
  console.log("updateQuestion" + param);
  document.getElementById("question").innerHTML = generateQuestion(param);
}

function updateResult(result) {
  document.getElementById("result").innerHTML = result;
  const input = document.getElementById("input-answer");
  input.value = "";
  input.focus();
}

function updateFeedback(feedback) {
  document.getElementById("feedback").innerHTML = feedback;
}

function reset(param) {
  const input = document.getElementById("input-answer");
  currentQuestion = 1;
  currentScore = 0;
  totalScore = 0;
  updateScore();
  updateQuestion(param);
  updateResult("");
  updateFeedback("");
  document.body.style.backgroundColor = "white";
  document.getElementById("result").style.color = "black";
  document.getElementById("result").innerHTML =
    "Давай начнем. Введи правильный ответ!";
  input.disabled = false;
  input.value = "";
  input.focus();
  
}

function emptyInput() {
  const input = document.getElementById("input-answer");
  if (input.value.trim() === "") {
    // поле ввода пустое
    return true;
  } else {
    // поле ввода не пустое
    return false;
  }
}

function check(param) {
  if (!emptyInput()) {
    let answer = document.getElementById("input-answer").value;
    let question = document.getElementById("question").innerHTML;
    console.log("check-" + param);
    let result = checkAnswer(question, answer, param);
    updateResult(result);

    if (currentQuestion === NUM_QUESTIONS) {
      totalScore = currentScore;
      if ((totalScore / NUM_QUESTIONS) * 100 < 50) {
        updateFeedback("Плохо");
        document.body.style.backgroundColor = "crimson";
      } else if ((totalScore / NUM_QUESTIONS) * 100 < 70) {
        updateFeedback("Нормально");
        document.body.style.backgroundColor = "orange";
      } else if ((totalScore / NUM_QUESTIONS) * 100 < 90) {
        document.body.style.backgroundColor = "yellow";
      } else {
        updateFeedback("Отлично!");
        document.body.style.backgroundColor = "green";
      }
      document.getElementById("input-answer").disabled = true;
    } else {
      currentQuestion++;
      updateScore();
      updateQuestion(param);
    }
  }
}

function listenClickMultiplication(param) {
  document
    .getElementById("reset-button")
    .addEventListener("click", function () {
    resetT();
      mainMiltiplication(param);
      console.log("listenClickMultiplication Button back-" + param);
    
    });
  document
    .getElementById("check-button")
    .addEventListener("click", function () {
      check(param);
      console.log("listenClickMultiplication- Button Check" + param);
    });
  const inputAnswer = document.getElementById("input-answer");
  inputAnswer.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      document.getElementById("check-button").click();
    }
  });
}

function createForm(param) {
  const MultiplicationSection = createMultiplicationSection(param);
  const existingElement = document.getElementById("counter");
  document.body.insertBefore(MultiplicationSection, existingElement);
  listenClickMultiplication(param);
  reset(param);
   startT(300);
}

function buttonClick(param) {
  const buttons = document.querySelectorAll("#select button");
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", () => {
      playSound("buttonClick.mp3");
      removeSection("#main");
      if (button.textContent === "?" || button.textContent != "<<") {
        console.log("function buttonClick buttonClick-" + param);
        if (button.textContent === "?") {
          multiplNumber = 0;
          createForm(param);
        } else {
          multiplNumber = Number(button.textContent);
          createForm(param);
          console.log("function buttonClick buttonNum-" + multiplNumber);
        }
      } else if (button.textContent === "<<") {
        main();
      }
    });
  }
}

//удаляет содержимое предыдущей формы, создает новую разметку createMainMultiplicatinSection для скции умножения и вставляет ее перед счетчиком посещений, вешает кликер на кнопку возврата и вызывает функцию кликеров buttonClick(); на все оставшиеся кнопки заданий
function mainMiltiplication(param) {
  resetT();
  removeSection("#main");
  const mainMultiplicatinSection = createMainMultiplicatinSection(param);
  const existingElement = document.getElementById("counter");
  document.body.insertBefore(mainMultiplicatinSection, existingElement);
  buttonClick(param);
  console.log("mainMultiplication-" + param);
}

//удаляет все что было до того в секции, создает секцию и разметку выбора заданий reateMainSection(); вставляет ее перед счетчиком посещений
function main() {
  removeSection("#main");
  const mainSection = createMainSection();
  const existingElement = document.getElementById("counter");
  document.body.insertBefore(mainSection, existingElement);
  const buttons = document.querySelectorAll("#select button");
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
   
    button.addEventListener("click", () => {
      playSound("buttonClick.mp3");
      console.log(button);
      removeSection("#main");
      if (button.classList.contains("mult")) {
        console.log(button);
        mainMiltiplication("*");
      } else if (button.classList.contains("add")) {
        console.log(button);
        mainMiltiplication("+");
      } else if (button.classList.contains("substr")) {
        mainMiltiplication("-");
      }
    });
  }
}

const form = document.querySelector("main");
main();
