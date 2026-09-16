const weddingDate = new Date("2027-08-28T15:00:00+01:00");
const fields = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds")
};

function updateCountdown() {
  const distance = Math.max(0, weddingDate.getTime() - Date.now());
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;
  fields.days.textContent = String(Math.floor(distance / day)).padStart(3, "0");
  fields.hours.textContent = String(Math.floor((distance % day) / hour)).padStart(2, "0");
  fields.minutes.textContent = String(Math.floor((distance % hour) / minute)).padStart(2, "0");
  fields.seconds.textContent = String(Math.floor((distance % minute) / 1000)).padStart(2, "0");
}

function downloadCalendarEvent() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ana e Diogo//Save the Date//PT",
    "BEGIN:VEVENT",
    "UID:ana-diogo-20270828@save-the-date",
    "DTSTAMP:20260916T000000Z",
    "DTSTART:20270828T140000Z",
    "DTEND:20270829T010000Z",
    "SUMMARY:Casamento de Ana e Diogo",
    "LOCATION:Quinta das Rosas, Alenquer",
    "DESCRIPTION:Save the date — mais detalhes em breve.",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  link.download = "ana-e-diogo-28-08-2027.ics";
  link.click();
  URL.revokeObjectURL(link.href);
}

updateCountdown();
setInterval(updateCountdown, 1000);
document.querySelector("#add-calendar").addEventListener("click", downloadCalendarEvent);
document.querySelector(".calendar-link").addEventListener("click", () => {
  window.setTimeout(() => document.querySelector("#add-calendar").focus(), 700);
});
