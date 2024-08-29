
let ticklingBot:servoBox.TicklingBot
let scorpioBot: servoBox.ScorpioBot
let rabbitBot: servoBox.RabbitBot
let strip: neopixel.Strip
function init(){
    ticklingBot = new servoBox.TicklingBot();
    ticklingBot.init()
    scorpioBot = new servoBox.ScorpioBot();
    scorpioBot.init();
    rabbitBot = new servoBox.RabbitBot();
    rabbitBot.init()
    strip = neopixel.create(DigitalPin.P15, 80, NeoPixelMode.RGB)
    strip.showRainbow(1, 360)
}
init()

input.onButtonPressed(Button.A, function () {
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, 45)
})
input.onButtonPressed(Button.B, function () {
    Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1)
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
basic.forever(function () {
    if (scorpioBot.touchingStinger) {
        scorpioBot.sting()
    }
})
basic.forever(function () {
    strip.rotate(4)
    strip.show()
    basic.pause(70)
})
