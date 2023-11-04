//this file defines functions that affect dates.  This is because dates require particular formats for our database.
const formatDate = (date) => {
    let dateString = date.toString();
  
    // get last character of date string
    const lastCharacter = dateString.charAt(dateString.length - 1);
  
    if (lastCharacter === "1" && dateString !== "11") {
      dateString = `${dateString}st`;
    } else if (lastCharacter === "2" && dateString !== "12") {
      dateString = `${dateString}nd`;
    } else if (lastCharacter === "3" && dateString !== "13") {
      dateString = `${dateString}rd`;
    } else {
      dateString = `${dateString}th`;
    }
  
    return dateString;
  };
  
  // function to format a timestamp, with parameters for the timestamp and other options.
  module.exports = (
    timestamp,
    { monthLength = "short", dateSuffix = true } = {}
  ) => {
    let months;
  
    if (monthLength === "short") {
      months = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec",
      };
    } else {
      months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
      };
    }
  
    const date = new Date(timestamp);
    const formattedMonth = months[date.getMonth()];
  
    let dayOfMonth;
  
    if (dateSuffix) {
      dayOfMonth = formatDate(date.getDate());
    } else {
      dayOfMonth = date.getDate();
    }
  
    const year = date.getFullYear();
  
    let hour;
    // check for 24-hr time
    if (date.getHours > 12) {
      hour = Math.floor(date.getHours() / 2);
    } else {
      hour = date.getHours();
    }
    // if hour is 0 (12:00am), change it to 12
    if (hour === 0) {
      hour = 12;
    }
  
    const minutes = date.getMinutes();
  
    //set morning or afternoon times
    let timeOfDay;
  
    if (date.getHours() >= 12) {
      timeOfDay = "pm";
    } else {
      timeOfDay = "am";
    }
  
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${timeOfDay}`;
  
    return formattedTimeStamp;
  };