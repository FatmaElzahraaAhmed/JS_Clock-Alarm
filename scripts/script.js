let alarms = [];

document.addEventListener("DOMContentLoaded", function () {
    function updateClock() {
        const currentDate = new Date();
    
        let hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
    
        const amPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
    
        const currentTime = `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    
        document.querySelector(".hour h1").innerText = currentTime;
        document.querySelector(".am-pm p").innerText = amPm;
    
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const currentDay = days[currentDate.getDay()];
        const dayElements = document.querySelectorAll(".day p");
    
        dayElements.forEach((dayElement) => {
          dayElement.style.color =
            dayElement.innerText === currentDay ? "black" : "#adadad";
        });
    
    
        for (let i = alarms.length - 1; i >= 0; i--) {
            const alarmTime = alarms[i].replace(/(AM|PM)/, '').replace(/\s/g, "");
            if (currentTime.replace(/\s/g, "") == alarmTime) {
                alert("Alarm! It's time!");
                alarms.splice(i, 1); 
                updateAlarmsDisplay();
            }
        }
        
      }

  setInterval(updateClock, 1000);

  updateClock();

  const alarmButton = document.querySelector(".alarm button");
  const setParent = document.querySelector(".set-parent");
  const cancelButton = document.querySelector(".set-parent .btn");
  const setAlarmButton = document.querySelector(".set .b1");
  const clearAlarmButton = document.querySelector(".set .b2");
  const setAlarmsContainer = document.querySelector(".set-alarms");
  const noAlarmsMessage = document.querySelector(".no-alarms");

  function updateAlarmsDisplay() {
    setAlarmsContainer.innerHTML = "";

    if (alarms.length === 0) {
      noAlarmsMessage.style.display = "block";
    } else {
      noAlarmsMessage.style.display = "none";

      alarms.forEach((alarmTime) => {
        const alarmElement = document.createElement("div");
        alarmElement.classList.add("alrm");

        const timeElement = document.createElement("p");
        timeElement.innerText = alarmTime;

        const closeButton = document.createElement("button");
        const closeImage = document.createElement("img");
        closeImage.src = "assets/images/close.png";
        closeButton.appendChild(closeImage);
        closeButton.addEventListener("click", function () {
          alarms = alarms.filter((time) => time !== alarmTime);
          updateAlarmsDisplay();
        });

        alarmElement.appendChild(timeElement);
        alarmElement.appendChild(closeButton);
        setAlarmsContainer.appendChild(alarmElement);
      });
    }
  }

  alarmButton.addEventListener("click", function () {
    setParent.style.display = "flex";
  });

  cancelButton.addEventListener("click", function () {
    setParent.style.display = "none";
  });

  setAlarmButton.addEventListener("click", function () {
    const hoursInput = parseInt(document.querySelector(".hr input").value, 10) || 0;
    const minutesInput = parseInt(document.querySelector(".mn input").value, 10) || 0;
    const secondsInput = parseInt(document.querySelector(".sc input").value, 10) || 0;
  
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();
  
    let alarmHours = currentHours + hoursInput;
    let alarmMinutes = currentMinutes + minutesInput;
    let alarmSeconds = currentSeconds + secondsInput;
  
    if (alarmSeconds >= 60) {
      alarmMinutes += Math.floor(alarmSeconds / 60);
      alarmSeconds %= 60;
    }
  
    if (alarmMinutes >= 60) {
      alarmHours += Math.floor(alarmMinutes / 60);
      alarmMinutes %= 60;
    }
  
    const amPm = alarmHours >= 12 ? "PM" : "AM";
  
    alarmHours %= 12;
    alarmHours = alarmHours === 0 ? 12 : alarmHours;
  
    const alarmTime = `${String(alarmHours).padStart(2, "0")}:${String(
      alarmMinutes
    ).padStart(2, "0")}:${String(alarmSeconds).padStart(2, "0")} ${amPm}`;
  
    alarms.push(alarmTime);
    updateAlarmsDisplay();
    setParent.style.display = "none";
    document.querySelector(".hr input").value = "";
    document.querySelector(".mn input").value = "";
    document.querySelector(".sc input").value = "";
  });
  
  clearAlarmButton.addEventListener("click", function () {
    document.querySelector(".hr input").value = "";
    document.querySelector(".mn input").value = "";
    document.querySelector(".sc input").value = "";
  });

  document.addEventListener("click", function (event) {
    if (event.target.closest('.alrm')) {
      const clickedAlarm = event.target.closest('.alrm');
      const alarmTime = clickedAlarm.querySelector('p').innerText;

      alarms = alarms.filter((time) => time !== alarmTime);
      updateAlarmsDisplay();
    }
  });

  updateAlarmsDisplay();
});
