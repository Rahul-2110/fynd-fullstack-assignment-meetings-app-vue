const monthsMixin = {
    data: function(){
        return{
            Months : [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ]
        }
    }
}

const weekDaysMixin = {
    data: function(){
        return{
            WeekDays : [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ]
        }
    }
}

export{
    monthsMixin,
    weekDaysMixin
};