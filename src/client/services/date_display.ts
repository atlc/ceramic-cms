const months = new Array();
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

export const format = (full_date: Date) => {
    const date = new Date(full_date);
    const string_month = months[date.getMonth()];
    const DD = date.getDate();
    const YYYY = date.getFullYear();

    return `${string_month} ${DD}, ${YYYY}`;
};
