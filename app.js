const focusBtn = document.querySelector("#focus");
const btns = document.querySelectorAll(".btn");
const shortBreakBtn = document.querySelector("#shortbreak");
const longBreakBtn = document.querySelector("#longbreak");
const startBtn = document.querySelector("#btn-start");
const pauseBtn = document.querySelector("#btn-pause");
const resetBtn = document.querySelector("#btn-reset");
const time = document.querySelector("#time");
let interval;
let active;
let paused = true;
let minCount = 24;
let count = 59;
time.textContent = `${minCount + 1}:00`;
// *check value less than 10 and add 0
const appendZero = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
}

resetBtn.addEventListener("click",
    (resetTime = () => {
        pauseTimer();
        switch (active) {
            case "long":
                minCount = 14;
                break;
            case "short":
                minCount = 4;
                break;
            case "focus":
                minCount = 24;
                break;

        }
        count = 59;
        time.textContent = `${minCount + 1} :00`;
    })
)

// *removeFocus for buttons
const removeFocus = () => {
    btns.forEach((btn) => {
        btn.classList.remove("btn-focus")
    })
}

focusBtn.addEventListener("click", () => {
    active = "focus";
    removeFocus();
    focusBtn.classList.add("btn-focus");
    pauseTimer();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
})

shortBreakBtn.addEventListener("click", () => {
    active = "short";
    removeFocus();
    shortBreakBtn.classList.add("btn-focus");
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount + 1)}:00`;
})

longBreakBtn.addEventListener("click", () => {
    active = "long";
    removeFocus();
    longBreakBtn.classList.add("btn-focus");
    pauseTimer();
    minCount = 14;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
})

pauseBtn.addEventListener("click",
    (pauseTimer = () => {
        paused = true;
        clearInterval(interval);
        startBtn.classList.remove("hide");
        pauseBtn.classList.remove("show");
        resetBtn.classList.remove("show")
    })
)

startBtn.addEventListener("click", () => {
    resetBtn.classList.add("show");
    pauseBtn.classList.add("show");
    startBtn.classList.add("hide");
    startBtn.classList.remove("show");
    if (paused) {
        paused = false;
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        interval = setInterval(() => {
            count--;
            time.textContent = `${appendZero(minCount)} : ${appendZero(count)}`;
            if (count === 0) {
                if (minCount !== 0) {
                    minCount--;
                    count = 60;
                } else {
                    clearInterval(set);
                }
            }
        }, 1000)
    }
})