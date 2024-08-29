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
}
input.onButtonPressed(Button.B, function () {
    Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1)
})
let ticklingBot:servoBox.TicklingBot
let scorpioBot: servoBox.ScorpioBot
let rabbitBot: servoBox.RabbitBot
let strip: neopixel.Strip
init()


let showingRainbow = false


basic.forever(function () {
    if (scorpioBot.touchingStinger){
        showingRainbow = false
        strip.showColor(NeoPixelColors.Red)
        basic.pause(4000)
    }
    else if (ticklingBot.tickling){
        showingRainbow = false
        strip.showColor(NeoPixelColors.Green)
        basic.pause(200)
        strip.showColor(NeoPixelColors.Black)
        basic.pause(200)
    }
    else{
        if (!showingRainbow) {
            strip.showRainbow(1, 360)
            showingRainbow = true
        }
        else {
            strip.rotate(4)
            strip.show()
            basic.pause(70)
        }
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
        scorpioBot.sting()
    }
})