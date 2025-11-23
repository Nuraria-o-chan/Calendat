"use strict"

export default class CalendarLogic {
    date = new Date();
    year = this.date.getFullYear();
    monthN = this.date.getMonth();
    months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
    ];
    days = [];

    // Устанавливаем текущую дату
    setDay(value = new Date()) {
        this.date = value;
        this.year = this.date.getFullYear();
        this.monthN = this.date.getMonth();
    }

    getCurDate(){
        const curDay = this.getDay();
        const curMonth = this.monthN +1;
        const curYear = this.year;
        const formattedNumber = curDay + "." + curMonth + "." + curYear;
        return formattedNumber;
    }

    setYear(year) {
        this.year = year;
        this.date = new Date(this.year, this.monthN, 1);
        this.generateDays();
    }

    getYearsRange(start, count = 12) {
        const arr = [];
        for (let i = 0; i < count; i++) arr.push(start + i);
        return arr;
    }

    setMonth(idx){
       if(idx<0 || idx>11) throw new RangeError('Некорректный месяц');
       this.monthN = idx
       this.date = new Date(this.year, idx, 1);
       this.generateDays();
    }

    // Возвращаем текущий день месяца
    getDay() {
        return this.date.getDate();
    }

    prevMonth(){
        this.monthN -=1;
        if(this.monthN <0){this.monthN = 11; this.year -=1}
        this.date = new Date(this.year, this.monthN,1);
        this.generateDays();
    }

    nextMonth(){
        this.monthN +=1;
        if (this.monthN > 11) { this.monthN = 0; this.year += 1; };
        this.date = new Date(this.year, this.monthN, 1);
        this.generateDays();
    }

    // Текущий месяц
    getCurMonths(numM = this.monthN) {
        return this.months[numM];
    }

    // Генерируем страницу календаря
    generateDays() {
        this.days = [];

        const prevMonthEndDay = new Date(this.year, this.monthN, 0).getDay(); // день недели по счёту на котором закончился прошлый месяц // кол-во ячеек необходимое занять днями прошлого месяца в зависимости от того какой конечный день недели
        const prevMonthEndNumber = new Date(this.year, this.monthN, 0).getDate(); // Последний день прошлого месяца
        const curMonthEnd = new Date(this.year, this.monthN + 1, 0).getDate();

        for (let i = prevMonthEndDay; i > 0; i--) {
            this.days.push({"num": prevMonthEndNumber - i + 1, "disabled": true}); // days last month
        }
        for (let i = 1; i <= curMonthEnd; i++) {
            this.days.push({"num": i, "disabled": false});
        }
        for (let i = 1; this.days.length < 42; i++) {
            this.days.push({"num": i, "disabled": true});
        }

    }
}