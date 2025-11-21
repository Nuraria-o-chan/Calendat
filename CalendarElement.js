'use strict'
import CalendarLogic from "./CalendarLogic.js";

export class CalendarElement {
    uniqueId;
    calendar = new CalendarLogic();
    rootElement;
    renderContainer;
    displayDayHeader;

    // displayInsideMonth;
    // displayMonthHeader;
    // displayYearHeader;


    constructor(uniqueId) {
        this.uniqueId = uniqueId;
        this.calendar.generateDays();

        this.rootElement = this.createMakeUpCalendar();

        this.displayDayHeader = this.getCurDay();
        this.getMonth();
        this.getYear();
        // this.renderContainer = this.renderDays();
        // this.displayInsideMonth = this.getMonth();
        // this.displayMonthHeader = this.getMonth();
        // this.displayYearHeader = this.getYear();
        this.renderDays();


        this.rootElement.style.position = "absolute";
        this.rootElement.style.display = "none";
        this.rootElement.style.zIndex = "1000";
        document.body.appendChild(this.rootElement);

        document.addEventListener("click", (e) => {
            const clickInsideCalendar = this.rootElement.contains(e.target);

            if (!clickInsideCalendar) {
                return this.hide();
            }
        })

    }

    createMakeUpCalendar() {
        const wrapper = document.createElement("div");
        wrapper.classList.add("calendar-wrap");
        wrapper.style.marginTop = "1rem";
        wrapper.id = this.uniqueId;


        wrapper.innerHTML = `
        <div class="calendar-wrapper">
    <div class="calendar-header-date">
    <div class="day-header"></div>
    <div class="month-header"></div>
       <div class="year-header"></div>
    </div>
    <div class="line"></div>

    <div class="calendar-container-select">
        <div class="calendar-buttons-select">
    <div class="calendar-select-month">  
    
    <button class="select-before-button btn-in-calendar">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.20341 14.25L3 9.00445L8.20304 3.75L9.04852 4.60233L5.33078 8.35682H15V9.56273H5.24476L9.04815 13.3969L8.20341 14.25Z" fill="#525C69" />
        </svg>
    </button>
    <div class="month-button">
    <div class="display-month"> </div>
    
    <div style="cursor: pointer">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.7929 8.33325L6.20711 8.33325C5.76165 8.33325 5.53857 8.87182 5.85355 9.1868L9.64645 12.9797C9.84171 13.175 10.1583 13.175 10.3536 12.9797L14.1464 9.18681C14.4614 8.87182 14.2383 8.33325 13.7929 8.33325Z" fill="#525C69" />
    </svg>
        </div>
        </div>
         <button class="select-after-button btn-in-calendar">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.79659 3.75L15 8.99555L9.79696 14.25L8.95148 13.3977L12.6692 9.64318H3V8.43727H12.7552L8.95185 4.60309L9.79659 3.75Z" fill="#525C69" />
        </svg>
    </button>
     </div> 
    </div>
    
    <div class="calendar-select-year">
    <div class="select-year"></div>
        <div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7929 8.33325L6.20711 8.33325C5.76165 8.33325 5.53857 8.87182 5.85355 9.1868L9.64645 12.9797C9.84171 13.175 10.1583 13.175 10.3536 12.9797L14.1464 9.18681C14.4614 8.87182 14.2383 8.33325 13.7929 8.33325Z" fill="#525C69" />
        </svg>
        </div>
    </div>
        </div>
        <div class="daysWeek">
            <p>Пн</p>
            <p>Вт</p>
            <p>Ср</p>
            <p>Чт</p>
            <p>Пт</p>
            <p>Сб</p>
            <p>Вс</p>
        </div>
        <div class="render-content"></div>
    </div>
</div>
        `;

        this.renderContainer = wrapper.querySelector(".render-content");
        const prevButtonMonth = wrapper.querySelector(".select-before-button");
        const nextButtonMonth = wrapper.querySelector(".select-after-button");

        prevButtonMonth.addEventListener("click", (e) => {
            e.stopPropagation();
            this.calendar.prevMonth();
            this.updateHeaderAndDays()
        })
        nextButtonMonth.addEventListener("click", (e) => {
            e.stopPropagation();
            this.calendar.nextMonth();
            this.updateHeaderAndDays()
        })

        // открыть список месяцев
        const buttonMonth = wrapper.querySelector(".month-button");
        buttonMonth.addEventListener('click', (e) => {
            e.stopPropagation();
            const week = wrapper.querySelector(".daysWeek");
            week.style.display = "none";
            this.renderMonths()
        });

        // выбор месяца из списка
        this.renderContainer.addEventListener("click", (e) => {
            const el = e.target.closest('.display-list-months');
            const week = wrapper.querySelector(".daysWeek");

            if (!el) return;
            e.stopPropagation();

            const idx = Number(el.dataset.monthIndex);
            if (Number.isNaN(idx)) return;

            // переключаем месяц в логике
            this.calendar.setMonth(idx);
            week.style.display = "grid";
            // обновляем шапку (месяц/год/день) и перерисовываем дни
            this.getMonth();
            this.getYear();
            this.renderDays();

        })





        return wrapper;
    }

