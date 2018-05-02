import SerialPort from 'serialport/test';
import bootloader from '../lib/bootloader';
import sinon from 'sinon';
import assert from 'assert';

describe('Flasher', () => {
  beforeEach(() => {
    const MockBinding = SerialPort.Binding;
    MockBinding.createPort('/dev/esp8266', { echo: true, record: true });
  })

  describe('booloader', () => {
    it('should perform booloader sequence', async () => {
      const port = new SerialPort('/dev/esp8266');
      sinon.spy(port, 'set')

      await bootloader(port);

      const first = port.set.getCall(0);
      assert(first.calledWith({ rts: true, dtr: false }))
      const second = port.set.getCall(1);
      assert(second.calledWith({ rts: false, dtr: true }))
      const third = port.set.getCall(2);
      assert(third.calledWith({ rts: false, dtr: false }))
    })
  })
})