//Variables
let start 
let now 
let elapsed 

let lapNumber = 0 
let laps = []

let state
let interval

//DOM Mapping/Setup
const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const lapButton = document.getElementById('lap')
const resetButton = document.getElementById('reset')
const displayElement = document.getElementById('display')
const lapElement = document.getElementById('laps')

displayElement.innerText = convert(0)
lapButton.disabled = true;
stopButton.disabled = true;

//Stopwatch Event Listeners
startButton.addEventListener('click', () => {
    if(!start) {
        start = Date.now();
    };
    state = true;
    interval = setInterval(timer, 1);
    startButton.disabled = true;
    lapButton.disabled = false;
    stopButton.disabled = false;
})

stopButton.addEventListener('click', () => {
    state = null;
    interval = null;
    startButton.disabled = false;
    lapButton.disabled = true;
    stopButton.disabled = true;
})

lapButton.addEventListener('click', () => {
    if(!state) return;
    lap = Date.now();
    let lapTime;    
    laps.push(lap);
    if(laps.length < 2) {
        lapTime = lap - start
    } else {
        lapTime = laps[laps.length - 1] - 
        laps[laps.length - 2]
    };
    let newLap = lapMaker(lapTime);
    lapElement.appendChild(newLap);
})

resetButton.addEventListener('click', () => {
    reset()
});


//Helper Functions
function timer() {
    if(state) {
        now = Date.now();
        elapsed = now - start;
        displayElement.innerText = convert(elapsed);
    };
};

function reset() {
    start = null;
    interval = null;
    state = null;
    lapNumber = 0;
    laps = [];
    displayElement.innerText = convert(0);
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
    while(lapElement.firstChild) {
        lapElement.removeChild(lapElement.firstChild)
    };
}

function convert(ms) {
    let m = 0;
    let s = 0;
    let h = 0;
    while(ms >= 1000) {
        ms -= 1000
        s += 1
    };
    while(s >= 60) {
        s -= 60
        m += 1
    };
    while(m >= 60) {
        m -= 60
        h += 1
    };
    return format([h, m, s, ms]);
};

function format(arr) {
    let output = [];
    arr.forEach(value => {
        let str = value.toString();
        if(str.length < 2) {
            output.push(0 + str)
        } else {
            output.push(str)
        };
    });
    while(output[3].length < 3) {
        let ms = 0 + output[3]
        output[3] = ms
    }
    return `${output[0]}:${output[1]}:${output[2]}.${output[3]}`;
}

function lapMaker(elapsedTime) {
    let article = document.createElement('article');
    let lap = document.createElement('p');
    let elapsed = document.createElement('p');
    lapNumber++;
    elapsed.innerText = convert(elapsedTime);
    lap.innerText = `Lap #${lapNumber}:`;
    article.appendChild(lap);
    article.appendChild(elapsed);
    return article;
}
