// Beginning variables
let uncoverCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondtResult = null;
let moves = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoid = null;


//Document HTML
let showMoves = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrartiempo = document.getElementById('t-restantes');

// Generation random numbers
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,];
numbers = numbers.sort(() => {
  return Math.random() - 0.5
})
console.log(numbers);


//Functions
function contartiempo() {
  tiempoRegresivoid = setInterval(() => {
    timer--;
    mostrartiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer == 0) {
      clearInterval(tiempoRegresivoid);
      bloquearTarjeta();
    }
  }, 1000);
}

function bloquearTarjeta() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numbers[i];
    tarjetaBloqueada.disabled = true;
  }
}

//Function Main
function uncover(id) {

  if (temporizador == false) {
    contartiempo();
    temporizador = true;
  }

  uncoverCards++;
  console.log(uncoverCards);

  if (uncoverCards == 1) {
    //Show first number
    card1 = document.getElementById(id);
    firstResult = numbers[id]
    card1.innerHTML = firstResult;

    //Disable First Button
    card1.disabled = true;
  } else if (uncoverCards == 2) {
    //Show second number
    card2 = document.getElementById(id);
    secondtResult = numbers[id];
    card2.innerHTML = secondtResult;

    //Disable Second Button
    card2.disabled = true;

    //Increment Moves
    moves++;
    showMoves.innerHTML = `Movimientos: ${moves}`;

    if (firstResult == secondtResult) {
      //Encerar
      uncoverCards = 0;

      //Aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

      if (aciertos == 8) {
        clearInterval(tiempoRegresivoid);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}😱`
        mostrartiempo.innerHTML = `Fantastico!🎉 Sólo demoraste ${timerInicial - timer} segundos`
        showMoves.innerHTML = `Movimientos ${moves}🤟😎`
      }
    } else {
      //Mostrar Momentaneamente valoresy volver a tapar
      setTimeout(() => {
        card1.innerHTML = '';
        card2.innerHTML = '';
        card1.disabled = false;
        card2.disabled = false;
        uncoverCards = 0;
      }, 800)
    }
  }
}