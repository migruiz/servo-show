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

let brightness = 255
let direction = -1
basic.forever(function () {
    if (scorpioBot.touchingStinger){
        showingRainbow = false
        strip.setBrightness(255)
        strip.showColor(NeoPixelColors.Red)
        basic.pause(4000)
    }
    else if (ticklingBot.tickling){
        showingRainbow = false
        strip.setBrightness(255)
        strip.showColor(NeoPixelColors.Blue)
        basic.pause(150)
        strip.showColor(NeoPixelColors.Green)
        basic.pause(150)
    }
    else if (rabbitBot.eating) {
        showingRainbow = false
        strip.showColor(16731392)
        basic.pause(25)
        strip.setBrightness(brightness)
        brightness = brightness + direction * 8
        if (brightness<0){
            brightness = 0
            direction =  1
        }
        if (brightness>255){
            brightness = 255
            direction = -1
        }
    }
    else{
        strip.setBrightness(255)
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