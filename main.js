let time = 0
let state
let interval

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const resetButton = document.getElementById('reset')
const displayElement = document.getElementById('display')

displayElement.innerText = convert(time)

startButton.addEventListener('click', () => {
    state = true
    interval = setInterval(timer)
    startButton.disabled = true
})
stopButton.addEventListener('click', () => {
    state = null
    interval = null
    startButton.disabled = false
})

resetButton.addEventListener('click', () => {
    time = 0
    displayElement.innerText = convert(0)
    startButton.disabled = false
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
    let m = 0
    let s = 0
    let h = 0
    console.log(ms)
    while(ms >= 1000) {
        ms -= 1000
        s += 1
    }
    while(s >= 60) {
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
    let ms = output[3]
    while(ms.length < 3) {
        output[3] = 0 + ms
        ms = output[3]
    }

    return `${output[0]}:${output[1]}:${output[2]}.${output[3]}`
}
