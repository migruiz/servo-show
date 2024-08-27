let ticklingBot = new servoBox.TicklingBot();
ticklingBot.init()
let scorpioBot = new servoBox.ScorpioBot();
scorpioBot.init();
let rabbitBot = new servoBox.RabbitBot();
rabbitBot.init()
basic.forever(function () {
    if (scorpioBot.touchingStinger) {
        scorpioBot.sting()
    }
})
basic.forever(function () {
    if (ticklingBot.tickling) {
        ticklingBot.moveArms()
    }
})
basic.forever(function () {
    if (rabbitBot.eating) {
        rabbitBot.moveEars()
    }
})
