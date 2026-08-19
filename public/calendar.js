const yearEl = document.getElementById('year');
const dataCalendar = document.getElementById('data-calendar');
const panel = document.getElementById('panel');
const panelContent = document.getElementById('panel-content');
const yearPrev = document.getElementById('year-prev');
const yearNext = document.getElementById('year-next');
const btnYesterday = document.getElementById('btn-yesterday');
const btnToday = document.getElementById('btn-today');
const btnTomorrow = document.getElementById('btn-tomorrow');

const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
];

const dows = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const quotes = [
    "You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. — Steve Jobs",
    "The impediment to action advances action. What stands in the way becomes the way. — Marcus Aurelius",
    "We suffer more often in imagination than in reality. — Seneca",
    "A journey of a thousand miles begins with a single step. — Lao Tzu",
    "It does not matter how slowly you go as long as you do not stop. — Confucius",
    "He who has a why to live can bear almost any how. — Friedrich Nietzsche",
    "One must imagine Sisyphus happy. — Albert Camus",
    "First say to yourself what you would be; and then do what you have to do. — Epictetus",
    "Waste no more time arguing about what a good man should be. Be one. — Marcus Aurelius",
    "Luck is what happens when preparation meets opportunity. — Seneca"
];

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function formatDateParam(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

let currentYear = new Date().getFullYear();
let currentMonth = 0;

function renderCalendar(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    const quote = getRandomQuote();

    let html = `
        <div class="cal-header">
            <button class="cal-nav" id="cal-prev">&#9664;</button>
            <span class="cal-title">${months[month]} ${year}</span>
            <button class="cal-nav" id="cal-next">&#9654;</button>
        </div>
        <div class="cal-grid">
    `;

    for (let d = 0; d < dows.length; d++) {
        html += `<div class="cal-dow">${dows[d]}</div>`;
    }

    for (let i = 0; i < firstDay; i++) {
        html += `<div class="cal-day empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let classes = 'cal-day';
        if (isCurrentMonth && day === today.getDate()) {
            classes += ' today';
        }
        html += `<div class="${classes}" data-day="${day}">${day}</div>`;
    }

    html += `</div>
        <p class="cal-quote">"${quote}"</p>
        `;
    panelContent.innerHTML = html;

    document.getElementById('cal-prev').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    document.getElementById('cal-next').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    panelContent.querySelectorAll('.cal-day:not(.empty)').forEach(el => {
        el.addEventListener('click', () => {
            const day = parseInt(el.dataset.day);
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            window.location.href = `tasks.html?date=${dateStr}&month=${month}&year=${year}`;
        });
    });
}

function setQuickNav() {
    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    btnYesterday.href = `tasks.html?date=${formatDateParam(yesterday)}`;
    btnToday.href = `tasks.html?date=${formatDateParam(today)}`;
    btnTomorrow.href = `tasks.html?date=${formatDateParam(tomorrow)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    yearEl.innerHTML = currentYear;

    for (let i = 0; i < months.length; i++) {
        dataCalendar.innerHTML += `
            <h3 class="day" data-id="${i}">${months[i]}</h3>
        `;
    }

    setQuickNav();

    const params = new URLSearchParams(window.location.search);
    const monthParam = params.get('month');
    const yearParam = params.get('year');

    if (monthParam !== null && yearParam !== null) {
        currentMonth = parseInt(monthParam);
        currentYear = parseInt(yearParam);
        yearEl.innerHTML = currentYear;
        renderCalendar(currentYear, currentMonth);
        panel.style.display = 'flex';
    }
});

yearPrev.addEventListener('click', () => {
    currentYear--;
    yearEl.innerHTML = currentYear;
});

yearNext.addEventListener('click', () => {
    currentYear++;
    yearEl.innerHTML = currentYear;
});

dataCalendar.addEventListener('click', (e) => {
    if (!e.target.classList.contains('day')) return;

    const id = parseInt(e.target.dataset.id);
    currentMonth = id;
    renderCalendar(currentYear, currentMonth);
    panel.style.display = 'flex';
});

panel.addEventListener('click', (e) => {
    if (e.target === panel) {
        panel.style.display = 'none';
    }
});

console.log('Calendar on');
