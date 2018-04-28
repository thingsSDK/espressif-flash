const SerialPort = require('serialport');


const setOptionsOnPort = options => port => port.set(options)
const flashOnPort = port => {
  port.drain(() =>{
    port.write(sendSyncCommand, 'buffer', () => {
      console.log("sent");
  })
})
}
const startReading = port => port.on('data', data => {
  console.log(data.toString());
})


const queue = [

  {timeout: 150, exec: startReading},
  {timeout: 200, exec: flashOnPort},
  {timeout: 250, exec: flashOnPort},
  {timeout: 300, exec: flashOnPort},
  

]

/**
 * Sync command can be sent multiple times before the ESP8266 acknowledges
 */
const sendSyncCommand = [
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

/**
 * Check if sync is acknowledged
 * 
 * @param {boolean} response 
 */
function isAcknowledged(response) {
  const expectedResponse = [
    0xc0,
    0x01,
    0x08,
    0x02,
    0x00,
    0x07,
    0x07,
    0x12,
    0x20,
    0x00,
    0x00,
    0xc0
  ];
  const deepEqual = (assert, currentValue, index) => assert && response[index] === currentValue
  return expectedResponse.reduce(deepEqual, true);
}

const port = new SerialPort('COM12', {
  baudRate: 115200,
})


port.on('open', () => {
  queue.forEach(sequence =>
    setTimeout(() => sequence.exec(port), sequence.timeout));
})