    updateHeaderAndDays(){
        // вернуть заголовки и сетку дней
        this.getMonth();
        this.getYear();

        const week = this.rootElement.querySelector(".daysWeek");
        if (week) week.style.display = "grid";

        // вернуть режим отрисовки дней
        this.renderContainer.classList.remove('render-content--months');
        this.renderContainer.classList.add('render-content--days');

        this.renderDays();
    }

    renderDays() {
        this.renderContainer.classList.remove('render-content--months');
        this.renderContainer.classList.add('render-content--days');

        this.renderContainer.innerHTML = '';

        this.calendar.days.forEach((dayObj) => {
            const dayEl = document.createElement("div");
            dayEl.classList.add('calendar-day');
            dayEl.textContent = dayObj.num;

            if (dayObj.disabled === false) {
                dayEl.classList.add('active');
                if (Number(dayObj.num) === Number(this.displayDayHeader)) {
                    dayEl.classList.remove("active");
                    dayEl.classList.add('cur-active-calendar-day');
                }
            } else {
                dayEl.classList.add('disabled');
            }

            this.renderContainer.appendChild(dayEl);
        })

        console.log(this.calendar.days);

    }

    renderMonths() {
        this.renderContainer.classList.remove('render-content--days');
        this.renderContainer.classList.add('render-content--months');

        this.renderContainer.innerHTML = '';

        this.calendar.months.forEach((month, monthIdx) => {
            const monthEl = document.createElement('div');
            monthEl.classList.add('display-list-months');
            monthEl.textContent = month;
            monthEl.dataset.monthIndex = String(monthIdx);

            if(monthIdx === this.calendar.monthN){
               monthEl.classList.add('cur-active-calendar-month');
           }

            this.renderContainer.appendChild(monthEl);
        })
        console.log(this.calendar.months)
    }


    getCurDay() {
        const displayDay = this.rootElement.querySelector(".day-header");
        const day = this.calendar.getDay();
        displayDay.innerHTML = day;
        return day;
    }

    getYear() {
        const inputYear = this.rootElement.querySelector(".year-header");
        const selectYear = this.rootElement.querySelector(".select-year");
        inputYear.innerHTML = this.calendar.year;
        selectYear.innerHTML = this.calendar.year;
    }


    getMonth() {
        const inputMonth = this.rootElement.querySelector('.display-month');
        const headeMonth = this.rootElement.querySelector(".month-header");
        inputMonth.innerHTML = this.calendar.getCurMonths();
        headeMonth.innerHTML = this.calendar.getCurMonths();
    }

    show(targetElement) {
        const rect = targetElement.getBoundingClientRect();
        this.rootElement.style.left = rect.left + window.scrollX + "px";
        this.rootElement.style.top = rect.bottom + window.scrollY + 4 + "px";
        this.rootElement.style.display = "flex";
    }

    hide() {
        this.rootElement.style.display = "none";
    }

    toggle(targetElement) {
        if (this.rootElement.style.display === "none" || this.rootElement.style.display === "") {
            this.show(targetElement);
        } else {
            this.hide();
        }
    }


}