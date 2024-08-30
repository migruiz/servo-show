input.onButtonPressed(Button.A, function () {
    movingWheel = true
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
    movingWheel = false
    Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1)
})
let ticklingBot:servoBox.TicklingBot
let scorpioBot: servoBox.ScorpioBot
let rabbitBot: servoBox.RabbitBot
let strip: neopixel.Strip

let movingWheel = false

init()


let showingRainbow = false
let smallRainbowMoving = false
let smallRainbowLocation = 0
let smallRainbowDirection = 1

let brightness = 255
let direction = -1
basic.forever(function () {
    if (scorpioBot.touchingStinger){
        showingRainbow = false
        smallRainbowMoving = false
        strip.setBrightness(255)
        strip.showColor(NeoPixelColors.Red)
        basic.pause(4000)
    }
    else if (ticklingBot.tickling){
        showingRainbow = false
        smallRainbowMoving = false
        strip.setBrightness(255)
        strip.showColor(NeoPixelColors.Blue)
        basic.pause(150)
        strip.showColor(NeoPixelColors.Green)
        basic.pause(150)
    }
    else if (rabbitBot.eating) {
        showingRainbow = false
        smallRainbowMoving = false
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
    else if (movingWheel){
        showingRainbow = false
        if (!(smallRainbowMoving)) {
            smallRainbowLocation = 0
            strip.clear()
            const range = strip.range(0, 10)
            range.showRainbow(1, 360)
            smallRainbowMoving = true
        } else {
            if (smallRainbowLocation <= 0) {
                smallRainbowDirection = 1
            } else if (smallRainbowLocation > 80 - 10 - 1) {
                smallRainbowDirection = -1
            }
            smallRainbowLocation = smallRainbowLocation + smallRainbowDirection
            strip.rotate(smallRainbowDirection)
        }
        strip.show()
    }
    else{
        smallRainbowMoving = false
        strip.setBrightness(255)
        if (!showingRainbow) {
            strip.showRainbow(1, 360)
            showingRainbow = true
        }
        else {
            strip.rotate(4)
            strip.show()
            basic.pause(100)
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