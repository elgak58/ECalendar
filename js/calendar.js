const newTaskDialog = document.querySelector(".container .dialog-bg");
const newTaskButton = document.getElementById("add-reminder");
const addNewTaskButton = document.getElementById("add");
const cancelButton = document.getElementById("cancel");

const reminderTitle = document.getElementById("reminder-title");
const dateSelector = document.querySelector(".container .dialog-bg .dialog-window .middle #date");
const timeSelector = document.querySelector(".container .dialog-bg .dialog-window .middle #time");

const taskList = document.querySelector(".container .cal .mnth-reminder .middle .task-list");
// const taskListItems = taskList.querySelectorAll("li a");

var remindersDelete = Array.prototype.slice.call(taskList.querySelectorAll("li a .right #delete-reminder"));

const confirmDeleteReminderDialog = document.querySelector(".container .dialog2-bg");
const deleteReminderButton = document.querySelector(".container .dialog2-bg #cancel");
const cancelDeleteReminderButton = document.querySelector(".container .dialog2-bg #create");
var reminderForDelete = null;

const taskToggle = document.getElementById("task-toggle");

var allTasksDate = [];
var selectedMonthTasksDate = [];
var selectedMonthtasksDateDays = [];
var selectedYeartasksMonths = [];
var monthList = monthListElement.querySelectorAll("li a");
// console.log(remindersDelete);

// const date = new Date();
// console.log(date);
dateSelector.valueAsDate = new Date();
var dialogeSelectedDate = dateSelector.valueAsDate;

function onTimeChange(input) { 
  var timeSplit = input.value.split(':'),
    hours,
    minutes,
    meridian;
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = 'PM';
    hours -= 12;
  } else if (hours < 12) {
    meridian = 'AM';
    if (hours == 0) {
      hours = 12;
    }
  } else {existRoll
    meridian = 'PM';
  }
  return (hours + ':' + minutes + ' ' + meridian);
}

function isSelectedDateIsToday(input) { 
  return input.getFullYear() === dialogeSelectedDate.getFullYear() &&
  (input.getMonth() + 1) === (dialogeSelectedDate.getMonth() + 1) && 
  input.getDate() === dialogeSelectedDate.getDate();
}

function listTasks(){
  if(taskToggle.checked){
    taskList.querySelectorAll("li").forEach((item)=>{
      item.style.display = "list-item";
    });
  } else {
    taskList.querySelectorAll("li").forEach((item)=>{
      var val1 = item.querySelector("a p span").innerText;
      var val2 = `${selectedDay}/${selectedMonth}/${selectedYear}`;
      if(val1 === val2){
        item.style.display = "list-item";
      } else {
        item.style.display = "none";
      }
    });
  }
}

function notifyMonthsWithTasks(){
  allTasksDate = [];
  selectedYeartasksMonths = [];

  taskList.querySelectorAll("li").forEach((item)=>{
    allTasksDate.push(item.querySelector("#task-date").innerText.split("/").map(Number));
  });

  allTasksDate.forEach((taskDate)=> {
    if(taskDate[2] === selectedYear && !selectedYeartasksMonths.includes(taskDate[1])){
      selectedYeartasksMonths.push(taskDate[1]);
    }
  });

  selectedYeartasksMonths.sort(function(a, b) {return a - b;}); // numerical sort function
  
  if(selectedYeartasksMonths.length !== 0){
    for(var i = 0; i < monthList.length; i++){
      monthList[i].classList.remove("contains-task-reminder");
    }    
    for(var i = 0; i < selectedYeartasksMonths.length; i++){
      var lastIndex = 0;
      for(var j = lastIndex; j < monthList.length; j++){
        if((j + 1) === selectedYeartasksMonths[i]){
          monthList[j].classList.add("contains-task-reminder");
          lastIndex = j;
          break;  
        }
      }
    }
  } else {
    for(var i = 0; i < monthList.length; i++){
      monthList[i].classList.remove("contains-task-reminder");
    }
  }

}

function notifyDaysWithTasks(){

  allTasksDate = [];
  selectedMonthTasksDate = [];
  selectedMonthtasksDateDays = [];
  
  taskList.querySelectorAll("li").forEach((item)=>{
    allTasksDate.push(item.querySelector("#task-date").innerText.split("/").map(Number));
  });

  allTasksDate.forEach((taskDate)=> {
    if(taskDate[2] === selectedYear &&
      taskDate[1] === selectedMonth){
      selectedMonthTasksDate.push(taskDate);
      selectedMonthtasksDateDays.push(taskDate[0]);
    }
  });
  selectedMonthtasksDateDays.sort(function(a, b) {return a - b;}); // numerical sort function
  daysList = document.querySelectorAll(".container .cal .calendar .cal-table-wrap .cal-table .days .this-month");
  for(var i = 0; i < selectedMonthtasksDateDays.length; i++){
    var lastIndex = 0;
    for(var j = lastIndex; j < daysList.length; j++){
      if(Number(daysList[j].innerText) === selectedMonthtasksDateDays[i]){
        daysList[j].classList.add("contains-task-reminder");
        lastIndex = j;
        break;  
      }
    }
  }
  notifyMonthsWithTasks();
}

