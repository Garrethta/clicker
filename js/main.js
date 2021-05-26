
let score = document.querySelector('.score')
let button = document.querySelector('.button')
let autoGain = document.querySelector('.autogain')
let gainPerSec = document.querySelector('.gainpersec')
let upgradeGain = document.querySelector('.upgradegain')
let gainPerClick = document.querySelector('.gainperclick')
let gain = document.querySelector('.gain')
let clickPrice = document.querySelector('.clickprice')
let autoGainPrice = document.querySelector('.autogainprice')
let cup = document.querySelector('.cup')

let clickGain = 1;
let plus = false;
let autoGainCount = 1;
let clickPriceModifier = 1;
let autogainPriceModifier = 1;
let timer;

let initiate = function () {
    gain.innerHTML = 'сейчас штрафуют на ' + clickGain + ' ₽ за стаканчик'
    gainPerClick.innerHTML = getGainPerClick(clickGain)
    clickPrice.innerHTML = 100 + '₽'
    autoGainPrice.innerHTML = 200 + '₽'
    gainPerSec.innerHTML = autoGainCount
}
initiate()


function lose() {
    if (Number(score.innerHTML) < 0) {
        alert('Вы проиграли')
        score.innerHTML = 0
        clickGain = 1
        plus = false
        clickPriceModifier = 1
        autogainPriceModifier = 1
        autoGainCount = 1
        clearInterval(timer)
        initiate()
    }
}

function getGainPerClick(num) {
    num = num * 2
    return num
}

upgradeGain.addEventListener('click', function () {
    gainPerClick.innerHTML = getGainPerClick(gainPerClick.innerHTML)
    clickGain = getGainPerClick(clickGain)
    gain.innerHTML = 'сейчас штрафуют на ' + clickGain + ' ₽ за стаканчик'
    score.innerHTML -= 100 * clickPriceModifier
    clickPriceModifier = clickPriceModifier * 3
    clickPrice.innerHTML = 100 * clickPriceModifier + '₽'
    lose()
})

button.addEventListener('click', function () {
    function getClickGain(multiply) {
        score.innerHTML = +score.innerHTML + multiply
    }
    getClickGain(clickGain)
})


autoGain.addEventListener('click', function setAutoGain() {
    clearInterval(timer)
    plus = true
    let multiply = autoGainCount
    if (plus) {
        timer = setInterval(() => {
            score.innerHTML = Number(score.innerHTML) + multiply
        }, 1000);
    }
    autoGainCount++
    gainPerSec.innerHTML = autoGainCount
    score.innerHTML -= 200 * autogainPriceModifier
    autogainPriceModifier = autogainPriceModifier * 3
    autoGainPrice.innerHTML = 200 * autogainPriceModifier + '$'
    lose()
})

button.addEventListener('click', function (event) {
    let x = event.clientX
    let y = event.clientY
    cup.style.left = x-30 + 'px'
    cup.style.top = y-30 + 'px'
    cup.classList.add('active')
    setTimeout(() => {
        cup.style.left = '-1000px'
        cup.style.top = '0px'
        cup.classList.remove('active')
    }, 200);
})

function updateTime(){
    let currentTime = new Date()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    if (minutes < 10){
        minutes = "0" + minutes
    }
    let timeStr = hours + ":" + minutes + " ";
    document.querySelector('.time').innerHTML = timeStr;
}
setInterval(updateTime, 1000);