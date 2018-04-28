import delay from './delay'
import SerialPort from 'serialport'

const bootloader = async port => {

  await delay(0)
  port.set({rts: true, dtr: false})
  await delay(5)
  port.set({rts: false, dtr: true})
  await delay(50)
  port.set({rts: true, dtr: false})

}

const port = new SerialPort('COM12', {
  baudRate: 115200,
})


port.on('open', () => {
  bootloader(port)
})