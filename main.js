let time = 0

let lapNumber = 0
let state
let interval

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const lapButton = document.getElementById('lap')
const resetButton = document.getElementById('reset')
const displayElement = document.getElementById('display')
const lapElement = document.getElementById('laps')

displayElement.innerText = convert(0)
lapButton.disable = true

startButton.addEventListener('click', () => {
    state = true
    interval = setInterval(timer, 1000)
    startButton.disabled = true
    lapButton.disabled = false
})
stopButton.addEventListener('click', () => {
    state = null
    interval = null
    startButton.disabled = false
    lapButton.disable = true
})

lapButton.addEventListener('click', () => {
    lap = convert(time)
    time = 0
    let newLap = lapMaker(lap)
    console.log(newLap)
    lapElement.appendChild(newLap)
})


resetButton.addEventListener('click', () => {
    time = 0
    interval = null
    state = null
    displayElement.innerText = convert(0)
    startButton.disabled = false
    lapButton.disable = true
    while(lapElement.firstChild) {
        lapElement.removeChild(lapElement.firstChild)
    }
})


//functions
function timer() {
    while(state) {
        time++
        let output = convert(time)
        displayElement.innerText = output
        return time
    }
}

function convert(ms) {
    let h = 0
    let m = 0
    let s = ms
    while(s >= 1000) {
        s -= 60
        m += 1
    }
    while(m >= 60) {
        m -= 60
        h += 1
    }
    let output = format([h, m, s, ms])
    return output
}

function format(arr) {
    let output = []
    arr.forEach(value => {
        let str = value.toString()
        if(str.length < 2) {
            output.push(0 + str)
        } else {
            output.push(str)
        }
    })
    return `${output[0]}:${output[1]}:${output[2]}`
}

function lapMaker(elapsedTime) {
    let article = document.createElement('article')
    let lap = document.createElement('p')
    let time = document.createElement('p')
    lapNumber++
    time.innerText = elapsedTime
    lap.innerText = `Lap #${lapNumber}:`
    article.appendChild(lap)
    article.appendChild(time)
    return article
}
