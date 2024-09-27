const now = new Date();
const ninetyDaysFromToday = now.addDays(90).toLocaleDateString();
const twoCalendarMonthsPreceedingCurrent = now.addMonths(-2).setDayOfMonth(1).toLocaleDateString();
const twentyFourCalendarMonthsPreceedingCurrent = now.addMonths(-24).setDayOfMonth(1).toLocaleDateString();

export default class ImportantDates extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<div class="text-center margin-half" style="line-height: 1.5em">
            <div class="bold">Important Dates Relative to ${now.toLocaleDateString()}:</div>
            <div class="box">
                <div><span>24 Calendar Months, Preceding: </span><span class="bold">${twentyFourCalendarMonthsPreceedingCurrent}</span>&nbsp;|&nbsp;</div>    
                <div><span>2 Calendar Months, Preceding: </span><span class="bold">${twoCalendarMonthsPreceedingCurrent}</span>&nbsp;|&nbsp;</div>    
                <div><span>90 Days: </span><span class="bold">${ninetyDaysFromToday}</span></div>
            </div>
        </div>`;
    }
}

customElements.define("important-dates", ImportantDates);