const year = document.getElementById('year');
const dataCalendar = document.getElementById('data-calendar');

const years = [
    '1991', '1993', '1994', '1995'
]

const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
]



document.addEventListener("DOMContentLoaded", () =>{
    year.innerHTML = "1992";
    for (let i = 0; i < months.length; i++){
        console.log(months[i]);
        dataCalendar.innerHTML += `
        <h3>${months[i]}</h3>
        ` 
     }
});
// sekarang buat dia otomatis bisa milih gar, jadi ambil object yang bisa kita manipulasi kwkw for now let us try the local things making object.


console.log(months.length);
console.log("Calendar on");
