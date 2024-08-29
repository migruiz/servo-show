namespace servoBox {
    export class TicklingBot {
        tickling: boolean = false
        constructor() {
        }
        init() {
            pins.setPull(DigitalPin.P2, PinPullMode.PullDown)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, 90)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo6, 90)
            basic.forever(function () {
                const pinVal = pins.analogReadPin(AnalogPin.P2)
                const isTickling = pinVal> 25
                this.tickling = isTickling;
                if (isTickling){
                    basic.pause(3000)
                }
                
            })

        }
        moveArms(){
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, 160)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo6, 160)
            basic.pause(500)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, 90)
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo6, 90)
            basic.pause(500)
        }

       

    }
}