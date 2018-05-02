import delay from "./lib/delay";
import bootloader from './lib/bootloader';
import portWrapper from './lib/port';
import SerialPort from "serialport";
const syncFrame = [
  0xc0,
  0x00,
  0x08,
  0x24,
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0x07,
  0x07,
  0x12,
  0x20,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0x55,
  0xc0
];


const createSend = port => async data => {
  return new Promise((resolve, reject) => {
    port.flush(() => {
      port.write([...data], 'chunk', () => port.drain(resolve))
    })
  });
} 

const receive = async port => {
  return new Promise((resolve, reject) => {
    port.once('readable', () => resolve(port.read()));
    port.once('error', reject);
  })
}
const port = new SerialPort("COM12", {
  baudRate: 115200
});


port.on("open", async () => {
  await bootloader(port);
  const send = createSend(port);
  let receivedInformation = null;
  await send(syncFrame);
  await send(syncFrame);
  receivedInformation = await receive(port);
  console.log(receivedInformation)
});
