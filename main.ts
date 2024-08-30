input.onButtonPressed(Button.A, function () {
    movingWheel = !movingWheel
    if (movingWheel){
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, 45)
    }
    else{
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1)
    }
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
})
let range: neopixel.Strip = null
let movingWheel = false

let smallRainbowLocation = 0
let smallRainbowDirection = 1
let showingSmallRainbowMoving = false
let showingFullRainbow = false

let ticklingBot:servoBox.TicklingBot
let scorpioBot: servoBox.ScorpioBot
let rabbitBot: servoBox.RabbitBot
let strip: neopixel.Strip
init()

let rabbitLightsbrightness = 255
let rabbitLightsDirection = -1
basic.forever(function () {
    if (rabbitBot.eating) {
        basic.showIcon(IconNames.Happy)
    } else if (scorpioBot.touchingStinger) {
        basic.showIcon(IconNames.Angry)
    } else if (ticklingBot.tickling) {
        basic.showIcon(IconNames.Silly)
    } else if (movingWheel) {
        basic.showIcon(IconNames.Diamond)
        basic.showIcon(IconNames.SmallDiamond)
    } else {
        basic.showIcon(IconNames.Heart)
        basic.showIcon(IconNames.SmallHeart)
    }
})
basic.forever(function () {
    if (scorpioBot.touchingStinger) {
        showingFullRainbow = false
        showingSmallRainbowMoving = false
        strip.setBrightness(255)
        strip.showColor(NeoPixelColors.Red)
    } else if (ticklingBot.tickling) {
        showingFullRainbow = false
        showingSmallRainbowMoving = false
        strip.setBrightness(255)
        strip.showColor(NeoPixelColors.Blue)
        basic.pause(150)
        strip.showColor(NeoPixelColors.Green)
        basic.pause(150)
    } else if (rabbitBot.eating) {
        showingFullRainbow = false
        showingSmallRainbowMoving = false
        strip.showColor(16731392)
        basic.pause(25)
        strip.setBrightness(rabbitLightsbrightness)
        rabbitLightsbrightness = rabbitLightsbrightness + rabbitLightsDirection * 8
        if (rabbitLightsbrightness < 0) {
            rabbitLightsbrightness = 0
            rabbitLightsDirection = 1
        }
        if (rabbitLightsbrightness > 255) {
            rabbitLightsbrightness = 255
            rabbitLightsDirection = -1
        }
    } else if (movingWheel) {
        showingFullRainbow = false
        if (!(showingSmallRainbowMoving)) {
            smallRainbowLocation = 0
            strip.clear()
            range = strip.range(0, 10)
            range.showRainbow(1, 360)
            showingSmallRainbowMoving = true
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
    } else {
        showingSmallRainbowMoving = false
        strip.setBrightness(255)
        if (!(showingFullRainbow)) {
            strip.showRainbow(1, 360)
            showingFullRainbow = true
        } else {
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
