const MONTHS = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
};

// dateString: "2023-05-08T04:08:47.000Z"
const formatDate = dateString => {
    // console.log("Date string", dateString)
    const month = dateString.substring(5, 7)
    // console.log("Month", month)
    const year = dateString.substring(0, 4)
    // console.log("Year", year)
    return `${MONTHS[month]} ${year}`
}

export default formatDate;
