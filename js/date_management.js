// HTML Elements
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const currentYearElement = document.querySelector(".container .cal .months-list .cur-year .year");
const yearIncrement = document.querySelector(".container .cal .months-list .cur-year #increment");
const yearDecrement = document.querySelector(".container .cal .months-list .cur-year #decrement");
const monthListElement = document.querySelector(".container .cal .months-list ul");
var currentMonthElement = null; // current or selected month of the side list

const monthDaysElement = document.querySelector(".container .cal .calendar .cal-table-wrap .cal-table .days");
var daysList = null; // the days of the current or selected month
const monthAsTitleElement = document.querySelector(".container .cal .calendar .month");

const selectedDateElement = document.querySelector(".container .cal .mnth-reminder .top");

// Javascript Variables
const date = new Date();
const currentMonth = Number(date.getMonth()) + 1; 
// var lastSelectedMonth = currentMonth;
// currentMonth++;
var selectedMonth = currentMonth; 
const currentYear = date.getFullYear();
var selectedYear = currentYear;
// var thisMonth = null;
// thisMonth++;
const currentDay = date.getDate();
var selectedDay = currentDay
// currentYearElement.innerHTML = currentYear;

// console.log(selectedYear);

function setCurrentMonth(selectedMonthNum){
  var days = "";
  var count = 0;
  var lastDay = new Date(selectedYear, selectedMonthNum, 0).getDate();
  var lastMonthLastDay = new Date(selectedYear, selectedMonthNum-1, 0).getDate();
  var firstDay = new Date(selectedYear, selectedMonthNum-1, 1).getDay();
  var target = monthListElement.querySelector(`li:nth-of-type(${selectedMonthNum}) a`);

  date.setMonth(selectedMonthNum);
  date.setFullYear(selectedYear);

  currentMonthElement !== null ? currentMonthElement.classList.remove("active"): null;  
  target.classList.add("active");
  currentMonthElement = target;
  monthAsTitleElement.innerHTML = target.innerHTML;
  var pre = [];  
  for(var i = 1; i <= firstDay; i++){ // add pre
    count++;
    pre.push(`<div class="pre">${lastMonthLastDay--}</div>`);    
  }
  days += pre.reverse().join("");
  for(var i = 1; i <= lastDay; i++){
    count++;
    days += `<div class="this-month">${i}</div>`;  
  }  
  for(var i = 1; count < 42; i++){ // add post
    count++;
    days += `<div class="post">${i}</div>`;  
  }
  monthDaysElement.innerHTML = days;

  if(currentMonth === selectedMonth && currentYear === selectedYear){ 
    setCurrentDay();
  }

  // notifyDay();
}

function setCurrentDay(){
  daysList = document.querySelectorAll(".container .cal .calendar .cal-table-wrap .cal-table .days .this-month");
  daysList[currentDay-1].classList.add("today");
}

function setCurrentYear(selectedYearNum){
  
    if(selectedYearNum !== NaN && selectedYearNum !== null && selectedYearNum !== undefined){
      if(selectedYearNum === currentYear){ // this year
        selectedYear = selectedYearNum;
        date.setFullYear(selectedYear);
        selectedMonth = currentMonth; 
        selectedDay = currentDay;     
      } else { // another year
        selectedYear = selectedYearNum;
        date.setFullYear(selectedYear);
        selectedMonth = 1
        selectedDay = 1;
        // currentMonthElement !== null ? currentMonthElement.classList.remove("active"): null;

      }
    } else { // no year selected
      selectedYear = currentYear;
      selectedYearNum = currentYear;
      date.setFullYear(selectedYear);
      selectedMonth = currentMonth;
      selectedDay = currentDay; 
    }
    

  currentYearElement.innerHTML = selectedYear;
  // currentMonthElement !== null ? currentMonthElement.classList.remove("active"): null; 
  setCurrentMonth(selectedMonth);
  selectedDate(selectedYear, selectedMonth, selectedDay);
}


function selectedDate(year, month, day){
  // var date = new Date(year, month, day);
  // console.log(date);
  selectedDateElement.innerHTML = `${months[month-1]} ${day}, ${year}`;
}

document.addEventListener("click", (e)=>{

  // select month by clicking on month list
  if(e.target.matches(".container .cal .months-list ul li *")){
    selectedMonth = Number(e.target.dataset.mn);
    // var tempSelectedYear = e.target.parentElement.parentElement.parentElement.querySelector(".cur-year .year").innerHTML;
    // console.log(currentYear);
    // console.log(tempSelectedYear);
    // console.log(currentYear == tempSelectedYear);
    // if(tempSelectedYear == currentYear){
    //   lastSelectedMonth = selectedMonth;
    // }
    setCurrentMonth(selectedMonth);
  }
  if(e.target.matches(".container .cal .calendar .days .this-month")){
    selectedDay = Number(e.target.innerHTML);
    selectedDate(selectedYear, selectedMonth, selectedDay);
    // console.log(e.target.parentElement.querySelector(".this-month.selected"));
    var selected = e.target.parentElement.querySelector(".this-month.selected");
    selected !== null ? selected.classList.remove("selected"): null;
    e.target.classList.add("selected");
    listTasks(); // function from canlender.js (to show selected day tasks);
  }
});

yearIncrement.addEventListener("click", (e)=> {
  var incremented = selectedYear + 1;
  setCurrentYear(incremented);
});
yearDecrement.addEventListener("click", (e)=> {
  setCurrentYear(--selectedYear);
});

setCurrentYear();
// setCurrentMonth(selectedMonth);
// selectedDate(selectedYear, selectedMonth, selectedDay);
// setCurrentDay(); 