const action = document.querySelector(".action");
const time = document.querySelector(".time");
const records = document.querySelector(".record");
const reset = document.querySelector(".resetBtn");

let counter = 0;
let interval;
let countRows = 1;

action.addEventListener("click", actionEventHandler);
reset.addEventListener("click", resetHandler);

function actionEventHandler(e) {
  if (e.target.classList.contains("start")) {
    changeActionRole(e.target, "start", "stop");
    interval = setInterval(function () {
      counter += 10;
      updateTimerHTML();
    }, 10);
  } else {
    changeActionRole(e.target, "stop", "start");
    clearInterval(interval);
    createRow();
  }
}

function updateTimerHTML() {
  time.innerHTML = timeFormatter();
}
function timeFormatter() {
  return `${getHours()} : ${getMinutes()} : ${getSecond()}.${getMiliSecond()}`;
}

function changeActionRole(who, from, to) {
  who.classList.remove(from);
  who.classList.add(to);
  who.innerHTML = to;
}

function getMiliSecond() {
  return String(Math.floor(counter % 1000)).padStart(3, 0);
}

function getSecond() {
  return String(Math.floor(counter / 1000)).padStart(2, 0);
}

function getMinutes() {
  return String(Math.floor(counter / 60000)).padStart(2, 0);
}

function getHours() {
  return String(Math.floor(counter / 360000)).padStart(2, 0);
}
function createRow() {
  let newRecord = `<div class="records__row">
                        <span>${countRows++}.</span>
                        <div>
                           ${timeFormatter()}
                        </div>
                    </div>`;

  records.innerHTML += newRecord;
}
function resetHandler() {
  clearInterval(interval);
  counter = 0;
  countRows = 1;
  records.innerHTML = "";
  updateTimerHTML();
}
