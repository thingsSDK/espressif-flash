import delay from './delay';

export default async port => {
  await delay(0);
  port.set({ rts: true, dtr: false });
  await delay(5);
  port.set({ rts: false, dtr: true });
  await delay(50);
  port.set({ rts: false, dtr: false });
};