newTaskButton.addEventListener("click", (e)=> {
  reminderTitle.value = "";
  dateSelector.valueAsDate = new Date(selectedYear, (selectedMonth - 1), (selectedDay + 1));
  timeSelector.value = "00:00";
  newTaskDialog.style.display = "flex";
});

addNewTaskButton.addEventListener("click", (e)=> {
  var val = reminderTitle.value;
  var selectedTime = onTimeChange(timeSelector);
  dialogeSelectedDate = dateSelector.valueAsDate;
  if(dialogeSelectedDate !== null){
    var [d, m, y] = [dialogeSelectedDate.getDate(), (dialogeSelectedDate.getMonth() + 1), dialogeSelectedDate.getFullYear()]
    if(val.length !== 0){
      taskList.insertAdjacentHTML("beforeend", `
        <li>
          <a href="#">
            <div class="left">
              <span id="reminder-title">${val}</span>
              <p>${selectedTime} - <span id="task-date">${d}/${m}/${y}</span></p>
            </div>
            <div class="right">
              <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Information Circle</title><path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 340h88"/><path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"/></svg>
              <svg id="delete-reminder" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Trash</title><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
            </div>
          </a>
        </li>
      `);
      newTaskDialog.style.display = "none";
      listTasks();
      notifyDaysWithTasks();
      // var remindersDelete = Array.prototype.slice.call(taskList.querySelectorAll("li a .right #delete-reminder"));
      
      // var lastReminder = taskList.querySelector("li:last-of-type #delete-reminder");
      // remindersDelete.push(lastReminder);
      // lastReminder.addEventListener("click", (e)=> {
      //   lastReminder.parentElement.parentElement.parentElement.innerHTML = "";
      // });
    } else {
      reminderTitle.style.border = "2px solid red";
      // newProjectDialog.querySelector("input[type=text]").style.animation = "blink 600ms infinite";
    }
  } else {
    alert("Invalid date !\nPlease select a correct date and try again");
  }
});

cancelButton.addEventListener("click", (e)=> {
  newTaskDialog.style.display = "none";
});


document.addEventListener("click", (e)=> {
  if(e.target.matches("#delete-reminder")){
    reminderForDelete = e.target.parentElement.parentElement.parentElement;
    confirmDeleteReminderDialog.style.display = "flex";
  } else if(e.target.matches("#delete-reminder *")){
    reminderForDelete = e.target.parentElement.parentElement.parentElement.parentElement;
    confirmDeleteReminderDialog.style.display = "flex";
  }

  if(e.target.matches(".container .cal .months-list ul li *")){
    notifyDaysWithTasks();
  }
});

deleteReminderButton.addEventListener("click", (e)=>{
  var [d, m, y] = reminderForDelete.querySelector("a p span").innerText.split("/").map(Number);

  if(y === selectedYear && m === selectedMonth){
    for(var i = 0; i < daysList.length; i++){
      if(Number(daysList[i].innerText) === d){
        daysList[i].classList.remove("contains-task-reminder");
        break;
      }
    }
  }
  reminderForDelete.remove();
  notifyMonthsWithTasks();
  confirmDeleteReminderDialog.style.display = "none";
});

cancelDeleteReminderButton.addEventListener("click", (e)=>{
  confirmDeleteReminderDialog.style.display = "none";
});

taskToggle.addEventListener("change", (e=> {
  if(taskToggle.checked){
    taskList.querySelectorAll("li").forEach((item)=>{
      item.style.display = "list-item";
    });
  } else {
    taskList.querySelectorAll("li").forEach((item)=>{
      var val1 = item.querySelector("a p span").innerText;
      var val2 = `${selectedDay}/${selectedMonth}/${selectedYear}`;
      if(val1 === val2){
        item.style.display = "list-item";
      } else {
        item.style.display = "none";
      }
    });
  }
}));

yearIncrement.addEventListener("click", (e)=> {
  notifyDaysWithTasks();
});
yearDecrement.addEventListener("click", (e)=> {
  notifyDaysWithTasks();
});

listTasks();

notifyDaysWithTasks();