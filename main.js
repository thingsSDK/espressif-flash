import delay from "./delay";
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

const bootloader = async port => {
  await delay(0);
  port.set({ rts: true, dtr: false });
  await delay(5);
  port.set({ rts: false, dtr: true });
  await delay(50);
  port.set({ rts: false, dtr: false });
  sync(port);
};

const sync = port => {
  port.flush(() => {
    port.write([...syncFrame, ...syncFrame], "chunk", async () => {

    });
  });
};

const port = new SerialPort("COM12", {
  baudRate: 115200
});

port.on("open", () => {
  bootloader(port);
});
