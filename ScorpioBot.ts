namespace servoBox {
    export class ScorpioBot {
        touchingStinger: boolean = false
        constructor() {
        }
        init() {
            const pin = DigitalPin.P12
            pins.setPull(pin, PinPullMode.PullDown)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo8, 180)
            basic.forever(function () {
                const pinVal = pins.digitalReadPin(pin)
                this.touchingStinger = pinVal == 1
            })

        }
        sting() {
            basic.pause(500)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo8, 0)
            basic.pause(2000)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo8, 180)
        }



    }
}