namespace servoBox {
    export class ButterflyBot {
        touching: boolean = false
        constructor() {
        }
        init() {
            pins.setPull(DigitalPin.P0, PinPullMode.PullDown)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo3, 100)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo4, 140)
            basic.forever(function () {
                const pinVal = pins.analogReadPin(AnalogPin.P0)
                const isTouching = pinVal > 9
                this.touching = isTouching;
                if (isTouching) {
                    basic.pause(3000)
                }

            })

        }
        moveWings() {
           // Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo3, 90)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo3, 140)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo4, 100)


            basic.pause(1000)
            //Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo3, 60)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo3, 100)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo4, 140)
            basic.pause(1000)

        }



    }
}