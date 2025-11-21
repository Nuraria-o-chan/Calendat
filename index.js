'use strict';

import CalendarLogic from "./CalendarLogic.js";
import {CalendarElement} from "./CalendarElement.js";

document.addEventListener("DOMContentLoaded", () => {
    const displayBlock = document.querySelector(".display-date-value");

    const calendar = new CalendarElement("calendar-popup");

    displayBlock.addEventListener("click", (e) => {
        e.stopPropagation();
        calendar.toggle(displayBlock);
    })

    displayBlock.addEventListener("click", (e) => {
        if (!calendar.rootElement.contains(e.target) && !displayBlock.contains(e.target)) {
            calendar.hide();
        }
    })
})


/*const calendar = new CalendarLogic();
const m = calendar.getCurMonths();
const g = calendar.generateDays();
const calendarPage = calendar.days;
console.log(m)
console.log(calendarPage)*/