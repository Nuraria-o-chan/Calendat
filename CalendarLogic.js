"use strict"

export default class CalendarLogic {
    date = new Date();
    year = this.date.getFullYear();
    monthN = this.date.getMonth();
    moths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    days = [];

    // Устанавливаем текущую дату
    setDay(value = new Date()){
        this.date = value;
        this.year = this.date.getFullYear();
        this.monthN = this.date.getMonth();
    }

    // Возвращаем текущую дату месяца
    getDay(){
        return this.date.getDay();
    }

    getArrMonths(){
        const nameM = this.moths[this.monthN]
        return nameM
    }
    generateDays(){
        this.days = [];

        const prevMonthStart = new Date(this.year, this.monthN, 0).getDate();
        const prevMonthEnd = new Date(this.year, this.monthN, 0).getDate();
        const curMonthEnd = new Date(this.year, this.monthN + 1, 0).getDate();
        console.log('prevMonthStart:', prevMonthStart);
        console.log('prevMonthEnd:', prevMonthEnd);
        console.log('curMonthEnd:', curMonthEnd);
        return {curMonthEnd, prevMonthEnd, prevMonthStart};

    }
}