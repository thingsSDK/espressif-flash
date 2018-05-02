import {SlipDecoder, SlipEncoder} from './slip'



export default port  => {
  const decoder = new SlipDecoder();
  const encoder = new SlipEncoder();

  port.pipe(decoder);
  encoder.pipe(port);

  const wrappedPort = {
    write: encoder.write.bind(encoder),
    on: decoder.on.bind(decoder),
    flush: port.flush.bind(port)
  }
  
  return wrappedPort;
}