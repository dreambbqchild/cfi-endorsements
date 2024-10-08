Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addMonths = function(months) {
    const date = new Date(this.valueOf());
    date.setMonth(date.getMonth() + months);
    return date;
}

Date.prototype.setDayOfMonth = function(dayOfMonth) {
    const date = new Date(this.valueOf());
    date.setDate(dayOfMonth);
    return date;
}