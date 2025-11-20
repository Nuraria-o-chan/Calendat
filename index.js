'use strict';

import CalendarLogic from "./CalendarLogic.js";

const btn = document.querySelector(".display-date-value");
btn.addEventListener("click", () => {
    console.log("press f");
});

const calendar = new CalendarLogic();
const m = calendar.getArrMonths();
const g = calendar.generateDays();
console.log(m)
console.log(g)

