input.onButtonPressed(Button.A, function () {
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, 45)
})
function init () {
    ticklingBot = new servoBox.TicklingBot();
    ticklingBot.init()
    scorpioBot = new servoBox.ScorpioBot();
    scorpioBot.init();
    rabbitBot = new servoBox.RabbitBot();
    rabbitBot.init()
    strip = neopixel.create(DigitalPin.P15, 80, NeoPixelMode.RGB)
    requestedLedPattern = "RAINBOW"
}
input.onButtonPressed(Button.B, function () {
    Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1)
})
let ticklingBot:servoBox.TicklingBot
let scorpioBot: servoBox.ScorpioBot
let rabbitBot: servoBox.RabbitBot
let strip: neopixel.Strip
init()


let requestedLedPattern:string =""

let currentLedPattern: string = ""
basic.forever(function () {
    if (currentLedPattern!=requestedLedPattern){
        switch(requestedLedPattern){
            case "RAINBOW":
                strip.showRainbow(1, 360)
                break;
            case "RED":
                strip.showColor(NeoPixelColors.Red)
                break;
            default:
                break;
        }
        currentLedPattern = requestedLedPattern
    }
})



basic.forever(function () {
    switch (currentLedPattern) {
        case "RAINBOW":
            strip.rotate(4)
            strip.show()
            basic.pause(70)
            break;
        default:
            break;
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
basic.forever(function () {
    if (scorpioBot.touchingStinger) {
        requestedLedPattern = "RED"
        scorpioBot.sting()
        basic.pause(1000)
    }
    else{
        requestedLedPattern = "RAINBOW"
    }
})
