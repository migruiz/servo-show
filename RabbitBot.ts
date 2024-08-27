namespace servoBox {
    export class RabbitBot {
        eating: boolean = false
        constructor() {
        }
        init() {
            const pin = DigitalPin.P13
            pins.setPull(pin, PinPullMode.PullDown)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo7, 170)
            basic.forever(function () {
                const pinVal = pins.digitalReadPin(pin)
                this.eating = pinVal == 1
            })

        }
        moveEars() {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo7, 1)
            basic.pause(700)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo7, 170)
            basic.pause(700)
        }



    }
}