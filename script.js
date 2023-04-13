const form = document.querySelector("[data-main-form]");
const yearInput = document.querySelector("[data-year-input]");
const monthInput = document.querySelector("[data-month-input]");
const dayInput = document.querySelector("[data-day-input]");
const inputFields = document.querySelectorAll("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  displayOutput();
});

// Functions

function getDOB() {
  const DOB = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
  return DOB;
}

function calcDifference() {
  let currentDate = new Date();
  return currentDate - getDOB();
}

function leapYearDeduction() {
  let daysToDeduct = 0;
  let currentYear = new Date().getFullYear();

  for (let i = yearInput.value; i <= currentYear; i++) {
    if (i % 4 === 0) {
      daysToDeduct++;
    }
  }

  return daysToDeduct;
}

function calcTotalDays() {
  let diff = calcDifference();
  return Math.floor(diff / 86_400_000) - leapYearDeduction();
}

function calcYears() {
  return Math.floor(calcTotalDays() / 365);
}

function calcMonth() {
  let remainingDaysAfterYearCalc = calcTotalDays() % 365;
  return Math.floor(remainingDaysAfterYearCalc / 30);
}

function calcDays() {
  let remainingDaysAfterMonthCalc = (calcTotalDays() % 365) % 30;
  return remainingDaysAfterMonthCalc;
}

function displayOutput() {
  const yearOutput = document.querySelector("[data-year-output]");
  const monthOutput = document.querySelector("[data-month-output]");
  const dayOutput = document.querySelector("[data-day-output]");

  rollNumber(dayOutput, calcDays());
  rollNumber(yearOutput, calcYears());
  rollNumber(monthOutput, calcMonth());
}

function rollNumber(element, num) {
  let i = 0;

  let timerId = setInterval(() => {
    element.textContent = i;
    if (i === num) clearTimeout(timerId);
    i++;
  }, 15);
}
