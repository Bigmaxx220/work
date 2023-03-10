const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let i = 0;
let j = 0;

rl.question('Введите число 1: ', (answer1) => {
  i = answer1;
  if (isNaN(i)) {
    console.log("Это не число. Попробуйте еще раз.");
  } else {
    rl.question('Введите число 2: ', (answer2) => {
      j = answer2;
      if (isNaN(j)) {
        console.log("Это не число. Попробуйте еще раз.");
      } else {
        console.log("Вы ввели числа: " + i + " и " + j);
      }
      rl.close();
    });
  }
});