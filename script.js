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

function addCalendarEvent() {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isAndroid) {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: "Casamento de Ana e Diogo",
      dates: "20270828T140000Z/20270829T010000Z",
      location: "Quinta das Rosas, Alenquer",
      details: "Save the Date — Ana e Diogo. Mais detalhes em https://anadiogo2027.github.io/"
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank", "noopener");
    return;
  }

  const calendarFile = "https://anadiogo2027.github.io/ana-e-diogo-28-08-2027.ics";
  if (isIOS) {
    window.location.assign(calendarFile);
    return;
  }

  window.open(calendarFile, "_blank", "noopener");
}

updateCountdown();
setInterval(updateCountdown, 1000);
document.querySelector("#add-calendar").addEventListener("click", addCalendarEvent);
document.querySelector(".calendar-link")?.addEventListener("click", () => {
  window.setTimeout(() => document.querySelector("#add-calendar").focus(), 700);
});
